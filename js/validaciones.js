document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formProducto');
    if (!form) return;

    const titulo = document.getElementById('formTitulo');
    const btnGuardar = document.getElementById('btnGuardar');

    const inputCodigo = document.getElementById('prodCodigo');
    const selectCategoria = document.getElementById('prodCategoria');
    const inputNombre = document.getElementById('prodNombre');
    const inputPrecio = document.getElementById('prodPrecio');
    const inputStock = document.getElementById('prodStock');
    const inputStockCritico = document.getElementById('prodStockCritico'); // Corregido: prodStockCritico
    const inputImagen = document.getElementById('prodImagen');
    const inputDescripcion = document.getElementById('prodDescripcion');

    const urlParams = new URLSearchParams(window.location.search);
    const skuParam = urlParams.get('sku');
    const catParam = urlParams.get('cat');

    let esEdicion = false;

    if (skuParam && typeof obtenerProductoPorSku === 'function') {
        const productoExistente = obtenerProductoPorSku(skuParam);
        if (productoExistente) {
            esEdicion = true;
            if (titulo) titulo.textContent = 'Editar Producto';
            if (btnGuardar) btnGuardar.textContent = 'Actualizar Producto';

            inputCodigo.value = productoExistente.codigo;
            inputCodigo.disabled = true;
            selectCategoria.value = productoExistente.categoria;
            inputNombre.value = productoExistente.nombre;
            inputPrecio.value = productoExistente.precio;
            inputStock.value = productoExistente.stock;
            inputStockCritico.value = productoExistente.stockCritico || '';
            inputImagen.value = productoExistente.imagen || '';
            inputDescripcion.value = productoExistente.descripcion || '';
        }
    } else if (catParam) {
        selectCategoria.value = catParam.toUpperCase();
    }

    function setError(input, spanId, mensaje) {
        const spanError = document.getElementById(spanId);
        if (spanError) spanError.textContent = mensaje;
        if (input) input.style.borderColor = '#ff5252';
    }

    function clearError(input, spanId) {
        const spanError = document.getElementById(spanId);
        if (spanError) spanError.textContent = '';
        if (input) input.style.borderColor = '#444';
    }

    function validarCodigo() {
        const val = inputCodigo.value.trim().toUpperCase();
        if (!val) {
            setError(inputCodigo, 'errorCodigo', 'El código SKU es obligatorio.');
            return false;
        }
        if (val.length < 3) {
            setError(inputCodigo, 'errorCodigo', 'Debe tener al menos 3 caracteres.');
            return false;
        }
        if (!esEdicion && typeof obtenerProductoPorSku === 'function' && obtenerProductoPorSku(val)) {
            setError(inputCodigo, 'errorCodigo', 'Ya existe un producto con este código.');
            return false;
        }
        clearError(inputCodigo, 'errorCodigo');
        return true;
    }

    function validarCategoria() {
        if (!selectCategoria.value) {
            setError(selectCategoria, 'errorCategoria', 'Debes seleccionar una categoría.');
            return false;
        }
        clearError(selectCategoria, 'errorCategoria');
        return true;
    }

    function validarNombre() {
        const val = inputNombre.value.trim();
        if (!val) {
            setError(inputNombre, 'errorNombre', 'El nombre es obligatorio.');
            return false;
        }
        if (val.length > 100) {
            setError(inputNombre, 'errorNombre', 'Máximo 100 caracteres.');
            return false;
        }
        clearError(inputNombre, 'errorNombre');
        return true;
    }

    function validarPrecio() {
        const val = inputPrecio.value.trim();
        if (val === '' || isNaN(val) || Number(val) < 0) {
            setError(inputPrecio, 'errorPrecio', 'Ingresa un precio válido (mayor o igual a 0).');
            return false;
        }
        clearError(inputPrecio, 'errorPrecio');
        return true;
    }

    function validarStock() {
        const val = inputStock.value.trim();
        const num = Number(val);
        if (val === '' || isNaN(val) || !Number.isInteger(num) || num < 0) {
            setError(inputStock, 'errorStock', 'Ingresa un número entero mayor o igual a 0.');
            return false;
        }
        clearError(inputStock, 'errorStock');
        return true;
    }

    function validarStockCritico() {
        const val = inputStockCritico.value.trim();
        if (val !== '') {
            const num = Number(val);
            if (isNaN(num) || !Number.isInteger(num) || num < 0) {
                setError(inputStockCritico, 'errorStockCrit', 'Debe ser un número entero mayor o igual a 0.');
                return false;
            }
        }
        clearError(inputStockCritico, 'errorStockCrit');
        return true;
    }

    function validarDescripcion() {
        const val = inputDescripcion.value.trim();
        if (val.length > 500) {
            setError(inputDescripcion, 'errorDescripcion', 'Máximo 500 caracteres.');
            return false;
        }
        clearError(inputDescripcion, 'errorDescripcion');
        return true;
    }

    inputCodigo.addEventListener('input', validarCodigo);
    selectCategoria.addEventListener('change', validarCategoria);
    inputNombre.addEventListener('input', validarNombre);
    inputPrecio.addEventListener('input', validarPrecio);
    inputStock.addEventListener('input', validarStock);
    inputStockCritico.addEventListener('input', validarStockCritico);
    inputDescripcion.addEventListener('input', validarDescripcion);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const esValido = [
            validarCodigo(),
            validarCategoria(),
            validarNombre(),
            validarPrecio(),
            validarStock(),
            validarStockCritico(),
            validarDescripcion()
        ].every(Boolean);

        if (!esValido) {
            alert('Por favor completa todos los campos obligatorios correctamente.');
            return;
        }

        const productos = obtenerProductos();
        const codigoLimpio = inputCodigo.value.trim().toUpperCase();

        const nuevoProducto = {
            id: esEdicion ? (obtenerProductoPorSku(codigoLimpio)?.id || Date.now()) : Date.now(),
            codigo: codigoLimpio,
            categoria: selectCategoria.value,
            nombre: inputNombre.value.trim(),
            precio: parseFloat(inputPrecio.value),
            stock: parseInt(inputStock.value, 10),
            stockCritico: inputStockCritico.value.trim() !== '' ? parseInt(inputStockCritico.value, 10) : 0,
            imagen: inputImagen.value.trim() || 'img/productos/placeholder.webp',
            descripcion: inputDescripcion.value.trim()
        };

        if (esEdicion) {
            const indice = productos.findIndex(p => p.codigo.toUpperCase() === codigoLimpio);
            if (indice !== -1) productos[indice] = nuevoProducto;
        } else {
            productos.push(nuevoProducto);
        }

        guardarProductos(productos);
        alert(esEdicion ? '¡Producto actualizado correctamente!' : '¡Producto agregado al catálogo con éxito!');
        window.location.href = 'admin-productos.html';
    });
});