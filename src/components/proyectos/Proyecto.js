import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de proyectos. 
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);//Fijar un proyecto actual
        obtenerTareas(id);//Filtrar las tareas cuando se de click a uno de los proyectos
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}//mongo tiene el id como _id
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;