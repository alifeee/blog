class SpriteImg extends HTMLElement {
  constructor() {
    super();

    const height = this.getAttribute("height");
    const width = this.getAttribute("width");
    const image_src = this.getAttribute("src");
    const n_frames = this.getAttribute("frames");
    const looping = this.getAttribute("looping") == "true" ? true : false;
    const fps = this.getAttribute("fps");
    const start_paused =
      this.getAttribute("start-paused") == "true" ? true : false;

    const shadow = this.attachShadow({ mode: "open" });

    const sprite = document.createElement("div");
    sprite.setAttribute("class", "sprite");
    sprite.setAttribute("id", "sprite");

    const style = document.createElement("style");
    style.textContent = `
    .sprite {
        position: relative;
        background-image: url(${image_src});
        background-repeat: no-repeat;
        background-origin: border-box;
        height: ${height}px;
        width: ${width}px;
        background-color: green;
        animation-name: animate;
        animation-duration: ${n_frames / fps}s;
        animation-timing-function: steps(${n_frames}, jump-none);
        animation-iteration-count: ${looping ? "infinite" : "1"};
        animation-play-state: ${start_paused ? "paused" : "running"};
        animation-fill-mode: forwards;
    }
    @keyframes animate {
        100% {
            background-position-y: -${(n_frames - 1) * height}px;
        }
    }
    `;

    shadow.appendChild(style);
    shadow.appendChild(sprite);

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
}

customElements.define("sprite-img", SpriteImg);
