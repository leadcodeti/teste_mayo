import styles from "./styles.module.scss";

export function Design() {
  return (
    <>
      <div className={styles.design}>
        <span>
          <label htmlFor="corPrincipal">Cor principal</label>{" "}
          <input
            className={styles.colors}
            type="color"
            id="corPrincipal"
            value="#ffffff"
          />
        </span>
        <br />
        <span>
          <label htmlFor="corBackground">Cor background</label>{" "}
          <input
            className={styles.colors}
            type="color"
            id="corBackground"
            // value="#ff003c"
          />
        </span>
      </div>
      <div className={styles.controls}>
        <p>Controles</p>
        <span>
          <label htmlFor="botaoPlayGrande">Botão play grande</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Botão play pequeno</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Barra de progresso</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Tempo de vídeo</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Voltar 10s</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Avançar 10s</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Volume</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Fullscreen</label>
          <input id="botaoPlayGrande" type="checkbox" />
        </span>
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div>
      </div>
    </>
  );
}
