import styles from "./styles.module.scss";
import { BsCodeSlash } from "react-icons/bs";

export function VideoSelected() {
  return (
    <div className={styles.container}>
      <div className={styles.detailsVideo}>
        <input type="text" placeholder="Video teste" />
        <button>
          <BsCodeSlash size={18} /> Código de incorporação
        </button>
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.embedVideo}>
        <iframe
          src="https://www.youtube.com/embed/qPDYjcbA9Fc"
          title="Intro (Rework)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
