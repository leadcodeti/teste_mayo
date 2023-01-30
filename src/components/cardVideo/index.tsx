import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { OptionsMenu } from "./optionsMenu";
import { useClickOutside } from "@react-hooks-library/core";
import { useVideoContext } from "../../contexts/useContext";
import { VideoInfo } from "./videoInfo";
import { Pagination } from "../Pagination";
import { VideoTypes } from "../../types/types";
import { useSideBarContext } from "../../contexts/thirdContext";
import { LoadingScrean } from "../loading/loading";
import { usePlayeContext } from "../../contexts/usePlayerContext";

interface CardVideoProps {
  Video: VideoTypes[] | undefined;
  isSearching: string;
}

export function CardVideo({ Video, isSearching }: CardVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [videoPlayerId, setVideoPlayerId] = useState("");
  const { onGenerate } = usePlayeContext();
  const { isLoading , page, setPage, totalUserVideos} = useSideBarContext();

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
    <section>
      {isLoading && (
        <div className={styles.loadingContaine}>
          <LoadingScrean color="#ff003c" fontSize={1} size="lg" />
          <p>Carregando os videos...</p>
        </div>
      )}
      
      <div className={styles.cardVideo} ref={ref}>
        <div className={styles.video}>
          {Video?.map((video) => (
            <div key={video.id} className={styles.videoContent}>
              <VideoInfo video={video} />

              <div className={styles.changes}>
                <button onClick={onGenerate}>{"</>"}</button>
                {isOpen ? (
                  <button onClick={closeOptions}>{"..."}</button>
                ) : (
                  <button
                    onClick={() =>
                      openOptions(video.id, video.youtube_video_id)
                    }
                  >
                    {"..."}
                  </button>
                )}

                {activeVideoId === video.id ? (
                  <OptionsMenu
                    currentVideoPlayerId={videoPlayerId}
                    videoId={activeVideoId}
                    isOpen={isOpen}
                    closeOptions={closeOptions}
                    videoName={video.name}
                    selectedVideo={video}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isSearching ? (
        ""
      ) : (
        <Pagination
          currentPage={page}
          totalCountOfRegisters={totalUserVideos}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
