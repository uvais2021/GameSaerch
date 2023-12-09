const apiUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '24a45ff3cfmsh30f9ad512784fe8p110a33jsna65e18feba86',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
const searchInput = document.getElementById('search-input');
const resultContainer = document.querySelector('.search-results');
const gameForm = document.getElementById('form');
const main=document.getElementById('main');

async function searchGame(gameName) {
    // Construct the URL dynamically based on the game name
    const searchUrl = `${apiUrl}?tag=${encodeURIComponent(gameName)}&platform=pc`;
    const response = await fetch(searchUrl, options);
    const data = await response.json();

    console.log(data);


    var tableBody = document.getElementById('search-results');
    main.innerHTML="";
    // Check if data is an array before using forEach
    if (Array.isArray(data)) {
        data.forEach(user => {
            const row = document.createElement('div');
            row.innerHTML = `
                <div class="result-games">
                    <img src="${user.thumbnail}" alt="" />
                    <div class="name">
                        <label>Title:</label>
                        <p id="title">${user.title}</p>
                    </div>
                    <label for="">Description: <p id="description">${user.short_description}</p> </label>
                    <label for="">Platform:<p id="platform">${user.platform}</p></label>
                    <label for="">Release Date:<p id="release-date">${user.release_date}</p></label>
                </div>`;

            tableBody.appendChild(row);
        });
    } else {
        // Handle the case where data is not an array
        console.error('Invalid or missing data:', data);
        tableBody.innerHTML = "<p>No results found.</p>";
    }
}

gameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (searchInput.value) {
        searchGame(searchInput.value);
        searchInput.value = "";
    } else {
        alert("Enter the Correct Game Name");
    }
});