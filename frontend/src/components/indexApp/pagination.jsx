import styles from "./pagination.module.css";
import PaginationImg from "./paginationImg";

function Pagination({ data, classNameC, nextPage, limit }) {
  return (
    <div className={classNameC}>
      {data ? (
        <PaginationImg
          id="previous"
          alt="Anterior"
          nextPage={nextPage}
          classNameC={
            data.skip > 0
              ? [styles.next, styles.previous].join(" ")
              : styles.disbled
          }
        />
      ) : null}

      {data ? (
        <PaginationImg
          id="next"
          alt="Siguiente"
          nextPage={nextPage}
          classNameC={
            data.skip < data.elements - limit ? styles.next : styles.disbled
          }
        />
      ) : null}
    </div>
  );
}

export default Pagination;
