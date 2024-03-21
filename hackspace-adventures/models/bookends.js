class BookendModel extends HTMLElement {
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
      translate: { y: -22 / 2, z: -89 / 2 },
    });

    let front = new Zdog.Box({
      addTo: this.illo,
      width: 86,
      height: 99,
      depth: 22,
      stroke: false,
      color: "#d9b27e",
      translate: { z: 89 / 2 },
    });

    let bottom = new Zdog.Box({
      addTo: front,
      width: 86,
      height: 89,
      depth: 22,
      stroke: false,
      color: "#debb8c",
      rotate: { x: Zdog.TAU / 4 },
      translate: { y: 99 / 2 + 22 / 2, z: -89 / 2 + 22 / 2 },
    });

    let slantBack = new Zdog.Rect({
      addTo: front,
      width: 86,
      height: 91,
      fill: true,
      color: "#ebc18a",
      rotate: { x: -Math.atan(67 / 64) },
      translate: { y: 35 / 2, z: -89 / 2 },
    });

    let slantFront = new Zdog.Rect({
      addTo: front,
      width: 86,
      height: 48,
      fill: true,
      color: "#ebc18a",
      rotate: { x: -Math.atan(31 / 33) },
      translate: { y: 66 / 2, z: -53 / 2 },
    });

    let slantSideAnchor = new Zdog.Anchor({
      addTo: front,
      translate: { x: 86 / 2, y: 99 / 2, z: 22 / 2 },
    });

    let slantRightSide = new Zdog.Shape({
      addTo: slantSideAnchor,
      path: [
        { z: -22, y: -64 },
        { z: -89, y: 0 },
        { z: -53, y: 0 },
        { z: -22, y: -33 },
      ],
      closed: true,
      fill: true,
      color: "#ebc18a",
    });

    let slantLeftSide = slantRightSide.copy({
      translate: { x: -86 },
    });

    let backScrewGroup = new Zdog.Group({
      addTo: slantBack,
    });

    let slantScrewTop = new Zdog.Ellipse({
      addTo: backScrewGroup,
      diameter: 6,
      stroke: false,
      fill: true,
      color: "#b5b5b5",
      translate: { z: 0, y: -25 },
      stroke: 3,
    });
    let slantScrewBottom = slantScrewTop.copy({
      translate: { z: 0, y: 25 },
    });
    new Zdog.Shape({
      //offset group for z-fighting
      addTo: backScrewGroup,
      visible: false,
      translate: { z: -100 },
    });

    let bottomScrewGroup = new Zdog.Group({
      addTo: front,
    });
    let bottomScrewRight = new Zdog.Ellipse({
      addTo: bottomScrewGroup,
      diameter: 6,
      stroke: false,
      fill: true,
      color: "#b5b5b5",
      rotate: { x: Zdog.TAU / 4 },
      translate: { y: 99 / 2 + 22, x: 86 / 2 - 15 },
      stroke: 3,
    });
    let bottomScrewLeft = bottomScrewRight.copy({
      translate: { y: 99 / 2 + 22, x: -86 / 2 + 15 },
    });
    new Zdog.Shape({
      //offset group for z-fighting
      addTo: bottomScrewGroup,
      visible: false,
      translate: { y: 200 },
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

customElements.define("bookend-model", BookendModel);
