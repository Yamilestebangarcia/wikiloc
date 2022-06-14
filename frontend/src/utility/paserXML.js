export const paserXML = (text) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");

  const date = getTime(xmlDoc);
  const firstcord = firstCord(xmlDoc);

  const slope = getSlope(xmlDoc);
  const distanceAndTrack = getDistanceAndTrack(xmlDoc);

  return {
    date,
    firstcord,
    slope,
    distance: distanceAndTrack.distance,
    track: distanceAndTrack.track,
  };
};

function getTime(xmlDoc) {
  try {
    const metadata = xmlDoc.getElementsByTagName("metadata");
    const time = metadata
      .item(0)
      .getElementsByTagName("time")
      .item(0).innerHTML;
    const [fecha] = time.split("T");
    return fecha.split("-").reverse().join("-");
  } catch (err) {
    return undefined;
  }
}
export function firstCord(xmlDoc) {
  const trkptData = { elev: [], cord: [] };
  const trk = xmlDoc.getElementsByTagName("trk");
  const Trkpt = trk
    .item(0)
    .getElementsByTagName("trkseg")
    .item(0)
    .childNodes.item(1);
  return { lat: Trkpt.getAttribute("lat"), lon: Trkpt.getAttribute("lon") };
}
function getDesnivel(xmlDoc) {
  return gpxCalcElevationGain(xmlDoc);
}
function getSlope(xmlDoc) {
  const trk = xmlDoc.getElementsByTagName("trk");
  const nodesTrkpt = trk
    .item(0)
    .getElementsByTagName("trkseg")
    .item(0).childNodes;
  const nodeEle = xmlDoc.getElementsByTagName("ele");

  let slopePositive = 0;
  let slopeNegative = 0;
  let previous;
  let MinimunHeight;
  let maximumHeight;
  let ele;
  const latLon = [];
  for (let i = 0; i < nodeEle.length; i++) {
    if (i % 2 !== 0) {
      ele = parseFloat(nodeEle[i].innerHTML);
      if (ele)
        if (i === 1) {
          maximumHeight = ele;
          MinimunHeight = ele;
          previous = ele;
        } else {
          if (ele > maximumHeight) {
            maximumHeight = ele;
          }
          if (ele < MinimunHeight) {
            MinimunHeight = ele;
          }
          if (previous < ele) {
            slopePositive += ele - previous;
          } else if (previous > ele) {
            slopeNegative += previous - ele;
          }
          previous = ele;
        }
    }
  }

  return {
    positive: Math.round(slopePositive),
    negative: Math.round(slopeNegative),
    min: Math.round(maximumHeight),
    max: Math.round(MinimunHeight),
  };
}
export function getDistanceAndTrack(xmlDoc) {
  let distance = 0;
  const track = [];
  const trkpt = xmlDoc.getElementsByTagName("trkpt");
  for (let i = 0; i < trkpt.length - 1; i++) {
    track.push({
      lat: trkpt[i].getAttribute("lat"),
      lon: trkpt[i].getAttribute("lon"),
    });

    distance += distanceTwoPoints(
      [trkpt[i].getAttribute("lat"), trkpt[i].getAttribute("lon")],
      [trkpt[i + 1].getAttribute("lat"), trkpt[i + 1].getAttribute("lon")]
    );
  }
  return { distance: Math.round(distance * 100) / 100, track };
}

export function getTrackSlope(xmlDoc) {
  const trackSlope = [];
  const nodeEle = xmlDoc.getElementsByTagName("ele");
  for (let i = 0; i < nodeEle.length; i++) {
    if (i % 2 !== 0) {
      trackSlope.push(parseFloat(nodeEle[i].innerHTML));
    }
  }
  return trackSlope;
}
export function getTrackMinElevCord(xmlDoc) {
  const track = [];
  const trkpt = xmlDoc.getElementsByTagName("trkpt");
  let elev;
  let ele;

  for (let index = 0; index < trkpt.length; index++) {
    ele = trkpt[index].childNodes[1].textContent;

    if (index === 0) {
      elev = ele;
    }
    if (Math.abs(elev - ele) > 2) {
      track.push({
        lat: trkpt[index].getAttribute("lat"),
        lon: trkpt[index].getAttribute("lon"),
        ele: ele,
      });
      elev = ele;
    }
  }

  return track;
}

const distanceTwoPoints = ([lat1, lon1], [lat2, lon2]) => {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;
  return finalDistance;
};
