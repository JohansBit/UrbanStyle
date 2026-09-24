document.addEventListener("DOMContentLoaded", function(){

    if(!localStorage.getItem("usuariosRegistrados")){
        const cuentasDePrueba = [
            {
                nombre:"Carlos",
                apellido: "Santana",
                run:"11111111-1",
                correo:"carlos@duoc.cl",
                pass:"1234",
                rol: "Vendedor",
                region:"Region Metropolitana",
                comuna:"Santiago",
                direccion:"Av. Principal 123"
            },
            {
                nombre:"Admin",
                apellido:"Urban",
                run:"22222222-2",
                correo:"admin@urbanstyle.cl",
                pass:"1234",
                rol:"Administrador",
                region:"Region Metropolitana",
                comuna:"Santiago",
                direccion:"Av Siempre viva 1244"
            }
        ];
        
        localStorage.setItem("usuariosRegistrados", JSON.stringify(cuentasDePrueba));
    }

    const formLogin = document.getElementById("loginForm");

    if(formLogin){
        formLogin.addEventListener("submit", function(event){
            event.preventDefault();

            const correoIngresado = document.getElementById("loginEmail").value.trim();
            const claveIngresada = document.getElementById("loginPass").value;

            const listaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            const usuarioEncontrado = listaUsuarios.find(function(user){
                return user.correo === correoIngresado && user.pass === claveIngresada;
            });

            if(usuarioEncontrado){
                localStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));
                const correosAdmin = [
                    "admin@urbanstyle.cl",
                    "carlos@duoc.cl"
                ];

                if(correosAdmin.includes(usuarioEncontrado.correo.toLowerCase()) || usuarioEncontrado.rol ==="Administrador" ){
                    window.location.href="admin-home.html";
                }else{
                    window.location.href = "index.html";
                }
                
            }else{
                
                console.warn("Credenciales Inválidas.")

                const mensajeError = document.getElementById("errorLogin");
                if(mensajeError){
                    mensajeError.style.display= "block";
                    mensajeError.textContent= "Credenciales no válidas";
                }
            }

        });
    }

    const zonaUsuario = document.getElementById("nav-usuario");

    if(zonaUsuario){
        const usuarioActivo = JSON.parse(localStorage.getItem("sesionActiva"));

        if(usuarioActivo){
            zonaUsuario.innerHTML = `
                <div class="d-flex align-items-end gap-3">
                    <span style="font-weight: bold; color: var(--text-main);"> ¡Hola, ${usuarioActivo.nombre}!</span>
                    <button id="btnCerrarSesion" class="btn btn-sm btn-outline-light" style= cursor: pointer;">
                    SALIR
                    </button>
                </div>
            `;

            document.getElementById("btnCerrarSesion").addEventListener("click", function(){
                localStorage.removeItem("sesionActiva");
                window.location.reload();
            });
        }
    }

});
