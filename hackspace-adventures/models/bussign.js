class BusSignModel extends HTMLElement {
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

    let maxCushionArcHeight = 20;

    this.illo = new Zdog.Illustration({
      element: canvas,
      zoom: 0.6,
      dragRotate: true,
      onDragStart: () => this.startDrag(),
      onDragEnd: () => this.endDrag(),
      rotate: { y: -Zdog.TAU / 16, x: -Zdog.TAU / 32 },
    });

    let consolasFont = new Zdog.Font({
      src: "./CONSOLA.TTF",
    });

    let faceGroup = new Zdog.Group({
      addTo: this.illo,
    });

    let body = new Zdog.Box({
      addTo: this.illo,
      width: 900,
      height: 160,
      depth: 50,
      stroke: false,
      color: "#2E3D8E",
      translate: { z: -50 / 2 },
    });

    let front = new Zdog.Rect({
      addTo: faceGroup,
      width: 900,
      height: 160,
      stroke: false,
      fill: true,
      color: "#1A1A1C",
    });

    let window = new Zdog.Rect({
      addTo: faceGroup,
      width: 760,
      height: 90,
      stroke: false,
      fill: true,
      color: "#2B292A",
    });

    let strip = new Zdog.Rect({
      addTo: faceGroup,
      width: 680,
      height: 23,
      stroke: false,
      fill: true,
      color: "#6E674D",
      translate: { y: -8 - 23 / 2 },
    });

    strip.copy({
      translate: { y: 8 + 23 / 2 },
    });

    let FONT_SIZE = 36;

    new Zdog.Text({
      addTo: faceGroup,
      font: consolasFont,
      value: "ervice",
      fontSize: FONT_SIZE,
      color: "#F0F5F9",
      translate: { x: -900 / 2 + 130, y: -160 / 2 + 35 / 2 },
      textAlign: "left",
      textBaseline: "middle",
      fill: true,
    });
    new Zdog.Text({
      addTo: faceGroup,
      font: consolasFont,
      value: "Destination",
      fontSize: FONT_SIZE,
      color: "#F0F5F9",
      translate: { x: -900 / 2 + 350, y: -160 / 2 + 35 / 2 },
      textAlign: "left",
      textBaseline: "middle",
      fill: true,
    });
    new Zdog.Text({
      addTo: faceGroup,
      font: consolasFont,
      value: "Time",
      fontSize: FONT_SIZE,
      color: "#F0F5F9",
      translate: { x: -900 / 2 + 700, y: -160 / 2 + 35 / 2 },
      textAlign: "left",
      textBaseline: "middle",
      fill: true,
    });

    new Zdog.Shape({
      addTo: faceGroup,
      visible: false,
      translate: { z: 500 },
    });

    let trapezeAnchor = new Zdog.Anchor({
      addTo: body,
      translate: { x: -700 / 2, y: -160 / 2, z: -50 / 2 },
    });

    let trapezeTop = new Zdog.Shape({
      addTo: trapezeAnchor,
      path: [
        { x: 0, y: 0, z: 0 },
        { x: 700, y: 0, z: 0 },
        { x: 625, y: 20, z: -80 },
        { x: 75, y: 20, z: -80 },
      ],
      color: "#2E3D8E",
      fill: true,
      closed: true,
    });
    let trapezeLeft = new Zdog.Shape({
      addTo: trapezeAnchor,
      path: [
        { x: 0, y: 0, z: 0 },
        { x: 75, y: 20, z: -80 },
        { x: 75, y: 140, z: -80 },
        { x: 0, y: 160, z: 0 },
      ],
      color: "#2E3D8E",
      fill: true,
      closed: true,
    });
    let trapezeRight = new Zdog.Shape({
      addTo: trapezeAnchor,
      path: [
        { x: 625, y: 20, z: -80 },
        { x: 700, y: 0, z: 0 },
        { x: 700, y: 160, z: 0 },
        { x: 625, y: 140, z: -80 },
      ],
      color: "#2E3D8E",
      fill: true,
      closed: true,
    });
    let trapezeBottom = new Zdog.Shape({
      addTo: trapezeAnchor,
      path: [
        { x: 0, y: 160, z: 0 },
        { x: 75, y: 140, z: -80 },
        { x: 625, y: 140, z: -80 },
        { x: 700, y: 160, z: 0 },
      ],
      color: "#2E3D8E",
      fill: true,
      closed: true,
    });
    let trapezeBack = new Zdog.Shape({
      addTo: trapezeAnchor,
      path: [
        { x: 75, y: 20, z: -80 },
        { x: 625, y: 20, z: -80 },
        { x: 625, y: 140, z: -80 },
        { x: 75, y: 140, z: -80 },
      ],
      color: "#2E3D8E",
      fill: true,
      closed: true,
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

customElements.define("bus-sign-model", BusSignModel);
