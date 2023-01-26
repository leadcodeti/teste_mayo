import styles from "./styles.module.scss";
import { ButtonInsideVideo } from "./buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { ModalTimerStartInside } from "./timers/timerStartInside";
import { ModalTimerEndInside } from "./timers/timerEndInside";

interface ButtonUpdateProps {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
  position?: string;
  start?: string;
  end?: string;
}

export function InsideVideo() {
  const { register, handleSubmit, watch } = useForm<ButtonUpdateProps>();
  const {
    buttonOption,
    currentVideo,
    closeModalNewButton,
    setButtonPosition,
    buttonPosition,
    setButtonProps,
    buttonProps,
    videosId,
    setInsideButtonProps,
  } = useVideoContext();
  const [buttonsInsideProperty, setButtonsInsideProperty] = useState(
    {} as ButtonUpdateProps
  );

  const {
    totalDuration,
    setResultInsideProps,
    resultInsideProps,
    setBackgroundColor,
    backgroundColorInsideButton,
    setBackgroundColorInsideButton,
    textColorInsideButton,
    setTextColorInsideButton,
    backgroundHoverInsideButton,
    textInsideButton,
    setTextInsideButton,
    setBackgroundHoverInsideButton,
    setSizeInsideButton,
    sizeInsideButton,
    startTimerInside,
    endTimerInside,
    startTimerSecondsInside,
    endTimerSecondsInside,
    setStartTimerInside,
    setEndTimerInside,
  } = usePlayeContext();

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);

  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);
  const [startTimerSeconds, setStartTimerSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(0);
  const [endTimer, setEndTimer] = useState(0);
  const [endTimerSeconds, setEndTimerSeconds] = useState(0);
  const [currentText, setCurrentText] = useState(buttonsInsideProperty?.text);
  const [currentLink, setCurrentLink] = useState(buttonsInsideProperty?.link);
  const [currentSize, setCurrentSize] = useState(buttonsInsideProperty?.size);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState("");
  const [currentTextColor, setCurrentTextColor] = useState("");
  const [currentBackgroundHover, setCurrentBackgroundHover] = useState("");
  const [newSize, setnewSize] = useState<string | undefined>("");
  const [newBackgroundColor, setnewBackgroundColor] = useState<
    string | undefined
  >("");
  const [newText, setNewText] = useState<string | undefined>("");
  const [newTextColor, setnewTextColor] = useState<string | undefined>("");
  const [newBackgroundHover, setnewBackgroundHover] = useState<
    string | undefined
  >("");
  const textRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const backgroundColorRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const backgroundHover = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefEnd = useRef<HTMLButtonElement>(null);
  const [getFormatedStart, setGetFormatedStart] = useState("");
  const [getFormatedEnd, setGetFormatedEnd] = useState("");

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
  useEffect(() => {
    currentVideo.currentVideoId;
  }, [currentVideo.currentVideoId]);

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
          start: startTimerInside * 60 + startTimerSecondsInside,
          end: endTimerInside * 60 + endTimerSecondsInside,
          position: buttonPosition,
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
          start: startTimerInside * 60 + startTimerSecondsInside,
          end: endTimerInside * 60 + endTimerSecondsInside,
          position: buttonPosition,
        }
      );

      setStartTimer(0);
      setEndTimer(0);
    }
    closeModalNewButton();
    toast.success("Botão salvo");
  }
  const [getTimers, setGetTimers] = useState({ start: 0, end: 0 });

  useEffect(() => {
    async function getData() {
      const res = await api
        .get(`/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`)
        .then((res) => {
          const buttonInsideFiltered = res.data.find(
            (e: any) => e.type === "inside"
          );
          if (buttonInsideFiltered) {
            setGetTimers({
              start: buttonInsideFiltered?.start,
              end: buttonInsideFiltered?.end,
            });
          }
          setResultInsideProps({
            start: buttonInsideFiltered?.start,
            end: buttonInsideFiltered?.end,
          });
        });
    }

    var minutesStart = Math.floor(Number(resultInsideProps?.start) / 60);
    var remainingSecondsStart = Number(resultInsideProps?.start) % 60;

    const formatedTimerStart =
      minutesStart +
      " : " +
      (remainingSecondsStart < 10 ? "0" : "") +
      remainingSecondsStart;

    var minutesEnd = Math.floor(Number(resultInsideProps?.end) / 60);
    var remainingSecondsEnd = Number(resultInsideProps?.end) % 60;

    const formatedTimerEnd =
      minutesEnd +
      " : " +
      (remainingSecondsEnd < 10 ? "0" : "") +
      remainingSecondsEnd;

    setGetFormatedStart(formatedTimerStart);
    setGetFormatedEnd(formatedTimerEnd);
    setEndTimerInside(0);
    setStartTimerInside(0);

    getData();
  }, [
    buttonsInsideProperty?.start,
    buttonsInsideProperty?.end,
    buttonOption,
    resultInsideProps?.end,
    resultInsideProps?.start,
    setEndTimerInside,
    setResultInsideProps,
    setStartTimerInside,
    videosId.currentVideoId,
  ]);

  useEffect(() => {
    async function getButtonsInsideProperty() {
      const response = await api.get(
        `/cta_buttons/${videosId.currentVideoId}?type=${"inside"}`
      );

      const buttonsProperty = response.data.find(
        (e: any) => e.type === "inside"
      );

      setButtonsInsideProperty({
        background_color: buttonsProperty.background_color,
        background_hover: buttonsProperty.background_hover,
        size: buttonsProperty.size,
        text: buttonsProperty.text,
        text_color: buttonsProperty.text_color,
        link: buttonsProperty.link,
        is_visible: buttonsProperty.is_visible,
        position: buttonsProperty.position,
        start: buttonsProperty?.start,
        end: buttonsProperty?.end,
      });

      setInsideButtonProps({
        is_visible: buttonsInsideProperty.is_visible,
      });
    }

    getButtonsInsideProperty();
  }, [
    buttonOption,
    buttonsInsideProperty.is_visible,
    setInsideButtonProps,
    videosId,
  ]);

  function backgroundHandleClick() {
    backgroundColorRef.current?.click();
  }

  function colorHandleClick() {
    colorRef.current?.click();
  }

  function backgroundHoverHandleClick() {
    backgroundHover.current?.click();
  }

  useEffect(() => {
    setnewSize(buttonsInsideProperty?.size);

    if (currentSize) {
      setSizeInsideButton(currentSize);
    } else {
      setSizeInsideButton(newSize);
    }
  }, [currentSize, buttonsInsideProperty?.size, newSize, setSizeInsideButton]);

  useEffect(() => {
    setNewText(buttonsInsideProperty?.text);

    if (currentText) {
      setTextInsideButton(currentText);
    } else {
      setTextInsideButton(newText);
    }
  }, [currentText, buttonsInsideProperty?.text, newText, setTextInsideButton]);

  useEffect(() => {
    setnewBackgroundColor(buttonsInsideProperty?.background_color);

    if (currentBackgroundColor) {
      setBackgroundColorInsideButton(currentBackgroundColor);
    } else {
      setBackgroundColorInsideButton(newBackgroundColor);
    }
  }, [
    currentBackgroundColor,
    buttonsInsideProperty?.background_color,
    newBackgroundColor,
    setBackgroundColorInsideButton,
  ]);

  useEffect(() => {
    setnewTextColor(buttonsInsideProperty?.text_color);

    if (currentTextColor) {
      setTextColorInsideButton(currentTextColor);
    } else {
      setTextColorInsideButton(newTextColor);
    }
  }, [
    currentTextColor,
    buttonsInsideProperty?.text_color,
    newTextColor,
    setTextColorInsideButton,
  ]);

  useEffect(() => {
    setnewBackgroundHover(buttonsInsideProperty?.text_color);

    if (currentBackgroundHover) {
      setBackgroundHoverInsideButton(currentBackgroundHover);
    } else {
      setBackgroundHoverInsideButton(newBackgroundHover);
    }
  }, [
    currentBackgroundHover,
    buttonsInsideProperty?.text_color,
    newBackgroundHover,
    setBackgroundHoverInsideButton,
  ]);

  return (
    <>
      <form onSubmit={handleSubmit(updateButton)}>
        <div className={styles.positionButton}>
          <p>Posição</p>
          <div>
            <span
              className={buttonPosition == "start-top" ? styles.active : ""}
              onClick={() => setButtonPosition("start-top")}
            ></span>
            <span
              className={buttonPosition == "center-top" ? styles.active : ""}
              onClick={() => setButtonPosition("center-top")}
            ></span>
            <span
              className={buttonPosition == "end-top" ? styles.active : ""}
              onClick={() => setButtonPosition("end-top")}
            ></span>
            <span
              className={buttonPosition == "start-center" ? styles.active : ""}
              onClick={() => setButtonPosition("start-center")}
            ></span>
            <span
              className={buttonPosition == "center-center" ? styles.active : ""}
              onClick={() => setButtonPosition("center-center")}
            ></span>
            <span
              className={buttonPosition == "end-center" ? styles.active : ""}
              onClick={() => setButtonPosition("end-center")}
            ></span>
            <span
              className={buttonPosition == "start-bottom" ? styles.active : ""}
              onClick={() => setButtonPosition("start-bottom")}
            ></span>
            <span
              className={buttonPosition == "center-bottom" ? styles.active : ""}
              onClick={() => setButtonPosition("center-bottom")}
            ></span>
            <span
              className={buttonPosition == "end-bottom" ? styles.active : ""}
              onClick={() => setButtonPosition("end-bottom")}
            ></span>
          </div>
        </div>
        <div className={styles.propsButton}>
          <div>
            <label htmlFor="text">Texto</label>
            <input
              defaultValue={buttonsInsideProperty?.text}
              type="text"
              id="text"
              ref={textRef}
              onChange={(e) => setCurrentText(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tamanho">Tamanho</label>
            <select
              id="tamanho"
              onChange={(e) => setCurrentSize(e.target.value)}
              defaultValue={buttonsInsideProperty?.size}
            >
              <option
                selected={buttonsInsideProperty?.size == "125"}
                value={"125"}
              >
                Pequeno
              </option>
              <option
                selected={buttonsInsideProperty?.size == "150"}
                value={"150"}
              >
                Médio
              </option>
              <option
                selected={buttonsInsideProperty?.size == "250"}
                value={"250"}
              >
                Grande
              </option>
            </select>
          </div>
        </div>
        <div className={styles.linkButton}>
          <label htmlFor="link">Link</label>
          <input
            defaultValue={buttonsInsideProperty?.link}
            type="text"
            id="link"
            onChange={(e) => setCurrentLink(e.target.value)}
          />
        </div>
        <div className={styles.divisor} />

        <div className={styles.timerButton}>
          <div>
            <label htmlFor="start">Início</label>
            <input
              value={
                startTimerInside
                  ? `${startTimerInside} : ${startTimerSecondsInside}`
                  : getFormatedStart
              }
              placeholder="00:00"
              title="00:00"
              type="text"
              id="start"
              onClick={() => setIsOpen(!isOpen)}
            />
            <ModalTimerStartInside
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
                endTimerInside
                  ? `${endTimerInside} : ${endTimerSecondsInside}`
                  : getFormatedEnd
              }
              placeholder="00:00"
              title="00:00"
              onClick={() => setIsOpenEnd(!isOpenEnd)}
            />
            <ModalTimerEndInside
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
                background: `${textColorInsideButton}`,
              }}
              onClick={colorHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={colorRef}
                value={textColorInsideButton}
                onChange={(e) => setCurrentTextColor(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.design}>
            <label>Background</label>
            <label
              className={styles.inputColor}
              style={{
                background: `${backgroundColorInsideButton}`,
              }}
              onClick={backgroundHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={backgroundColorRef}
                value={backgroundColorInsideButton}
                onChange={(e) => setCurrentBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.design}>
            <label>Background hover</label>
            <label
              className={styles.inputColor}
              style={{
                background: `${backgroundHoverInsideButton}`,
              }}
              onClick={backgroundHoverHandleClick}
            ></label>

            <div className={styles.inputDisabled}>
              <input
                className={styles.colors}
                type="color"
                ref={backgroundHover}
                value={backgroundHoverInsideButton}
                onChange={(e) => setCurrentBackgroundHover(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.previewButton}>
          <p>Pré-visualização</p>
          <div>
            <ButtonInsideVideo
              href={"#"}
              target="_blank"
              background_color={backgroundColorInsideButton}
              background_hover={backgroundHoverInsideButton}
              text_color={textColorInsideButton}
              sizeWidth={
                sizeInsideButton === "125"
                  ? "150"
                  : sizeInsideButton === "150"
                  ? "200"
                  : sizeInsideButton === "250"
                  ? "250"
                  : ""
              }
              sizeFont={
                sizeInsideButton === "125"
                  ? "100%"
                  : sizeInsideButton === "150"
                  ? "150%"
                  : sizeInsideButton === "250"
                  ? "200%"
                  : ""
              }
            >
              {textInsideButton}
            </ButtonInsideVideo>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.saveOrCancel}>
          <button onClick={closeModalNewButton}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
}
