import React,{useReducer} from 'react';
//import uuid from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

//esto va a ser el state inicial de toda la administración del proyecto (creacion, eliminacion...)
const ProyectoState = props => {

    //centralizar lo que se va a repartir entre varios componentes
    const initialState = {
        proyectos : [], //hasta que no se manda a llamar el dispatch no se llenan los proyectos
        formulario:false, //muestra cuando es true el input del aside donde se introduce el nombre del proyecto
        errorformulario: false, //muestra si el input de agregar nuevo proyecto está vacio
        proyecto: null,//este es el proyecto que se está seleccionando
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        });
    }

    //obtener los proyectos. Lo que toma la función como parámetro va a ser el payload
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type:OBTENER_PROYECTOS,
                payload: resultado.data.proyectos //esto vendría de la base de datos
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
    }

    //Agregar nuevo proyecto. async para interactuar con la BD
    const agregarProyecto = async proyecto => {
        //proyecto.id = uuid.v4(); a partir de ahora viene por mongo

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            //Insertar proyecto en el state
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
        });
    }

    //Obtener proyecto actual, selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    //Elimina un proyecto completo ELIMINAR_PROYECTO
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:proyectoId
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto:state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;