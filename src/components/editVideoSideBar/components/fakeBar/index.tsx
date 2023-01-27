import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useVideoContext } from "../../../../contexts/useContext";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useCallback, useEffect, useState } from "react";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";

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

  async function submitFakeBar() {
    // setHeightFakeBar(getHeight);

    // await api
    //   .put(`/fakebars/${videosId.currentVideoId}`, {
    //     height: getHeight,
    //   })
    //   .then((res) => console.log("enviado o put do fakebar", res.data));
  }

  // useEffect(() => {
  //   async function getProps() {
  //     await api(`/fakebars/${videosId.currentVideoId}`).then((res) => {
  //       const data = res.data;

  //       setfakebarProps(data.height);
  //       // console.log("esse é o res", getHeight);
  //     });
  //   }

  //   getProps();
  // }, [setFakeBarData, setGetHeight, getHeight, setfakebarProps, videosId.currentVideoId]);

  // const getContinuosProps = useCallback(async () => {
  //   if (user) {
  //     await api(`/fakebars/${videosId.currentVideoId}`).then((res) => {
  //       const data = res.data;
  //       setfakebarProps(data.height);
  //     });
  //   }
  // }, [setfakebarProps, user, videosId.currentVideoId]);

  // useEffect(() => {
  //   getContinuosProps();
  // }, [getContinuosProps, videosId.currentVideoId, setfakebarProps]);

  return (
    <form onSubmit={handleSubmit(submitFakeBar)} className={styles.fakeBar}>
      <p className={styles.whatsFakeBar}>
        <AiOutlineExclamationCircle /> O que é fakeBar
      </p>
      <div className={styles.fakeBarRange}>
        <label htmlFor="">Altura</label>
        <input
          type="range"
          onChange={(e) => setGetHeight(Number(e.target.value))}
          max={15}
          defaultValue={getHeight ? getHeight : fakebarProps.height}
        />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}
