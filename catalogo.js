document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(PRODUCTOS);
    actualizarContadorCarrito();
});

function renderizarProductos(lista) {
    const contenedor = document.getElementById("grid-productos");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-sm-6";
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 280px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${prod.nombre}</h5>
                    <p class="card-text text-muted flex-grow-1">${prod.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fs-5 fw-bold">$${prod.precio.toLocaleString("es-CL")}</span>
                        <div class="btn-group">
                            <a href="producto-detalle.html?id=${prod.id}" class="btn btn-outline-dark btn-sm">Ver Detalle</a>
                            <button onclick="agregarAlCarrito(${prod.id})" class="btn btn-dark btn-sm">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

function filtrarProductos(categoria) {
    if (categoria === "todos") {
        renderizarProductos(PRODUCTOS);
    } else {
        const filtrados = PRODUCTOS.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
}

function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        const productoBase = PRODUCTOS.find(p => p.id === idProducto);
        if (productoBase) {
            carrito.push({ ...productoBase, cantidad: 1 });
        }
    }

    localStorage.setItem("carrito_urbanstyle", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert("¡Producto añadido al carrito!");
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById("cart-counter");
    if (badge) badge.textContent = totalItems;
}