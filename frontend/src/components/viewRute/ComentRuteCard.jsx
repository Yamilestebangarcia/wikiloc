import ComentRuteCards from "./ComentRuteCards";

function ComentRuteCard({ styles, data, submitOk }) {
  const last = data.length - 1;
  return (
    <>
      {data.map((ele, index) => (
        <ComentRuteCards
          key={ele.id}
          styles={index === last ? (submitOk ? null : styles) : styles}
          author={ele.name}
          description={ele.description}
        />
      ))}
    </>
  );
}

export default ComentRuteCard;
