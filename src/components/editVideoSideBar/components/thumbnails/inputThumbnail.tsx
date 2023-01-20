/* eslint-disable @next/next/no-img-element */
import { useEffect, useCallback,MouseEvent, useState, useRef, FormEvent, ChangeEvent, RefObject } from "react";
import { FaFileUpload } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useVideoContext } from "../../../../contexts/useContext";
import { deleteThumbnail, ThumbsTypes } from "../../../../pages/api/post_put_functions";
import styles from "./styles.module.scss";


type ThumbnailsTypes = {
  inputTitle: string;
  inputName: string;
  imageError: string;
  inputImage: string | null,
  handleClick:(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) => void;
  handleChange:(e: ChangeEvent<HTMLInputElement>) => void;
  imageRef: RefObject<HTMLInputElement> | null;
}

export function InputThumbnail({ inputTitle,inputName,inputImage,handleChange,handleClick,imageRef,imageError }: ThumbnailsTypes) {
 
  const queryClient = useQueryClient();
  const { videosId } = useVideoContext();
  const { user } = useVideoContext();

  const { mutate: deleteThumbnailMutation } = useMutation(({ updata }: ThumbsTypes) => deleteThumbnail({updata}),{
    onSuccess:() => {
      queryClient.invalidateQueries('thumbnails');
    },
  });
  
  
  function deleteThumbnailImage() {
   if(user){
        deleteThumbnailMutation({
      updata: {
        currentVideoId: videosId.currentVideoId,
        type: inputName
      }
    })

    toast.success("Imagem removida")
   }

  }

  return (
    <div className={styles.thumbnailContainer}>
      <p>{inputTitle}</p>

      { inputImage && !imageError ? (
        <>
          <div className={styles.previewImageContainer}>
            <img src={inputImage} alt="teste" />
            <label className={styles.imageLabel} htmlFor={inputName} 
            onClick={(e) =>handleClick(e)} 
            >
              Trocar
            </label>
            <input 
            ref={imageRef} 
            id={inputName} 
            type="file" 
            onChange={(e) =>handleChange(e)}
           />

           <strong onClick={deleteThumbnailImage} title="Excluir" className={styles.deleteImage}>
             <span><TiDelete /></span>
           </strong>
           <p className={styles.errorMessage}>{imageError}</p>
            <hr />
          </div>
        </>
      ) : (
        <>
          <label 
            className={styles.thumbnailsBox} 
            htmlFor={inputName}
            onClick={(e) =>handleClick(e)}
          >
            <FaFileUpload />
            Upload de imagem
          </label>
          <input 
            ref={imageRef} 
            id={inputName} 
            type="file" 
            onChange={(e) =>handleChange(e)}
          />
          <p className={styles.errorMessage}>{imageError}</p>
          <hr />
        </>
      )}
    </div>
  );
}