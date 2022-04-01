function CardRoute({ data }) {
  return (
    <>
      <div>
        <h3>{data.title}</h3>
        <p>distancia: {data.distance}</p>
        <p>desnivel: {data.slopePositive}</p>
      </div>
    </>
  );
}
export default CardRoute;
