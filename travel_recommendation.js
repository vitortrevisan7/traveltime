const clearBtn = document.getElementById('btnClear');

function clearSearch() {
    document.getElementById("searchInput").value = '';
}

function thankyou(){
    alert('Thank you for contacting us!')
}

clearBtn.addEventListener('click', clearSearch);