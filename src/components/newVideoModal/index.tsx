import Modal from "react-modal";
import { useVideoContext } from "../../contexts/useContext";
import styles from "./styles.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from 'next/router'

import { customStyles } from "../../utils/modalConfig";
import { useMutation, useQueryClient } from "react-query";
import { createVideo } from "../../pages/api/post_put_functions";
import { CreateVideoTypes } from "../../types/types";

Modal.setAppElement("body");


export function NewVideo() {
  const { modalNewVideoOpen, closeModalNewVideo  } = useVideoContext();
  const { register, handleSubmit, reset } = useForm<CreateVideoTypes>();

  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: videoMutation } = useMutation(({ name, url }:CreateVideoTypes) => createVideo({ name, url }),{
    onSuccess:() => {
      queryClient.invalidateQueries('videos');
    },
  });

  const onSubmit: SubmitHandler<CreateVideoTypes> = async (data) => {
     
    if(data){
      videoMutation({name:data.name, url:data.url});
      toast.success("Novo video adicionado!");
      router.push('../../dashboard')
      closeModalNewVideo()
      reset();
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
          <IoClose size={25} className={styles.closeModal} onClick={closeModalNewVideo} />
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
