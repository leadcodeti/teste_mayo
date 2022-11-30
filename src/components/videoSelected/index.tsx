import dynamic from "next/dynamic";

import styles from "./styles.module.scss";
import { BsCodeSlash } from "react-icons/bs";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { EmbedModal } from "../embedModalVideo/embedModal";

const PlayerVideo = dynamic(() => import("./player"), {
  ssr: false,
});

export function VideoSelected() {
  const { onGenerate } = usePlayeContext();

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
      </div>
    </div>
  );
}
