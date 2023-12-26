// details.js
document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');

    // Function to fetch and display Pokemon details
    const showPokemonDetails = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();

        // Create HTML content for Pokemon details
        const pokemonDetailsHTML = `
            <h2>${data.name[0].toUpperCase() + data.name.slice(1)}</h2>
            <p>ID: #${data.id}</p>
            <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
            <!-- Add more details as needed -->

            <button onclick="goBack()">Go Back</button>
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
