document.addEventListener("DOMContentLoaded", function() {
    switchingText();
    document.getElementById("prijavaOdjava").addEventListener("click", function (e) {
        e.preventDefault();
        const token = sessionStorage.getItem("token");
        if (token != null) {
            logout();
        } else {
            window.location.href = "login.html";
        }
    });
});

function switchingText() {
    const token = sessionStorage.getItem("token");
    const prijavaOdjava = document.getElementById("prijavaOdjava");
    const navbarUl = document.getElementById('navigationBarList'); 
    if (token != null) {
        prijavaOdjava.textContent = "Odjavi se";
    } else {
        prijavaOdjava.textContent = "Prijavi se";
    }
}
function logout() {
    sessionStorage.removeItem("token");
    window.location.reload();
    switchingText();
    alert("Uspjesno ste se odjavili");
    window.location.href = "index.html";
}
