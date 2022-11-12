import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import styles from "./styles.module.scss";
import { fakedataVideo } from "./fakeDataVideo";
import { OptionsMenu } from "./optionsMenu";

export function CardVideo() {
  const [isOpen, setIsOpen] = useState(false);
  

  function openOptions() {
    setIsOpen(true);
  }

  function closeOptions() {
    setIsOpen(false);
  }


  return (
    <div className={styles.cardVideo} >
      <div className={styles.video}>
        {fakedataVideo.map((video) => (
          <div key={video.id} className={styles.videoContent} >
            <div className={styles.videoInfos}>
              <Image
                src={video.image}
                height={60}
                width={100}
                alt="Thumb do video"
              />

              <div>
              <div className={styles.nameContent}>
                {video.name}{" "}
                <span className={styles.views}>
                  <BsEye />{video.views}
                </span>
              </div>

              <p className={styles.dateAndTime}>
                <span className={styles.time}>{video.time}</span> •{" "}
                <span className={styles.date}>{video.data}</span>
              </p>
              </div>
            </div>

            <div className={styles.changes}>
              <button>{"</>"}</button>
              {isOpen ? (
                <button onClick={closeOptions}>{"..."}</button>
              ):(
                <button onClick={openOptions}>{"..."}</button>
              )}

              <OptionsMenu  isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
