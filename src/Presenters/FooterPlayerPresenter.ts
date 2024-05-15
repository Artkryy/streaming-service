import { renderComponent } from "../core/render";
import FooterPlayer from "../Footer/footer-player";
import { Song } from "../interfaces/Song";

export class FooterPlayerPresenter {
  constructor(private trackData: Song) {}

  render(container: HTMLElement): void {
    const trackComponent = new FooterPlayer(this.trackData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
