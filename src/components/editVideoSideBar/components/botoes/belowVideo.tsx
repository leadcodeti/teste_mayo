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
import { ModalTimerStartBelow } from "./timers/timerStartBelow";
import { ModalTimerEndBelow } from "./timers/timerEndBelow";

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
    setStartTimerSeconds,
    setEndTimerSeconds,
    bellowButtonsValues,
    setBellowButtonsValues,
    backgroundColorBelowButton,
    setBackgroundColorBelowButton,
    textColorBelowButton,
    setTextColorBelowButton,
    backgroundHoverBelowButton,
    setBackgroundHoverBelowButton,
    startTimerBelow,
    endTimerBelow,
    startTimerSecondsBelow,
    endTimerSecondsBelow,
    textBelowButton,
    setTextBelowButton,
    sizeBelowButton,
    setSizeBelowButton,
    setPropsButtonBelow,
    setStartTimerBelow,
    setEndTimerBelow,
  } = usePlayeContext();

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);
  const [buttonsBelowsProperty, setButtonsBelowsProperty] = useState(
    {} as ButtonBelowProps
  );

  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);

  const [currentText, setCurrentText] = useState(buttonsBelowsProperty?.text);
  const [currentLink, setCurrentLink] = useState(buttonsBelowsProperty?.link);
  const [currentSize, setCurrentSize] = useState(buttonsBelowsProperty?.size);
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefEnd = useRef<HTMLButtonElement>(null);
  const [newSize, setnewSize] = useState<string | undefined>("");

  const [getFormatedStart, setGetFormatedStart] = useState("");
  const [getFormatedEnd, setGetFormatedEnd] = useState("");
  const [xpto, setXpto] = useState({ start: 0, end: 0 });

  useEffect(() => {
    async function getData() {
      const res = await api
        .get(`/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`)
        .then((res) => {
          const buttonBelowFiltered = res.data.find(
            (e: any) => e.type === "below"
          );
          if (buttonBelowFiltered) {
            setXpto({
              start: buttonsBelowsProperty?.start,
              end: buttonsBelowsProperty?.end,
            });
          }
        });
    }

    var minutesStart = Math.floor(buttonsBelowsProperty.start / 60);
    var remainingSecondsStart = buttonsBelowsProperty.start % 60;

    const formatedTimerStart =
      minutesStart +
      " : " +
      (remainingSecondsStart < 10 ? "0" : "") +
      remainingSecondsStart;

    var minutesEnd = Math.floor(buttonsBelowsProperty.end / 60);
    var remainingSecondsEnd = buttonsBelowsProperty.end % 60;

    const formatedTimerEnd =
      minutesEnd +
      " : " +
      (remainingSecondsEnd < 10 ? "0" : "") +
      remainingSecondsEnd;

    setGetFormatedStart(formatedTimerStart);
    setGetFormatedEnd(formatedTimerEnd);
    setStartTimerBelow(0);
    setEndTimerBelow(0);

    getData();
  }, [
    buttonOption,
    videosId.currentVideoId,
    buttonsBelowsProperty.start,
    buttonsBelowsProperty.end,
    setStartTimerBelow,
    setEndTimerBelow,
  ]);

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

      api.put(
        `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`,
        {
          background_color: currentBackgroundColor,
          text_color: currentTextColor,
          background_hover: currentBackgroundHover,
          text: currentText,
          link: currentLink,
          size: currentSize,
          start: startTimerBelow * 60 + startTimerSecondsBelow,
          end: endTimerBelow * 60 + endTimerSecondsBelow,
        }
      );
    } else if (!currentBackgroundColor) {
      const newDesignData = {
        background_color: newBackgroundColor,
      };
      api.put(
        `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`,
        {
          background_color: newBackgroundColor,
          text_color: newTextColor,
          text: currentText,
          link: currentLink,
          size: currentSize,
          background_hover: newBackgroundHover,
          start: startTimerBelow * 60 + startTimerSecondsBelow,
          end: endTimerBelow * 60 + endTimerSecondsBelow,
        }
      );

      setPropsButtonBelow(currentSize);
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
    setnewSize(buttonsBelowsProperty?.size);

    if (currentSize) {
      setSizeBelowButton(currentSize);
    } else {
      setSizeBelowButton(newSize);
    }
  }, [currentSize, buttonsBelowsProperty?.size, newSize, setSizeBelowButton]);

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
            <div>
              <label htmlFor="tamanho">Tamanho</label>
              <select
                id="tamanho"
                onChange={(e) => setCurrentSize(e.target.value)}
                defaultValue={buttonsBelowsProperty?.size}
              >
                <option
                  selected={buttonsBelowsProperty?.size == "125"}
                  value={"125"}
                >
                  Pequeno
                </option>
                <option
                  selected={buttonsBelowsProperty?.size == "150"}
                  value={"150"}
                >
                  Médio
                </option>
                <option
                  selected={buttonsBelowsProperty?.size == "250"}
                  value={"250"}
                >
                  Grande
                </option>
              </select>
            </div>
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
              value={
                startTimerBelow
                  ? `${startTimerBelow} : ${startTimerSecondsBelow}`
                  : getFormatedStart
              }
              placeholder="00:00"
              title="00:00"
              type="text"
              id="start"
              onClick={() => setIsOpen(!isOpen)}
            />
            <ModalTimerStartBelow
              buttonRef={buttonRef}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          <div>
            <label htmlFor="end">Término</label>
            <input
              type="text"
              id="end"
              value={
                endTimerBelow
                  ? `${endTimerBelow} : ${endTimerSecondsBelow}`
                  : getFormatedEnd
              }
              placeholder="00:00"
              title="00:00"
              onClick={() => setIsOpenEnd(!isOpenEnd)}
            />
            <ModalTimerEndBelow
              buttonRefEnd={buttonRefEnd}
              isOpenEnd={isOpenEnd}
              setIsOpenEnd={setIsOpenEnd}
            />
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
            <label>Background</label>
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
                sizeBelowButton === "125"
                  ? "125"
                  : sizeBelowButton === "150"
                  ? "150"
                  : sizeBelowButton === "250"
                  ? "200"
                  : ""
              }
              sizeFont={
                sizeBelowButton === "125"
                  ? "100%"
                  : sizeBelowButton === "150"
                  ? "150%"
                  : sizeBelowButton === "250"
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
