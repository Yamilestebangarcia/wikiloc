import Chart from "./chart";
import CommentCalificationRute from "./commentCalificationRute";
import styles from "./cardView.module.css";
function CardView({
  mapCords,
  track,
  point,
  setpointChart,
  setErr,
  token,
  idRute,
  setInfo,
}) {
  return (
    <div className={styles.card}>
      <p className={styles.h2}>{mapCords.description}</p>
      <div className={styles.chart}>
        <Chart
          track={track}
          point={point}
          setpointChart={setpointChart}
        ></Chart>
      </div>

      <ul className={styles.ul}>
        <li>Dificultad: {mapCords.difficulty}</li>
        <li>Distancia: {mapCords.distance} km</li>
        <li>Altura máxima: {mapCords.maximumHeight} m</li>
        <li>Altura mínima: {mapCords.minimunHeight} m</li>
        <li>Desnvel positivo: {mapCords.slopePositive} m</li>
        <li>Desnivel negativo: {mapCords.slopeNegative} m</li>
        <li>fecha: {mapCords.date}</li>
        <li>Pertenece a: {mapCords.userName}</li>
      </ul>
      <CommentCalificationRute
        idRute={idRute}
        token={token}
        setErr={setErr}
        setInfo={setInfo}
      />
    </div>
  );
}

export default CardView;
