import CardIndex from "./cardIndex";

function CardsIndex({ data, classNameC }) {
  return (
    <div className={classNameC}>
      {data ? (
        data.rute.length === 0 ? (
          <p>No existen rutas subidas</p>
        ) : (
          data.rute.map((el) => {
            return <CardIndex key={el._id} el={el} />;
          })
        )
      ) : null}
    </div>
  );
}
export default CardsIndex;
