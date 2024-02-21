document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');

    const showPokemonDetails = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();

        const colors = {
            electric: '#f3d23b',
            fighting: '#ce4069',
            psychic: '#f97176',
            ground: '#d97746',
            normal: '#9099a1',
            flying: '#92aade',
            poison: '#ab6ac8',
            dragon: '#096dc4',
            steel: '#5a8ea1',
            grass: '#63bb5b',
            fairy: '#ec8fe6',
            ghost: '#5269ac',
            water: '#4d90d5',
            rock: '#c7b78b',
            fire: '#ff9c54',
            dark: '#5a5366',
            bug: '#90c12c',
            ice: '#74cec0'
        }

        const imgs = {
            electric: 'img/Elétrico.png',
            fighting: 'img/Lutador.png',
            psychic: 'img/Psíquico.png',
            ground: 'img/Terra.png',
            normal: 'img/Normal.png',
            flying: 'img/Voador.png',
            poison: 'img/Veneno.png',
            dragon: 'img/Dragão.png',
            steel: 'img/Aço.png',
            grass: 'img/Grama.png',
            fairy: 'img/Fada.png',
            ghost: 'img/Fantasma.png',
            water: 'img/Água.png',
            rock: 'img/Pedra.png',
            fire: 'img/Fogo.png',
            dark: 'img/Sombrio.png',
            bug: 'img/Inseto.png',
            ice: 'img/Gelo.png'
        }

        function temSec() {
            if (data.types.length > 1 && data.types[1].type && data.types[1].type.name) {
                return data.types[1].type.name;
            } else {
                return null
            }
        }
        let mainType = data.types[0].type.name;
        let secType = temSec();



        const color = colors[mainType] || '#ffffff';
        const color2 = colors[secType] || '#ffffff';
        const img1 = imgs[mainType];
        const img2 = imgs[secType];

        if (mainType == secType || secType == undefined) {
            var pType = `<p><span class="tipo" style="background-color: ${color}"><img class="imgtype" src="${img1}">${mainType}</span></p>`;
        } else {
            pType = `<p><span class="tipo" style="background-color: ${color}"><img src="${img1}">${mainType}</span>
            <span class="tipo" style="background-color: ${color2}"><img class="imgtype" src="${img2}" alt="tipo" height="15px">${secType}</span></p>
            `;
        }

        const pokemonDetailsHTML = `
        <div class="body" style="background-color: ${color};">
        <div class="container">
        <div style="padding: 20px;">
        <div class="name">
        <h2>${data.name[0].toUpperCase() + data.name.slice(1)}</h2>
        <p class="id">#${data.id}</p>
        </div>
        ${pType}
        <div class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        </div>
        </div>
        
            <footer style="background-color: #290b47">
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            </footer>
        </div>
        `;

        detailsContainer.innerHTML = pokemonDetailsHTML;
    };

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    if (pokemonId) {
        showPokemonDetails(pokemonId);
    } else {
        console.error('Pokemon ID not found in the URL');
    }
});
