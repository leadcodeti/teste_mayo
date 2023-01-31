import { RefObject, useEffect, useRef, useState } from "react";
import { usePlayeContext } from "../../../../../contexts/usePlayerContext";
import styles from "../styles.module.scss";

export function ModalTimerEndBelow(props: {
  buttonRefEnd: RefObject<HTMLButtonElement>;
  isOpenEnd: boolean;
  setIsOpenEnd: (isOpen: boolean) => void;
}) {
  const {
    openModalTimers,
    totalDuration,
    endTimerBelow,
    setEndTimerBelow,
    setEndTimerSecondsBelow,
  } = usePlayeContext();
  const { isOpenEnd, setIsOpenEnd, buttonRefEnd } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);

  function handleClick() {
    setIsOpenEnd(!isOpenEnd);
  }

  const formatedTotalDurationInMinutes = Math.floor(totalDuration / 60);

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
    let handler = (event: any) => {
      if (
        !buttonRefEnd?.current?.contains(event.target) &&
        !ref?.current?.contains(event.target)
      ) {
        setIsOpenEnd(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [buttonRefEnd, setIsOpenEnd]);

  if (!isOpenEnd) return null;

  return (
    <div ref={ref}>
      <div className={styles.timerButton}>
        <div>
          <div className={styles.timerStart}>
            <div>
              <ul>
                {listEnd.map((e) => (
                  <li onClick={() => setEndTimerBelow(e + 1)} key={e}>
                    {e + 1}
                  </li>
                ))}
              </ul>
              <ul>
                {startSeconds.map((e) => (
                  <li onClick={() => setEndTimerSecondsBelow(e + 1)} key={e}>
                    {e + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
