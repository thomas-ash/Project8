// GLOBAL -------------------------------
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
let employees = [];
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");



// FETCH FROM API -------------------------------
fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

// FUNCTIONS -------------------------------
function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="block" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
            </div>
        </div>
        `
    });

    container.innerHTML = employeeHTML;
}

function displayModal(index) {
   let { name, dob, phone, email, location: { city, street, state, postcode } , picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="city">${city}</p>
        <hr />
        <p>${phone}</p>
        <p>${street}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div> `;
        overlay.classList.remove("hidden");
        modalContent.innerHTML = modalHTML;
}

// EVENT LISTENERS -------------------------------
container.addEventListener('click', e => {
    
    if (e.target !== container) {
     
    const block = e.target.closest(".block");
    const index = block.getAttribute('data-index');
    
    displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
    
