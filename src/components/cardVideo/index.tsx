import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { fakedataVideo } from "./fakeDataVideo";
import fakeImage from "../../../public/images/thumbVideo.jpg";
import { OptionsMenu } from "./optionsMenu";
import { useClickOutside } from "@react-hooks-library/core";
import { api } from "../../services/api";

export function CardVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [videos, setVideos] = useState([]);

  console.log(activeOption);

  const ref = useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  function openOptions(index: number) {
    setIsOpen(true);
    setActiveOption(index);
  }

  function closeOptions() {
    setIsOpen(false);
  }

  useEffect(() => {
    api("/videos").then((res) => setVideos(res.data));
  }, []);
  // console.log(videos);
  return (
    <div className={styles.cardVideo} ref={ref}>
      <div className={styles.video}>
        {fakedataVideo.map((video, index) => (
          <div key={video.id} className={styles.videoContent}>
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
                    <BsEye />
                    {video.views}
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
              ) : (
                <button onClick={() => openOptions(video.id)}>{"..."}</button>
              )}

              {activeOption === index ? (
                <OptionsMenu videoId={activeOption} isOpen={isOpen} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
