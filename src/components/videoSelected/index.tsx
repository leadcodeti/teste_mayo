import dynamic from "next/dynamic";

import styles from "./styles.module.scss";
import { BsCodeSlash } from "react-icons/bs";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { EmbedModal } from "../embedModalVideo/embedModal";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ButtonBelowVideo } from "../editVideoSideBar/components/botoes/buttons";

const PlayerVideo = dynamic(() => import("./player"), {
  ssr: false,
});

export function VideoSelected() {
  const { onGenerate } = usePlayeContext();
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    bacgrkound_hover: "",
    size: "",
    text: "",
    text_color: "",
  });

  useEffect(() => {
    api("/cta_buttons/e9546851-7281-4d1a-9a45-87ef48e2b45c").then((res) => {
      const data = res.data[0];
      console.log(res.data[0]);
      setButtonProps({
        background_color: data.background_color,
        bacgrkound_hover: data.background_hover,
        size: data.size,
        text: data.text,
        text_color: data.text_color,
      });
    });
  }, []);
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
        {/* <div className={styles.buttonVideo}>
          <a
            href="#"
            style={{
              background: buttonProps.background_color,
              width: buttonProps.size,
              color: buttonProps.text_color,
            }}
          >
            {buttonProps.text}
          </a>
        </div> */}
        <ButtonBelowVideo
          href={"#"}
          target="_blank"
          background={buttonProps.background_color}
          background_hover={buttonProps.bacgrkound_hover}
          text_color={buttonProps.text_color}
          sizeWidth={
            buttonProps.size === "100"
              ? "100%"
              : buttonProps.size === "125"
              ? "125%"
              : buttonProps.size === "150"
              ? "150%"
              : ""
          }
          sizeHeight={
            buttonProps.size === "100"
              ? "40px"
              : buttonProps.size === "125"
              ? "50px"
              : buttonProps.size === "150"
              ? "55px"
              : ""
          }
          sizeFont={
            buttonProps.size === "100"
              ? "100%"
              : buttonProps.size === "125"
              ? "125%"
              : buttonProps.size === "150"
              ? "150%"
              : ""
          }
        >
          {buttonProps.text}
        </ButtonBelowVideo>
      </div>
    </div>
  );
}
