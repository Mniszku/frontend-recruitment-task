const template = document.createElement("template");

template.innerHTML = `
<style>
.container { 
position: relative;
width: 1440px;
height: 960px;
background: #FFFFFF;      
}

img.responsive {
position: absolute;
width: 505px;
height: 330px;
left: 230px;
top: 96px;
}

.global {
position: absolute;
width: 380px;
height: 250px;
left: 830px;
top: 136px;
}

.title {
width: 380px;
height: 50px;
left: calc(50% - 380px/2 + 300px);
top: calc(50% - 50px/2 - 319px);
}

.titletext {
font-family:'Roboto';
font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 120%;
color: #121212;
}

.description {
width: 380px;
height: 96px;
left: calc(50% - 380px/2 + 300px);
top: calc(50% - 96px/2 - 222px);

}
.description-text {
font-family: 'Roboto';
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
color: #121212;
}

.button{
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px 40px;
gap: 10px;
background: #E4C1AE;
border-radius: 32px;
border-color: white;
width: 128px;
height: 48px;
left: 830px;
top: 338px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 100%;
color: #FFFFFF;
}

  </style>
  <div class="container">
  <img class="responsive"/>
  <div class="global">
  <div class="title">
  <h1 class="titletext">Lorem Ipsum</h1>
  </div>
  <div class="description">
  <p class="description-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
  </p>
  </div>
  <br></br>
  <button class="button">Button</button>
  </div>
 
  </div>`;

class WebComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content);
  }

  static get observedAttributes() {
    return ["avatar"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector("img.responsive").src =
      this.getAttribute("avatar");
  }
}

window.customElements.define("web-component", WebComponent);
