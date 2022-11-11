import styles from "./styles.module.scss";

export function WatchAgain() {
  return (
    <div className={styles.watchAgain}>
      <div className={styles.textStyles}>
        <p>Mensagem</p>
        <textarea></textarea>
        <hr />

        <p>Botão continuar</p>
        <input type="text" />

        <hr />

        <p>Botão Recomeçar</p>
        <input type="text" />
        <hr />
      </div>

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
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </div>
  );
}
