
const teste11 = document.getElementById("mayoPlayer");
const html = document.createElement("p");

const var1= false;

html.innerHTML = `
 <div  style="display:  ${ true ? "flex" :"none"}">
  <iframe width="420" height="315"
    src="https://www.youtube.com/embed/tgbNymZ7vqY">
  </iframe>

  <button style="background:  ${ var1 ? "#FFF646" :"#f34"} ;display:  ${ false ? "flex" :"none"}">ENVIAR</button>
 </div>
`;

teste11.appendChild(html);

function teste()  {

}



/////
teste()