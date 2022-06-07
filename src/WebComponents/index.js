

const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.container { 
position: relative;
width: 1440px;
height: 100%;
z-index: -1;
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
position:aboslute;
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

.modal {
display: none;
width:920px;
height:210px;
left:50%;
top:50%;
margin:-100px 0 0 -450px;
position:fixed;
border: 1px solid black;
background: #FFFFFF;
z-index: 3;
}
.header {
  position: fixed;
  width: 380px;
  height: 98px;
  left: 355px;
  top: 431px;
  
}
.header-text {
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 120%;
}
.close {
  position: absolute;
  Width: 12px;
  Height: 12px;
  Top: 46px;
  right: 46px;
  font-size: 30px;
  color: black;
}
.overlay {
background: rgba(0, 0, 0, 0.6);
position: fixed;
display: none;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 2;


}


  </style>
  
  <div class="container">
    <img class="responsive"/>
      <div class="global">
        <div class="title">
          <h1 class="titletext"></h1>
        </div>
        <div class="description">
          <p class="description-text"></p>
        </div>
        <br>
        <button class="button">Button</button>
      </div>
  </div>
  <div id="overlay" class="overlay"></div>
  <div class="modal" >
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <p class="header-text">Alert!</p>
      <span id="counter" class="counter-text">0</span>
    </div>
    <div class="modal-body">
        <slot><slot>
    </div>
  </div>
</div>


</div>`;

class WebComponent extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content);
    
  }

  static get observedAttributes() {
    return ["avatar", "name", "text"];
  }
  connectedCallback() {
    this._modal = this.shadowRoot.querySelector(".modal");
    this._overlay = this.shadowRoot.querySelector(".overlay");
    // this._counter = this.shadowRoot.querySelector(".increment")
    this.shadowRoot.querySelector("button").addEventListener('click',this._showModal.bind(this));
    this.shadowRoot.querySelector(".close").addEventListener('click',this._hideModal.bind(this));
    this.shadowRoot.querySelector(".overlay").addEventListener('click',this._hideModal.bind(this));
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
    this.shadowRoot.querySelector(".close").removeEventListener('click', this._hideModal);
    this.shadowRoot.querySelector(".overlay").removeEventListener('click',this._hideModal);
    
  }
  _showModal() { 
    this._modalVisible = true;
    this._modal.style.display = 'block';
    this._overlay.style.display = 'block';
   }
   _hideModal() {
     this._modalVisible = false;
     this._modal.style.display = 'none';
     this._overlay.style.display = 'none';
   }


   


  
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector("img.responsive").src = this.getAttribute("avatar");
    this.shadowRoot.querySelector("h1").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("text");
    
  }
}

window.customElements.define("web-component", WebComponent);
