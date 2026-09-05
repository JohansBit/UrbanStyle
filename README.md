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

La identidad visual se construye sobre un **fondo negro elegante** (propio de una
boutique urbana premium, no de una tienda "genérica"), con dos acentos que
representan las dos caras de la marca: un **morado urbano** para la interacción
general (botones secundarios, hover, bordes) y un **dorado premium** reservado para lo
que más importa al negocio — precios y llamados a la acción de compra — reforzando la
idea de exclusividad ("zapatillas exclusivas") frente al público de 18-35 años.

| Variable CSS | Uso | Hex |
|---|---|---|
| `--bg-primary` | Fondo principal (negro elegante) | `#121212` |
| `--bg-surface` | Fondo de tarjetas, modales y formularios | `#1E1E1E` |
| `--text-primary` | Texto principal (blanco suave) | `#F5F5F5` |
| `--text-secondary` | Texto secundario / subtítulos | `#808080` |
| `--accent-purple` | Morado urbano — botones secundarios, hover, bordes | `#8E24AA` |
| `--accent-gold` | Dorado premium — precios, ofertas, botones de acción | `#D4AF37` |
| `--accent-gold-hover` | Hover de elementos dorados | `#F1C40F` |
| `--color-error` | Mensajes de error en formularios | `#FF5252` |
| `--color-success` | Mensajes de éxito | `#4CAF50` |

```css
:root {
  /* Colores Principales */
  --bg-primary: #121212;
  --bg-surface: #1E1E1E;
  --text-primary: #F5F5F5;
  --text-secondary: #808080;

  /* Colores de Acento (UrbanStyle) */
  --accent-purple: #8E24AA;
  --accent-gold: #D4AF37;
  --accent-gold-hover: #F1C40F;

  /* Estados y Alertas */
  --color-error: #FF5252;
  --color-success: #4CAF50;
}
```

**Tipografía:** a definir por el equipo (pendiente de confirmar una fuente de título y
una de texto en Google Fonts, coherentes con el negro + dorado + morado; por ejemplo
una display condensada para títulos/precios y una sans-serif geométrica para el resto).

**Regla de uso:** el dorado (`--accent-gold` / `--accent-gold-hover`) se reserva
**solo** para precios y botones de acción de compra ("Añadir al carrito", "Pagar"), y
el morado (`--accent-purple`) para el resto de la interacción (links, hover de menú,
bordes de foco), de forma que el dorado no pierda protagonismo por sobreuso.

> Esta paleta se define como **variables CSS (`:root`) y variables de Bootstrap
> sobrescritas** en `css/styles.css`, y es de uso obligatorio en todas las páginas
> (tienda y administrador) para cumplir el requisito de diseño "consistente y
> atractivo visualmente... en todas las páginas" (Anexo 1) y "coherente con la
> identidad de marca" (ERS 3.1.1).

## 4. Tecnologías

| Capa       | Tecnología                                    |
|------------|------------------------------------------------|
| Estructura | HTML5 semántico                                |
| Estilos    | **Bootstrap 5** (CDN) + hoja de estilos **propia** externa (`css/styles.css`) |
| Comportamiento | JavaScript ES6+ (sin frameworks JS)        |
| Persistencia | `localStorage` (carrito de compras)          |
| Control de versiones | Git + repositorio remoto en GitHub    |

**¿Por qué Bootstrap + CSS propio, y no solo uno de los dos?**
- **Bootstrap 5** se usa como base para la grilla responsiva (`container`, `row`,
  `col-*`), utilidades (`d-flex`, `gap-*`, `mt-*`, etc.) y componentes ya accesibles
  (navbar, formularios, modales, dropdowns), lo que agiliza el desarrollo y asegura
  buen comportamiento responsivo desde el día uno.
- **`css/styles.css`** es nuestra hoja de estilos personalizada y externa (cumple el
  punto de la rúbrica de "hoja de estilos CSS personalizada... incorporada de manera
  externa"). En ella **sobrescribimos las variables de Bootstrap** (`--bs-primary`,
  `--bs-body-bg`, `--bs-body-color`, `--bs-border-color`, `--bs-border-radius`,
  `--bs-font-sans-serif`, etc.) usando nuestras propias variables (`--bg-primary`,
  `--accent-gold`, `--accent-purple`, etc. — sección 3), y agregamos los componentes
  propios de marca (hero, tarjetas de producto, navbar, carrito, etc.) que Bootstrap
  no trae por defecto.
