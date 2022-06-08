const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.container { 
display: flex;
position: relative;
width: 1440px;
height: 100%;
z-index: -1;
}

img.responsive {
display: flex;
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
top: 120px;
}

.title {
position:aboslute;
width: 380px;
height: 50px;
left: calc(50% - 380px/2 + 300px);
top: calc(50% - 50px/2 - 319px);
}

.title-text {
font-family:'Roboto';
font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 50px;
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
position:fixed;
display: none;
width:920px;
height:210px;
left: 260px;
top: 375px;
border: 1px solid black;
background: #FFFFFF;
z-index: 3;
}

.info-modal{
  position: absolute;
  width: 380px;
  height: 24px;
  left: calc(50% - 380px/2 - 175px);
  top: calc(50% - 24px/2 + 37px);
  font-family: 'Roboto';
  font-style: normal;
  font-weight: "blend";
  font-size: 16px;
  line-height: 150%;
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
  
.header {
  position: fixed;
  width: 380px;
  height: 98px;
  left: 355px;
  top: 431px;
  
}

.header-text {
position: absolute;
width: 380px;
height: 50px;
left: calc(50% - 380px/2 - 175px);
top: 24px;
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

.counter-text {
font-weight: bolder;
}

#clear_button {
display: none;
position: absolute;
Width: 60px;
Height: 60px;
Top: 120px;
right: 20px;
font-size: 15px;
color: black;
}
  </style>
  
  <div class="container">
    <img class="responsive"/>
      <div class="global">
        <div class="title">
          <h1 class="title-text"></h1>
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
      <p class="info-modal">You have clicked <span id="count" class="counter-text"></span> times to related buttons</p>
       <button id="clear_button">Clear</button>
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
    this._clear_button = this.shadowRoot.querySelector("#clear_button");
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", this._showModal.bind(this));
    this.shadowRoot
      .querySelector(".close")
      .addEventListener("click", this._hideModal.bind(this));
    this.shadowRoot
      .querySelector(".overlay")
      .addEventListener("click", this._hideModal.bind(this));
    this.shadowRoot
      .querySelector("#clear_button")
      .addEventListener("click", this._deleteButton.bind(this));
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector("button")
      .removeEventListener("click", this._showModal);
    this.shadowRoot
      .querySelector(".close")
      .removeEventListener("click", this._hideModal);
    this.shadowRoot
      .querySelector(".overlay")
      .removeEventListener("click", this._hideModal);
  }
  _showModal() {
    this._modalVisible = true;
    this._modal.style.display = "block";
    this._overlay.style.display = "block";
    let count = localStorage.getItem("count");
    count++;
    this.shadowRoot.getElementById("count").innerHTML = count;
    localStorage.setItem("count", count);
    console.log(count);
    if (count >= 5) {
      this._showButton();
    }
  }
  _hideModal() {
    this._modalVisible = false;
    this._modal.style.display = "none";
    this._overlay.style.display = "none";
  }
  _showButton() {
    this._clear_buttonVisible = true;
    this._clear_button.style.display = "block";
  }
  _deleteButton() {
    this._clear_buttonVisible = false;
    this._clear_button.style.display = "none";
    localStorage.clear();
    this._hideModal();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector("img.responsive").src =
      this.getAttribute("avatar");
    this.shadowRoot.querySelector("h1").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("text");
  }
}

window.customElements.define("web-component", WebComponent);
