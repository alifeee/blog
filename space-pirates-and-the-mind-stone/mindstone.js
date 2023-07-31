const htmlcontent = `
<script src="//unpkg.com/alpinejs"></script>
<link
    rel="preload"
    as="image"
    href="./images/mindstone-spin_spritesheet.png"
    />
<div x-data="{spinning: false}">
    <sprite-img
        id="mindstone"
        src="./images/mindstone-idle_spritesheet.png"
        x-on:mouseenter="spinning = true;"
        x-on:mouseleave="spinning = false;"
        height="25"
        width="20"
        frames="8"
        looping="true"
        fps="5"
        startpaused="false"
        scale="5"
        :src="spinning ? './images/mindstone-spin_spritesheet.png' : './images/mindstone-idle_spritesheet.png'"
        :frames="spinning ? 10 : 8"
        :fps="spinning ? 10 : 5"
        ></sprite-img>
</div>
`;

class HoverableMindstone extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = htmlcontent;
  }
}

customElements.define("hoverable-mindstone", HoverableMindstone);
