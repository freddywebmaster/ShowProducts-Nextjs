export default function validarCrearProducto (valores){
    let errores = {};

    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    if(!valores.empresa){
        errores.empresa = "Nombre de empresa es requerido"
    }

    if(!valores.url){
        errores.url = "La url es requerida"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "La url no es valida"
    }

    if(!valores.descripcion){
        errores.descripcion = "La descripción es requerida"
    }
    

    return errores;
}