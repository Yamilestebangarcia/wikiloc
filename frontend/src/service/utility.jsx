function fullScreem(full, setFull) {
  if (full) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFull(false);
    }
  }
  document.addEventListener("fullscreenchange", (e) => {
    if (!document.fullscreenElement) {
      setFull(false);
    } else {
      setFull(true);
    }
  });
}

function filterData(data, minMaxDis, minMaxSlop, dataDifficulty) {
  let dataFilter;
  if (data) {
    dataFilter = data.filter(
      (ele) =>
        Math.round(ele.distance) >= minMaxDis.min &&
        Math.round(ele.distance) <= minMaxDis.max &&
        ele.slopePositive >= minMaxSlop.min &&
        ele.slopePositive <= minMaxSlop.max
    );

    if (dataDifficulty !== "todos") {
      dataFilter = dataFilter.filter(
        (ele) => ele.difficulty === dataDifficulty
      );
    }

    return dataFilter;
  }
}

export { fullScreem, filterData };
