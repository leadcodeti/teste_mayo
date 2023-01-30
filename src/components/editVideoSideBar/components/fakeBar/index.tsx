import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useVideoContext } from "../../../../contexts/useContext";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useCallback, useEffect, useState } from "react";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { toast } from "react-toastify";

export function FakeBar() {
  const {
    setHeightFakeBar,
    currentVideo,
    fakeBarData,
    setFakeBarData,
    fakebarProps,
    videosId,
    user,
    setfakebarProps,
    getHeight,
    setGetHeight,
  } = useVideoContext();

  const { register, handleSubmit, watch } = useForm();
  const [currentGetHeight, setCurrentGetHeight] = useState(0);

  async function submitFakeBar() {
    setHeightFakeBar(getHeight);

    await api.put(`/fakebars/${videosId.currentVideoId}`, {
      height: getHeight,
    });
    toast.success("FakeBar salva!");
  }

  useEffect(() => {
    async function getProps() {
      if (videosId.currentVideoId) {
        await api(`/fakebars/${videosId.currentVideoId}`).then((res) => {
          const data = res.data;

          setfakebarProps({ height: data.height });
        });
      }
    }

    getProps();
  }, [
    currentVideo.currentVideoId,
    setFakeBarData,
    setGetHeight,
    getHeight,
    setfakebarProps,
    videosId.currentVideoId,
  ]);

  const getContinuosProps = useCallback(async () => {
    if (videosId.currentVideoId) {
      const res = await api(`/fakebars/${videosId.currentVideoId}`);

      console.log("resposta", res.data);
      setfakebarProps(res.data.height);
    }
  }, [setfakebarProps, videosId.currentVideoId]);

  useEffect(() => {
    if (videosId.currentVideoId) {
      getContinuosProps();
    }
  }, [getContinuosProps, videosId.currentVideoId, setfakebarProps]);

  useEffect(() => {
    if (currentGetHeight) {
      setGetHeight(currentGetHeight);
    } else {
      setGetHeight(fakebarProps.height);
    }
  }, [currentGetHeight, fakebarProps.height, setGetHeight]);

  // console.log("getHeight", getHeight);
  console.log("fakebarProps.height", fakebarProps);

  return (
    <form onSubmit={handleSubmit(submitFakeBar)} className={styles.fakeBar}>
      <p className={styles.whatsFakeBar}>
        <AiOutlineExclamationCircle /> O que é fakeBar
      </p>
      <div className={styles.fakeBarRange}>
        <label htmlFor="">Altura</label>
        <input
          type="range"
          onChange={(e) => setCurrentGetHeight(Number(e.target.value))}
          max={15}
          value={getHeight}
        />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}
