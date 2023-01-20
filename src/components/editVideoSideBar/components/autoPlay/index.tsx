import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useVideoContext } from "../../../../contexts/useContext";
import { FormEvent,useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { InputColors } from "../../../inputsColors/inputsColors";
import { useDebounce } from "usehooks-ts";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { getAutoPlayProps } from "../../../../pages/api/get_functions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { putAutoplayProps } from "../../../../pages/api/post_put_functions";

export function AutoPlay() {
  const { autoPlayerColors, setAutoPlayerColors } = useSideBarContext();
  const { videosId } = useVideoContext();

  const [currentAutoPlayBackgroundColor, setCurrentAutoPlayBackgroundColor] = useState("");
  const [autoPlayBackgroundColor, setAutoPlayBackgroundColor] = useState<string | undefined>("");

  const [currentAutoPlayTextColor, setCurrentAutoPlayTextColor] = useState("");
  const [autoPlayTextColor, setAutoPlayTextColor] = useState<string | undefined>("");

  const [autoplayBackgoundColor, setAutoplayBackgoundColor] = useState<string | undefined>("");
  const [autoplayTextColor, setAutoplayTextColor] = useState<string | undefined>("");

  const [upText, setUpText] = useState<string | undefined>("");
  const [downText, setDownText] = useState<string | undefined>("");
  const upTextValue = useDebounce<string | undefined>(upText, 400);
  const downTextValue = useDebounce<string | undefined>(downText, 400);

  const queryClient = useQueryClient();

  const { data: autoplay } = useQuery(
    ["autoplays", videosId.currentVideoId],
    () => getAutoPlayProps(videosId.currentVideoId)
  );

  const { mutateAsync: autoplayMutation } = useMutation(putAutoplayProps, {
    onSuccess: () => {
      queryClient.invalidateQueries("autoplays"); //atualizar a minha requisição
    },
  });

  async function submitAutoPlay(e: FormEvent) {
    e.preventDefault();

    ///////////// BACKGROUND AUTOPLAY //////////////////

    if (currentAutoPlayBackgroundColor) {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          background_color: currentAutoPlayBackgroundColor,
        },
      });
    } else {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          background_color: autoPlayBackgroundColor,
        },
      });
    }

    ///////////// TEXT COLOR AUTOPLAY //////////////////

    if (currentAutoPlayTextColor) {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          text_color: currentAutoPlayTextColor,
        },
      });
    } else {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          text_color: autoPlayTextColor,
        },
      });
    }

    /////////////  AUTOPLAY TOP TEXT //////////////////

    if (upText) {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          top_text: upText,
        },
      });
    } else {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          top_text: autoPlayerColors.topText,
        },
      });
    }

    /////////////  AUTOPLAY BOTTON TEXT //////////////////

    if (downText) {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          bottom_tex: downText,
        },
      });
    } else {
      await autoplayMutation({
        currentVideoId: videosId.currentVideoId,
        autoplayPros: {
          bottom_tex: autoPlayerColors.bottonText,
        },
      });
    }

    toast.success("Proriedades salvas");
  }

  const textColorRef = useRef<HTMLInputElement>(null);
  const backgroundColorRef = useRef<HTMLInputElement>(null);

  function backgroundAutoplayHandleClick() {
    backgroundColorRef.current?.click();
  }

  function backgroundTextHandleClick() {
    textColorRef.current?.click();
  }

  useEffect(() => {
    setAutoPlayerColors({
      autoplayBackgoundColor: autoplayBackgoundColor,
      bottonText: downTextValue,
      topText: upTextValue,
      autoplayTextColor: autoplayTextColor,
    });

    ///////////// BACKGROUND AUTOPLAY //////////////////
    setAutoPlayBackgroundColor(autoplay?.background_color);
    if (currentAutoPlayBackgroundColor) {
      setAutoplayBackgoundColor(currentAutoPlayBackgroundColor);
    } else {
      setAutoplayBackgoundColor(autoPlayBackgroundColor);
    }

    ///////////// COLOR TEST //////////////////
    setAutoPlayTextColor(autoplay?.text_color);
    if (currentAutoPlayTextColor) {
      setAutoplayTextColor(currentAutoPlayTextColor);
    } else {
      setAutoplayTextColor(autoPlayTextColor);
    }

    ///// Top text ////////

    if (upText) {
      setUpText(upText);
    } else {
      setUpText(autoplay?.top_text);
    }

    ///// Top text ////////

    if (downText) {
      setDownText(downText);
    } else {
      setDownText(autoplay?.bottom_text);
    }
  }, [
    autoplay,
    autoplayBackgoundColor,
    autoplayTextColor,
    currentAutoPlayBackgroundColor,
    currentAutoPlayTextColor,
    downText,
    downTextValue,
    autoPlayBackgroundColor,
    autoPlayTextColor,
    setAutoPlayerColors,
    upText,
    upTextValue,
  ]);

  return (
    <form onSubmit={submitAutoPlay} className={styles.autoPLay}>
      <p className={styles.whatsAutoPlay}>
        <AiOutlineExclamationCircle /> O que é AutoPlay
      </p>
      <InputColors
        inputTextName="Cor de fundo"
        backgroundColor={autoPlayerColors.autoplayBackgoundColor}
        backgroundHandleClick={backgroundAutoplayHandleClick}
        backgroundStates={setCurrentAutoPlayBackgroundColor}
        inputRef={backgroundColorRef}
      />

      <InputColors
        inputTextName="Cor dos textos"
        backgroundColor={autoPlayerColors.autoplayTextColor}
        backgroundHandleClick={backgroundTextHandleClick}
        backgroundStates={setCurrentAutoPlayTextColor}
        inputRef={textColorRef}
      />

      <hr />
      <div className={styles.textStyles}>
        <p>Texto Superior</p>
        <input
          type="text"
          defaultValue={autoPlayerColors.topText}
          onChange={(e) => setUpText(e.target.value)}
        />
        <hr />

        <p>Texto Inferior</p>
        <input
          type="text"
          defaultValue={autoPlayerColors.bottonText}
          onChange={(e) => setDownText(e.target.value)}
        />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}
