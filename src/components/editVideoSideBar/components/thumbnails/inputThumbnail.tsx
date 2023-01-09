/* eslint-disable @next/next/no-img-element */
import { useEffect, useCallback,MouseEvent, useState, useRef, FormEvent, ChangeEvent, RefObject } from "react";
import { FaFileUpload } from "react-icons/fa";
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