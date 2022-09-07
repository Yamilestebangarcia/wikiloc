import CardRoute from "./cardRute";

import styles from "./cardsRutes.module.css";

function CardsRoutes({ cardData, setHoverCard }) {
  return (
    <div className={styles.cards}>
      {cardData ? (
        cardData.length === 0 ? (
          <p className={styles.h2}>No se han encontrado coincidencias</p>
        ) : (
          cardData.map((ele) => {
            return (
              <CardRoute key={ele._id} data={ele} setHoverCard={setHoverCard} />
            );
          })
        )
      ) : null}
    </div>
  );
}

export default CardsRoutes;
