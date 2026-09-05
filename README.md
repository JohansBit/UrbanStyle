# UrbanStyle Web

Tienda en línea de ropa streetwear y zapatillas exclusivas, desarrollada para la
**Evaluación Parcial 1 (30%) — DSY1104 Desarrollo Fullstack I — Duoc UC**.

> Proyecto basado en el **Caso 4: "UrbanStyle" – Boutique de Moda Urbana y Calzado**
> y en el documento **ERS (Anexo 4)** elaborado por el equipo.

---

## 1. Descripción general

UrbanStyle Web es un sitio **100% frontend** (HTML5 + CSS3 + JavaScript, sin backend)
compuesto por dos módulos:

- **Módulo Tienda** (público): catálogo por categoría, detalle de producto, carrito de
  compras, registro/login, blogs, nosotros y contacto.
- **Módulo Administrador** (privado): mantenedor de productos y de usuarios, protegido
  por rol.

No existe backend ni base de datos en esta entrega: el catálogo y los usuarios se
simulan con **arreglos en JavaScript**, y el carrito de compras se persiste en
**`window.localStorage`**.

## 2. Alcance de la Entrega 1

**Sí incluye:**
- Todas las vistas de la tienda y del administrador definidas en el Anexo 1 (Figura 1).
- Validaciones de formulario en tiempo real con JavaScript.
- Carrito de compras funcional (agregar, modificar cantidad, eliminar, total).
- Selección dinámica y dependiente de Región → Comuna.
- Control de acceso simulado por rol (Administrador / Vendedor / Cliente).

**No incluye (fuera del alcance de esta entrega):**
- Pasarela de pago real (el flujo se detiene en el carrito, botón "Pagar" deshabilitado
  o no funcional).
- Backend, base de datos o autenticación real en servidor.
- Despacho/logística de envíos y cupones de descuento reales.

## 3. Sistema visual (paleta de colores y tipografía)

La identidad visual se inspira en el streetwear urbano: **asfalto/concreto** como base
neutra y oscura (propia de la estética de calle, skate y moda urbana), con un
**amarillo señal** como acento principal — un guiño a la señalética urbana y los
chalecos reflectantes que forman parte del imaginario streetwear — y un **azul
cobalto** como acento secundario para etiquetas y enlaces. Es una paleta pensada para
un público de 18-35 años: contrastada, directa y con carácter, evitando el aspecto
"genérico" de una tienda corporativa.

| Uso                        | Nombre           | Hex        |
|-----------------------------|------------------|------------|
| Fondo base                  | Asfalto          | `#131315`  |
| Fondo tarjetas / paneles     | Gris panel        | `#1c1d1f` / `#202124` |
| Líneas / bordes              | Gris línea        | `#313235`  |
| Texto principal              | Blanco hueso       | `#f4f3ef`  |
| Texto secundario             | Gris texto         | `#a6a6aa`  |
| **Acento principal (CTA)**   | Amarillo señal      | `#e8ff3c`  |
| Acento secundario            | Azul cobalto        | `#3d5afe`  |
| Estado de error              | Rojo                | `#ff5c5c`  |
| Estado de éxito              | Verde               | `#33d17a`  |

**Tipografía:**
- **Anton** (Google Fonts) — títulos y elementos destacados (H1-H4, precios), estilo
  "póster urbano", condensada y de alto impacto.
- **Space Grotesk** (Google Fonts) — texto, botones, formularios y navegación; buena
  legibilidad en pantalla y estética técnica/moderna, distinta a una fuente genérica
  tipo Arial/Inter por defecto.

**Radios y bordes:** esquinas prácticamente rectas (`border-radius` mínimo, 2px), para
reforzar la idea de concreto/asfalto y evitar el look "app SaaS" de tarjetas muy
redondeadas.

> Esta paleta y tipografía se definen como **variables CSS (`:root`) y variables de
> Bootstrap sobrescritas** en `css/style.css`, y son de uso obligatorio en todas las
> páginas (tienda y administrador) para cumplir el requisito de diseño "consistente y
> atractivo visualmente... en todas las páginas" (Anexo 1) y "coherente con la
> identidad de marca" (ERS 3.1.1).

