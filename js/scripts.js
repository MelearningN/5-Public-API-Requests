const gallery = document.querySelector('#gallery')
const div = document.createElement('div')
const searchContainer = document.querySelector('.search-container')

let cardIndex = 0;

// search input element
const formElement = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`

// fetching the data from random user endpoint
fetch('https://randomuser.me/api/?results=12').then(res => res.json()).then(data => generateEmployeeData(data.results)).catch(error => errorOnPage(error))


function errorOnPage() {
    gallery.innerHTML = '<img src="somethingWentWrong.png">'
    gallery.parentNode.setAttribute('style', 'background-color:deepskyblue')
}


// only runs when user tries to search an employee
function enableSearch(data) {
    searchContainer.innerHTML = formElement
    const searchInput = document.querySelector('#search-input')
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value
        const searchResult = data.filter(employee => employee.name.first.toLowerCase().includes(searchText) || employee.name.last.toLowerCase().includes(searchText) || employee.email.toLowerCase().includes(searchText))
        if (searchResult.length == 0) {
            console.log('running', gallery)
            gallery.setAttribute('style', 'background-color: darkgrey')
            gallery.innerHTML = '<img src="noResultFound.png">'
        } else {
            generateEmployeeData(searchResult, 'search')
        }
    })
}


// returns phone number with (xxx-xxx-xxxx) format
function formatPhoneNumber(phone) {
    if (phone.replace(/\D+/g, '') > 10) {
        phone.replace(/^0+/, '')
    }
    phone = phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return phone
}


// parsing the employee information resulted from api
function generateEmployeeData(data, search) {
    gallery.setAttribute('style', 'background-color: azure')
    if (search != 'search') {
        enableSearch(data)
    }
    const card = data.map(employee => `
<div class="card">
<div class="card-img-container">
    <img class="card-img" src=${
        employee.picture.medium
    } alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">${
        employee.name.first
    } ${
        employee.name.last
    }</h3>
    <p class="card-text">${
        employee.email
    }</p>
    <p class="card-text cap">${
        employee.location.city
    }, ${
        employee.location.state
    }</p>
</div>
</div>
    `).join('')

    gallery.innerHTML = card;
    const individualCards = document.querySelectorAll('.card')
    for (var i = 0; i < individualCards.length; i++) {
        individualCards[i].addEventListener('click', (e) => generateModal(e.target.children[1].children[1].innerHTML, data))
    }
}
