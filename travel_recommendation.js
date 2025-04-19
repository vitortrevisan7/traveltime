const searchBtn = document.getElementById('btnSearch');
const clearBtn = document.getElementById('btnClear');

function checkInput(input) {
    var lower = input.toLowerCase();
    if (lower === '') {
        return input;
    } else if ('beaches'.includes(lower)){
        return 'beaches';
    } else if ('countries'.includes(lower) || 'country'.includes(lower)){
        return 'countries';
    } else if ('temples'.includes(lower)){
        return 'temples';
    } else {
        return input;
    }
}

function searchTrip() { //Continuar essa função!!
    const input_ini = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    var input = checkInput(input_ini);
    var places = [];

    if (input === '') {
        console.log('Pesquisou nada!')
    } else {
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                if (input === 'countries') {
                    const countryNames = data.countries.map(country => country.cities);
                    places = countryNames.flat()
                } else if (input === 'temples') {
                    places = data.temples.map(temple => temple);
                } else if (input === 'beaches') {
                    places = data.beaches.map(beach => beach);
                } else {
                    resultDiv.innerHTML = 'Invalid search'
                }

                if (places.length > 0) {
                    for (let i=0; i<places.length; i++) {
                        resultDiv.innerHTML += `<div class="recom">`;
                        resultDiv.innerHTML += `<img src="${places[i].imageUrl}" alt="img">`;
                        resultDiv.innerHTML += `<h2>${places[i].name}</h2>`;
                        resultDiv.innerHTML += `<p>${places[i].description}</p>`;
                        resultDiv.innerHTML += `</div>`;
                    }
                } else {
                    console.log('Vazio mesmo');
                }

            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'An error occurred while fetching data.';
            });
    }
}

function clearSearch() {
    const resultDiv = document.getElementById('result');
    document.getElementById('searchInput').value = '';
    resultDiv.innerHTML = '';
}

function thankyou(){
    alert('Thank you for contacting us!')
}

searchBtn.addEventListener('click', searchTrip);
clearBtn.addEventListener('click', clearSearch);
