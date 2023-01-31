import { RefObject, useEffect, useRef, useState } from "react";
import { usePlayeContext } from "../../../../../contexts/usePlayerContext";
import styles from "../styles.module.scss";

export function ModalTimerStart(props: {
  buttonRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const {
    openModalTimers,
    totalDuration,
    setStartTimer,
    setStartTimerSeconds,
  } = usePlayeContext();
  const { isOpen, setIsOpen, buttonRef } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [listStart, setListStart] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [startSeconds, setStartSeconds] = useState([]);

  function handleClick() {
    setIsOpen(!isOpen);
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
        !buttonRef?.current?.contains(event.target) &&
        !ref?.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [buttonRef, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div ref={ref}>
      <div className={styles.timerButton}>
        <div>
          <div className={styles.timerStart}>
            <div>
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
      </div>
    </div>
  );
}
