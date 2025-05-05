const Login = (function () {
    const userNameInput = document.querySelector(".username-input");
    const passwordInput = document.querySelector(".password-input");
    const loginBtn = document.querySelector(".login-btn");
    const registerToggle = document.querySelector(".register-toggle");

    function init() {
        setupEventListener();
    }

    function setupEventListener() {
        loginBtn.addEventListener("click", async (e) => {
            // console.log(e.target);
            // console.log(userNameInput.value, passwordInput.value);
            try {
                const response = await fetch(
                    "https://67ed4a0a4387d9117bbd140e.mockapi.io/api/users"
                );
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        });
    }

    return { init };
})();
Login.init();
