import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./styles.module.scss";

export function AutoPlay() {
  return (
    <div className={styles.autoPLay}>
      <p className={styles.whatsAutoPlay}>
        <AiOutlineExclamationCircle /> O que é AutoPlay
      </p>
      <span>
        <label htmlFor="corDoTexto">Cor do Texto</label>{" "}
        <input
          className={styles.colors}
          type="color"
          id="corDoTexto"
          value="#ffffff"
        />
      </span>
      <br />
      <span>
        <label htmlFor="corDobackground">Cor do background</label>{" "}
        <input
          className={styles.colors}
          type="color"
          id="corDobackground"
          // value="#ff003c"
        />
      </span>

      <hr />
      <div className={styles.textStyles}>
        <p>Texto Superior</p>
        <textarea></textarea>
        <hr />

        <p>Texto Inferior</p>
        <textarea></textarea>
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </div>
  );
}
