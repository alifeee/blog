class FridgeMagnetsModel extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this._rotating = true;
    this.illo = null;
    this.canvas = null;
  }

  setRotating(value) {
    this._rotating = value;
  }

  getRotating() {
    return this._rotating;
  }

  connectedCallback() {
    this.render();
  }

  startDrag() {
    this.setRotating(false);
    this.canvas.style.cursor = "grabbing";
  }

  endDrag() {
    this.setRotating(true);
    this.canvas.style.cursor = "grab";
  }

  render() {
    this.canvas = document.createElement("canvas");
    let canvas = this.canvas;
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.display = "block";
    canvas.style.margin = "auto";
    canvas.style.cursor = "grab";
    this.root.appendChild(canvas);

    this.illo = new Zdog.Illustration({
      element: canvas,
      zoom: 3,
      dragRotate: true,
      onDragStart: () => this.startDrag(),
      onDragEnd: () => this.endDrag(),
      rotate: { y: -Zdog.TAU / 16, x: -Zdog.TAU / 32 },
    });

    let consolasFont = new Zdog.Font({
      src: "./CONSOLA.TTF",
    });

    // random seed
    let seed = 0.1;
    let random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    let html_fragments = [
      "</body>",
      "<div>",
      "<hr>",
      "</option>",
      "<li>",
      '<meta charset="utf-8">',
      "</p>",
      "<!DOCTYPE html>",
      "<textarea>",
      "<div>",
    ];
    let FONT_SIZE = 12;
    let PADDING = 2;
    let SPREAD = 100;
    let ROT_SPREAD = 0.9;

    Zdog.waitForFonts().then(() => {
      let textGroup = new Zdog.Group({
        addTo: this.illo,
        translate: { z: 0 },
      });
      for (let i = 0; i < html_fragments.length; i++) {
        let fragment = html_fragments[i];
        let textSize = consolasFont.measureText(fragment, FONT_SIZE);
        let width = textSize.width;
        let height = textSize.height;
        let x = random() * SPREAD - SPREAD / 2;
        let y = random() * SPREAD - SPREAD / 2;
        let rotation = random() * ROT_SPREAD - ROT_SPREAD / 2;

        new Zdog.Rect({
          addTo: textGroup,
          width: width + PADDING * 2,
          height: height + PADDING * 2,
          translate: { x: x, y: y, z: i + 0 },
          rotate: { z: rotation },
          stroke: 1,
          color: "#fff",
          fill: true,
        });

        new Zdog.Text({
          addTo: textGroup,
          font: consolasFont,
          value: fragment,
          fontSize: FONT_SIZE,
          color: "#000",
          translate: { x: x, y: y, z: i },
          rotate: { z: rotation },
          textAlign: "center",
          textBaseline: "middle",
          fill: true,
        });
      }
    });

    this.illo.updateRenderGraph();
    this.animate();

    canvas.style.width = "100%";
    canvas.style.height = "100%";
  }

  animate() {
    if (this.getRotating()) {
      this.illo.rotate.y += 0.01;
    }
    this.illo.updateRenderGraph();
    requestAnimationFrame(() => this.animate());
  }
}

customElements.define("fridge-magnets-model", FridgeMagnetsModel);
