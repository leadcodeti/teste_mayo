import { useMutation, useQuery, useQueryClient } from "react-query";
import { useVideoContext } from "../../../contexts/useContext";
import { getDesign } from "../../../pages/api/get_functions";
import {
  putControllers,
  putDesign,
} from "../../../pages/api/post_put_functions";
import Accordion from "react-bootstrap/Accordion";
import stylesSwitch from "./switch.module.scss";
import { LoadingScrean } from "../../loading/loading";
import {
  BsCardImage,
  BsHandIndexThumb,
  BsHourglass,
  BsPalette,
  BsPlayCircle,
} from "react-icons/bs";
import { Design } from "../components/design";
import { AccordionItems } from "./accordion_Items";
import { Thumbnails } from "../components/thumbnails";
import { AutoPlay } from "../components/autoPlay";
import { FakeBar } from "../components/fakeBar";
import { FiRepeat } from "react-icons/fi";
import { WatchAgain } from "../components/continuar";
import { Botoes } from "../components/botoes";
import { Switch } from "./switchFunctions";
import { useSideBarContext } from "../../../contexts/thirdContext";

export function Accordions() {

  const queryClient = useQueryClient();
  const { videosId } = useVideoContext();
  const { activeAccordion } = useSideBarContext() 

  const { data: design, isLoading } = useQuery( ["design", videosId.currentVideoId],
    () => getDesign(videosId.currentVideoId)
  );

  const { mutateAsync: designMutation } = useMutation(putDesign, {
    onSuccess: () => {
      queryClient.invalidateQueries("design");
    },
  });

  const { mutateAsync: controllersMutation } = useMutation(putControllers, {
    onSuccess: () => {
      queryClient.invalidateQueries("controll");
    },
  });

  function teste () {
    alert("");
  }

  const { 
    fakeBarIsVibiles,
    continueIsVisible,
    thumbnailsIsVisible,
    autoPlayIsVisible,
    upDataFakeBarSwitch,
   } = Switch() 


  return (
    <Accordion>
      <Accordion.Item eventKey="0" className={stylesSwitch.AccordionContainer}>
        <Accordion.Header>
          <div  className={stylesSwitch.card}>
            <span className={stylesSwitch.content}>
              <BsPalette />
              Design
            </span>
            {isLoading && (
              <LoadingScrean color="#ff003c" fontSize={0.7} size="sm" />
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <Design
            design={design}
            designMutation={designMutation}
            controllersMutation={controllersMutation}
          />
        </Accordion.Body>
      </Accordion.Item>

      <AccordionItems
        accordionKey={"1"}
        accordionTitle="Thumbnails"
        activeSwitch={thumbnailsIsVisible}
        cheacked={activeAccordion.activeThumbNails}
        icon={<BsCardImage />}
        isLoading={isLoading}
        upDateSwitch={upDataFakeBarSwitch}
      >
        <Thumbnails />
      </AccordionItems>

      <AccordionItems
        accordionKey={"2"}
        accordionTitle="Autoplay"
        activeSwitch={autoPlayIsVisible}
        cheacked={activeAccordion.activeAutoPlay}
        icon={<BsPlayCircle />}
        isLoading={isLoading}
        upDateSwitch={upDataFakeBarSwitch}
      >
        <AutoPlay />
      </AccordionItems>

      <AccordionItems
        accordionKey={"3"}
        accordionTitle="Fakebar"
        activeSwitch={fakeBarIsVibiles}
        cheacked={activeAccordion.activeFakeBar}
        icon={<BsHourglass />}
        isLoading={isLoading}
        upDateSwitch={upDataFakeBarSwitch}
      >
        <FakeBar />
      </AccordionItems>

      <AccordionItems
        accordionKey={"4"}
        accordionTitle="Continuar"
        activeSwitch={continueIsVisible}
        cheacked={activeAccordion.activeContinue}
        icon={<FiRepeat />}
        isLoading={isLoading}
        upDateSwitch={upDataFakeBarSwitch}
      >
        <WatchAgain />
      </AccordionItems>

      <Accordion.Item eventKey="5" className={stylesSwitch.AccordionContainer}>
        <Accordion.Header>
          <div className={stylesSwitch.card}>
            <span className={stylesSwitch.content}>
              <BsHandIndexThumb />
              Botões
            </span>
            {isLoading && (
              <LoadingScrean color="#ff003c" fontSize={0.7} size="sm" />
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <Botoes />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
