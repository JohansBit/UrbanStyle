
const PRODUCTOS_BASE = [
    {
        id: 1,
        codigo: "POL-001",
        nombre: "Polera Oversize Heavy Black",
        categoria: "POL",
        precio: 24990,
        stock: 15,
        stockCritico: 3,
        imagen: "img/prod/polera-black.webp",
        descripcion: "Polera lisa de corte boxy fit en algodón pesado 240 GSM con cuello cerrado acanalado."
    },
    {
        id: 2,
        codigo: "POL-002",
        nombre: "Hoodie Acid Wash Purple",
        categoria: "POL",
        precio: 42990,
        stock: 8,
        stockCritico: 2,
        imagen: "img/prod/hoodie-acid-wash.webp",
        descripcion: "Polerón con capucha y efecto lavado ácido púrpura vintage, bolsillo canguro y calce holgado."
    },
    {
        id: 3,
        codigo: "POL-003",
        nombre: "Polerón Oversize Minimal Black",
        categoria: "POL",
        precio: 38990,
        stock: 10,
        stockCritico: 3,
        imagen: "img/prod/hoodie-oversize-black.webp",
        descripcion: "Polerón básico de cuello redondo en franela perchada pesada con hombros caídos."
    },
    {
        id: 4,
        codigo: "POL-004",
        nombre: "Hoodie Layered Streetwear Grey & Black",
        categoria: "POL",
        precio: 45990,
        stock: 6,
        stockCritico: 2,
        imagen: "img/prod/streetwear-hoodie.webp",
        descripcion: "Hoodie con diseño superpuesto de doble manga, capucha bicolor y cordones largos técnicos."
    },
    {
        id: 5,
        codigo: "PANT-001",
        nombre: "Pantalón Cargo Wide Leg Brown",
        categoria: "PANT",
        precio: 36990,
        stock: 12,
        stockCritico: 4,
        imagen: "img/prod/pantalon-cargo-wide-leg.jpg",
        descripcion: "Pantalón de corte ancho en gabardina color café con bolsillos fuelle laterales y pinzas de volumen."
    },
    {
        id: 6,
        codigo: "ZAPT-001",
        nombre: "Sneakers Retro Low Dune Gold",
        categoria: "ZAPT",
        precio: 79990,
        stock: 5,
        stockCritico: 2,
        imagen: "img/prod/sneacker-retro-gold.webp",
        descripcion: "Zapatilla urbana retro combinada en gamuza y cuero texturizado en tonos arena y mostaza."
    },
    {
        id: 7,
        codigo: "ACCS-001",
        nombre: "Gafas Cyber Spikes Chrome Edition",
        categoria: "ACCS",
        precio: 29990,
        stock: 7,
        stockCritico: 2,
        imagen: "img/productos/chrome-heart-glasses.jpg",
        descripcion: "Lentes de sol con marco metálico plateado estilo espinas y cristales oscuros con protección UV400."
    },
    {
        id: 8,
        codigo: "ZAP-001",
        nombre: "Zapatillas Urban Runner Retro '88",
        categoria: "ZAPT", 
        precio: 89990,
        stock: 5,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
        descripcion: "Zapatillas exclusivas de edición limitada con suela de alta tracción y capellada de cuero."
    },
    {
        id: 9,
        codigo: "ACC-001",
        nombre: "Jockey Streetwear Graphic Logo",
        categoria: "ACCS", 
        precio: 18990,
        stock: 20,
        stockCritico: 5,
        imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
        descripcion: "Jockey de 5 paneles con bordado frontal en relieve y cierre ajustable.",
    },
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
    return productos.find(p => p.codigo.toUpperCase() === sku.toUpperCase());
}