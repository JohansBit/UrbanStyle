document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito_urbanstyle", JSON.stringify(carrito));
    renderizarCarrito();
}

function formatMoneda(monto) {
    return `$${Number(monto).toLocaleString("es-CL")}`;
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const tabla = document.getElementById("tabla-carrito");
    const totalElemento = document.getElementById("total-precio");
    const badgeCounter = document.getElementById("cart-counter");

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (badgeCounter) badgeCounter.textContent = totalItems;

    if (!tabla) return;

    if (carrito.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">
                    <p class="mb-3 fs-5 text-white">Tu carrito está vacío 🛒</p>
                    <a href="productos.html" class="btn btn-sm fw-bold btn-gold" style="width: auto;">Ver Catálogo</a>
                </td>
            </tr>
        `;
        if (totalElemento) totalElemento.textContent = formatMoneda(0);
        return;
    }

    let totalGeneral = 0;
    tabla.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;
        const itemId = item.codigo || item.id;
        const imgSrc = item.imagen || "img/placeholder.png";

        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${imgSrc}" alt="${item.nombre}" class="product-img-thumb" onerror="this.src='img/placeholder.png'">
                        <div>
                            <strong class="text-white d-block">${item.nombre}</strong>
                            <small class="text-uppercase" style="color: var(--color-gold); font-size: 0.75rem;">${item.codigo || 'ITEM'}</small>
                        </div>
                    </div>
                </td>
                <td>${formatMoneda(item.precio)}</td>
                <td>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button type="button" class="btn-qty" onclick="cambiarCantidad('${itemId}', -1)" title="Disminuir cantidad">-</button>
                        <span class="fw-bold px-2">${item.cantidad}</span>
                        <button type="button" class="btn-qty" onclick="cambiarCantidad('${itemId}', 1)" title="Aumentar cantidad">+</button>
                    </div>
                </td>
                <td class="fw-bold text-gold">${formatMoneda(subtotal)}</td>
                <td class="text-end">
                    <button type="button" onclick="eliminarProducto('${itemId}')" class="btn btn-outline-danger btn-sm" title="Eliminar producto">
                        ✕
                    </button>
                </td>
            </tr>
        `;
    }).join("");

    if (totalElemento) totalElemento.textContent = formatMoneda(totalGeneral);
}

function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => (item.codigo || item.id) == id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => (item.codigo || item.id) != id);
        }
        guardarCarrito(carrito);
    }
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => (item.codigo || item.id) != id);
    guardarCarrito(carrito);
}

function procesarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarNotificacion("Tu carrito está vacío.");
        return;
    }
    
    mostrarNotificacion("¡Gracias por tu compra en UrbanStyle! Tu pedido ha sido procesado.");
    localStorage.removeItem("carrito_urbanstyle");
    renderizarCarrito();
}

function mostrarNotificacion(mensaje) {
    const modalDiv = document.createElement("div");
    modalDiv.className = "position-fixed top-50 start-50 translate-middle p-4 rounded text-center shadow-lg";
    modalDiv.style.cssText = "background-color: var(--bg-card, #18181c); border: 2px solid var(--color-purple, #6a1b9a); z-index: 9999; max-width: 90%; width: 350px;";
    
    modalDiv.innerHTML = `
        <h5 class="fw-bold mb-3 text-gold">UrbanStyle</h5>
        <p class="text-white mb-4">${mensaje}</p>
        <button class="btn-gold" onclick="this.parentElement.remove()">Aceptar</button>
    `;
    
    document.body.appendChild(modalDiv);
}