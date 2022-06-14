import MapIndex from "./mapIndex";
import styles from "./cardIndex.module.css";
function CardIndex({ el }) {
  return (
    <>
      <div id={el._id} className={styles.card}>
        <div className={styles.info}>
          <p>
            <span className={styles.strong}>Titulo </span> {": "}
            {el.title}
          </p>
          <p>
            <span className={styles.strong}>Descripcion</span>
            {": "}
            {el.description}
          </p>
          <p>
            <span className={styles.strong}>Dificultad</span>
            {": "}
            {el.difficulty}
          </p>
          <p>
            <span className={styles.strong}>Distancia</span>
            {": "}
            {el.distance}
          </p>
          <p>
            <span className={styles.strong}>Desnivel</span>
            {": "}
            {el.slopePositive}
          </p>
          <p>
            <span className={styles.strong}>Fecha</span>
            {": "}
            {el.date}
          </p>
        </div>
        <div className={styles.map}>
          <MapIndex mapCords={[el.lat, el.lon]} id={el._id} />
        </div>
      </div>
    </>
  );
}
export default CardIndex;
