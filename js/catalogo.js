document.addEventListener("DOMContentLoaded", () => {
    const productos = obtenerProductosCatalogo();
    renderizarProductos(productos)
    actualizarContadorCarrito();
});

function obtenerProductosCatalogo(){
    const data =localStorage.getItem("urbanstyle_productos");
    if(!data){
        if(typeof PRODUCTOS !== "undefined"){
            localStorage.setItem("urbanstyle_productos", JSON.stringify(PRODUCTOS));
            return PRODUCTOS
        }
        return [];
    }
    return JSON.parse(data);
}


function renderizarProductos(lista) {
    const contenedor = document.getElementById("grid-productos");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    if(lista.length === 0){
        contenedor.innerHTML = '<div class="col-12 text-center text-muted py-5">No hay productos disponibles en esta categoria.</div>';
        return;
    }

    lista.forEach(prod => {

        const idIdentificador = prod.codigo || prod.id;
        const sinStock = prod.stock <=0;

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
    const productos = obtenerProductosCatalogo();
    if (categoria === "todos") {
        renderizarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
        renderizarProductos(filtrados);
    }
}

function agregarAlCarrito(codigoProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito_urbanstyle")) || [];
    const productos = obtenerProductosCatalogo();
    const productoBase = productos.find(p => (p.codigo || p.id) == codigoProducto);

    if(!productoBase){
        alert("Producto no encontrado.");
        return;
    }

    if(productoBase.stock<=0){
        alert("Este producto se encuentra agotado.");
        return;
    }

    const itemExistente = carrito.find(item => (item.id === item.codigo) == codigoProducto);

    if (itemExistente) {
        if(itemExistente.cantidad>=productoBase.stock){
            alert("No puedes agregar mas unidades. Stock Disponible: ${productoBase.stock}");
            return;
        }
        itemExistente.cantidad++;
    } else {
        carrito.push({
            codigo: productoBase.codigo || productoBase.id,
            nombre: productoBase.nombre,
            precio: productoBase.precio,
            imagen: productoBase.imagen,
            cantidad: 1,
            stockMaximo: productoBase.stock

        });
        
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