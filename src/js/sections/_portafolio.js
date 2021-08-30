import { portafolioInfo } from "./_portafolioData";

const portafolioRow = document.querySelector('#portafolio .row');
const portafolioModal = document.getElementById('portafolioModal');
const portafolioModalPopup = new bootstrap.Modal(portafolioModal, {});

for (const data of portafolioInfo) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-md-6', 'col-lg-4');
    newDiv.innerHTML =
        `
        <div class="img-container">
            <img class="img-fluid" src="${data.imgUrl}" alt="${data.title}">
            <div class="zoom-overlay">
                <i class="fas fa-search-plus"></i>
                <h4>${data.title}</h4>
            </div>
        </div>
    `
    portafolioRow.append(newDiv);
}

const portafolioData = document.querySelectorAll('.img-container .zoom-overlay');
portafolioData.forEach((element, index) => {
    element.addEventListener('click', () => {
        generateModal(index + 1);
        portafolioModalPopup.show();
    });
});


let theIndex = 1;
function generateModal(index) {

    const modalTitle = document.querySelector('#portafolioModal .modal-content .modal-header h1');
    const modalSubtitle = document.querySelector('#portafolioModal .modal-content .modal-header h4');
    const modalImage = document.querySelector('#portafolioModal .modal-content .modal-body img');
    const modalSite = document.querySelector('#portafolioModal .modal-content .modal-footer .go-site');
    const modalDesc = document.querySelector('#portafolioModal .modal-content .modal-footer p');

    const element = portafolioInfo.find(e => e.id === index);

    modalTitle.innerHTML = element.title;
    modalSubtitle.innerHTML = element.subtitle;

    modalImage.setAttribute("src", element.imgUrl);
    modalImage.setAttribute("alt", element.title);

    modalSite.setAttribute("href", element.websiteUrl);
    modalDesc.innerHTML = element.description;

    theIndex = index;

}

const leftArrow = document.querySelector('.modal-body .fa-chevron-left');
leftArrow.addEventListener('click', () => {
    if (theIndex === 1) {
        generateModal(portafolioInfo.length);
    }
    else {
        generateModal(theIndex - 1);
    }
});

const rightArrow = document.querySelector('.modal-body .fa-chevron-right');
rightArrow.addEventListener('click', () => {
    if (theIndex === portafolioInfo.length) {
        generateModal(1);
    }
    else {
        generateModal(theIndex + 1);
    }
});

