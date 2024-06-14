import { Component } from "../../Component/component";

export default class PlaylistList extends Component {
  constructor() {
    super();
  }

  getTemplate(): string {
    return `<section class="playlist section">
  <h2 class="playlist__h2">Плейлисты</h2>
  <ul class="playlist__list"> </ul>
</section>`;
  }

  addEventListeners(): void {}
}
