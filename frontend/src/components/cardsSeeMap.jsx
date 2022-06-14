import PInfo from "./Info";
import CardRoute from "./cardRute";

function CardSeeMap({ cardData, setHoverCard, classNameC }) {
  return (
    <div className={classNameC}>
      {cardData && cardData.length > 0 ? (
        cardData.map((ele) => {
          return (
            <CardRoute key={ele._id} data={ele} setHoverCard={setHoverCard} />
          );
        })
      ) : (
        <PInfo
          info={"No se encontraron rutas en esta area, aumeta o mueva el mapa"}
        />
      )}
    </div>
  );
}

export default CardSeeMap;
