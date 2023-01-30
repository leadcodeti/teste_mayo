import { ControlType } from "../../types/types";

interface EmabedTypes {
  controller: {
    bigPlay: ControlType;
    nextBtn: ControlType;
    playTime: ControlType;
    fullScrean: ControlType;
    prevBtn: ControlType;
    progressBar: ControlType;
    volume: ControlType;
    smalPlay: ControlType;
  }

  backgroundColor: string | undefined,
}
export function embedVideo({backgroundColor, controller}:EmabedTypes) {

  const jsIframe = document.createElement("div");

  jsIframe.innerHTML = `
  <div id="container" style="max-width: 900px; width:100%;">
    <vm-player playsinline
    theme="dark"
    style="--vm-player-theme: ${backgroundColor};"
    >
      <vm-video-youtub
        cross-origin="true"
        poster="https://media.vimejs.com/poster.png"
      >
        <source
          data-src="https://media.vimejs.com/720p.mp4"
          type="video/mp4"
        />
      </vm-video>
      <>

      <fake></fake>
      </div id="">

      <vm-controls pin="center">
        <vm-playback-control
        id="play"
          hide-tooltip
          style="--vm-control-scale: 1.6; 
           background: ${backgroundColor};
           z-index: 100;
           width: 80px;
           height: 80px;
           display: ${controller.bigPlay?.isActive ? "flex" :"none"};
           align-items: center;
           justify-content: center;
           border-radius: 50%;
           margin: 0 auto;
          "
        />
      </vm-controls>
      
      <vm-ui>
        <vm-spinner></vm-spinner>
        <vm-click-to-play></vm-click-to-play>

        <vm-controls full-width>
          <vm-control-group>
            <vm-scrubber-control style="display:  ${controller.progressBar?.isActive ? "flex" :"none"}" />
          </vm-control-group>
    
          <vm-control-group space="top">
            <vm-playback-control style="display:  ${controller.smalPlay?.isActive ? "flex" :"none"}" hide-tooltip></vm-playback-control>
            <vm-volume-control style="display:  ${controller.volume?.isActive ? "block" :"none"}" hide-tooltip/></vm-volume-control>
            <vm-time-progress style="display:  ${controller.playTime?.isActive ? "flex" :"none"}" separator="/"></vm-time-progress>

            <vm-control-spacer></vm-control-spacer>
            <vm-fullscreen-control style="display:  ${controller.fullScrean?.isActive ? "flex" :"none"}" hide-tooltip />
          </vm-control-group>
        </vm-controls>

      </vm-ui>
    </vm-player>
  </div>

  <script>
    window.player = document.querySelector("vm-player");
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css";
    link.media = "all";
    head.appendChild(link);
  </script>

  <script
    defer
    type="module"
    src="https://cdn.jsdelivr.net/npm/@vime/core@^5/dist/vime/vime.esm.js"
  ></script>
  `;

  return { jsIframe };
}
