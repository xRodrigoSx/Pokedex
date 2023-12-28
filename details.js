// details.js
document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');

    // Function to fetch and display Pokemon details
    const showPokemonDetails = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();

        const colors = {
            grass: '#7AC74C',
            water: '#6390F0',
            fire: '#EE8130',
            electric: '#F7D02C',
            normal: '#A8A77A',
            bug: '#A6B91A',
            poison: '#A33EA1',
            ground: '#E2BF65',
            rock: '#B6A136',
            fairy: '#D685AD',
            dragon: '#6F35FC',
            psychic: '#F95587',
            flying: '#A98FF3',
            fighting: '#C22E28',
            steel: '#B7B7CE',
            ice: '#96D9D6',
            ghost: '#735797',
            dark: '#705746'
        }

        const mainType = data.types[0].type.name;

        // Get the background color based on the main type
        const color = colors[mainType] || '#ffffff';

        // Create HTML content for Pokemon details
        const pokemonDetailsHTML = `
        <div style="background-color: ${color}; padding: 20px;">
        <button onclick="goBack()"><</button>
        <div class="name">
        <h2>${data.name[0].toUpperCase() + data.name.slice(1)}</h2>
        <p>#${data.id}</p>
        </div>
        <p>${data.types.map(type => `<span class="tipo">${type.type.name}</span>`).join('')}</p>
        <div class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        </div>
        `;

        // Display details in the container
        detailsContainer.innerHTML = pokemonDetailsHTML;
    };

    // Function to go back to the main page
    window.goBack = () => {
        window.location.href = '/'; // Adjust the path to your main page
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
