const editProfileButton = document.querySelector(".profile__edit-button"); //Apunta exactamente al botón “Editar perfil”.
const editProfileModal = document.querySelector("#edit-popup"); //Selecciona el modal completo usando su id.
const editProfileCloseButton = editProfileModal.querySelector(".popup__close"); //Selecciona el botón de cerrar dentro del modal
const nameInput = editProfileModal.querySelector(".popup__input_type_name"); //Estas dos líneas seleccionan inputs específicamente dentro del modal de edición
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title"); // Seleccionan el nombre existente en el perfil
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = editProfileModal.querySelector(".popup__form");

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

console.log(editProfileForm);
