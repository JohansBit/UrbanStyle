document.addEventListener('DOMContentLoaded', () =>{

    const form = document.getElementById('formProducto');
    const titulo = document.getElementById('formTitulo');
    const bntGuardar = document.querySelector('.btn-guardar');

    const inputCodigo = document.getElementById('prodCodigo');
    const selectCategoria = document.getElementById('prodCategoria');
    const inputNombre = document.getElementById('prodNombre');
    const inputPrecio = document.getElementById('prodPrecio');
    const inputStock = document.getElementById('prodStock');
    const inputStockCritico = document.getElementById('prodStockCrit');
    const inputImagen = document.getElementById('prodImagen');
    const inputDescripcion = document.getElementById('prodDescripcion');

    const urlParams = new URLSearchParams(window.location.search);
    const skuParam = urlParams.get('sku');
    const catParam = urlParams.get('cat');

    let esEdicion =false;

    if (skuParam) {
        const productoExistente = obtenerProductoPorSku(skuParam);
        if (productoExistente) {
            esEdicion = true;
            if (titulo) titulo.textContent = 'Editar Producto';
            if (btnGuardar) btnGuardar.textContent = 'Actualizar Producto';

            // Cargar datos
            inputCodigo.value = productoExistente.codigo;
            inputCodigo.disabled = true; // El SKU actúa como clave única y no se edita
            selectCategoria.value = productoExistente.categoria;
            inputNombre.value = productoExistente.nombre;
            inputPrecio.value = productoExistente.precio;
            inputStock.value = productoExistente.stock;
            inputStockCritico.value = productoExistente.stockCritico || '';
            inputImagen.value = productoExistente.imagen || '';
            inputDescripcion.value = productoExistente.descripcion || '';
        }
    } else if (catParam) {
        selectCategoria.value = catParam;
    }

   
    function setError(input, mensaje) {
        const spanError = document.getElementById(`error${input.name.charAt(0).toUpperCase() + input.name.slice(1)}`);
        if (spanError) spanError.textContent = mensaje;
        input.style.borderColor = '#ff5252';
    }

    function clearError(input) {
        const spanError = document.getElementById(`error${input.name.charAt(0).toUpperCase() + input.name.slice(1)}`);
        if (spanError) spanError.textContent = '';
        input.style.borderColor = '#444';
    }

    
    function validarCodigo() {
        const val = inputCodigo.value.trim();
        if (!val) {
            setError(inputCodigo, 'El código SKU es obligatorio.');
            return false;
        }
        if (val.length < 3) {
            setError(inputCodigo, 'Debe tener al menos 3 caracteres.');
            return false;
        }
        if (!esEdicion && obtenerProductoPorSku(val)) {
            setError(inputCodigo, 'Ya existe un producto con este código.');
            return false;
        }
        clearError(inputCodigo);
        return true;
    }

    function validarCategoria() {
        if (!selectCategoria.value) {
            setError(selectCategoria, 'Debes seleccionar una categoría.');
            return false;
        }
        clearError(selectCategoria);
        return true;
    }

    function validarNombre() {
        const val = inputNombre.value.trim();
        if (!val) {
            setError(inputNombre, 'El nombre es obligatorio.');
            return false;
        }
        if (val.length > 100) {
            setError(inputNombre, 'Máximo 100 caracteres.');
            return false;
        }
        clearError(inputNombre);
        return true;
    }

    function validarPrecio() {
        const val = inputPrecio.value.trim();
        if (val === '' || isNaN(val) || Number(val) < 0) {
            setError(inputPrecio, 'Ingresa un precio válido (mayor o igual a 0).');
            return false;
        }
        clearError(inputPrecio);
        return true;
    }

    function validarStock() {
        const val = inputStock.value.trim();
        const num = Number(val);
        if (val === '' || isNaN(val) || !Number.isInteger(num) || num < 0) {
            setError(inputStock, 'Ingresa un número entero mayor o igual a 0.');
            return false;
        }
        clearError(inputStock);
        return true;
    }

    function validarStockCritico() {
        const val = inputStockCritico.value.trim();
        if (val !== '') {
            const num = Number(val);
            if (isNaN(num) || !Number.isInteger(num) || num < 0) {
                setError(inputStockCritico, 'Debe ser un número entero mayor o igual a 0.');
                return false;
            }
        }
        clearError(inputStockCritico);
        return true;
    }

    function validarDescripcion() {
        const val = inputDescripcion.value.trim();
        if (val.length > 500) {
            setError(inputDescripcion, 'Máximo 500 caracteres.');
            return false;
        }
        clearError(inputDescripcion);
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

        if (!esValido) return;

        const productos = obtenerProductos();

        const nuevoProducto = {
            id: esEdicion ? (obtenerProductoPorSku(inputCodigo.value.trim()).id || Date.now()) : Date.now(),
            codigo: inputCodigo.value.trim().toUpperCase(),
            categoria: selectCategoria.value,
            nombre: inputNombre.value.trim(),
            precio: parseFloat(inputPrecio.value),
            stock: parseInt(inputStock.value, 10),
            stockCritico: inputStockCritico.value !== '' ? parseInt(inputStockCritico.value, 10) : 0,
            imagen: inputImagen.value.trim() || 'img/productos/placeholder.webp',
            descripcion: inputDescripcion.value.trim()
        };

        if (esEdicion) {
            const indice = productos.findIndex(p => p.codigo.toUpperCase() === nuevoProducto.codigo);
            if (indice !== -1) productos[indice] = nuevoProducto;
        } else {
            productos.push(nuevoProducto);
        }

        
        guardarProductos(productos);

        alert(esEdicion ? '¡Producto actualizado correctamente!' : '¡Producto agregado al catálogo con éxito!');
        window.location.href = 'admin-productos.html';
    });
})  
