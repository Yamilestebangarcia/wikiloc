import styles from "./cardRute.module.css";
function CardRoute({ data, setHoverCard }) {
  return (
    <>
      <div className={styles.card} onMouseOver={() => setHoverCard(data._id)}>
        <a
          href={"http://localhost:3000/app/view?rute=" + data._id}
          className={styles.aCard}
        >
          <h3>{data.title}</h3>
          <p>Distancia: {data.distance}</p>
          <p>Desnivel: {data.slopePositive}</p>
          <p>Dificultad: {data.difficulty}</p>
        </a>
      </div>
    </>
  );
}
export default CardRoute;