## 4. Tecnologías

| Capa       | Tecnología                                    |
|------------|------------------------------------------------|
| Estructura | HTML5 semántico                                |
| Estilos    | **Bootstrap 5** (CDN) + hoja de estilos **propia** externa (`css/style.css`) |
| Comportamiento | JavaScript ES6+ (sin frameworks JS)        |
| Persistencia | `localStorage` (carrito de compras)          |
| Control de versiones | Git + repositorio remoto en GitHub    |

**¿Por qué Bootstrap + CSS propio, y no solo uno de los dos?**
- **Bootstrap 5** se usa como base para la grilla responsiva (`container`, `row`,
  `col-*`), utilidades (`d-flex`, `gap-*`, `mt-*`, etc.) y componentes ya accesibles
  (navbar, formularios, modales, dropdowns), lo que agiliza el desarrollo y asegura
  buen comportamiento responsivo desde el día uno.
- **`css/style.css`** es nuestra hoja de estilos personalizada y externa (cumple el
  punto de la rúbrica de "hoja de estilos CSS personalizada... incorporada de manera
  externa"). En ella **sobrescribimos las variables de Bootstrap** (`--bs-primary`,
  `--bs-body-bg`, `--bs-body-color`, `--bs-border-color`, `--bs-border-radius`,
  `--bs-font-sans-serif`, etc.) con la paleta y tipografía de la sección 3, y
  agregamos los componentes propios de marca (hero, tarjetas de producto, navbar
  streetwear, carrito, etc.) que Bootstrap no trae por defecto.
- Orden de carga en el `<head>`: **1)** CSS de Bootstrap (CDN), **2)** `css/style.css`
  (para que nuestras reglas y variables sobrescriban a las de Bootstrap). El JS de
  Bootstrap (bundle) se carga al final del `<body>`, solo en las páginas que usan
  componentes interactivos de Bootstrap (navbar colapsable, modales, etc.).

## 5. Estructura de carpetas (propuesta)

urbanstyle/
├── index.html Home (tienda)
├── productos.html Listado de productos (RF-02)
├── producto-detalle.html Detalle de producto (RF-03)
├── carrito.html Carrito de compras (RF-04)
├── registro.html Registro de usuario (RF-05)
├── login.html Inicio de sesión (RF-06)
├── contacto.html Formulario de contacto (RF-07)
├── nosotros.html Página institucional
├── blogs.html Listado de blogs (RF-08)
├── blog-detalle-1.html Detalle blog #1
├── blog-detalle-2.html Detalle blog #2
│
├── admin/ Módulo Administrador
│ ├── index.html Home admin (menú lateral)
│ ├── productos.html Listado de productos (RF-09)
│ ├── producto-nuevo.html
│ ├── producto-editar.html
│ ├── producto-mostrar.html
│ ├── usuarios.html Listado de usuarios (RF-10)
│ ├── usuario-nuevo.html
│ ├── usuario-editar.html
│ └── usuario-mostrar.html
│
├── css/
│ └── style.css Hoja de estilos externa propia (sobrescribe Bootstrap)
│
├── js/
│ ├── data.js Arreglos: productos, categorías, regiones/comunas, blogs
│ ├── main.js Nav móvil, badge carrito, utilidades comunes
│ ├── validaciones.js Funciones genéricas de validación (RUN, email, largo, etc.)
│ ├── carrito.js Lógica del carrito (localStorage)
│ ├── productos.js Render + filtro del listado de productos
│ ├── producto-detalle.js Render de detalle + relacionados
│ ├── registro.js Validación formulario de registro
│ ├── login.js Validación formulario de login
│ └── contacto.js Validación formulario de contacto
│
├── admin/js/
│ └── admin.js Mantenedores de producto/usuario + control de acceso por rol (RF-11)
│
├── img/ Imágenes propias (logo, íconos)
├── docs/
│ └── ERS-UrbanStyle.docx Documento ERS (versión vigente)
└── README.md


