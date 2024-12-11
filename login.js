(() => {
    const loginForm = document.querySelector("#login");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    })

    function login(){
        const loginData = {
            username: username.value,
            password: password.value
        } 

        const response = fetch("https://www.fulek.com/data/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })

        response
            .then((result) => result.json())
            .then((data) => {
                storeTokenToSessionStorage(data.data.token)
                location.replace("index.html")
            })
            .catch(() => alert("Wrong email or password"))

        function storeTokenToSessionStorage(token) {
            sessionStorage.setItem("token", token)
        }
    }
})()