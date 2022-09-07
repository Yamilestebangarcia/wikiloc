function ComentRuteCards({ styles, author, description }) {
  return (
    <div className={styles}>
      <h5>autor: {author}</h5>
      <p>{description}</p>
    </div>
  );
}

export default ComentRuteCards;
