import styles from "./styles.module.scss";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import { BelowVideo } from "./belowVideo";
import { InsideVideo } from "./insideVideo";
import { useVideoContext } from "../../../../contexts/useContext";
import { customStyles } from "../../../../utils/modalConfig";
import { CustomButton } from "./custom";

Modal.setAppElement("body");

export function Botoes() {
  const {
    buttonOption,
    buttonInsideVideo,
    buttoBelowVideo,
    buttonCustom,
    openModalNewButton,
    closeModalNewButton,
    modalNewButtonOpen,
    isVisibleBelow,
    isVisibleButtonBelow,
    isVisibleButtonInside,
    isVisibleInside,
    isVisibleButtonCustom,
    isVisibleCustom,
  } = useVideoContext();

  return (
    <>
      <Modal
        isOpen={modalNewButtonOpen}
        onRequestClose={closeModalNewButton}
        style={customStyles}
        contentLabel="Example Modal"
        className={styles.modal}
      >
        <GrFormClose
          onClick={closeModalNewButton}
          className={styles.closeModal}
        />

        <div className={styles.typeButton}>
          <p>Selecione o tipo de botão que você quer</p>
          <div>
            <button
              className={buttonOption == "below" ? styles.activeButton : ""}
              onClick={buttoBelowVideo}
            >
              Abaixo do vídeo
            </button>
            <button
              className={buttonOption == "inside" ? styles.activeButton : ""}
              onClick={buttonInsideVideo}
            >
              Dentro do vídeo
            </button>

            <button
              className={buttonOption == "custom" ? styles.activeButton : ""}
              onClick={buttonCustom}
            >
              Botão personalizado
            </button>
          </div>
        </div>
        {(() => {
          switch (buttonOption) {
            case "below":
              return <BelowVideo />;
            case "inside":
              return <InsideVideo />;
            case "custom":
              return <CustomButton />;
            default:
              return <BelowVideo />;
          }
        })()}
      </Modal>

      <div className={styles.buttons}>
        <button onClick={openModalNewButton}>Adicionar novo botão</button>

        <div>
          {isVisibleButtonBelow ? (
            <label style={{ fontSize: "14px" }}>
              Ocultar botão abaixo do vídeo &nbsp;
            </label>
          ) : (
            <label style={{ fontSize: "14px" }}>
              Mostrar botão abaixo do vídeo &nbsp;
            </label>
          )}
          <label className={styles.checkContainer}>
            <input
              checked={isVisibleButtonBelow}
              type="checkbox"
              onClick={isVisibleBelow}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <div>
          {isVisibleButtonInside ? (
            <label style={{ fontSize: "14px", marginTop: 10 }}>
              Ocultar botão dentro do vídeo &nbsp;
            </label>
          ) : (
            <label style={{ fontSize: "14px", marginTop: 10 }}>
              Mostrar botão dentro do vídeo &nbsp;
            </label>
          )}
          <label className={styles.checkContainer}>
            <input
              checked={isVisibleButtonInside}
              type="checkbox"
              onClick={isVisibleInside}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <div>
          {isVisibleButtonCustom ? (
            <label style={{ fontSize: "14px", marginTop: 10 }}>
              Ocultar botão Personalizado &nbsp;
            </label>
          ) : (
            <label style={{ fontSize: "14px", marginTop: 10 }}>
              Mostrar botão Personalizado &nbsp;
            </label>
          )}
          <label className={styles.checkContainer}>
            <input
              checked={isVisibleButtonCustom}
              type="checkbox"
              onClick={isVisibleCustom}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
      </div>
    </>
  );
}
