import styles from "./styles.module.scss";
import { CustomButtonStyles } from "./buttons";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { ModalTimerStart } from "./timers/timerStart";
import { ModalTimerEnd } from "./timers/timerEnd";

interface ButtonUpdateProps {
  html_content: string;
}

export function CustomButton() {
  const { register, handleSubmit, watch } = useForm<ButtonUpdateProps>();
  const { buttonOption, videosId, closeModalNewButton, modalNewButtonOpen } =
    useVideoContext();
  const {
    htmlCustom,
    setHtmlCustomTimer,
    htmlCustomTimer,
    totalDuration,
    setHtmlCustom,
    startTimer,
    endTimer,
    startTimerSeconds,
    endTimerSeconds,
    setStartTimer,
    setEndTimer,
  } = usePlayeContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefEnd = useRef<HTMLButtonElement>(null);

  async function updateButton(data: any) {
    const minutesAndSecondsTimerStart = startTimer * 60 + startTimerSeconds;
    const getMinutesStart =
      startTimer > 0 ? minutesAndSecondsTimerStart : htmlCustomTimer.start;

    const minutesAndSecondsTimerEnd = endTimer * 60 + endTimerSeconds;
    const getMinutesEnd =
      endTimer > 0 ? minutesAndSecondsTimerEnd : htmlCustomTimer.end;
    await api.put(
      `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`,
      {
        html_content: data.html_content,
        start: getMinutesStart,
        end: getMinutesEnd,
      }
    );
    closeModalNewButton();
    toast.success("Botão salvo");
  }

  const [getFormatedStart, setGetFormatedStart] = useState("");
  const [getFormatedEnd, setGetFormatedEnd] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await api
        .get(`/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`)
        .then((res) => {
          const buttonCustomFiltered = res.data.find(
            (e: any) => e.type === "custom"
          );
          if (buttonCustomFiltered) {
            setHtmlCustom(buttonCustomFiltered.html_content);
            setHtmlCustomTimer({
              start: buttonCustomFiltered?.start,
              end: buttonCustomFiltered?.end,
            });
          }
        });
    }

    var minutesStart = Math.floor(htmlCustomTimer.start / 60);
    var remainingSecondsStart = htmlCustomTimer.start % 60;

    const formatedTimerStart =
      minutesStart +
      " : " +
      (remainingSecondsStart < 10 ? "0" : "") +
      remainingSecondsStart;

    var minutesEnd = Math.floor(htmlCustomTimer.end / 60);
    var remainingSecondsEnd = htmlCustomTimer.end % 60;

    const formatedTimerEnd =
      minutesEnd +
      " : " +
      (remainingSecondsEnd < 10 ? "0" : "") +
      remainingSecondsEnd;

    setGetFormatedStart(formatedTimerStart);
    setGetFormatedEnd(formatedTimerEnd);
    setStartTimer(0);
    setEndTimer(0);

    getData();
  }, [
    buttonOption,
    setHtmlCustom,
    setHtmlCustomTimer,
    videosId.currentVideoId,
    htmlCustomTimer.start,
    htmlCustomTimer.end,
    setStartTimer,
    setEndTimer,
  ]);

  return (
    <>
      <form onSubmit={handleSubmit(updateButton)}>
        <div className={styles.customButton}>
          <label htmlFor="custom">Código HTML</label>
          <textarea
            rows={5}
            defaultValue={htmlCustom}
            {...register("html_content")}
            id="custom"
          />
        </div>
        <div className={styles.divisor} />

        <div className={styles.timerButton}>
          <div>
            <label htmlFor="start">Início</label>
            <input
              value={
                startTimer
                  ? `${startTimer} : ${startTimerSeconds}`
                  : getFormatedStart
              }
              placeholder="00:00"
              title="00:00"
              type="text"
              id="start"
              onClick={() => setIsOpen(!isOpen)}
            />

            <ModalTimerStart
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
                endTimer ? `${endTimer} : ${endTimerSeconds}` : getFormatedEnd
              }
              placeholder="00:00"
              title="00:00"
              onClick={() => setIsOpenEnd(!isOpenEnd)}
            />
            <ModalTimerEnd
              buttonRefEnd={buttonRefEnd}
              isOpenEnd={isOpenEnd}
              setIsOpenEnd={setIsOpenEnd}
            />
          </div>
        </div>
        <div className={styles.teste}></div>
        <div className={styles.divisor} />

        <div className={styles.saveOrCancel}>
          <button onClick={closeModalNewButton}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
}
