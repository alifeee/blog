function colorCycle(index) {
  let colors = ["#D84D60", "#D84D60", "#79B9D4", "#DCD18F", "#79B9D4"];
  return colors[index % colors.length];
}

function bezier_y_of_x(D, H, x) {
  // given four points in a rectangle with base D and height H,
  //  and a bezier curve starting at the bottom left point and ending at the bottom right point,
  //  return the (approximate) y value of the bezier curve at x
  let t;
  if (x < 0) {
    throw "x must be >= 0";
  } else if (x < D / 2) {
    t = (x / (2 * D)) ** 0.5;
  } else if (x <= D) {
    t = 1 - (1 / 2 - x / (2 * D)) ** 0.5;
  } else {
    throw "x must be <= D";
  }
  let y = 3 * H * t * (1 - t);
  return y;
}

class FoamCushionModel extends HTMLElement {
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
      rotate: { y: -Zdog.TAU / 16, x: -Zdog.TAU / 16 },
    });

    let anchor = new Zdog.Anchor({
      addTo: this.illo,
      translate: { y: 100 },
      rotate: { x: Zdog.TAU / 4 },
    });

    // top
    for (let z = 0; z < 80; z += 10) {
      new Zdog.Shape({
        addTo: anchor,
        path: [
          { x: -540 / 2, y: -380 / 2, z: z },
          {
            bezier: [
              { x: -580 / 2, y: -420, z: z },
              { x: 580 / 2, y: -420, z: z },
              { x: 540 / 2, y: -380 / 2, z: z },
            ],
          },
        ],
        closed: false,
        stroke: 10,
        color: colorCycle(z / 10),
        fill: false,
      });
    }

    // side
    let sideAnchor = new Zdog.Anchor({
      addTo: anchor,
      translate: { x: 540 / 2, y: -380 / 2 },
    });

    for (let x = 0; x >= -540; x -= 540) {
      for (let z = 0; z < 80; z += 10) {
        new Zdog.Shape({
          addTo: sideAnchor,
          path: [
            { x: x, y: 0, z: z },
            { x: x, y: 380, z: z },
          ],
          closed: false,
          stroke: 10,
          color: colorCycle(z / 10),
          fill: false,
        });
      }
    }

    // bottom
    let bottomAnchor = new Zdog.Anchor({
      addTo: anchor,
      translate: { x: 540 / 2, y: 380 / 2 },
    });
    for (let z = 0; z < 80; z += 10) {
      new Zdog.Shape({
        addTo: bottomAnchor,
        path: [
          { x: 0, y: 0, z: z },
          { x: -540, y: 0, z: z },
        ],
        closed: false,
        stroke: 10,
        color: colorCycle(z / 10),
        fill: false,
      });
    }

    // front + back
    let frontAnchor = new Zdog.Anchor({
      addTo: anchor,
      translate: { x: -540 / 2, y: -380 / 2 },
    });
    for (let z = 0; z <= 80; z += 80) {
      for (let x = 0; x < 540; x += 10) {
        new Zdog.Shape({
          addTo: frontAnchor,
          path: [
            { x: x, y: 380, z: z },
            { x: x, y: -bezier_y_of_x(540, 220, x), z: z },
          ],
          closed: false,
          stroke: 10,
          color: colorCycle(x / 10),
          fill: false,
        });
      }
    }

    // flap
    let flapAnchor = new Zdog.Anchor({
      addTo: anchor,
      translate: { x: -540 / 2, y: -380 / 2 },
    });
    for (let y = 320; y >= 280; y -= 10) {
      new Zdog.Shape({
        addTo: flapAnchor,
        path: [
          { x: 0, y: y, z: 0 },
          { x: 540, y: y, z: 0 },
        ],
        closed: false,
        stroke: 10,
        color: colorCycle(y / 10),
        fill: false,
      });
    }

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

customElements.define("foam-cushion-model", FoamCushionModel);
