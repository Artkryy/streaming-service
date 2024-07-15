import { Component } from "../Component/component";

export default class Search extends Component {
  private onSearchInputChange?: (filter: string) => void;
  private debounce: number | undefined;

  constructor() {
    super();
    this.debounce = undefined;
  }

  getTemplate(): string {
    return `
    <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
    `;
  }

  addEventListeners(): void {
    this.element?.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const filter = target.value;

      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = window.setTimeout(() => {
        if (this.onSearchInputChange) {
          this.onSearchInputChange(filter);
        }
      }, 500);
    });
  }

  setSearchInputChangeHandler(handler: (filter: string) => void): void {
    this.onSearchInputChange = handler;
  }
}
