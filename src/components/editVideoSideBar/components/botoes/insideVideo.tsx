import styles from "./styles.module.scss";

export function InsideVideo() {
  return (
    <>
      <div className={styles.positionButton}>
        <p>Posição</p>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className={styles.propsButton}>
        <div>
          <label htmlFor="text">Texto</label>
          <input type="text" id="text" />
        </div>
        <div>
          <label htmlFor="tamanho">Tamanho</label>
          <select id="tamanho">
            <option value="small">Pequeno</option>
            <option value="medium">Médio</option>
            <option value="big">Grande</option>
          </select>
        </div>
      </div>
      <div className={styles.linkButton}>
        <label htmlFor="link">Link</label>
        <input type="text" id="link" />
      </div>
      <div className={styles.divisor} />
      <div className={styles.timerButton}>
        <div>
          <label htmlFor="start">Início</label>
          <input type="text" id="start" />
        </div>
        <div>
          <label htmlFor="end">Término</label>
          <input type="text" id="end" />
        </div>
      </div>
      <div className={styles.divisor} />
      <div className={styles.colorsButton}>
        <div>
          <label htmlFor="color">Cor do texto</label>
          <input type="color" id="color" />
        </div>
        <div>
          <label htmlFor="background">Background</label>
          <input type="color" id="background" />
        </div>
        <div>
          <label htmlFor="hover">Background hover</label>
          <input type="color" id="hover" />
        </div>
      </div>
      <div className={styles.divisor} />
      <div className={styles.previewButton}>
        <p>Pré-visualização</p>
        <div>
          <button>Botão preview</button>
        </div>
        <div className={styles.divisor} />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button type="submit">Salvar</button>
      </div>
    </>
  );
}
