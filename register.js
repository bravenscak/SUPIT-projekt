(() => {
    const registerForm = document.querySelector("#register");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        register();
    })

    function register(){
        const loginData = {
            username: username.value,
            password: password.value
        } 

        const response = fetch("https://www.fulek.com/data/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })

        response
            .then((result) => result.json())
            .then((data) => {
                location.replace("login.html")
            })
            .catch(() => alert("Wrong info or user already exists"))
    }
})()