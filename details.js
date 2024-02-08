// details.js
document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');

    // Function to fetch and display Pokemon details
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

        const mainType = data.types[0].type.name;
        const secType = data.types[1].type.name;

        // Get the background color based on the main type
        const color = colors[mainType] || '#ffffff';
        const color2 = colors[secType] || '#ffffff';

        if (secType === mainType || secType === undefined) {
            var pType = `<p class="tipo" style="background-color: ${color}">${mainType}</p>`;
        } else {
            pType = `<p><span class="tipo" style="background-color: ${color} opacity: 1">${mainType}</span>
            <span class="tipo" style="background-color: ${color2}">${secType}</span></p>
            `;
        }

        // Create HTML content for Pokemon details
        const pokemonDetailsHTML = `
        <div style="background-color: ${color}; padding: 20px;">
        <div class="name">
        <h2>${data.name[0].toUpperCase() + data.name.slice(1)}</h2>
        <p class="id">#${data.id}</p>
        </div>
        ${pType}
        <div class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
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
        <br>
        <br>
        </footer>
        `;

        // Display details in the container
        detailsContainer.innerHTML = pokemonDetailsHTML;
    };

    // Extract Pokemon ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    // Show details if Pokemon ID is present in the URL
    if (pokemonId) {
        showPokemonDetails(pokemonId);
    } else {
        // Handle the case where there is no Pokemon ID in the URL
        console.error('Pokemon ID not found in the URL');
    }
});
