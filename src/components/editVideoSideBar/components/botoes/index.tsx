import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { RiTimer2Line } from "react-icons/ri";
import { BelowVideo } from "./belowVideo";
import { InsideVideo } from "./insideVideo";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

export function Botoes() {
  const [buttonOption, setButtonOption] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function buttoBelowVideo() {
    setButtonOption("below");
  }

  function buttonInsideVideo() {
    setButtonOption("inside");
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styles.modal}
      >
        <GrFormClose onClick={closeModal} className={styles.closeModal} />

        <div className={styles.typeButton}>
          <p>Selecione o tipo de botão que você quer</p>
          <div>
            <button onClick={buttoBelowVideo}>Abaixo do vídeo</button>
            <button onClick={buttonInsideVideo}>Dentro do vídeo</button>
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
        <button onClick={openModal}>Adicionar novo botão</button>
      </div>
    </>
  );
}
