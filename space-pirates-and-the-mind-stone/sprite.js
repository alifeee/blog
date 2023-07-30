class SpriteImg extends HTMLElement {
  constructor() {
    super();

    this.scale = 1;
    this.height = 16;
    this.width = 16;
    this.src = "";
    this.frames = 1;
    this.frame = 0;
    this.looping = false;
    this.fps = 1;
    this.startpaused = true;

    const shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.hasAttribute("scale")) this.scale = this.getAttribute("scale");
    if (this.hasAttribute("height")) this.height = this.getAttribute("height");
    if (this.hasAttribute("width")) this.width = this.getAttribute("width");
    if (this.hasAttribute("src")) this.src = this.getAttribute("src");
    if (this.hasAttribute("frames")) this.frames = this.getAttribute("frames");
    if (this.hasAttribute("frame")) this.frames = this.getAttribute("frame");
    if (this.hasAttribute("looping"))
      this.looping = this.getAttribute("looping");
    if (this.hasAttribute("fps")) this.fps = this.getAttribute("fps");
    if (this.hasAttribute("startpaused"))
      this.startpaused = this.getAttribute("startpaused");

    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = "";
    const sprite = document.createElement("div");
    sprite.setAttribute("class", "sprite");
    sprite.setAttribute("id", "sprite");

    const style = document.createElement("style");
    style.textContent = `
    .sprite {
        position: relative;
        background-image: url(${this.src});
        background-repeat: no-repeat;
        background-origin: border-box;
        background-size: ${this.scale * this.width}px ${
      this.scale * this.height * this.frames
    }px;
        background-position-y: -${this.scale * this.height * this.frame}px;
        height: ${this.scale * this.height}px;
        width: ${this.scale * this.width}px;
        animation-name: animate;
        animation-duration: ${this.frames / this.fps}s;
        animation-timing-function: steps(${this.frames}, jump-none);
        animation-iteration-count: ${this.looping == "true" ? "infinite" : "1"};
        animation-play-state: ${
          this.startpaused == "true" ? "paused" : "running"
        };
        animation-fill-mode: forwards;
    }
    @keyframes animate {
        100% {
            background-position-y: -${
              (this.frames - 1) * this.scale * this.height
            }px;
        }
    }
    * {
        image-rendering: pixelated;
    }
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(sprite);

    this.sprite = sprite;
  }

  pause() {
    let sprite = this.shadowRoot.getElementById("sprite");
    sprite.style.animationPlayState = "paused";
  }
  play() {
    let sprite = this.shadowRoot.getElementById("sprite");
    sprite.style.animationPlayState = "running";
  }
  reset() {
    let sprite = this.shadowRoot.getElementById("sprite");
    sprite.style.animation = "none";
    sprite.offsetHeight;
    sprite.style.animation = null;
  }
  stop() {
    this.reset();
    this.pause();
  }

  static get observedAttributes() {
    return ["src", "height", "width", "frames", "looping", "fps", "frame"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }
}

customElements.define("sprite-img", SpriteImg);
