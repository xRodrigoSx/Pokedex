const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151

let allPokemons = [];
let currentSort = 'id';

const colors = {
    grass: '#54c364',
    water: '#6bb2f2',
    fire: '#faab68',
    electric: '#d4b114',
    normal: '#a9aaac',
    bug: '#8fcf1a',
    poison: '#cb89e0',
    ground: '#ef8f5d',
    rock: '#d2c5a5',
    fairy: '#f2aee9',
    dragon: '#187bcc',
    psychic: '#f68692',
    flying: '#a8bfeb',
    fighting: '#e65757ff',
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
    allPokemons.push(data);
    createPokemonCard(data)
    console.log(data)
}

const lightenColor = (hex, lightnessIncrease = 20) => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    l = Math.min(1, l + lightnessIncrease / 100);

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r2, g2, b2;

    if (s === 0) {
        r2 = g2 = b2 = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r2 = hue2rgb(p, q, h + 1 / 3);
        g2 = hue2rgb(p, q, h);
        b2 = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r2 * 255)}, ${Math.round(g2 * 255)}, ${Math.round(b2 * 255)})`;
};


const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)

    var type = mainTypes.find(type => pokeTypes.indexOf(type) == 0)
    var type2 = mainTypes.find(type => pokeTypes.indexOf(type) > 0)

    const color1 = colors[type];
    const color2 = type2 ? colors[type2] : null;

    if (type2 && type2 !== type) {
        const lightColor = lightenColor(color1, 12); // mais fraco
        card.style.background = `linear-gradient(135deg, ${lightColor}, ${color1}, ${color2})`;
    } else {
        const lightColor = lightenColor(color1, 12); // mais fraco
        card.style.background = `linear-gradient(135deg, ${lightColor}, ${color1})`;
    }

    const createTypeBadge = (typeName) => {
        const label = typeName[0].toUpperCase() + typeName.slice(1);

        return `
            <img src="assets/img/${typeName}.png" alt="${label}">
    `;
    };

    let pType = createTypeBadge(type);

    if (type2 && type2 !== type) {
        pType += createTypeBadge(type2);
    }

    var pokemonInnerHTML = `
        <div class="card-top">
            <button class="favorite-btn" aria-label="Favoritar Pokémon">
                <i class="fa-regular fa-heart"></i>
            </button>
            <span class="number">#${id}</span>
        </div>

        <a class="detalhes" href="/details.html?id=${poke.id}">
            <div class="imgContainer">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
            </div>
            <div class="info">
                <h3 class="name">${name}</h3>
                <h2 class="types">${pType}</h2>
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

const sortPokemons = () => {
    if (currentSort === 'id') currentSort = 'name';
    else if (currentSort === 'name') currentSort = 'stats';
    else currentSort = 'id';

    pokeContainer.innerHTML = '';

    const sorted = [...allPokemons].sort((a, b) => {
        if (currentSort === 'id') {
            return a.id - b.id;
        }

        if (currentSort === 'name') {
            return a.name.localeCompare(b.name);
        }

        if (currentSort === 'stats') {
            const totalA = a.stats.reduce((s, st) => s + st.base_stat, 0);
            const totalB = b.stats.reduce((s, st) => s + st.base_stat, 0);
            return totalB - totalA;
        }
    });

    sorted.forEach(pokemon => createPokemonCard(pokemon));
};

document.getElementById('sortBtn').addEventListener('click', sortPokemons);

document.getElementById('filterBtn').addEventListener('click', () => {
    alert('Filtro avançado pode ser implementado aqui (tipo, stats, geração, etc)');
});

fetchPokemons()