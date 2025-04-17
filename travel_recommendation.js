const searchBtn = document.getElementById('btnSearch');
const clearBtn = document.getElementById('btnClear');

function checkInput(input) {
    var lower = input.toLowerCase();
    if ('beaches'.includes(lower)){
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
    if (input === '') {
        console.log('Pesquisou nada!')
    } else {
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                const places = [];
                if (input === 'countries') {
                    const countryNames = data.countries.map(country => country);
                    console.log(countryNames);
                } else if (input === 'temples') {
                    const templeNames = data.temples.map(temple => temple);
                    console.log(templeNames);
                } else if (input === 'beaches') {
                    const beachNames = data.beaches.map(beach => beach);
                    console.log(beachNames);
                } else {
                    resultDiv.innerHTML = 'Invalid search'
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