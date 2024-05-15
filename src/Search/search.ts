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
    const input = this.element?.querySelector(".header__search__field");
    input?.addEventListener("input", (event) => {
      console.log('dadada');
      const target = event.target as HTMLInputElement;
      const filter = target.value;
      if (this.onSearchInputChange) {
        this.onSearchInputChange(filter);
      }
    });
  }

  setSearchInputChangeHandler(handler: (filter: string) => void): void {
    this.onSearchInputChange = handler;
  }
}
