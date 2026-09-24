document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));

    
    if (!sesion || (sesion.rol !== "Administrador" && sesion.rol !== "Vendedor")) {
        alert("Acceso restringido. Debes iniciar sesión con una cuenta autorizada.");
        window.location.href = "login.html";
        return;
    }

    
    const elemNombre = document.getElementById("adminNombre");
    const elemCorreo = document.getElementById("adminCorreo");
    const elemRol = document.getElementById("adminRol");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    
    const nombreCompleto = sesion.apellido ? `${sesion.nombre} ${sesion.apellido}` : sesion.nombre;
    if (elemNombre) elemNombre.textContent = nombreCompleto;
    if (elemCorreo) elemCorreo.textContent = sesion.correo;

    
    if (elemRol) {
        elemRol.textContent = sesion.rol;
        elemRol.className = "badge-role"; 
        if (sesion.rol === "Administrador") {
            elemRol.classList.add("badge-admin");
        } else if (sesion.rol === "Vendedor") {
            elemRol.classList.add("badge-vendedor");
        }
    }

    
    if (sesion.rol === "Vendedor") {
        const tarjetas = document.querySelectorAll(".action-card");
        tarjetas.forEach(card => {
            if (card.textContent.includes("Usuarios")) {
                card.style.display = "none";
            }
        });
    }

    
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("sesionActiva");
            window.location.href = "login.html";
        });
    }
});
