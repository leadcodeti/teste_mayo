import { BsCameraVideo } from "react-icons/bs";
import { CardVideo } from "../cardVideo";
import { useState } from "react";
import styles from "./styles.module.scss";
import MyAccount from "../myAccount";

export function MyVideos() {
  const [userOption, setUserOption] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.searchVideo}>
        <h1>
          <BsCameraVideo size={24} />
          Meus vídeos
        </h1>
        <input type="text" placeholder="Buscar vídeo" />
      </div>

      <div className={styles.divisor}></div>
      <CardVideo />
    </div>
  );
}
