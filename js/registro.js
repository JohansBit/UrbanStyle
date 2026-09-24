const form= document.getElementById("registroForm");

//Diccionario de Regiones y Comunas
const regionesYcomunas = {
    "Arica y Parinacota" : ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá" : ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Pica", "Huara"],
    "Antofagasta":["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollague", "San Pedro de Atacama", "Tocopilla", "Maria Helena"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana de Santiago": [    "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Libertador General Bernardo O'Higgins": [    "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": [    "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": [    "Chillán", "Chillán Viejo", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Biobío": [    "Concepción", "Coronel", "Chiguayante", "Lota", "Penco", "San Pedro de la Paz", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Ollagüe", "Pemuco", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "La Araucanía": [    "Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": [    "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Río Bueno", "Futrono", "Lago Ranco"],
    "Los Lagos": [    "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén del General Carlos Ibáñez del Campo": [    "Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes y de la Antártica Chilena": [    "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

Object.keys(regionesYcomunas).forEach(region =>{
    const opt = document.createElement("option");
    opt.value = region;
    opt.textContent= region;
    selectRegion.appendChild(opt)
});

selectRegion.addEventListener("change", function(){
    const regionSeleccionada = selectRegion.value;

    selectComuna.innerHTML = '<option value="">-- Seleccione Comuna--</option>';
    if(regionSeleccionada === ""){
        selectComuna.disabled=true;
        return
    }

    const listaComunas = regionesYcomunas[regionSeleccionada];
    listaComunas.forEach(comuna => {
        const opt = document.createElement("option");
        opt.value = comuna;
        opt.textContent= comuna;
        selectComuna.appendChild(opt);
    });
    selectComuna.disabled= false;
})

//Aqui se viene lo complicado, validacion de run
function validarRut(run){
    const runLimpio = run.replace(/[\.\-]/g,"").trim().toUpperCase();

    if(runLimpio.length < 7 || runLimpio > 9){
        return false;
    }

    const numero = runLimpio.slice(0, -1);
    const dv = runLimpio.slice(-1);

    if(!/^\d+$/.test(numero)){
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for(let i = numero.length -1; i >= 0; i--){
        suma+= parseInt(numero.charAt(i)) * multiplo;
        multiplo++
        if(multiplo > 7){
            multiplo = 2;
        }
    }
    
    const dvEsperado = 11 - (suma%11);
    let dvFinal= "";

    if(dvEsperado === 11){
        dvFinal = "0";
    } else if(dvEsperado === 10){
        dvFinal = "K";
    } else {
        dvFinal = dvEsperado.toString();
    }

    return dvFinal === dv;
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    //Aqui recibimos todos los elementos del formulario
    const nombre = document.getElementById("username").value.trim();
    const apellido = document.getElementById("lastname").value.trim();

    const run = document.getElementById("run").value.trim();
    const correo = document.getElementById("email").value.trim();
    const fechaNacimiento = document.getElementById("fnacimiento").value;

    const pass = document.getElementById("password").value;
    const passconfirm= document.getElementById("Vpassword").value;

    const direccion = document.getElementById("direccion").value.trim();
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;

    //Creamos la bandera para confirmar que todo el formulario este correcto
    let esValido = true;


    //Comenzamos con las validaciones de los elementos del formulario
    if(nombre === ""){
        alert("El nombre es obligatorio")
        esValido =false;
    }
    if(nombre.length > 50){
        alert("El nombre no debe superar 50 caracteres")
        esValido =false;
    }
    if(apellido === ""){
        alert("El apellido es obligatorio")
        esValido =false;
    }
    if(apellido.length > 100){
        alert("El apellido no debe superar los 100 caracteres")
        esValido =false;
    }

    //Creamos un arreglo para esacalabilidad de dominios aprobados
    const dominioValidos= ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const correoMin = correo.toLowerCase();

    if(correo === ""){
        alert("El correo electronico no puede estar vacío");
        esValido=false;
    } else if (correo.length > 100){
        alert("El correo no debe superar los 100 carácteres");
        esValido = false;
    } else if(!dominioValidos.some(d => correoMin.endsWith(d))){
        alert("El correo debe ser dominio: '@duoc.cl', '@profesor.duoc.cl', '@gmail.com'.");
        esValido = false;
    }
    
    if(pass.length < 4 || pass.length > 10){
        alert("La contraseña debe tener entre 4 y 10 caracteres.")
        esValido = false;
    }
    if(pass !== passconfirm){
        alert("Las contraseñas con coinciden.")
        esValido = false;
    }

    //Aqui se viene lo complicado, validacion de run
    if (run === ""){
        alert("El RUN es obligatorio.");
        esValido = false;
    } else if(!validarRut(run)){
        alert("El RUN ingresado no es válido")
        esValido = false;
    }
    
    if(esValido){
        const listaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

        const nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            run:run,
            correo:correo,
            pass: pass,
            rol:"Cliente",
            region:region,
            comuna:comuna,
            direccion:direccion
        };

        listaUsuarios.push(nuevoUsuario);

        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaUsuarios));
        alert("¡Registro exitoso! Todos los datos son válidos.")

        form.reset();
        window.location.href = "login.html";
    }   


});