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
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
  });

  const {
    currentVideo,
    belowButtonProps,
    setBelowButtonProps,
    isVisibleBelow,
    user,
    isVisibleButtonBelow,
    setIsVisibleButtonBelow,
    videosId
  } = useVideoContext();

  useEffect(() => {
    if(user){
      api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
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
  }, [currentVideo.currentVideoId, user, videosId]);



  useEffect(() => {
    api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
      const data = res.data;
      const belowFiltered = data.filter((e: any) => e.type === "below");
      const belowResult = belowFiltered[0];

      // setBelowButtonProps({
      //   background_color: belowResult.background_color,
      //   background_hover: belowResult.background_hover,
      //   size: belowResult.size,
      //   text: belowResult.text,
      //   text_color: belowResult.text_color,
      //   link: belowResult.link,
      //   is_visible: belowResult.is_visible,
      // });
    });
  }, [currentVideo.currentVideoId, setBelowButtonProps, videosId]);

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
          {isVisibleButtonBelow ? (
            <ButtonBelowVideo
              href={"#"}
              target="_blank"
              background={belowButtonProps.background_color}
              background_hover={belowButtonProps.background_hover}
              text_color={belowButtonProps.text_color}
              sizeWidth={
                belowButtonProps.size === "125"
                  ? "180px"
                  : belowButtonProps.size === "150"
                  ? "250px"
                  : belowButtonProps.size === "250"
                  ? "350px"
                  : ""
              }
              sizeFont={
                belowButtonProps.size === "125"
                  ? "100%"
                  : belowButtonProps.size === "150"
                  ? "150%"
                  : belowButtonProps.size === "250"
                  ? "200%"
                  : ""
              }
            >
              {belowButtonProps.text == ""
                ? "Saiba mais"
                : belowButtonProps.text}
            </ButtonBelowVideo>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
