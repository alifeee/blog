class AliveChecker extends HTMLElement {
  constructor() {
    super();

    this.src = "";

    const shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("src")) {
      throw new Error("src attribute is required");
    }
    this.src = this.getAttribute("src");

    this.render();
    this.checkAlive();
  }

  //  send http request to check if the server is alive
  async checkAlive() {
    const response = await fetch(this.src, { mode: "no-cors" });
    console.log(this.src);
    console.log(response);
    if (response.status === 200) {
      this.shadowRoot.getElementById("indicator").style.backgroundColor =
        "#00ff00";
    } else {
      this.shadowRoot.getElementById("indicator").style.backgroundColor =
        "#ff0000";
    }
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const indicator = document.createElement("div");
    indicator.setAttribute("class", "indicator");
    indicator.setAttribute("id", "indicator");

    const style = document.createElement("style");
    style.textContent = `
    .indicator {
        display: inline-block;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        background-color: #ffaa00;
    }
    `;

    this.shadowRoot.appendChild(indicator);
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("alive-checker", AliveChecker);