> Esta estructura sigue el diagrama de navegación del Anexo 1 (Figura 1) y el requisito
> de mantenibilidad del ERS (3.3.5): *"código organizado en archivos separados por
> página y por tipo, con nombres claros"*.

## 6. Roles del sistema

| Rol            | Accesos |
|----------------|---------|
| **Administrador** | Acceso total: gestión de productos y usuarios. |
| **Vendedor**       | Solo puede ver el listado y detalle de productos y de órdenes. |
| **Cliente**        | Solo accede a la tienda pública (catálogo, carrito, registro, contacto). |

## 7. Requisitos funcionales (resumen del ERS)

| ID | Requisito | Vista |
|----|-----------|-------|
| RF-01 | Visualizar página principal (Home) | `index.html` |
| RF-02 | Listar productos por categoría | `productos.html` |
| RF-03 | Ver detalle de producto | `producto-detalle.html` |
| RF-04 | Gestionar carrito de compras | `carrito.html` |
| RF-05 | Registrar nuevo usuario | `registro.html` |
| RF-06 | Iniciar sesión | `login.html` |
| RF-07 | Enviar mensaje de contacto | `contacto.html` |
| RF-08 | Consultar Blogs | `blogs.html` + detalles |
| RF-09 | Gestionar productos (Admin/Vendedor) | `admin/productos.html` y afines |
| RF-10 | Gestionar usuarios (Administrador) | `admin/usuarios.html` y afines |
| RF-11 | Control de acceso por rol | Todo el módulo `admin/` |

## 8. Reglas de validación clave (JavaScript)

- **Correo:** solo dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Contraseña:** requerida, entre 4 y 10 caracteres.
- **RUN:** requerido, sin puntos ni guion (ej. `19011022K`), entre 7 y 9 caracteres,
  dígito verificador validado por módulo 11.
- **Dirección de envío:** requerida, máx. 300 caracteres, con selección **dinámica y
  dependiente** de Región → Comuna (regla de negocio específica del caso UrbanStyle).
- **Producto:** código (requerido, texto, mín. 3), nombre (requerido, máx. 100),
  descripción (opcional, máx. 500), precio (requerido, mín. 0, decimales permitidos),
  stock (requerido, entero, mín. 0), stock crítico (opcional, entero, mín. 0, dispara
  alerta), categoría (requerida).

## 9. Cómo ejecutar el proyecto

Requiere conexión a internet (para cargar Bootstrap y las fuentes de Google Fonts
desde CDN). No requiere instalación ni servidor: basta con abrir `index.html` en el
navegador, o servirlo con una extensión tipo *Live Server* para evitar restricciones de
rutas relativas.

## 10. Checklist de la rúbrica (Anexo 1 – Evaluación 1)

- [ ] **Estructura y etiquetado HTML** — HTML5 semántico, secciones, encabezados, listas.
- [ ] **Navegación e interactividad** — menú, barra lateral (admin), hipervínculos,
      imágenes, botones, formularios.
- [ ] **Diseño CSS** — Bootstrap + hoja externa propia, consistente en todas las
      páginas, responsivo.
- [ ] **Validación de formularios con JS** — validación en tiempo real, mensajes de
      error y sugerencias dinámicas.
- [ ] **Colaboración y GitHub** — repositorio remoto, commits claros, tareas repartidas
      entre los 3 integrantes.

*(Se irá marcando a medida que completemos cada módulo.)*

## 11. Equipo de trabajo

| Integrante | Rol / módulo a cargo |
|------------|----------------------|
| Diego Criado | *(a definir)* |
| Francisco Bustos | *(a definir)* |
| Johans Sepúlveda | *(a definir)* |

Docente: Gerardo Marchant — Asignatura: DSY1104.

## 12. Roadmap (fuera del alcance de esta entrega, según ERS 2.6)

- Backend y base de datos real para productos, usuarios y órdenes.
- Integración con pasarela de pago (Webpay/Transbank).
- Seguimiento de pedidos y despacho.
- Cupones de descuento validados dinámicamente.
- Panel de reportes y estadísticas de venta.

---
*Documento generado como base de trabajo — Entrega 1, versión 2 (incluye paleta de
colores y decisión de usar Bootstrap + CSS propio).*