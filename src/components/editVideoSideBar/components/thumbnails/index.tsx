import styles from "./styles.module.scss";
import { AiOutlineFileImage, AiOutlineExclamationCircle } from "react-icons/ai";

export function Thumbnails() {
  return (
    <>
      {" "}
      <div className={styles.thumbnails}>
        <p className={styles.whatsThumbnails}>
          <AiOutlineExclamationCircle /> O que são Thumbnails
        </p>
        <div className={styles.startThumbnail}>
          <p>Thumbnail de início</p>
          <label className={styles.thumbnailsBox} htmlFor="startThumbnail">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input id="startThumbnail" type="file" />
          <hr />
        </div>
        <div className={styles.pauseThumbnail}>
          <p>Thumbnail de Pause</p>
          <label className={styles.thumbnailsBox} htmlFor="pauseThumbnail">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input id="pauseThumbnail" type="file" />
          <hr />
        </div>
        <div className={styles.finalThumbnail}>
          <p>Thumbnail de Final</p>
          <label className={styles.thumbnailsBox} htmlFor="finalThumbnail">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input id="finalThumbnail" type="file" />
        </div>
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div>
      </div>
    </>
  );
}
