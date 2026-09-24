document.addEventListener("DOMContentLoaded", () => {
    cargarTablaUsuarios();
});

function obtenerUsuariosStorage() {
    return JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
}

function guardarUsuariosStorage(lista) {
    localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));
}

function cargarTablaUsuarios() {
    const tbody = document.getElementById("listaUsuariosBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const usuarios = obtenerUsuariosStorage();

    if (usuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888; padding: 20px;">No hay cuentas registradas en el sistema.</td></tr>`;
        return;
    }

    usuarios.forEach((user, index) => {
        const rolActual = user.rol || "Cliente";
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><code>${user.run || "S/N"}</code></td>
            <td>
                <input type="text" class="input-editable" id="nombre-${index}" value="${user.nombre || ''}">
            </td>
            <td>
                <input type="text" class="input-editable" id="apellido-${index}" value="${user.apellido || ''}">
            </td>
            <td>${user.correo}</td>
            <td>
                <select class="select-rol-admin" id="rol-${index}">
                    <option value="Administrador" ${rolActual === 'Administrador' ? 'selected' : ''}>Administrador</option>
                    <option value="Vendedor" ${rolActual === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                    <option value="Cliente" ${rolActual === 'Cliente' ? 'selected' : ''}>Cliente</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn-save-sm" onclick="guardarCambiosUsuario(${index})" title="Guardar Cambios">
                    <i class="bi bi-check-lg"></i> Guardar
                </button>
                <button type="button" class="btn-del-sm" onclick="eliminarUsuario(${index})" title="Eliminar Usuario">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function guardarCambiosUsuario(index) {
    const usuarios = obtenerUsuariosStorage();
    if (!usuarios[index]) return;

    const nuevoNombre = document.getElementById(`nombre-${index}`).value.trim();
    const nuevoApellido = document.getElementById(`apellido-${index}`).value.trim();
    const nuevoRol = document.getElementById(`rol-${index}`).value;

    if (!nuevoNombre || !nuevoApellido) {
        alert("El nombre y el apellido no pueden quedar vacíos.");
        return;
    }

    // Actualizar datos
    usuarios[index].nombre = nuevoNombre;
    usuarios[index].apellido = nuevoApellido;
    usuarios[index].rol = nuevoRol;

    guardarUsuariosStorage(usuarios);


    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
    if (sesion && sesion.correo.toLowerCase() === usuarios[index].correo.toLowerCase()) {
        localStorage.setItem("sesionActiva", JSON.stringify(usuarios[index]));
        
        document.getElementById("adminNombre").textContent = `${nuevoNombre} ${nuevoApellido}`;
        const elemRol = document.getElementById("adminRol");
        if (elemRol) {
            elemRol.textContent = nuevoRol;
            elemRol.className = "badge-role " + (nuevoRol === 'Administrador' ? 'badge-admin' : (nuevoRol === 'Vendedor' ? 'badge-vendedor' : ''));
        }
    }

    alert(`Usuario ${usuarios[index].correo} actualizado correctamente.`);
    cargarTablaUsuarios();
}

function eliminarUsuario(index) {
    const usuarios = obtenerUsuariosStorage();
    const usuarioAEliminar = usuarios[index];
    if (!usuarioAEliminar) return;

    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
    if (sesion && sesion.correo.toLowerCase() === usuarioAEliminar.correo.toLowerCase()) {
        alert("No puedes eliminar la cuenta con la que tienes la sesión iniciada actualmente.");
        return;
    }

    const confirmar = confirm(`¿Estás seguro de eliminar a ${usuarioAEliminar.nombre} (${usuarioAEliminar.correo})?`);
    if (confirmar) {
        usuarios.splice(index, 1);
        guardarUsuariosStorage(usuarios);
        cargarTablaUsuarios();
    }
}
