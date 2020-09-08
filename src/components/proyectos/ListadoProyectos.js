import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    //Obtener el state del formulario.
    const proyectosContext = useContext(proyectoContext);
    //se exportan los datos del state inicial
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //El useEffect no debe ir después de un if con un return null
    //Obtener proyectos cuando carga el componente
    useEffect(() =>{

        //Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        
        // eslint-disable-next-line
    },[mensaje]);

    //cuando viene de la base de datos, la primera vez que se ejecuta la app no vienen proyectos
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id} //en mongo el id viene como _id
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;