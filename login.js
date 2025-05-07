const Login = (function () {
    const username = document.querySelector(".username-input");
    const password = document.querySelector(".password-input");
    const loginBtn = document.querySelector(".login-btn");
    const registerToggle = document.querySelector(".register-toggle");

    registerToggle.disabled = true;

    function init() {
        setupEventListener();
    }

    async function createUser(user) {
        try {
            const response = await fetch(
                "https://67ed4a0a4387d9117bbd140e.mockapi.io/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            if (!response.ok) throw new Error(`Error ${response.status}`);

            const data = await response.json();

            console.log("USER created", data);
        } catch (error) {
            alert(`POST failed:,${error}`);
        }
    }

    async function getUsers() {
        try {
            const response = await fetch(
                "https://67ed4a0a4387d9117bbd140e.mockapi.io/api/users"
            );
            if (!response.ok) throw new Error("Could not get user");
            const data = await response.json();
            console.log("Fetched Users:", data);
            return data;
        } catch (error) {
            alert("Get failed");
        }
    }

    function resetInputs() {
        username.value = "";
        password.value = "";
    }

    function enabledRegisterBtn() {
        const answer = prompt(
            `if you would like to create an account enter "y/Y" to enabled Register Button, if no enter "n/N" `
        );

        if (answer.toLowerCase() === "y") {
            registerToggle.disabled = false;
            loginBtn.disabled = true;
            return;
        } else {
            return;
        }
    }
    function setupEventListener() {
        loginBtn.addEventListener("click", async (e) => {
            const data = await getUsers();
            if (username.value === "" || password.value === "") {
                alert("You must feel out all field");
                return;
            }

            // Stan password and Dana Alxi@
            const findExistUserAndPass = data.find(
                (user) =>
                    user.username === username.value &&
                    user.password === password.value
            );

            if (findExistUserAndPass) {
                console.log("login Successfull");

                // To switch to the movies app html
                window.location.href = `index.html?userId=${findExistUserAndPass.id}`;

                // to store userId temporarily
                localStorage.setItem("userId", findExistUserAndPass.id);
            } else {
                alert(`Username and Password Do not Exist,`);
                enabledRegisterBtn();
            }

            resetInputs();
        });

        registerToggle.addEventListener("click", async (e) => {
            console.log(registerToggle);
            if (username.value === "" || password.value === "") {
                alert("You must feel out all field");
                return;
            }

            const loginInfoObject = {
                username: username.value,
                password: password.value,
            };

            await createUser(loginInfoObject);
            await getUsers();
            resetInputs();
            loginBtn.disabled = false;
            registerToggle.disabled = true;
        });
    }

    return { init };
})();
Login.init();
