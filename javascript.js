function agregarImagen() {
    var input = document.getElementById('input-imagen');
    var archivo = input.files[0];
    
    if (archivo) {
      var imagen = document.createElement("img");
      imagen.src = URL.createObjectURL(archivo);
      document.body.appendChild(imagen);
    }
  }