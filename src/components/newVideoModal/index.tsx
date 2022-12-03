import Modal from "react-modal";
import { useVideoContext } from "../../contexts/useContext";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { parseCookies } from "nookies";
import { toast, ToastContainer } from "react-toastify";
import { IoClose } from "react-icons/io5";

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

interface VideoTypes {
  name: string;
  url: string;
}

export function NewVideo() {
  const { modalNewVideoOpen, closeModalNewVideo } = useVideoContext();
  const { register, handleSubmit, reset } = useForm<VideoTypes>();
  const { "mayoPLayer.token": token } = parseCookies();
  const base64TokenPayload = token.split(".")[1];
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
