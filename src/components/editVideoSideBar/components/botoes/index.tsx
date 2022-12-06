import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { RiTimer2Line } from "react-icons/ri";
import { BelowVideo } from "./belowVideo";
import { InsideVideo } from "./insideVideo";
import { useVideoContext } from "../../../../contexts/useContext";
import { customStyles } from "../../../../utils/modalConfig";

Modal.setAppElement("body");

export function Botoes() {
  const {
    buttonOption,
    buttonInsideVideo,
    buttoBelowVideo,
    openModalNewButton,
    closeModalNewButton,
    modalNewButtonOpen,
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
          </div>
        </div>
        {(() => {
          switch (buttonOption) {
            case "below":
              return <BelowVideo />;
            case "inside":
              return <InsideVideo />;
            default:
              return <BelowVideo />;
          }
        })()}
      </Modal>
      <div className={styles.buttons}>
        <button onClick={openModalNewButton}>Adicionar novo botão</button>
      </div>
    </>
  );
}
