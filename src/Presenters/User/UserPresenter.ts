import UserComponent from "../../User/user";
import { renderComponent } from "../../core/render";
import { User } from "../../interfaces/User";

export class UserPresenter {
  constructor(private userData: User) {}

  render(container: HTMLElement): void {
    const trackComponent = new UserComponent(this.userData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
