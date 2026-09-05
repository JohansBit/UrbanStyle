document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactoForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const comentario = document.getElementById("comentario");

        let esValido = true;

        // Validar Nombre
        if (nombre.value.trim().length < 3) {
            nombre.classList.add("is-invalid");
            esValido = false;
        } else {
            nombre.classList.remove("is-invalid");
            nombre.classList.add("is-valid");
        }

        // Validar Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value.trim())) {
            correo.classList.add("is-invalid");
            esValido = false;
        } else {
            correo.classList.remove("is-invalid");
            correo.classList.add("is-valid");
        }

        // Validar Comentario
        if (comentario.value.trim().length < 10) {
            comentario.classList.add("is-invalid");
            esValido = false;
        } else {
            comentario.classList.remove("is-invalid");
            comentario.classList.add("is-valid");
        }

        if (esValido) {
            alert("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.");
            form.reset();
            nombre.classList.remove("is-valid");
            correo.classList.remove("is-valid");
            comentario.classList.remove("is-valid");
        }
    });
});