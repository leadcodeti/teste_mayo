import Modal from "react-modal";
import { useVideoContext } from "../../../contexts/useContext";
import alertStyles from "./alertStyle.module.scss";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { customAlertStyles } from "../../../utils/modalConfig";
import { FiAlertCircle } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import { deleteVideo } from "../../../pages/api/post_put_functions";

Modal.setAppElement("body");

interface AlertProps {
   isOpenModal:boolean,
   closeModal:() => void,
   currentVideoId: string,
}

export function AlertDeleteMessage({closeModal,currentVideoId,isOpenModal}:AlertProps) {
  const { user} = useVideoContext();
  const queryClient = useQueryClient()

  const { mutate: deleteVideoMutation } = useMutation((currentVideoId:string) => deleteVideo(currentVideoId),{
    onSuccess:() => {
      queryClient.invalidateQueries('videos');
      closeModal()
    },
  });

  async function deleteCurrentVideo() {
    if (user) {
      deleteVideoMutation(currentVideoId)
      toast.success("Video Removido!");
    }
  }
  
  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customAlertStyles}
        contentLabel="Example Modal"
        className={alertStyles.modal}
      >
        <div className={alertStyles.alert}>
          <FiAlertCircle size={30} />
          <p>Tem certeza que quer deletar esse video?</p>

          <div className={alertStyles.deleteBtn}>
          <button onClick={deleteCurrentVideo}>Sim</button>
          <button onClick={closeModal}>
            Não
          </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
