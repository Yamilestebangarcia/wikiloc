function PopupComp({ data }) {
  return (
    <>
      <h3>{data.title}</h3>
      <p>Distancia:{data.distance} </p>
      <p>desnivel:{data.slopePositive} </p>
    </>
  );
}

export default PopupComp;
