
let photos = [];

// Función para mostrar las fotos en la galería
function mostrarImagen() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  photos.forEach((photo) => {
    const photoElement = document.createElement('div');
    photoElement.classList.add('img-container');
    photoElement.innerHTML = `
      <img src="${photo.image}" alt="${photo.title}">
      <div class="edit-eliminar-buttons">
        <button class="edit-button" onclick="showEditForm('${photo.id}', '${photo.title}', '${photo.description}')">Modificar</button>
        <button class="eliminar-button" onclick="eliminar('${photo.id}')">Quit</button>
      </div>
      <div class="photo-details">
        <h3>${photo.title}</h3>
        <p>${photo.description}</p>
      </div>
    `;
    gallery.appendChild(photoElement);
  });
}

// Función para agregar una nueva foto
function insertarImagen(event) {
  event.preventDefault();

  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const imageInput = document.getElementById('imageInput');

  const reader = new FileReader();

  reader.onload = function (e) {
    const photoId = `photo${Date.now()}`;
    const newPhoto = {
      id: photoId,
      title: titleInput.value,
      description: descriptionInput.value,
      image: e.target.result,
    };

    photos.push(newPhoto);
    mostrarImagen();

    titleInput.value = '';
    descriptionInput.value = '';
    imageInput.value = '';
  };

  reader.readAsDataURL(imageInput.files[0]);
}
function eliminar(photoId) {
  photos = photos.filter((photo) => photo.id !== photoId);
  mostrarImagen(photos);
}
// Función para mostrar el formulario de edición de una foto
function showEditForm(photoId, title, description) {
  const editModal = document.getElementById('edit-modal');
  const editTitle = document.getElementById('edit-title');
  const editDescription = document.getElementById('edit-description');
  const editPhotoId = document.getElementById('edit-photo-id');

  editTitle.value = title;
  editDescription.value = description;
  editPhotoId.value = photoId;

  editModal.style.display = 'block';
}

//fgghj


// Event listener para agregar una foto al enviar el formulario
const addPhotoForm = document.getElementById('addPhotoForm');
addPhotoForm.addEventListener('submit', insertarImagen);

// Mostrar las fotos iniciales en la galería
mostrarImagen();

