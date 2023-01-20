import styles from "./styles.module.scss";
import { CustomButtonStyles } from "./buttons";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";

interface ButtonUpdateProps {
  html_content: string;
}

export function CustomButton() {
  const { register, handleSubmit, watch } = useForm<ButtonUpdateProps>();
  const { buttonOption, videosId, closeModalNewButton } = useVideoContext();
  const { htmlCustom, setHtmlCustomTimer, totalDuration, setHtmlCustom } = usePlayeContext();
  const [showOrHideStart, setshowOrHideStart] = useState(false);
  const [showOrHideEnd, setshowOrHideEnd] = useState(false);

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);

  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);
  const [startTimerSeconds, setStartTimerSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(0);
  const [endTimer, setEndTimer] = useState(0);
  const [endTimerSeconds, setEndTimerSeconds] = useState(0);

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

  async function updateButton(data: any) {
    await api
      .put(`/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`, {
        html_content: data.html_content,
        start: startTimer * 60 + startTimerSeconds,
        end: endTimer * 60 + endTimerSeconds,
      })
      .then((res) => console.log("resposta custom", res.data));

    await api
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

    closeModalNewButton();
    toast.success("Botão salvo");
  }

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

        <div className={styles.saveOrCancel}>
          <button onClick={closeModalNewButton}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
}
