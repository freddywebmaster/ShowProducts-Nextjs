export default function validarCrearCuenta (valores){
    let errores = {};

    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }
    if(!valores.email){
        errores.email = "El email es obligatorio"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "Email No Valido!";
    }

    if(!valores.password){
        errores.password = "El password es obligatorio"
    }else if(valores.password.length < 6){
        errores.password = "Contraseña minina de 6 caracteres";
    }

    return errores;
}