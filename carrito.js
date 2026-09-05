document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    const tbody = document.getElementById("tabla-carrito");
    const totalElem = document.getElementById("total-precio");

    if (!tbody) return;
    tbody.innerHTML = "";

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4">El carrito está vacío. <a href="productos.html">Ir a la tienda</a></td></tr>`;
        totalElem.textContent = "$0";
        return;
    }

    let total = 0;

    carrito.forEach((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-2">
                    <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
                    <span class="fw-bold">${prod.nombre}</span>
                </div>
            </td>
            <td>$${prod.precio.toLocaleString("es-CL")}</td>
            <td>
                <input type="number" min="1" value="${prod.cantidad}" class="form-control form-control-sm text-center" style="width: 65px;" onchange="cambiarCantidad(${index}, this.value)">
            </td>
            <td>$${subtotal.toLocaleString("es-CL")}</td>
            <td>
                <button onclick="eliminarItem(${index})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    totalElem.textContent = `$${total.toLocaleString("es-CL")}`;
}

function cambiarCantidad(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    const cantidad = parseInt(nuevaCantidad);

    if (cantidad <= 0 || isNaN(cantidad)) {
        cargarCarrito();
        return;
    }

    carrito[index].cantidad = cantidad;
    localStorage.setItem("carrito_urbanstyle", JSON.stringify(carrito));
    cargarCarrito();
}

function eliminarItem(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito_urbanstyle", JSON.stringify(carrito));
    cargarCarrito();
}

function procesarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Pedido realizado con éxito!");
    localStorage.removeItem("carrito_urbanstyle");
    window.location.href = "index.html";
}