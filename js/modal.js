// displaying an employee modal
function employeeModal(data) {
    const currentEmployee = data[cardIndex]
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

// when close button is clicked in modal
function removeModal() {
    const modal = document.querySelector('.modal-container')
    gallery.parentNode.removeChild(modal)
}

// When user card is clicked to open the modal
function generateModal(employee, data, modalAction) {
    div.className = "modal-container"
    gallery.parentNode.appendChild(div);
    if (modalAction == 'next') {
        if (cardIndex == data.length - 1) {
            cardIndex = 0;
        } else {
            cardIndex ++;
        }


    } else if (modalAction == 'prev') {
        console.log(cardIndex, data.length)
        if (cardIndex == 0) {
            cardIndex = data.length - 1;
        } else {
            cardIndex --;
        }

    } else {
        cardIndex = data.findIndex(current => current.email == employee)
    }
    div.innerHTML = employeeModal(data)
    const closeButton = document.querySelector('#modal-close-btn')
    const nextEmployee = document.querySelector('#modal-next')
    const prevEmployee = document.querySelector('#modal-prev')
    closeButton.addEventListener('click', () => removeModal())
    nextEmployee.addEventListener('click', () => generateModal(employee, data, 'next'))
    prevEmployee.addEventListener('click', () => generateModal(employee, data, 'prev'))
}
