const template = document.createElement("template");

template.innerHTML = `
<link href="/src/css/main.css" rel="stylesheet">
<div class="container">
 <div class="picture">
 <h1> Hello <h1/>
 <img />
 </div>


 </div>`;


class WebComponent extends HTMLElement {
constructor() {
super();

}
connectedCallback() {
     const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content);


}
}

window.customElements.define('web-component', WebComponent);

// export default WebComponent;