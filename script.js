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
        let tipo1 = type[0].toUpperCase() + type.slice(1);
        var pType = `<small class="type"><span>${tipo1}</span></small>`
    } else {
        let tipo1 = type[0].toUpperCase() + type.slice(1);
        let tipo2 = type2[0].toUpperCase() + type2.slice(1);
        pType = `<small class="type"><span>${tipo1}</span></small>
                 <small class="type"><span>${tipo2}</span></small>`
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

fetchPokemons()