const PRODUCTOS_BASE = [
    // POLERAS & POLERONES
    {
        id: 1,
        codigo: "POL-001",
        nombre: "Polerón Adidas",
        categoria: "poleras-polerones",
        genero: "hombre",
        precio: 39990,
        stock: 15,
        stockCritico: 3,
        imagen: "img/Polerondidas.jpg",
        descripcion: "Polerón urbano."
    },
    {
        id: 10,
        codigo: "POL-002",
        nombre: "Polera Crop",
        categoria: "poleras-polerones",
        genero: "mujer",
        precio: 24990,
        stock: 12,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        descripcion: "Polera estilo crop de algodón orgánico con estampado gráfico en la espalda."
    },
    {
        id: 11,
        codigo: "POL-003",
        nombre: "Polerón niño",
        categoria: "poleras-polerones",
        genero: "nino",
        precio: 29990,
        stock: 8,
        stockCritico: 2,
        imagen: "img/poleronniño.jpg",
        descripcion: "Polerón urbano cómodo y resistente para niños con diseño de la marca."
    },

    // PANTALONES
    {
        id: 2,
        codigo: "PANT-001",
        nombre: "Pantalón Cargo",
        categoria: "pantalones",
        genero: "hombre",
        precio: 45990,
        stock: 14,
        stockCritico: 4,
        imagen: "img/cargo.jpg",
        descripcion: "Pantalón cargo con bolsillos múltiples y ajuste en tobillos."
    },
    {
        id: 20,
        codigo: "PANT-002",
        nombre: "Jeans",
        categoria: "pantalones",
        genero: "mujer",
        precio: 42990,
        stock: 10,
        stockCritico: 3,
        imagen: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=80",
        descripcion: "Jogger de tiro alto con detalles dorados y pretina elastizada ultra cómoda."
    },
    {
        id: 21,
        codigo: "PANT-003",
        nombre: "Pantalón Cargo Street Kids",
        categoria: "pantalones",
        genero: "nino",
        precio: 28990,
        stock: 6,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
        descripcion: "Pantalón cargo infantil reforzado en rodillas para máxima durabilidad."
    },

    // ZAPATILLAS
    {
        id: 3,
        codigo: "ZAPT-001",
        nombre: "Zapatillas Urban Runner Retro '88",
        categoria: "zapatillas",
        genero: "hombre",
        precio: 89990,
        stock: 5,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
        descripcion: "Zapatillas exclusivas de edición limitada con suela de alta tracción y capellada de cuero."
    },
    {
        id: 30,
        codigo: "ZAPT-002",
        nombre: "Zapatillas Air max 90",
        categoria: "zapatillas",
        genero: "mujer",
        precio: 95990,
        stock: 9,
        stockCritico: 2,
        imagen: "img/airmax.jpg",
        descripcion: "Sneakers de caña alta con combinación de tonos morados y plantilla amortiguada."
    },
    {
        id: 31,
        codigo: "ZAPT-003",
        nombre: "Zapatillas Gold Kids 2.0",
        categoria: "zapatillas",
        genero: "nino",
        precio: 59990,
        stock: 7,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
        descripcion: "Zapatillas urbanas infantiles con cierre de velcro y detalles dorados."
    },

    // ACCESORIOS
    {
        id: 4,
        codigo: "ACCS-001",
        nombre: "Jockey rojo Jordan",
        categoria: "accesorios",
        genero: "hombre",
        precio: 45000,
        stock: 20,
        stockCritico: 5,
        imagen: "img/jockey.jpg",
        descripcion: "Jockey de 5 paneles con bordado frontal en relieve y cierre ajustable."
    },
    {
        id: 40,
        codigo: "ACCS-002",
        nombre: "Mochila Urban",
        categoria: "accesorios",
        genero: "mujer",
        precio: 22990,
        stock: 11,
        stockCritico: 3,
        imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        descripcion: "Banano impermeable con compartimentos con cierre y correa dorada ajustable."
    },
    {
        id: 41,
        codigo: "ACCS-003",
        nombre: "Gorro Jordan",
        categoria: "accesorios",
        genero: "nino",
        precio: 12990,
        stock: 15,
        stockCritico: 4,
        imagen: "img/jordan.jpg",
        descripcion: "Jockey suave para niños con logo Jordan."
    }
];

function obtenerProductos() {
    const data = localStorage.getItem("urbanstyle_productos");
    if (!data) {
        localStorage.setItem("urbanstyle_productos", JSON.stringify(PRODUCTOS_BASE));
        return PRODUCTOS_BASE;
    }
    return JSON.parse(data);
}

function guardarProductos(productos) {
    localStorage.setItem("urbanstyle_productos", JSON.stringify(productos));
}

function obtenerProductoPorSku(sku) {
    const productos = obtenerProductos();
    return productos.find(p => (p.codigo && p.codigo.toUpperCase() === sku.toUpperCase()) || p.id == sku);
}