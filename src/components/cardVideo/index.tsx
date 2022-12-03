import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { OptionsMenu } from "./optionsMenu";
import { useClickOutside } from "@react-hooks-library/core";
import { useVideoContext } from "../../contexts/useContext";

export function CardVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [videoPlayerId, setVideoPlayerId] = useState("");
  const { allVideo } = useVideoContext();

  console.log(allVideo);

  const ref = useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  function openOptions(videoId: string, currentVideoPlayerId: string) {
    setIsOpen(true);
    setActiveVideoId(videoId);
    setVideoPlayerId(currentVideoPlayerId);
  }

  function closeOptions() {
    setIsOpen(false);
  }

  return (
    <div className={styles.cardVideo} ref={ref}>
      <div className={styles.video}>
        {allVideo.map((video) => (
          <div key={video.id} className={styles.videoContent}>
            <div className={styles.videoInfos}>
              <Image
                src={video.cover_image}
                height={60}
                width={100}
                alt="Thumb do video"
              />

              <div>
                <div className={styles.nameContent}>
                  <p title={video.name}>
                    {video.name.slice(0,12) + "..."}{" "}
                  </p>

                  <span className={styles.views}>
                    <BsEye />
                    {video.view_count}
                  </span>
                </div>

                <p className={styles.dateAndTime}>
                  <span className={styles.time}>{video.duration}</span> •{" "}
                  <span className={styles.date}>{video.date}</span>
                </p>
              </div>
            </div>

            <div className={styles.changes}>
              <button>{"</>"}</button>
              {isOpen ? (
                <button onClick={closeOptions}>{"..."}</button>
              ) : (
                <button
                  onClick={() => openOptions(video.id, video.youtube_video_id)}
                >
                  {"..."}
                </button>
              )}

              {activeVideoId === video.id ? (
                <OptionsMenu 
                 currentVideoPlayerId={videoPlayerId}
                 videoId={activeVideoId} 
                 isOpen={isOpen}
                
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}