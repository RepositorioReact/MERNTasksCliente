import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTareas = () => {

    //Obtener si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    //effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre:''
    })

    //Extraer el nombre del proyecto
    const {nombre} = tarea;

    //si no hay proyecto seleccionado. Cuando se selecciona deja de retornar null y se pasa al form
    if(!proyecto) return null;

    //extraccion de variables con array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //leer valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Revisar si es edición o es nueva tarea
        if(tareaseleccionada === null){
            //esto quiere decir que es una tarea nueva
            //Agregar en nueva tarea al state de tareas
            //tarea.proyectoId = proyectoActual._id;
            tarea.proyecto = proyectoActual._id;
            //tarea.estado=false; en el modelo de tareas lo tenemos definido como false
            agregarTarea(tarea);
        }else{
            //ya existe la tarea, por lo que hay que modificarla
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea();
        }

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reinicar el form
        guardarTarea({
            nombre:''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre la tarea es obligatorio</p>: null}
        </div>
     );
}
 
export default FormTareas;