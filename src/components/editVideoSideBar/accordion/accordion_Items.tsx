import is from "date-fns/esm/locale/is/index.js";
import Accordion from "react-bootstrap/Accordion";
import { useSideBarContext } from "../../../contexts/thirdContext";
import { LoadingScrean } from "../../loading/loading";
import stylesSwitch from "./switch.module.scss";

interface AccordionProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  accordionTitle: string;
  isLoading: boolean;
  cheacked: boolean | undefined;
  accordionKey: string;
  activeSwitch: () => void;
  upDateSwitch: () => void;
  isSeved: boolean | undefined;
}

export function AccordionItems({
  accordionKey,
  upDateSwitch,
  icon,
  accordionTitle,
  activeSwitch,
  cheacked,
  isSeved,
  children,
  isLoading,
}: AccordionProps) {

  return (
    <>
      <Accordion.Item eventKey={accordionKey} className={stylesSwitch.AccordionContainer}>
        <Accordion.Header>
          <div className={stylesSwitch.card}>
            <span className={stylesSwitch.content}>
              {icon}
              {accordionTitle}
            </span>
            {isLoading ? (
              <LoadingScrean color="#ff003c" fontSize={0.7} size="sm" />
            ) : (
              <>
                <label className={stylesSwitch.switch}>
                  <input
                    onClick={activeSwitch}
                    type="checkbox"
                    checked={cheacked}
                  />
                 
                  <span className={`${stylesSwitch.slider} ${stylesSwitch.round}`}></span>
                </label>
              </>
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">{children}</Accordion.Body>
        {isSeved ? (
          <>
            <div className={stylesSwitch.saveSwitch}>
              <button onClick={upDateSwitch}>
                Salvar
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </Accordion.Item>
    </>
  );
}
