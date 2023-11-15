document.addEventListener('DOMContentLoaded', function () {

    // Variables
    const email = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const resetBtn = document.querySelector('#formulario [type="reset"]');

    let mail = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // Asignar eventos
    email.addEventListener('input', validar);
    asunto.addEventListener('input', validar);
    mensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Bloquear el boton de enviar
        mail = {
            email: '',
            asunto: '',
            mensaje: '',
        }

        // resetear formulario
        formulario.reset();
        validadObjetoEmail();
    })

    function validar(e) {
        const fieldName = e.target.id;
        const field = e.target;
        const fieldValue = e.target.value.trim();
        const fieldAlert = e.target.parentElement;

        // Limpiar alerta antes de cada validación
        limpiarAlerta(fieldAlert);

        if (fieldValue.length === 0) {
            mostrarAlerta(`Please complete ${fieldName} is required`, fieldAlert);
            mail[e.target.name] = '';
            validadObjetoEmail();
            return;
        }

        if (fieldName === "email" && !validarFormatoEmail(fieldValue)) {
            mostrarAlerta(`Please insert valid Email  (xxxxx@xxx.xxx)`, fieldAlert);
            mail[e.target.name] = '';
            validadObjetoEmail();
            return;
        }

        mail[e.target.name] = fieldValue;
        
        validadObjetoEmail();

    }

    function mostrarAlerta(mensaje, fieldAlert) {
        // Crear el HTML
        const error = document.createElement('p');
        error.classList.add('bg-red-600', 'text-white', 'p-2');
        error.textContent = mensaje;

        // Agregar al HTML
        fieldAlert.appendChild(error);
    }

    function limpiarAlerta(fieldAlert) {
        const alerta = fieldAlert.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarFormatoEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }
    function validadObjetoEmail(){
        
        const submitBtn = document.querySelector('#formulario [type="submit"]');

        if (Object.values(mail).includes('')) {
            submitBtn.classList.add('opacity-50');
            submitBtn.setAttribute("disabled","");
        } else {
            submitBtn.classList.remove("opacity-50");
            submitBtn.removeAttribute("disabled");
        }
    }

    function enviarEmail(e){
        e.preventDefault();
        const spinner = document.querySelector('#Spinner');

        spinner.classList.remove('hidden');

        setTimeout(() => {
            // Bloquear el boton de enviar
        mail = {
            email: '',
            asunto: '',
            mensaje: '',
        }

        // resetear formulario
        formulario.reset();
        validadObjetoEmail();

        spinner.classList.add('hidden');
        const alertaEnvioExitoso = document.createElement('P');
        alertaEnvioExitoso.classList.add('mensaje-exito');
        alertaEnvioExitoso.textContent = "¡El formulario se envió correctamente!";

        formulario.appendChild(alertaEnvioExitoso);

        setTimeout(() => {
            alertaEnvioExitoso.remove();
        }, 3000);
        
        }, 3500);

    }



});
