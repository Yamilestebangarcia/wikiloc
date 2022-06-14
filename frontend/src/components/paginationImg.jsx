import imgNext from "../../public/next.svg";

function PaginationImg({ nextPage, classNameC, alt, id }) {
  {
    return (
      <img
        onClick={nextPage}
        id={id}
        alt={alt}
        src={imgNext}
        className={classNameC}
      />
    );
  }
}
export default PaginationImg;
