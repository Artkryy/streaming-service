import {
  ScreenState,
  renderHeaderContent,
  renderSidebar,
  switchScreen,
} from "..";
import { Component } from "../Component/component";
import { login, register } from "../api/api";
import { AuthResponse } from "../interfaces/AuthResponse";

export default class AuthModal extends Component {
  constructor() {
    super();
  }

  getTemplate(): string {
    return `
    <div id="auth-modal" class="modal">
      <div class="modal-content">
        <h2 id="modal-title"></h2>
        <div id="auth-options">
          <button id="login-button" class="toggle-button active">Войти</button>
          <button id="register-button" class="toggle-button">Зарегистрироваться</button>
        </div>
        <form id="auth-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
          </div>
          <div class="form-group firstName">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" name="firstname" required>
          </div>
          <div class="form-group lastName">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" name="lastname" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <div class='form-error'></div>
          <button type="submit" class='btn-auth' id="submit-button">Войти</button>
        </form>
      </div>
    </div>
    `;
  }

  setLoginMode(
    modalTitle: HTMLElement,
    loginBtn: HTMLElement,
    registerBtn: HTMLElement,
    firstNameField: HTMLElement,
    firstNameInp: HTMLInputElement,
    lastNameField: HTMLElement,
    lastNameInp: HTMLInputElement,
    submitBtn: HTMLElement,
  ) {
    modalTitle.textContent = "Войти";
    loginBtn.classList.add("active");
    firstNameField.style.display = "none";
    firstNameInp.removeAttribute("required");
    lastNameField.style.display = "none";
    lastNameInp.removeAttribute("required");
    registerBtn.classList.remove("active");
    submitBtn.textContent = "Войти";
  }

  setRegisterMode(
    modalTitle: HTMLElement,
    loginBtn: HTMLElement,
    registerBtn: HTMLElement,
    firstNameField: HTMLElement,
    firstNameInp: HTMLInputElement,
    lastNameField: HTMLElement,
    lastNameInp: HTMLInputElement,
    submitBtn: HTMLElement,
  ) {
    modalTitle.textContent = "Зарегистрироваться";
    loginBtn.classList.remove("active");
    registerBtn.classList.add("active");
    firstNameField.style.display = "block";
    firstNameInp.setAttribute("required", "");
    lastNameField.style.display = "block";
    lastNameInp.setAttribute("required", "");
    submitBtn.textContent = "Зарегистрироваться";
  }

  async handleLogin(username: string, password: string, modal: HTMLElement) {
    const response = await login(username, password);

    if (!response.ok) {
      console.error("Ошибка входа", await response.json());
    }

    const data: AuthResponse = await response.json();
    const token = data.access_token;
    localStorage.setItem("username", username);
    localStorage.setItem("access_token", token);
    modal.style.display = "none";

    renderHeaderContent(token);
    if (username) {
      renderSidebar(token, username);
    }
    await switchScreen(ScreenState.Tracks, token, username);
  }

  async handleRegister(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const response = await register(username, password, firstName, lastName);

    if (!response.ok) {
      throw new Error("Ошибка регистрации");
    }

    const data: AuthResponse = await response.json();
    const token = data.access_token;
    localStorage.setItem("username", username);
    localStorage.setItem("access_token", token);

    const modalTitle = document.getElementById("modal-title") as HTMLElement;
    const loginBtn = document.getElementById("login-button") as HTMLElement;
    const registerBtn = document.getElementById(
      "register-button",
    ) as HTMLElement;
    const firstNameField = document.querySelector(".firstName") as HTMLElement;
    const firstNameInp = document.getElementById(
      "firstname",
    ) as HTMLInputElement;
    const lastNameField = document.querySelector(".lastName") as HTMLElement;
    const lastNameInp = document.getElementById("lastname") as HTMLInputElement;
    const submitBtn = document.getElementById("submit-button") as HTMLElement;

    this.setLoginMode(
      modalTitle,
      loginBtn,
      registerBtn,
      firstNameField,
      firstNameInp,
      lastNameField,
      lastNameInp,
      submitBtn,
    );
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const firstName = (document.getElementById("firstname") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastname") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const loginBtn = document.getElementById("login-button") as HTMLElement;
    const modal = document.getElementById("auth-modal") as HTMLElement;
    const isLoginMode = loginBtn.classList.contains("active");

    try {
      if (isLoginMode) {
        await this.handleLogin(username, password, modal)
      } else {
        await this.handleRegister(username, password, firstName, lastName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  addEventListeners(): void {
    const loginBtn = document.getElementById("login-button") as HTMLElement;
    const registerBtn = document.getElementById(
      "register-button",
    ) as HTMLElement;
    const modalTitle = document.getElementById("modal-title") as HTMLElement;
    const firstNameField = document.querySelector(".firstName") as HTMLElement;
    const firstNameInp = document.getElementById(
      "firstname",
    ) as HTMLInputElement;
    const lastNameField = document.querySelector(".lastName") as HTMLElement;
    const lastNameInp = document.getElementById("lastname") as HTMLInputElement;
    const submitBtn = document.getElementById("submit-button") as HTMLElement;
    const authForm = document.getElementById("auth-form") as HTMLElement;

    loginBtn.addEventListener("click", () => {
      this.setLoginMode(
        modalTitle,
        loginBtn,
        registerBtn,
        firstNameField,
        firstNameInp,
        lastNameField,
        lastNameInp,
        submitBtn,
      );
    });

    registerBtn.addEventListener("click", () => {
      this.setRegisterMode(
        modalTitle,
        loginBtn,
        registerBtn,
        firstNameField,
        firstNameInp,
        lastNameField,
        lastNameInp,
        submitBtn,
      );
    });

    authForm.addEventListener("submit", (event: Event) =>
      this.handleSubmit(event),
    );

    this.setLoginMode(
      modalTitle,
      loginBtn,
      registerBtn,
      firstNameField,
      firstNameInp,
      lastNameField,
      lastNameInp,
      submitBtn,
    );
  }
}
