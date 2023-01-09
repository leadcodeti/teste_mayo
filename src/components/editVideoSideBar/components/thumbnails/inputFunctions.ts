import { useEffect, useCallback,MouseEvent, useState, useRef, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useVideoContext } from "../../../../contexts/useContext";
import { api } from "../../../../services/api";


export function InputsFunctions() {
  
  const { videosId } = useVideoContext();
  const [startImage, setStartImage] = useState<File | null>();
  const [pauseImage, setPauseImage] = useState<File | null>();
  const [finalImage, setfinalImage] = useState<File | null>();

  const [imageStartError, setImageStartError] = useState("");
  const [imagePauseError, setImagePauseError] = useState("");
  const [imageFinalError, setimageFinalError] = useState("");
  
  const [previewStartImage, setPreviewStartImage] = useState<string | null>(null);
  const [previewPauseImage, setPreviewPauseImage] = useState<string | null>(null);
  const [previewFinalImage, setPreviewFinalImage] = useState<string | null>(null);


  const imageStartRef = useRef<HTMLInputElement>(null);
  const imagePauseRef = useRef<HTMLInputElement>(null);
  const imageFinalRef = useRef<HTMLInputElement>(null);
  
  function handleClickOnStart(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imageStartRef.current?.click()
  }

    
  function handleClickOnPause(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imagePauseRef.current?.click()
  }
    
  function handleClickOnFinal(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imageFinalRef.current?.click()
  }

  async function teste() {
    const formData = new FormData();
    let thumbnailType;

    if (startImage) {
      formData.append("thumbnail", startImage);
      thumbnailType = "start_image";
    }

    const headers = { "Content-Type": "multipart/form-data" };

    const res1 =  await api.put(
       `/thumbnails/${videosId.currentVideoId}?type=${thumbnailType}`,
       formData,
       {
         headers: headers,
       }
     );

  }

  async function onChangeStartImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files
    const formData = new FormData();
    let thumbnailType;

    if(file){
      if(file[0].type !== "image/png"){
        setImageStartError('⚠ Arquivo inválido! Apenas imagem no formato png.')
        return;
      }

      if(file[0].size > 200000 ){
        setImageStartError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 2MB.')
        return;
      }
      
      formData.append("thumbnail", file[0]);
      thumbnailType = "start_image";
      const headers = { "Content-Type": "multipart/form-data" };
       await api.put(
        `/thumbnails/${videosId.currentVideoId}?type=${thumbnailType}`,
         formData,
        {
          headers: headers,
        }
     );

      toast.success("Imagem atualizada!")
      setStartImage(file[0]);
      setImageStartError("");
    } else {
      setStartImage(null);
    }
  }

  async function onChangePauseImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files

    if(file){
      if(file[0].type !== "image/png"){
        setImagePauseError('⚠ Arquivo inválido! Apenas imagem no formato png.')
        return;
      }

      if(file[0].size > 200000 ){
        setImagePauseError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 2MB.')
        return;
      }

      formData.append("thumbnail", file[0]);
      const headers = { "Content-Type": "multipart/form-data" };
       await api.put(
        `/thumbnails/${videosId.currentVideoId}?type=pause_image`,
         formData,
        {
          headers: headers,
        }
     );

      toast.success("Imagem atualizada!")
      setPauseImage(file[0]);
      setImagePauseError("");
    } else {
      setPauseImage(null);
    }
  }

  async function onChangeFinalImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files

    if(file){
      if(file[0].type !== "image/png"){
       setimageFinalError('⚠ Arquivo inválido! Apenas imagem no formato png.')
        return;
      }

      if(file[0].size > 200000 ){
       setimageFinalError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 2MB.')
        return;
      }

      formData.append("thumbnail", file[0]);
      const headers = { "Content-Type": "multipart/form-data" };
       await api.put(
        `/thumbnails/${videosId.currentVideoId}?type=final_image`,
         formData,
        {
          headers: headers,
        }
     );

      toast.success("Imagem atualizada!")
      setfinalImage(file[0]);
     setimageFinalError("");
    } else {
      setfinalImage(null);
    }
  }

  useEffect(() =>{
    if(startImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewStartImage(reader.result as string);
      }
      reader.readAsDataURL(startImage);
    } else {
      setPreviewStartImage(null);
    }

    if(pauseImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPauseImage(reader.result as string);
      }
      reader.readAsDataURL(pauseImage);
    } else {
      setPreviewPauseImage(null);
    }

    if(finalImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFinalImage(reader.result as string);
      }
      reader.readAsDataURL(finalImage);
    } else {
      setPreviewFinalImage(null);
    }

  },[finalImage, pauseImage, startImage])

  
  return {
  
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
    }
}
