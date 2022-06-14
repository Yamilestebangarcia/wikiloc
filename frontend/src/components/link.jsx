import { Link } from "react-router-dom";
import styles from "./link.module.css";
function ComponentLink({ text, url }) {
  return (
    <p className={styles.pLink}>
      <Link className={styles.link} to={url}>
        {text}
      </Link>
    </p>
  );
}
export default ComponentLink;
