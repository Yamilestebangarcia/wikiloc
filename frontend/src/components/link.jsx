import { Link } from "react-router-dom";
function ComponentLink({ text, url }) {
  return (
    <p>
      <Link to={url}>{text}</Link>
    </p>
  );
}
export default ComponentLink;
