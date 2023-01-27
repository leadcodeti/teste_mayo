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
}

export function AccordionItems({
  accordionKey,
  upDateSwitch,
  icon,
  accordionTitle,
  activeSwitch,
  cheacked,
  children,
  isLoading,
}: AccordionProps) {

  const { saveSwitch, setSaveSwitch } = useSideBarContext();

  function UpDataSwitch() {
    upDateSwitch();
    setSaveSwitch(false);
  }


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
                  <span
                    className={`${stylesSwitch.slider} ${stylesSwitch.round}`}
                  ></span>
                </label>
              </>
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">{children}</Accordion.Body>
        {saveSwitch ? (
          <>
            <div className={stylesSwitch.saveSwitch}>
              <button onClick={UpDataSwitch}>Salvar</button>
            </div>
          </>
        ) : (
          ""
        )}
      </Accordion.Item>
    </>
  );
}
