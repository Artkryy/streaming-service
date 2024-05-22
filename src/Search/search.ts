import { Component } from "../Component/component";

export default class Search extends Component {
  private onSearchInputChange?: (filter: string) => void;

  constructor() {
    super();
  }

  getTemplate(): string {
    return `<input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">`;
  }

  addEventListeners(): void {
    this.element?.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const filter = target.value;
      // console.log(filter);
      if (this.onSearchInputChange) {
        this.onSearchInputChange(filter);
      }
    });
  }

  setSearchInputChangeHandler(handler: (filter: string) => void): void {
    this.onSearchInputChange = handler;
  }
}
