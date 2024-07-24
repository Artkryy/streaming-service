import { Component } from "../Component/component";

export const renderComponent = (
  component: Component,
  container: HTMLElement,
  flag: boolean = false
): void => {
const element = component.getElement();
container.appendChild(element)

if (flag === true) {
  container.prepend(element)
}

};

export const removeComponent = (component: Component): void => {
  component.removeElement()
}