- Orden de carga en el `<head>`: **1)** CSS de Bootstrap (CDN), **2)** `css/styles.css`
  (para que nuestras reglas y variables sobrescriban a las de Bootstrap). El JS de
  Bootstrap (bundle) se carga al final del `<body>`, solo en las páginas que usan
  componentes interactivos de Bootstrap (navbar colapsable, modales, etc.).

## 5. Estructura de carpetas

```
urbanstyle/
├── css/
│   └── styles.css                 Hoja de estilos externa global (sobrescribe Bootstrap)
├── js/
│   ├── main.js                    Lógica general (navegación, carrito, render de productos)
│   ├── validaciones.js            Validaciones de formularios (RUN, email, largo, etc.)
│   └── regiones.js                Arreglo de regiones y comunas
├── img/                            Imágenes de productos, lookbook, etc.
│
├── index.html                     Página principal / Home (RF-01)
├── productos.html                  Lista de productos (RF-02)
├── detalle-producto.html           Detalle de producto (RF-03)
├── carrito.html                    Carrito de compras (RF-04) ⚠️ ver nota
├── registro.html                    Formulario de registro (RF-05)
├── login.html                       Formulario de inicio de sesión (RF-06)
├── nosotros.html                     Vista sobre la empresa
├── blogs.html                        Lista de noticias / blogs (RF-08)
├── detalle-blog-1.html                Detalle de blog 1
├── detalle-blog-2.html                Detalle de blog 2
├── contacto.html                       Formulario de contacto (RF-07)
│
├── admin-home.html                     Panel administrativo Home
├── admin-productos.html                 Mantenedor de productos — listado/crear (RF-09) ⚠️ ver nota
├── admin-usuarios.html                   Mantenedor de usuarios — listado/crear (RF-10) ⚠️ ver nota
│
├── docs/
│   └── ERS-UrbanStyle.docx              Documento ERS (versión vigente)
└── README.md
```

> **⚠️ Pendiente de confirmar en equipo:**
> 1. `carrito.html` no estaba en la propuesta original de carpetas, pero el Anexo 1
>    (Figura 15) pide una vista explícita "Mi carrito de compras" — se agrega aquí
>    para no perder ese punto de la rúbrica.
> 2. `admin-productos.html` y `admin-usuarios.html` se plantean como una sola página
>    (listado + creación). El Anexo 1 (Figura 10) muestra 4 vistas separadas por
>    entidad: **Nuevo, Editar, Mostrar y Listado**. Se puede resolver dentro de una
>    sola página con modales/formulario dinámico (igual cumple funcionalmente), pero
>    conviene confirmarlo con el docente o dejarlo explícito en la presentación, ya
>    que la rúbrica pide "navegación completa" entre esas vistas.

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
| RF-03 | Ver detalle de producto | `detalle-producto.html` |
| RF-04 | Gestionar carrito de compras | `carrito.html` |
| RF-05 | Registrar nuevo usuario | `registro.html` |
| RF-06 | Iniciar sesión | `login.html` |
| RF-07 | Enviar mensaje de contacto | `contacto.html` |
| RF-08 | Consultar Blogs | `blogs.html`, `detalle-blog-1.html`, `detalle-blog-2.html` |
| RF-09 | Gestionar productos (Admin/Vendedor) | `admin-productos.html` |
| RF-10 | Gestionar usuarios (Administrador) | `admin-usuarios.html` |
| RF-11 | Control de acceso por rol | `admin-home.html`, `admin-productos.html`, `admin-usuarios.html` |

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
*Documento generado como base de trabajo — Entrega 1, versión 3 (paleta de colores y
estructura de carpetas alineadas con la propuesta del equipo: negro elegante + morado
urbano + dorado premium, Bootstrap + CSS propio).*
