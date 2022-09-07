import { useState, useEffect } from "react";
import { useFetchGetComents, useFetchSetComents } from "../../service/useFetch";
import ComentRuteCard from "./ComentRuteCard";

import styles from "./commentRute.module.css";
import FormCommentRute from "./formCommentRute";

function CommentRute({ idRute, setErr, setInfo }) {
  const token = sessionStorage.getItem("token");

  const [value, SetValue] = useState("");
  const [submit, SetSubmit] = useState(null);
  const [submitOk, SetSubmitOk] = useState(false);
  const [coments, setComents] = useState({});

  useEffect(() => {
    useFetchGetComents(
      "http://localhost:3001/app/GetComents",
      { token, idRute },
      setErr
    ).then((coments) => setComents(coments));
  }, []);

  useEffect(() => {
    if (submit) {
      useFetchSetComents(
        "http://localhost:3001/app/setComents",
        {
          token: token,
          description: value,
          idRute: idRute,
        },
        setErr
      ).then((res) => {
        if (res) {
          SetValue("");
          setErr("");
          setInfo("Comentario enviado");
          SetSubmitOk(true);
        }
      });
    }
  }, [submit]);

  return (
    <div className={styles.container}>
      <div className={styles.comments}>
        {coments.data ? (
          <ComentRuteCard
            styles={styles.comment}
            data={coments.data}
            submitOk={submitOk}
          />
        ) : null}
        {/*      <div className={styles.comment}>
          <h5>autor: djshf</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi amet
            qui deleniti expedita odit facere cumque sequi voluptatem nisi in
            nihil, a mollitia nostrum. Itaque ullam nemo atque accusamus quidem?{" "}
          </p>
        </div>
        <div className={submitOk ? null : styles.comment}>
          <h5>autor: djshf</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi amet
            qui deleniti expedita odit facere cumque sequi voluptatem nisi in
            nihil, a mollitia nostrum. Itaque ullam nemo atque accusamus quidem?{" "}
          </p>
        </div> */}
        {submitOk ? null : (
          <FormCommentRute
            styles={{ form: styles.form, textarea: styles.textarea }}
            value={value}
            SetValue={SetValue}
            SetSubmit={SetSubmit}
          />
        )}
      </div>
    </div>
  );
}
export default CommentRute;
