document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');

    const showPokemonDetails = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();

        const colors = {
            electric: '#f7d327',
            fighting: '#f178a1',
            psychic: '#f68692',
            ground: '#ef8f5d',
            normal: '#a9aaac',
            flying: '#a8bfeb',
            poison: '#cb89e0',
            dragon: '#187bcc',
            steel: '#7dc3dd',
            grass: '#54c364',
            fairy: '#ffcaf8',
            ghost: '#6078b6',
            water: '#89cbff',
            rock: '#d2c5a5',
            fire: '#faab68',
            dark: '#676371',
            bug: '#a2e11e',
            ice: '#87f3e4'
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
            var pType = `<p><span class="tipo" style="background-color: ${color} opacity: 1"><img class="imgtype" src="${img1}">${mainType}</span></p>`;
        } else {
            pType = `<p><span class="tipo" style="background-color: ${color} opacity: 1"><img src="${img1}">${mainType}</span>
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
