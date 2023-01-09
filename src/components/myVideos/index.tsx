import { useDebounce } from "usehooks-ts";
import { BsCameraVideo } from "react-icons/bs";
import { BiSearch, BiSad } from "react-icons/bi";
import { CardVideo } from "../cardVideo";
import { ChangeEvent, useEffect, useState } from "react";
import { useVideoContext } from "../../contexts/useContext";
import { VideoTypes } from "../../types/types";
import { api } from "../../services/api";
import { format } from "date-fns";
import moment from "moment";
import { ptBR } from "date-fns/locale";
import styles from "./styles.module.scss";
import { useSideBarContext } from "../../contexts/thirdContext";
import { LoadingScrean } from "../loading/loading";

export function MyVideos() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const { allVideo } = useSideBarContext();
  const [searchedVideo, setSearchedVideo] = useState<VideoTypes[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    async function getSingleVideo() {
      const response = await api.get(`/videos?q=${debouncedValue}`);
      const data = response.data.items.map((res: VideoTypes) => {
        return {
          id: res.id,
          name: res.name,
          view_count: res.view_count,
          youtube_video_id: res.youtube_video_id,
          cover_image: res.cover_image,
          date: format(new Date(res.date), "dd/MM/yyyy", {
            locale: ptBR,
          }),
          duration: moment.duration(`${res.duration}`).asMilliseconds(),
        };
      });
       setSearchedVideo(data)
    }
    getSingleVideo()
  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <div className={styles.searchVideo}>
        <h1>
          <BsCameraVideo size={24} />
          Meus vídeos
        </h1>

        <div className={styles.searchArea}>
          <BiSearch size={25} />
          <input
            type="text"
            value={value}
            placeholder="Buscar video"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.divisor}></div>
      { debouncedValue ? (
        <>
         {searchedVideo.length > 0 ? (
           <CardVideo Video={searchedVideo} isSearching={debouncedValue} />
         ):(
          <>
           <div className={styles.notFoundVideoContainer}>
            <div className={styles.errorMessage}>
              <p><span>{debouncedValue}</span> não encontrado</p>
              <BiSad size={45}/>
            </div>
           </div>
          </>
         )}
        </>
      ):(
         <CardVideo Video={allVideo} isSearching={debouncedValue} />
      )}
    </div>
  );
}
