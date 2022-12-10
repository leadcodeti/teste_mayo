import dynamic from "next/dynamic";

import styles from "./styles.module.scss";
import { BsCodeSlash } from "react-icons/bs";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { EmbedModal } from "../embedModalVideo/embedModal";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ButtonBelowVideo } from "../editVideoSideBar/components/botoes/buttons";
import { useVideoContext } from "../../contexts/useContext";

const PlayerVideo = dynamic(() => import("./player"), {
  ssr: false,
});

export function VideoSelected() {
  const { onGenerate } = usePlayeContext();
  const { currentVideo, user } = useVideoContext();
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
  });

  useEffect(() => {
    if(user){
      api(`/cta_buttons/${currentVideo.currentVideoId}`).then((res) => {
        const data = res.data[0];
        console.log("data aqui" + res.data);
        setButtonProps({
          background_color: data.background_color,
          background_hover: data.background_hover,
          size: data.size,
          text: data.text,
          text_color: data.text_color,
          link: data.link,
        });
      });
    }
  }, [currentVideo.currentVideoId, user]);

  return (
    <div className={styles.container}>
      <EmbedModal />
      <div className={styles.detailsVideo}>
        <input type="text" placeholder="Video teste" />
        <button onClick={onGenerate}>
          <BsCodeSlash size={18} /> Código de incorporação
        </button>
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.embedVideo}>
        <PlayerVideo />

        <div className={styles.buttonVideo}>
          <ButtonBelowVideo
            href={"#"}
            target="_blank"
            background={buttonProps.background_color}
            background_hover={buttonProps.background_hover}
            text_color={buttonProps.text_color}
            sizeWidth={
              buttonProps.size === "125"
                ? "180px"
                : buttonProps.size === "150"
                ? "250px"
                : buttonProps.size === "250"
                ? "350px"
                : ""
            }
            sizeFont={
              buttonProps.size === "125"
                ? "100%"
                : buttonProps.size === "150"
                ? "150%"
                : buttonProps.size === "250"
                ? "200%"
                : ""
            }
          >
            {buttonProps.text == "" ? "Saiba mais" : buttonProps.text}
          </ButtonBelowVideo>
        </div>
      </div>
    </div>
  );
}
