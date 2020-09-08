import React,{useReducer} from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
//import uuid from 'uuid';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';
import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto:[],//antes era null, pero ahora recibe un arreglo de tareas vacío
        errortarea:false,
        tareaseleccionada:null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear funciones

    //Obtener tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params:{proyecto}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        //tarea.id = uuid.v4();
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    //edita o modifica una tarea
    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    //extrae una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    //Elimina tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <tareaContext.Provider
            value={{
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                tareaseleccionada:state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;