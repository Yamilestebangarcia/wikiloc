function BtnMap({ onClick, src, classNameC, alt }) {
  return (
    <img onClick={onClick} src={src} className={classNameC} alt={alt}></img>
  );
}

export default BtnMap;
