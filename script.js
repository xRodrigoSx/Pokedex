const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151
const colors = {
    grass: '#DEFDE0',
    water: '#DEF3FD',
    fire: '#FDDFDF',
    electric: '#FCF7DE',
    normal: '#F5F5F5',
    bug: '#F8D5A3',
    poison: '#98D7A5',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    dragon: '#97B3E6',
    psychic: '#EAEdA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    steel: '',
    ice: '',
    ghost: ''
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

    if(type2 === type || type2 === undefined){
        var pType = `<small class="type"><span>${type}</span></small>`
    }else{
        pType = `<small class="type"><span>${type}</span></small>
                 <small class="type"><span>${type2}</span></small>`
    }
    
    var pokemonInnerHTML = `
    <a class="detalhes" href="/detail/${id}">
    <span class="number">#${id}</span>
        <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
        <h3 class="name">${name}</h3>
        ${pType}
            </div>
            </a>
            ` 

    card.innerHTML = pokemonInnerHTML

    // Adiciona um evento de mouseover para aumentar levemente o tamanho quando o mouse estiver sobre o card
    card.addEventListener('mouseover', () => {
        card.classList.add('highlight');
    });

    // Adiciona um evento de mouseout para remover a classe de destaque quando o mouse sair do card
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