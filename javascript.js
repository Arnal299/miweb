
let photos = [];


function mostrarImagen() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  photos.forEach((photo) => {
    const photoElement = document.createElement('div');
    photoElement.classList.add('img-container');
    photoElement.innerHTML = `
      <img src="${photo.image}" alt="${photo.title}">
      <div class="edit-eliminar-buttons">
        <button class="edit-button" onclick="editar('${photo.id}', '${photo.title}', '${photo.description}')">Modificar</button>
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
function editar(photoId) {
  const photo = photos.find((photo) => photo.id === photoId);
  if (photo) {
    const newTitle = prompt('Ingrese el nuevo título:', photo.title);
    const newDescription = prompt('Ingrese la nueva descripción:', photo.description);

    if (newTitle !== null && newDescription !== null) {
      photo.title = newTitle;
      photo.description = newDescription;
      mostrarImagen();
      savePhotos(); 
    }
  }
}

function savePhotos() {
  localStorage.setItem('photos', JSON.stringify(photos));
}





const addPhotoForm = document.getElementById('addPhotoForm');
addPhotoForm.addEventListener('submit', insertarImagen);


mostrarImagen();

