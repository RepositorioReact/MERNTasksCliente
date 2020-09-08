import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXISTOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

export default (state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXISTOSO:
            localStorage.setItem('token', action.payload.token); //Cuando el registro es exitoso, se guarda el token en el localstorage
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}