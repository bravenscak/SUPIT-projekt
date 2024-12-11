document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    const navbarUl = document.getElementById('navigationBarList'); 
    if (token) {
        const li = document.createElement('li');
        li.className = 'nav-item'; 
        const a = document.createElement('a');
        a.className = 'nav-link'; 
        a.href = 'nastavniPlan.html';
        a.textContent = 'Nastavni plan'; 
        li.appendChild(a);
        navbarUl.appendChild(li);
    }
});

const slika = document.getElementById('imgNovosti');
const sirina = slika.width;
const visina = slika.height;
console.log(slika);
slika.addEventListener('', ()=> {
    slika.style.width=sirina*1.2;
    slika.style.height=visina*1.2;
});

const gumb=document.getElementById('novostiBoja');
const naslov=document.getElementById('naslov');

gumb.addEventListener('click', ()=> {
    naslov.style.color='red';  
});