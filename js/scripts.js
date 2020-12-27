const gallery = document.querySelector('#gallery')
const closeModal = document.querySelector('.modal-close-btn')
const div = document.createElement('div')
const searchContainer = document.querySelector('.search-container')
let cardIndex = 0;
const formElement = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`

fetch('https://randomuser.me/api/?results=12').then(res => res.json()).then(data => generateEmployeeData(data.results)).catch(error => console.log('Looks like there was a problem!', error))


function enableSearch(data) {
    searchContainer.innerHTML = formElement
    const searchInput = document.querySelector('#search-input')
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value
        const searchResult = data.filter(employee => employee.name.first.toLowerCase().includes(searchText) || employee.name.last.toLowerCase().includes(searchText) || employee.email.toLowerCase().includes(searchText))
        generateEmployeeData(searchResult, 'search')
    })
}

function formatPhoneNumber(phone) {
    if(phone.replace(/\D+/g, '')>10){
       phone.replace(/^0+/, '')
    }
        phone= phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        return phone
}


function generateEmployeeData(data, search) {
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

function employeeModal(data, modalAction) {
    
    const currentEmployee = data[cardIndex]
    console.log('current', currentEmployee)
    const date = new Date(currentEmployee.dob.date);
    const dob = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    })

    return `
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${
        currentEmployee.picture.medium
    }" alt="profile picture">
        <h3 id="name" class="modal-name cap">${
        currentEmployee.name.first.concat(' ', currentEmployee.name.last)
    }</h3>
        <p class="modal-text">${
        currentEmployee.email
    }</p>
        <p class="modal-text cap">${
        currentEmployee.location.city
    }</p>
        <hr>
        <p class="modal-text">${
            formatPhoneNumber(currentEmployee.cell)
    }</p>
        <p class="modal-text">${
        currentEmployee.location.street.number
    } ${
        currentEmployee.location.street.name
    }, ${
        currentEmployee.location.city
    }, ${
        currentEmployee.location.state.split('', 2).join('').toUpperCase()
    } ${
        currentEmployee.location.postcode
    }</p>
        <p class="modal-text">Birthday: ${dob} </p>
    </div>
 </div>
 <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
 </div>
 `
}


function removeModal() {
    const modal = document.querySelector('.modal-container')
    gallery.parentNode.removeChild(modal)
}

function openModal(data, employee) {
    div.innerHTML = employeeModal(data)
    const closeButton = document.querySelector('#modal-close-btn')
    const nextEmployee = document.querySelector('#modal-next')
    const prevEmployee = document.querySelector('#modal-prev')
    closeButton.addEventListener('click', () => removeModal())
    nextEmployee.addEventListener('click', () => generateModal(employee,data, 'next'))
    prevEmployee.addEventListener('click', () => generateModal(employee,data, 'prev'))
}

function generateModal(employee, data, modalAction) {
    div.className = "modal-container"
    gallery.parentNode.appendChild(div);
    if (modalAction == 'next') {
       if(cardIndex == data.length-1){
           cardIndex=0;
       } else{
        cardIndex++;
       }
        

    } else if (modalAction == 'prev') {
        console.log(cardIndex, data.length)
        if(cardIndex==0){
            cardIndex=data.length-1;
        }else{
            cardIndex--;
        }
        
    } else{
    cardIndex = data.findIndex(current => current.email == employee)
    }
    openModal(data, employee)
}
