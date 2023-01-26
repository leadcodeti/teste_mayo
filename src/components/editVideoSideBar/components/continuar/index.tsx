import styles from "./styles.module.scss";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { useDebounce } from "usehooks-ts";
import { InputColors } from "../../../inputsColors/inputsColors";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getContinueProps } from "../../../../pages/api/get_functions";
import { putContinueProps } from "../../../../pages/api/post_put_functions";
import { toast } from "react-toastify";

export function WatchAgain() {
  const { continueColors, setContinueColors } = useSideBarContext();
  const { videosId } = useVideoContext();

  const [currentContinueBackgroundColor, setCurrentContinueBackgroundColor] =
    useState("");
  const [continueBackgroundColor, setContinueBackgroundColor] = useState<
    string | undefined
  >("");

  const [currentContinueTextColor, setCurrentContinueTextColor] = useState("");
  const [continueTextColor, setContinueTextColor] = useState<
    string | undefined
  >("");

  const [newContinueBackgoundColor, setNewContinueBackgoundColor] = useState<
    string | undefined
  >("");
  const [newcontinuwTextColor, setNewContinuwTextColor] = useState<
    string | undefined
  >("");

  const [message, setMessage] = useState<string | undefined>("");
  const [downText, setDownText] = useState<string | undefined>("");
  const [topText, setTopText] = useState<string | undefined>("");

  const messageValue = useDebounce<string | undefined>(message, 400);
  const topTextValue = useDebounce<string | undefined>(topText, 400);
  const downTextValue = useDebounce<string | undefined>(downText, 400);

  const queryClient = useQueryClient();

  const { mutateAsync: continueMutation } = useMutation(putContinueProps, {
    onSuccess: () => {
      queryClient.invalidateQueries("resume_video_options"); //atualizar a minha requisição
    },
  });

  const { data: continuedata } = useQuery(
    ["resume_video_options", videosId.currentVideoId],
    () => getContinueProps(videosId.currentVideoId)
  );

  const textColorRef = useRef<HTMLInputElement>(null);
  const backgroundColorRef = useRef<HTMLInputElement>(null);

  function backgroundContinueHandleClick() {
    backgroundColorRef.current?.click();
  }

  function backgroundTextHandleClick() {
    textColorRef.current?.click();
  }

  useEffect(() => {
    setContinueColors({
      continueBackgoundColor: newContinueBackgoundColor,
      continueTextColor: newcontinuwTextColor,
      bottonText: downTextValue,
      topText: topTextValue,
      message: messageValue,
    });

    /////////// BACKGROUND AUTOPLAY //////////////////
    setContinueBackgroundColor(continuedata?.background_color);
    if (currentContinueBackgroundColor) {
      setNewContinueBackgoundColor(currentContinueBackgroundColor);
    } else {
      setNewContinueBackgoundColor(continueBackgroundColor);
    }

    ///////////// COLOR TEST //////////////////
    setContinueTextColor(continuedata?.text_color);
    if (currentContinueTextColor) {
      setNewContinuwTextColor(currentContinueTextColor);
    } else {
      setNewContinuwTextColor(continueTextColor);
    }

    ///// Message text ////////

    if (message) {
      setMessage(message);
    } else {
      setMessage(continuedata?.message);
    }

    ///// Top text ////////

    if (downText) {
      setDownText(downText);
    } else {
      setDownText(continuedata?.restart_button_text);
    }

    if (topText) {
      setTopText(topText);
    } else {
      setTopText(continuedata?.continue_button_text);
    }
  }, [
    continueBackgroundColor,
    continueTextColor,
    continuedata,
    currentContinueBackgroundColor,
    currentContinueTextColor,
    downText,
    downTextValue,
    message,
    messageValue,
    newContinueBackgoundColor,
    newcontinuwTextColor,
    setContinueColors,
    topText,
    topTextValue,
  ]);

  async function submitContinue(e: FormEvent) {
    e.preventDefault();

    ///////////// BACKGROUND CONTINUE //////////////////

    if (currentContinueBackgroundColor) {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          background_color: currentContinueBackgroundColor,
        },
      });
    } else {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          background_color: newContinueBackgoundColor,
        },
      });
    }

    ///////////// TEXT COLOR CONTINUE //////////////////

    if (currentContinueTextColor) {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,

        continuePros: {
          text_color: currentContinueTextColor,
        },
      });
    } else {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          text_color: newcontinuwTextColor,
        },
      });
    }

    ///////////// MESSAGE TEXT //////////////////

    if (message) {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          message: message,
        },
      });
    } else {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          message: continueColors.message,
        },
      });
    }

    ///////////// BOTTON TEXT //////////////////

    if (downText) {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          restart_button_text: downText,
        },
      });
    } else {

      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          restart_button_text: continueColors.bottonText,
        },
      });
      
    }

    /////////////  TOP TEXT //////////////////

    if (topText) {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          continue_button_text: topText,
        },
      });
    } else {
      await continueMutation({
        currentVideoId: videosId.currentVideoId,
        continuePros: {
          continue_button_text: continueColors.topText,
        },
      });
    }

    toast.success("Proriedades salvas");
  }

  return (
    <form onSubmit={submitContinue} className={styles.watchAgain}>
      <div className={styles.textStyles}>
        <p>Mensagem</p>
        <input
          defaultValue={continueColors.message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <hr />

        <p>Botão continuar</p>
        <input
          defaultValue={continueColors.topText}
          type="text"
          onChange={(e) => setTopText(e.target.value)}
        />
        <hr />

        <p>Botão Recomeçar</p>
        <input
          defaultValue={continueColors.bottonText}
          type="text"
          onChange={(e) => setDownText(e.target.value)}
        />
        <hr />
      </div>

      <InputColors
        inputTextName="Cor de fundo"
        backgroundColor={continueColors.continueBackgoundColor}
        backgroundHandleClick={backgroundContinueHandleClick}
        backgroundStates={setCurrentContinueBackgroundColor}
        inputRef={backgroundColorRef}
      />

      <InputColors
        inputTextName="Cor do texto"
        backgroundColor={continueColors.continueTextColor}
        backgroundHandleClick={backgroundTextHandleClick}
        backgroundStates={setCurrentContinueTextColor}
        inputRef={textColorRef}
      />

      <div className={styles.saveOrCancel}>
        <span>Cancelar</span>
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
