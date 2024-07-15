import AuthModal from "../../Auth/auth-modal";
import { renderComponent } from "../../core/render";

export class AuthModalPresenter {
  constructor() {}

  render(container: HTMLElement): void {
    const trackComponent = new AuthModal();
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
