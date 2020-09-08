import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }
            case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos:action.payload //el valor es el payload que en este caso es proyectos
            }
            case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],//se trae todos los proyectos y luego el nuevo proyecto
                formulario:false,//para que oculte el input de añadir un nuevo proyecto
                errorformulario:false//para que una vez introducido el nombre de un proyecto se quite
            }
            case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario:true
            }
            case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto:state.proyectos.filter(proyecto => proyecto._id === action.payload ) //mongo tiene el id como _id
            }
            case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos:state.proyectos.filter(proyecto => proyecto._id !== action.payload ),
                proyecto: null //se pone a null para que se elimine de la pantalla el proyecto con sus tareas
            }
            case PROYECTO_ERROR:
                return{
                    ...state,
                    mensaje: action.payload
                }
        default:
            return state;
    }
}