import UserComponent from "../../User/user";
import { renderComponent } from "../../core/render";

export class UserPresenter {
  constructor() {}

  render(container: HTMLElement): void {
    const trackComponent = new UserComponent();
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
