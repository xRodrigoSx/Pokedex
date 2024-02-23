const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151

const colors = {
    grass: '#54c364',
    water: '#89cbff',
    fire: '#faab68',
    electric: '#f7d327',
    normal: '#a9aaac',
    bug: '#a2e11e',
    poison: '#cb89e0',
    ground: '#ef8f5d',
    rock: '#d2c5a5',
    fairy: '#ffcaf8',
    dragon: '#187bcc',
    psychic: '#f68692',
    flying: '#a8bfeb',
    fighting: '#f178a1',
    steel: '#7dc3dd',
    ice: '#87f3e4',
    ghost: '#6078b6',
    dark: '#676371'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
    console.log(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    var type = mainTypes.find(type => pokeTypes.indexOf(type) == 0)
    var type2 = mainTypes.find(type => pokeTypes.indexOf(type) > 0)
    const color = colors[type]

    card.style.backgroundColor = color

    if (type2 === type || type2 === undefined) {
        var pType = `<small class="type"><span>${type}</span></small>`
    } else {
        pType = `<small class="type"><span>${type}</span></small>
                 <small class="type"><span>${type2}</span></small>`
    }

    var pokemonInnerHTML = `
    <a class="detalhes" href="/details.html?id=${poke.id}">
        <span class="number">#${id}</span>
        <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
        <h3 class="name">${name}</h3>
        <h2>${pType}</h2>
        </div>
    </a>
            `

    card.innerHTML = pokemonInnerHTML

    card.addEventListener('mouseover', () => {
        card.classList.add('highlight');
    });

    card.addEventListener('mouseout', () => {
        card.classList.remove('highlight');
    });

    pokeContainer.appendChild(card)
}

const filterPokemons = () => {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();

    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        const name = pokemon.querySelector('.name').innerText.toLowerCase();
        const id = pokemon.querySelector('.number').innerText.slice(1);
        const type = pokemon.querySelector('.type span:nth-child(1)').innerText.toLowerCase();
        const type2Element = pokemon.querySelector('.type span:nth-child(2)');
        const type2 = type2Element ? type2Element.innerText.toLowerCase() : '';

        if (name.includes(filter) || id.includes(filter) || type.includes(filter) || type2.includes(filter)) {
            pokemon.style.display = 'block';
        } else {
            pokemon.style.display = 'none';
        }
    });
};

function updateMenu() {
    var dynamicMenuElement = document.getElementById("dynamicMenu");

    // Get the current screen width
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // You can set your own breakpoint values here
    if (screenWidth < 768) {
        dynamicMenuElement.innerHTML = generateMobileMenu();
    } else {
        dynamicMenuElement.innerHTML = generateDesktopMenu();
    }
}

function generateMobileMenu() {
    return `
    <a href="/index.html"><img src="img/original.png" alt="Logo"/></a>
    <div class"menu">
        <button class="toggle-menu">&#9776;</button>
        <div class="overlay">
            <a class="close-btn">&times;</a>
            <div class="menu-links">
                <a class="scroll-down">SOBRE</a>
                <a href="servicos.html">SERVIÇOS</a>
                <a href="contato.html">CONTATO</a>
            </div>
        </div>
        </div>
    `;
}

function generateDesktopMenu() {
    return `
    <a href="index.html"><img src="img/original.png" alt="Logo"/></a>
              <div class="menu">
                  <a class="scroll-down">SOBRE</a>
                  <a href="servicos.html">SERVIÇOS</a>
                  <a href="contato.html">CONTATO</a>
              </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    updateMenu(); // Call the function on page load

    // Listen for window resize events to update the menu dynamically
    window.addEventListener("resize", function () {
        updateMenu();
    });

    const button = document.querySelector(".scroll-down");
    const screenSizeElement = document.getElementById("screenSize");

    button.addEventListener("click", function () {
        // Get the dimensions of the screen
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        var targetY;

        // Define constants for readability
        const MOBILE_BREAKPOINT = 768;
        const SMALL_SCREEN_WIDTH = 360;

        if (1870 <= screenWidth && screenWidth <= 1890) {
            targetY = screenHeight * 0.78;
        } else if (1700 <= screenWidth && screenWidth <= 1720) {
            targetY = screenHeight * 0.94;
        } else if (screenWidth === SMALL_SCREEN_WIDTH) {
            targetY = screenHeight * 0.33;
        } else {
            targetY = screenHeight * 0;
        }

        screenSizeElement.textContent = `Tamanho da Tela: ${screenWidth} x ${screenHeight}`;

        window.scrollTo({
            top: targetY,
            behavior: "smooth",
        });
    });

    const toggleButton = document.querySelector('.toggle-menu');
    const closeButton1 = document.querySelector('.close-btn');
    const closeButton2 = document.querySelector('.scroll-down');
    const menu = document.querySelector('.menu');

    toggleButton.addEventListener('click', function () {
        menu.classList.add('overlay-active');
    });

    closeButton1.addEventListener('click', function () {
        menu.classList.remove('overlay-active');
    });

    closeButton2.addEventListener('click', function () {
        menu.classList.remove('overlay-active');
    });
});


fetchPokemons()