import Modal from "react-modal";
import { useVideoContext } from "../../contexts/useContext";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

import { customStyles } from "../../utils/modalConfig";

Modal.setAppElement("body");

interface VideoTypes {
  name: string;
  url: string;
}

export function NewVideo() {
  const { modalNewVideoOpen, closeModalNewVideo, getAllVideos } =
    useVideoContext();
  const { register, handleSubmit, reset } = useForm<VideoTypes>();
  const [userId, setUserId] = useState("");

  api("/me").then((res) => {
    setUserId(res.data.id);
  });

  async function onSubmit({ url, name }: VideoTypes) {
    try {
      const response = await api
        .post(`/videos`, {
          user_id: userId,
          url,
          name,
        })
        .then((res) => {
          console.log(res.data);
        });
      toast.success("Novo video adicionado!");
      closeModalNewVideo();

      getAllVideos();

      reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Modal
        isOpen={modalNewVideoOpen}
        onRequestClose={closeModalNewVideo}
        style={customStyles}
        contentLabel="Example Modal"
        className={styles.modal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <IoClose className={styles.closeModal} onClick={closeModalNewVideo} />
          <label htmlFor="name">Nome do video:</label>
          <input id="name" {...register("name")} type="text" />
          <label style={{ marginTop: "1rem" }} htmlFor="url">
            URL do video:
          </label>
          <input id="url" {...register("url")} type="text" />
          <button type="submit">Salvar video</button>
        </form>
      </Modal>
    </>
  );
}
