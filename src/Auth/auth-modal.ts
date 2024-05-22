import {
  API,
  ScreenState,
  renderHeaderContent,
  renderSidebar,
  switchScreen,
} from "..";
import { Component } from "../Component/component";
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

  addEventListeners(): void {
    const setLoginMode = (
      modalTitle: HTMLElement,
      loginBtn: HTMLElement,
      registerBtn: HTMLElement,
      firstNameField: HTMLElement,
      firstNameInp: HTMLInputElement,
      lastNameField: HTMLElement,
      lastNameInp: HTMLInputElement,
      submitBtn: HTMLElement,
    ) => {
      modalTitle.textContent = "Войти";
      loginBtn.classList.add("active");
      firstNameField.style.display = "none";
      firstNameInp.removeAttribute("required");
      lastNameField.style.display = "none";
      lastNameInp.removeAttribute("required");
      registerBtn.classList.remove("active");
      submitBtn.textContent = "Войти";
    };

    const setRegisterMode = (
      modalTitle: HTMLElement,
      loginBtn: HTMLElement,
      registerBtn: HTMLElement,
      firstNameField: HTMLElement,
      firstNameInp: HTMLInputElement,
      lastNameField: HTMLElement,
      lastNameInp: HTMLInputElement,
      submitBtn: HTMLElement,
    ) => {
      modalTitle.textContent = "Зарегистрироваться";
      loginBtn.classList.remove("active");
      registerBtn.classList.add("active");
      firstNameField.style.display = "block";
      firstNameInp.setAttribute("required", "");
      lastNameField.style.display = "block";
      lastNameInp.setAttribute("required", "");
      submitBtn.textContent = "Зарегистрироваться";
    };

    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("auth-modal") as HTMLElement;
      const authForm = document.getElementById("auth-form") as HTMLElement;
      const loginBtn = document.getElementById("login-button") as HTMLElement;
      const firstNameField = document.querySelector(
        ".firstName",
      ) as HTMLElement;
      const firstNameInp = document.getElementById(
        "firstname",
      ) as HTMLInputElement;
      const lastNameField = document.querySelector(".lastName") as HTMLElement;
      const lastNameInp = document.getElementById(
        "lastname",
      ) as HTMLInputElement;
      const registerBtn = document.getElementById(
        "register-button",
      ) as HTMLElement;
      const modalTitle = document.getElementById("modal-title") as HTMLElement;
      const submitBtn = document.getElementById("submit-button") as HTMLElement;

      loginBtn.addEventListener("click", () => {
        setLoginMode(
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
        setRegisterMode(
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

      authForm.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        const username = (
          document.getElementById("username") as HTMLInputElement
        ).value;
        const firstName = (
          document.getElementById("firstname") as HTMLInputElement
        ).value;
        const lastName = (
          document.getElementById("lastname") as HTMLInputElement
        ).value;
        const password = (
          document.getElementById("password") as HTMLInputElement
        ).value;
        const isLoginMode = loginBtn.classList.contains("active");
        const isRegisterMode = registerBtn.classList.contains("active");

        try {
          let token = localStorage.getItem("access_token");


          if (isLoginMode) {
            const response = await fetch(`${API}/api/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
              throw new Error("Ошибка входа");
            }

            const data: AuthResponse = await response.json();
            token = data.access_token;
            localStorage.setItem('username', username)
            localStorage.setItem("access_token", token);
            modal.style.display = "none";

            renderHeaderContent();
            renderSidebar();
            switchScreen(ScreenState.Tracks);
          } else {
            setRegisterMode(
              modalTitle,
              loginBtn,
              registerBtn,
              firstNameField,
              firstNameInp,
              lastNameField,
              lastNameInp,
              submitBtn,
            );

            if (isRegisterMode) {
              const response = await fetch(`${API}/api/auth/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  username,
                  password,
                  firstName,
                  lastName,
                }),
              });

              if (!response.ok) {
                throw new Error("Ошибка регистрации");
              }

              const data: AuthResponse = await response.json();
              token = data.access_token;
              localStorage.setItem("username", username);
              localStorage.setItem("access_token", token);
              setLoginMode(
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
        } catch (error) {
          console.error(error);
        }
      });
      setLoginMode(
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
  }
}
