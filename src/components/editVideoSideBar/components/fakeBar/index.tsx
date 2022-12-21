import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useVideoContext } from "../../../../contexts/useContext";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";

interface FakeBarProps {
  height: string;
}

export function FakeBar() {
  const { setHeightFakeBar, currentVideo, fakeBarData, setFakeBarData } =
    useVideoContext();
  const { register, handleSubmit, watch } = useForm();

  async function submitFakeBar() {
    setHeightFakeBar(watch("range"));

    await api.put(`/fakebars/${currentVideo.currentVideoId}`, {
      height: watch("range"),
      finish: false,
    });

    await api(`/fakebars/${currentVideo.currentVideoId}`).then((res) => {
      const data = res.data;
      setFakeBarData({ height: data.height, finish: data.finish });
    });
  }
  return (
    <form onSubmit={handleSubmit(submitFakeBar)} className={styles.fakeBar}>
      <p className={styles.whatsFakeBar}>
        <AiOutlineExclamationCircle /> O que é fakeBar
      </p>
      <div className={styles.fakeBarRange}>
        <label htmlFor="">Altura</label>
        <input
          type="range"
          {...register("range")}
          max={15}
          defaultValue={fakeBarData.height}
        />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}
