import { useState } from "react";
import Star from "./star";
import StartEvent from "./starEvent";
import CommentRute from "./commentRute";

import styles from "./commentCalificationRute.module.css";

function CommentCalificationRute({ idRute, token, setErr, setInfo }) {
  const [calificacion, setCalification] = useState(0);
  const [calificacionTotal, setCalificationTotal] = useState(0);
  const arrayCalifcacion = Array.from(Array(5));

  return (
    <>
      <div className={styles.container}>
        <p>Calificacion global: </p>
        <p>Calificar: </p>
        <div>
          {arrayCalifcacion.map((element, index) => {
            if (index < calificacionTotal) {
              return <Star key={`start${index}`} id={index} />;
            }
            return (
              <Star key={`start${index}`} controlClass="disable" id={index} />
            );
          })}
        </div>

        <div>
          {arrayCalifcacion.map((element, index) => {
            if (index < calificacion) {
              return (
                <StartEvent
                  key={`start${index}`}
                  id={index}
                  idRute={idRute}
                  token={token}
                  setErr={setErr}
                  setCalification={setCalification}
                />
              );
            }
            return (
              <StartEvent
                key={`start${index}`}
                controlClass="disable"
                id={index}
                idRute={idRute}
                token={token}
                setErr={setErr}
                setCalification={setCalification}
                setCalificationTotal={setCalificationTotal}
              />
            );
          })}
        </div>
      </div>
      <CommentRute idRute={idRute} setErr={setErr} setInfo={setInfo} />
    </>
  );
}

export default CommentCalificationRute;
