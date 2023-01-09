import styles from "./styles.module.scss";
import {AiOutlineExclamationCircle } from "react-icons/ai";

import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { ThumbnailsProps } from "../../../../types/types";
import { useEffect, useCallback,FormEvent } from "react";
import { InputThumbnail } from "./inputThumbnail";
import { InputsFunctions } from "./inputFunctions";

export function Thumbnails() {

  const { videosId, thumbnailsProps, setThumbnailsProps, user } = useVideoContext();
  const {

    previewStartImage,
    previewPauseImage,
    previewFinalImage,

    handleClickOnFinal,
    handleClickOnStart,
    handleClickOnPause,

    onChangeStartImage,
    onChangePauseImage,
    onChangeFinalImage,

    imageStartRef,
    imagePauseRef,
    imageFinalRef,
    
    imageStartError,
    imagePauseError,
    imageFinalError,
   }= InputsFunctions()
 
  useEffect(() => {
    thumbnailsProps;
    setThumbnailsProps;
  }, [thumbnailsProps, setThumbnailsProps]);

  const getContinuosProps = useCallback(async () => {
    if (user) {
      await api(`/thumbnails/${videosId.currentVideoId}`).then((res) => {
        console.log("teste thumbnails sem props", res.data[0]?.url);
        const startImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "start_image"
        );
        const pauseImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "pause_image"
        );
        const finalImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "final_image"
        );
        setThumbnailsProps({
          start_image: startImageFiltered[0]?.url,
          pause_image: pauseImageFiltered[0]?.url,
          final_image: finalImageFiltered[0]?.url,
        });
      });
    }
  }, [setThumbnailsProps, user, videosId.currentVideoId]);

  useEffect(() => {
    getContinuosProps();
  }, [getContinuosProps, setThumbnailsProps, videosId.currentVideoId]);
 
  return (
    <>
      <form
        className={styles.thumbnails}
      >
        <p className={styles.whatsThumbnails}>
          <AiOutlineExclamationCircle /> O que são Thumbnails
        </p>
         <InputThumbnail 
          inputImage={previewStartImage} 
          inputTitle="Thumbnail de início" 
          inputName="start_image" 
          handleChange={onChangeStartImage}
          handleClick={handleClickOnStart}
          imageRef={imageStartRef}
          imageError={imageStartError}
        />

        <InputThumbnail 
          inputImage={previewPauseImage} 
          inputTitle="Thumbnail de pause" 
          inputName="pause_image" 
          handleChange={onChangePauseImage}
          handleClick={handleClickOnPause}
          imageRef={imagePauseRef}
          imageError={imagePauseError}
        />

        <InputThumbnail 
          inputImage={previewFinalImage} 
          inputTitle="Thumbnail no final" 
          inputName="final_image" 
          handleChange={onChangeFinalImage}
          handleClick={handleClickOnFinal}
          imageRef={imageFinalRef}
          imageError={imageFinalError}
        />

        {/* <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div> */}
      </form>
    </>
  );
}
