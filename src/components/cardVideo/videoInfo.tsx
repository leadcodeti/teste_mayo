import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { VideoTypes } from "../../types/types";
import styles from "./styles.module.scss";
import { intervalToDuration } from "date-fns";
import { useVideoContext } from "../../contexts/useContext";
import { Video } from "@vime/react";

interface videoInfoTypes {
  video: VideoTypes;
}

export function VideoInfo({ video }: videoInfoTypes) {
  const duration = intervalToDuration({ start: 0, end: video.duration * 1 });
  const formated_time = `${duration.minutes} : ${duration.seconds}`;

  if (duration.minutes && duration.seconds) {
    const teste = duration.minutes * 60 + duration.seconds;
    // setVideoTime(teste);
    console.log("xpto", teste);
  }

  // console.log("tempo de video", videoTime);

  return (
    <>
      <div className={styles.videoInfos}>
        <Image
          src={`https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`}
          height={60}
          width={100}
          alt="Thumb do video"
        />
        <div>
          <div className={styles.nameContent}>
            <p title={video.name}>{video.name.slice(0, 12) + "..."} </p>

            <span className={styles.views}>
              <BsEye />
              {video.view_count}
            </span>
          </div>

          <p className={styles.dateAndTime}>
            <span className={styles.time}>{formated_time}</span> •{" "}
            <span className={styles.date}>{video.date}</span>
          </p>
        </div>
      </div>
    </>
  );
}
