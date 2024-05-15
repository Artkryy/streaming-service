import { createElement } from "../utils";

export abstract class Component {
  protected element: HTMLElement | null = null;

  abstract getTemplate(): string;

  protected createElement(template: string): HTMLElement {
    return createElement(template);
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  removeElement(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  protected abstract addEventListeners(): void;
}
