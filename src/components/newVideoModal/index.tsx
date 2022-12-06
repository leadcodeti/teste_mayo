import Modal from "react-modal";
import { useVideoContext } from "../../contexts/useContext";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { parseCookies } from "nookies";
import { toast, ToastContainer } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { customStyles } from "../../utils/modalConfig";

Modal.setAppElement("body");

interface VideoTypes {
  name: string;
  url: string;
}

export function NewVideo() {
  const { modalNewVideoOpen, closeModalNewVideo } = useVideoContext();
  const { register, handleSubmit, reset } = useForm<VideoTypes>();
  const { "mayoPLayer.token": token } = parseCookies();
  const base64TokenPayload =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAxMTU2NzQsImV4cCI6MTY3MDIwMjA3NCwic3ViIjoiYTc5N2U5YmEtNmU4My00ZTVlLTg0ZmMtNzM2MzMxN2IxMTRmIn0.qmF5mdP1b3PqBL4ycq2YHFjEqyFBv92B2isQB2coXwE".split(
      "."
    )[1];
  const payload = Buffer.from(String(base64TokenPayload), "base64").toString();
  const id = JSON.parse(payload).sub;

  async function onSubmit({ url, name }: VideoTypes) {
    try {
      const response = await api
        .post(`/videos`, {
          user_id: id,
          url,
          name,
        })
        .then((res) => {
          console.log(res.data);
        });
      toast.success("Novo video adicionado!");
      closeModalNewVideo();
      reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ToastContainer />
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
