import styles from "./styles.module.scss";
import { ButtonInsideVideo } from "./buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";


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
  const [showOrHideStart, setshowOrHideStart] = useState(false);
  const [showOrHideEnd, setshowOrHideEnd] = useState(false);
  const {
    totalDuration,
    setResultInsideProps,
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
  } = usePlayeContext();

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);

  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);
  const [startTimerSeconds, setStartTimerSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(0);
  const [endTimer, setEndTimer] = useState(0);
  const [endTimerSeconds, setEndTimerSeconds] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [currentSize, setCurrentSize] = useState("");
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

  // async function updateButton({
  //   text,
  //   size,
  //   background_color,
  //   background_hover,
  //   start,
  //   end,
  //   text_color,

  //   link,
  // }: ButtonUpdateProps) {
  //   await api
  //     .put(`/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`, {
  //       text,
  //       size,
  //       background_color,
  //       background_hover,
  //       position: buttonPosition,
  //       start: startTimer * 60 + startTimerSeconds,
  //       end: endTimer * 60 + endTimerSeconds,
  //       text_color,
  //       link,
  //       video_id: currentVideo.currentVideoId,
  //     })
  //     .then((res) => console.log("resposta viNda do put do inside", res.data));

  //   await api(
  //     `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`
  //   ).then((res) => {
  //     const data = res.data;
  //     const insideFiltered = data.filter((e: any) => e.type === "inside");
  //     const insideResult = insideFiltered[0];
  //     setResultInsideProps({
  //       start: insideResult?.start,
  //       end: insideResult?.end,
  //     });
  //     setButtonProps({
  //       background_color: insideResult.background_color,
  //       bacgrkound_hover: insideResult.background_hover,
  //       size: insideResult.size,
  //       text: insideResult.text,
  //       text_color: insideResult.text_color,
  //       link: insideResult.link,
  //       position: insideResult.position,
  //       start: insideResult?.start,
  //       end: insideResult?.end,
  //     });
  //   });
  //   closeModalNewButton();
  //   toast.success("Botão salvo");
  // }

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
            position: buttonPosition,
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
            position: buttonPosition,
          }
        )
        .then((res) => console.log("funciou o put", res.data));
    }
    closeModalNewButton();
    toast.success("Botão salvo");
  }

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

  function textHandleClick() {
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
              className={buttonPosition == "top-start" ? styles.active : ""}
              onClick={() => setButtonPosition("start-top")}
            ></span>
            <span
              className={buttonPosition == "top-center" ? styles.active : ""}
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
                disabled
                selected
                defaultValue={buttonsInsideProperty?.size}
              >
                {buttonsInsideProperty?.size == "125"
                  ? "Pequeno"
                  : buttonsInsideProperty?.size == "150"
                  ? "Médio"
                  : "Grande"}
              </option>
              <option value={"125"}>Pequeno</option>
              <option value={"150"}>Médio</option>
              <option value={"250"}>Grande</option>
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
              value={`${startTimer} : ${startTimerSeconds}`}
              placeholder="00:00"
              title="00:00"
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
              title="00:00"
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
            <label>Background hover</label>
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

          {/* <div>
            <label htmlFor="color">Cor do texto</label>
            <input
              value={watch("text_color") ? watch("text_color") : "#ffffff"}
              type="color"
              id="color"
              {...register("text_color")}
            />
          </div>
          <div>
            <label htmlFor="background_color">Background</label>
            <input
              value={
                watch("background_color")
                  ? watch("background_color")
                  : "#ff003c"
              }
              type="color"
              id="background_color"
              {...register("background_color")}
            />
          </div>
          <div>
            <label htmlFor="hover">Background hover</label>
            <input type="color" id="hover" {...register("background_hover")} />
          </div> */}
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
              sizeWidth={sizeInsideButton}
              sizeFont={
                currentSize === "125"
                  ? "100%"
                  : currentSize === "150"
                  ? "150%"
                  : currentSize === "250"
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
