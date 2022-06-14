function LegendPosition({ position, classNameC }) {
  return (
    <>
      {position ? (
        <div className={classNameC}>
          <ul>
            <li>
              Posicion:
              <ul>
                <li>{`lat ${position.latitude}`}</li>
                <li> {`lon ${position.longitude}`}</li>
              </ul>
            </li>
            <li>Precisión Posicion: {position.accuracy}</li>
            <li>Altura: {position.altitude}</li>
            <li>Precisión altura: {position.altitudeAccuracy}</li>
            <li>Velocidad: {position.speed}</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default LegendPosition;
