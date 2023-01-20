import styles from "./styles.module.scss";
import { ButtonBelowVideo } from "./buttons";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { useQuery } from "react-query";
import { getPropsButtonBelow } from "../../../../pages/api/get_functions";

interface ButtonUpdateProps {
  text: string;
  size?: string;
  background_color: string;
  background_hover: string;
  position?: string;
  video_id: string;
  start?: number;
  end?: number;
  text_color?: string;
  link?: string;
}

interface ButtonBelowProps {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
  start: number;
  end: number;
}

export function BelowVideo() {
  const { register, handleSubmit, watch } = useForm<ButtonUpdateProps>();
  const { buttonOption, currentVideo, closeModalNewButton, videosId } =
    useVideoContext();

  const {
    totalDuration,
    startTimerSeconds,
    setStartTimerSeconds,
    endTimerSeconds,
    setEndTimerSeconds,
    bellowButtonsValues,
    setBellowButtonsValues,
    backgroundColorBelowButton,
    setBackgroundColorBelowButton,
    textColorBelowButton,
    setTextColorBelowButton,
    backgroundHoverBelowButton,
    setBackgroundHoverBelowButton,

    textBelowButton,
    setTextBelowButton,
  } = usePlayeContext();

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);

  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);

  const [startTimer, setStartTimer] = useState(0);
  const [endTimer, setEndTimer] = useState(0);
  const [showOrHideStart, setshowOrHideStart] = useState(false);
  const [showOrHideEnd, setshowOrHideEnd] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState("");
  const [currentTextColor, setCurrentTextColor] = useState("");
  const [currentBackgroundHover, setCurrentBackgroundHover] = useState("");
  const [newBackgroundColor, setnewBackgroundColor] = useState<
    string | undefined
  >("");
  const [newText, setNewText] = useState<string | undefined>("");
  const [newTextColor, setnewTextColor] = useState<string | undefined>("");
  const [newBackgroundHover, setnewBackgroundHover] = useState<
    string | undefined
  >("");
  const backgroundColorRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const backgroundHover = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let start: any = [];
    let end: any = [];

    for (let i = 0; i < formatedTotalDurationInMinutes; i++) {
      start.push(i);
      end.push(i);
    }

    let totalSeconds = 60;
    let seconds: any = [];

    for (let i = 0; i < totalSeconds; i++) {
      seconds.push(i);
    }

    setListStart(start);
    setListEnd(end);

    setStartSeconds(seconds);
  }, [formatedTotalDurationInMinutes]);

  async function updateButton() {
    if (currentBackgroundColor) {
      const newDesignData = {
        background_color: currentBackgroundColor,
      };

      api
        .put(
          `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`,
          {
            background_color: currentBackgroundColor,
            text_color: currentTextColor,
            background_hover: currentBackgroundHover,
            text: currentText,
            link: currentLink,
            size: currentSize,
            start: startTimer * 60 + startTimerSeconds,
            end: endTimer * 60 + endTimerSeconds,
          }
        )
        .then((res) => console.log("funciou o put", res.data));
    } else if (!currentBackgroundColor) {
      const newDesignData = {
        background_color: newBackgroundColor,
      };
      api
        .put(
          `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`,
          {
            background_color: newBackgroundColor,
            text_color: newTextColor,
            text: currentText,
            link: currentLink,
            size: currentSize,
            background_hover: newBackgroundHover,
            start: startTimer * 60 + startTimerSeconds,
            end: endTimer * 60 + endTimerSeconds,
          }
        )
        .then((res) => console.log("funciou o put", res.data));
    }
    closeModalNewButton();
    toast.success("Botão salvo");
  }

  function backgroundHandleClick() {
    backgroundColorRef.current?.click();
  }

  function colorHandleClick() {
    colorRef.current?.click();
  }

  function backgroundHoverHandleClick() {
    backgroundHover.current?.click();
  }

  const [buttonsBelowsProperty, setButtonsBelowsProperty] = useState(
    {} as ButtonBelowProps
  );

  const { data, isLoading } = useQuery(
    ["belowProps", videosId.currentVideoId, buttonOption],
    () => getPropsButtonBelow(videosId.currentVideoId, buttonOption)
  );

  useEffect(() => {
    const buttonsProperty = data?.find((e: any) => e.type === "below");

    setButtonsBelowsProperty({
      background_color: buttonsProperty?.background_color,
      background_hover: buttonsProperty?.background_hover,
      size: buttonsProperty?.size,
      text: buttonsProperty?.text,
      text_color: buttonsProperty?.text_color,
      link: buttonsProperty?.link,
      is_visible: buttonsProperty?.is_visible,
      start: buttonsProperty?.start,
      end: buttonsProperty?.end,
    });
  }, [
    buttonOption,
    data,
    buttonsBelowsProperty.is_visible,
    videosId,
    setBellowButtonsValues,
  ]);

  useEffect(() => {
    setNewText(buttonsBelowsProperty?.text);

    if (currentText) {
      setTextBelowButton(currentText);
    } else {
      setTextBelowButton(newText);
    }
  }, [
    currentText,
    setNewText,
    buttonsBelowsProperty?.text,
    newText,
    setTextBelowButton,
  ]);

  useEffect(() => {
    setnewBackgroundColor(buttonsBelowsProperty?.background_color);

    if (currentBackgroundColor) {
      setBackgroundColorBelowButton(currentBackgroundColor);
    } else {
      setBackgroundColorBelowButton(newBackgroundColor);
    }
  }, [
    currentBackgroundColor,
    buttonsBelowsProperty?.background_color,
    newBackgroundColor,
    setBackgroundColorBelowButton,
  ]);

  useEffect(() => {
    setnewTextColor(buttonsBelowsProperty?.text_color);

    if (currentTextColor) {
      setTextColorBelowButton(currentTextColor);
    } else {
      setTextColorBelowButton(newTextColor);
    }
  }, [
    currentTextColor,
    buttonsBelowsProperty?.text_color,
    newTextColor,
    setTextColorBelowButton,
  ]);

  useEffect(() => {
    setnewBackgroundHover(buttonsBelowsProperty?.text_color);

    if (currentBackgroundHover) {
      setBackgroundHoverBelowButton(currentBackgroundHover);
    } else {
      setBackgroundHoverBelowButton(newBackgroundHover);
    }
  }, [
    currentBackgroundHover,
    buttonsBelowsProperty?.text_color,
    newBackgroundHover,
    setBackgroundHoverBelowButton,
  ]);

  return (
    <>
      <form onSubmit={handleSubmit(updateButton)}>
        <div className={styles.propsButton}>
          <div>
            <label htmlFor="text">Texto</label>
            <input
              defaultValue={buttonsBelowsProperty?.text}
              type="text"
              id="text"
              ref={textRef}
              onChange={(e) => setCurrentText(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tamanho">Tamanho</label>
            <select id="tamanho" value={watch("size")} {...register("size")}>
              <option value={"125"}>Pequeno</option>
              <option value={"150"}>Médio</option>
              <option value={"250"}>Grande</option>
            </select>
          </div>
        </div>
        <div className={styles.linkButton}>
          <label htmlFor="link">Link</label>
          <input
            defaultValue={buttonsBelowsProperty?.link}
            onChange={(e) => setCurrentLink(e.target.value)}
            type="text"
            id="link"
          />
        </div>
        <div className={styles.divisor} />
        <div className={styles.timerButton}>
          <div>
            <label htmlFor="start">Início</label>
            <input
              value={`${startTimer} : ${startTimerSeconds}`}
              placeholder="00:00"
              title={`${startTimer} : ${startTimerSeconds}`}
              type="text"
              id="start"
              onClick={() => setshowOrHideStart(!showOrHideStart)}
            />
            <div className={styles.timerStart}>
              <div
                style={{
                  display: showOrHideStart == false ? "none" : "flex",
                }}
              >
                <ul>
                  {listStart.map((e) => (
                    <li onClick={() => setStartTimer(e + 1)} key={e}>
                      {e + 1}
                    </li>
                  ))}
                </ul>
                <ul>
                  {startSeconds.map((e) => (
                    <li onClick={() => setStartTimerSeconds(e + 1)} key={e}>
                      {e + 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="end">Término</label>
            <input
              type="text"
              id="end"
              value={`${endTimer} : ${endTimerSeconds}`}
              placeholder="00:00"
              title={`${endTimer} : ${endTimerSeconds}`}
              onClick={() => setshowOrHideEnd(!showOrHideEnd)}
            />
            <div className={styles.timerStart}>
              <div
                style={{
                  display: showOrHideEnd == false ? "none" : "flex",
                }}
              >
                <ul>
                  {listEnd.map((e) => (
                    <li onClick={() => setEndTimer(e + 1)} key={e}>
                      {e + 1}
                    </li>
                  ))}
                </ul>
                <ul>
                  {startSeconds.map((e) => (
                    <li onClick={() => setEndTimerSeconds(e + 1)} key={e}>
                      {e + 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.colorsButton}>
          <div className={styles.design}>
            <label>Cor do texto</label>
            <label
              className={styles.inputColor}
              style={{
                background: `${textColorBelowButton}`,
              }}
              onClick={colorHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={colorRef}
                value={textColorBelowButton}
                onChange={(e) => setCurrentTextColor(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.design}>
            <label>Background hover</label>
            <label
              className={styles.inputColor}
              style={{
                background: `${backgroundColorBelowButton}`,
              }}
              onClick={backgroundHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={backgroundColorRef}
                value={backgroundColorBelowButton}
                onChange={(e) => setCurrentBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.design}>
            <label>Background hover</label>
            <label
              className={styles.inputColor}
              style={{
                background: `${backgroundHoverBelowButton}`,
              }}
              onClick={backgroundHoverHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={backgroundHover}
                value={backgroundHoverBelowButton}
                onChange={(e) => setCurrentBackgroundHover(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.previewButton}>
          <p>Pré-visualização</p>
          <div>
            <ButtonBelowVideo
              href={"#"}
              target="_blank"
              background_color={backgroundColorBelowButton}
              background_hover={backgroundHoverBelowButton}
              text_color={textColorBelowButton}
              sizeWidth={
                watch("size") === "125"
                  ? "180px"
                  : watch("size") === "150"
                  ? "250px"
                  : watch("size") === "250"
                  ? "350px"
                  : ""
              }
              sizeFont={
                watch("size") === "125"
                  ? "100%"
                  : watch("size") === "150"
                  ? "150%"
                  : watch("size") === "250"
                  ? "200%"
                  : ""
              }
            >
              {textBelowButton}
            </ButtonBelowVideo>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
}
