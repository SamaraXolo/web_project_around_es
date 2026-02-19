const editProfileButton = document.querySelector(".profile__edit-button"); //Apunta exactamente al botón “Editar perfil”.
const editProfileModal = document.querySelector("#edit-popup"); //Selecciona el modal completo usando su id.
const editProfileCloseButton = editProfileModal.querySelector(".popup__close"); //Selecciona el botón de cerrar dentro del modal
const nameInput = editProfileModal.querySelector(".popup__input_type_name"); //Estas dos líneas seleccionan inputs específicamente dentro del modal de edición
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);
const profileName = document.querySelector(".profile__title"); // Seleccionan el nombre existente en el perfil
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = newCardForm.querySelector(".popup__input_type_url");
const inputNewCardList = newCardForm.querySelectorAll(".popup__input");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupCloseButton = imagePopup.querySelector(".popup__close");
const saveButton = editProfileModal.querySelector(".popup__button");
const inputList = editProfileForm.querySelectorAll(".popup__input");
const createButton = newCardModal.querySelector(".popup__button");
const createCardList = newCardForm.querySelectorAll(".popup__input");
const popups = document.querySelectorAll(".popup");

function checkInputValidity(input) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
  } else {
    errorElement.textContent = "";
  }
}

function hasInvalidInput(inputList) {
  // Función que revisa si existe AL MENOS un input inválido
  return Array.from(inputList).some(function (input) {
    // Convierte la lista de inputs en un array y revisa uno por uno
    return !input.validity.valid;
    // Devuelve true si este input NO es válido según HTML
  });
}

function toggleButtonState(inputList, buttonElement) {
  // Función que activa o desactiva el botón según el estado de los inputs
  buttonElement.disabled = hasInvalidInput(inputList);
}

document.addEventListener("keydown", function (event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closeModal(openedPopup);
  }
});

function closePopupOnOverlay(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
}

inputList.forEach((input) => {
  // Recorre cada input del formulario
  input.addEventListener("input", () => {
    //se dispara cada vez que el usuario escribe o borra
    toggleButtonState(inputList, saveButton);
    // Cada cambio vuelve a evaluar si el botón debe estar activo o no
    checkInputValidity(input);
  });
});

inputNewCardList.forEach((input) => {
  // Recorre cada input del formulario
  input.addEventListener("input", () => {
    //se dispara cada vez que el usuario escribe o borra
    toggleButtonState(inputNewCardList, createButton);
    // Cada cambio vuelve a evaluar si el botón debe estar activo o no
    checkInputValidity(input);
  });
});

addCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function getCardElement(
  data = { name: "Sin título", link: "./images/placeholder.jpg" },
) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  const titleImage = cardElement.querySelector(".card__title");
  const handleLikeButton = cardElement.querySelector(".card__like-button");
  const handleDeleteButton = cardElement.querySelector(".card__delete-button");

  handleLikeButton.addEventListener("click", function () {
    handleLikeButton.classList.toggle("card__like-button_is-active");
  });

  handleDeleteButton.addEventListener("click", function () {
    const card = handleDeleteButton.closest(".card");
    card.remove();
  });

  imageElement.addEventListener("click", function () {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openModal(imagePopup);
  });

  titleImage.textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement({ name, link });
  container.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editProfileButton.addEventListener("click", handleOpenEditModal);

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

popupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const url = cardUrlInput.value;
  renderCard(name, url, cardsContainer);
  closeModal(newCardModal);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

popups.forEach(closePopupOnOverlay);

console.log(editProfileForm);
