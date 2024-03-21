class ShelfModel extends HTMLElement {
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
      zoom: 1.5,
      dragRotate: true,
      onDragStart: () => this.startDrag(),
      onDragEnd: () => this.endDrag(),
      rotate: { y: -Zdog.TAU / 16, x: -Zdog.TAU / 24 },
    });

    let origin = new Zdog.Anchor({
      addTo: this.illo,
      translate: { x: -241 / 2, y: -143 / 2, z: -123 / 2 },
    });

    let leg_color = "#8f7453";
    let shelf_color = "#ad906c";

    let leftLeg_outerFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { z: 0, y: 15 },
        { z: 35, y: 15 },
        { z: 35, y: 0 },
        { z: 70, y: 0 },
        { z: 70, y: 15 },
        { z: 100, y: 15 },
        { z: 100, y: 143 },
        { z: 0, y: 143 },
      ],
      closed: true,
      fill: true,
    });
    leftLeg_outerFace.copy({
      translate: { x: 18 },
    });
    leftLeg_outerFace.copy({
      translate: { x: 241 - 18 },
    });
    leftLeg_outerFace.copy({
      translate: { x: 241 },
    });
    let leftLeg_frontFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { x: 0, y: 15 },
        { x: 18, y: 15 },
        { x: 18, y: 143 },
        { x: 0, y: 143 },
      ],
      closed: true,
      fill: true,
    });
    leftLeg_frontFace.copy({
      translate: { z: 100 },
    });
    leftLeg_frontFace.copy({
      translate: { x: 241 - 18 },
    });
    leftLeg_frontFace.copy({
      translate: { x: 241 - 18, z: 100 },
    });
    let leftLeg_bottomFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { x: 0, y: 143, z: 100 },
        { x: 18, y: 143, z: 100 },
        { x: 18, y: 143, z: 0 },
        { x: 0, y: 143, z: 0 },
      ],
      closed: true,
      fill: true,
    });
    leftLeg_bottomFace.copy({
      translate: { x: 241 - 18 },
    });
    let leftLeg_topFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { x: 0, y: 0, z: 35 },
        { x: 18, y: 0, z: 35 },
        { x: 18, y: 0, z: 70 },
        { x: 0, y: 0, z: 70 },
      ],
      closed: true,
      fill: true,
    });
    leftLeg_topFace.copy({
      translate: { x: 241 - 18 },
    });
    let leftLegTopMiddleFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { x: 0, y: 15, z: 0 },
        { x: 18, y: 15, z: 0 },
        { x: 18, y: 15, z: 100 },
        { x: 0, y: 15, z: 100 },
      ],
      closed: true,
      fill: true,
    });
    leftLegTopMiddleFace.copy({
      translate: { x: 241 - 18 },
    });
    let leftLegSpikeFrontFace = new Zdog.Shape({
      addTo: origin,
      color: leg_color,
      path: [
        { x: 0, y: 0, z: 35 },
        { x: 18, y: 0, z: 35 },
        { x: 18, y: 15, z: 35 },
        { x: 0, y: 15, z: 35 },
      ],
      closed: true,
      fill: true,
    });
    leftLegSpikeFrontFace.copy({
      translate: { z: 35 },
    });
    leftLegSpikeFrontFace.copy({
      translate: { x: 241 - 18 },
    });
    leftLegSpikeFrontFace.copy({
      translate: { x: 241 - 18, z: 35 },
    });

    let shelf_topFace = new Zdog.Shape({
      addTo: origin,
      color: shelf_color,
      path: [
        { x: 0, y: 0, z: 0 },
        { x: 241, y: 0, z: 0 },
        { x: 241, y: 0, z: 35 },
        { x: 223, y: 0, z: 35 },
        { x: 223, y: 0, z: 70 },
        { x: 241, y: 0, z: 70 },
        { x: 241, y: 0, z: 123 },
        { x: 0, y: 0, z: 123 },
        { x: 0, y: 0, z: 70 },
        { x: 18, y: 0, z: 70 },
        { x: 18, y: 0, z: 35 },
        { x: 0, y: 0, z: 35 },
      ],
      closed: true,
      fill: true,
    });
    shelf_topFace.copy({
      translate: { y: 15 },
    });
    let shelf_frontFace = new Zdog.Shape({
      addTo: origin,
      color: shelf_color,
      path: [
        { x: 0, y: 0, z: 123 },
        { x: 241, y: 0, z: 123 },
        { x: 241, y: 15, z: 123 },
        { x: 0, y: 15, z: 123 },
      ],
      closed: true,
      fill: true,
    });
    shelf_frontFace.copy({
      translate: { z: -123 },
    });
    let shelf_backLeftFace = new Zdog.Shape({
      addTo: origin,
      color: shelf_color,
      path: [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 35 },
        { x: 0, y: 15, z: 35 },
        { x: 0, y: 15, z: 0 },
      ],
      closed: true,
      fill: true,
    });
    shelf_backLeftFace.copy({
      translate: { x: 241 },
    });
    let shelf_frontLeftFace = new Zdog.Shape({
      addTo: origin,
      color: shelf_color,
      path: [
        { x: 0, y: 0, z: 70 },
        { x: 0, y: 0, z: 123 },
        { x: 0, y: 15, z: 123 },
        { x: 0, y: 15, z: 70 },
      ],
      closed: true,
      fill: true,
    });
    shelf_frontLeftFace.copy({
      translate: { x: 241 },
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

customElements.define("shelf-model", ShelfModel);
