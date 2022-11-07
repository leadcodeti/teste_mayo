import styles from "./styles.module.scss";
import { BsEye } from "react-icons/bs";

export function CardVideo() {
  return (
    <div className={styles.cardVideo}>
      <div className={styles.videoInfos}>
        <img src="/images/thumbVideo.jpg" alt="Thumb do video" />
        <div>
          <p className={styles.name}>
            Video exemplo 123{" "}
            <span className={styles.views}>
              <BsEye /> 5447
            </span>
          </p>

          <p className={styles.dateAndTime}>
            <span className={styles.time}>21:40</span> •{" "}
            <span className={styles.date}>11/01/2022</span>
          </p>
        </div>
      </div>
      <div className={styles.changes}>
        <button>{"</>"}</button>
        <button>{"..."}</button>
      </div>
    </div>
  );
}
