document.getElementById("formulario-compra").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const producto = document.getElementById("producto").value;
    const precio = document.getElementById("precio").value;
    
    if (nombre && correo && producto && precio) {
        alert(`¡Compra realizada! `);
    } else {
        alert("Por favor, completa todos los campos.");
    }
});


