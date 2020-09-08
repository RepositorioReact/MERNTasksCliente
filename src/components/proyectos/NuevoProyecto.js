import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario. Con esto podemos consumir el false del formulario del proyectoState sin necesidad de ir por el árbol desde el padre hasta los hijos
    const proyectosContext = useContext(proyectoContext);
    //se importa y extrae el formulario (y otras variables de state o funciones) que viene como false y su función para cambiar el estado de false a true
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;


    //useState, devuelve un objeto porque vamos a usar una libreria para que genere un id
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    //extraer variables
    const {nombre} = proyecto;

    //lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar, esto previene que se inserten proyectos sin nombre
        if(nombre === ''){
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar el form
        guardarProyecto({
            nombre:''
        })
    }

    //Mostrar formulario
    const onClick = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClick}
            >Nuevo Proyecto</button>

            {formulario 
            ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agreagar Proyecto"
                            />

                    </form>
                )
            :
                null
            }
            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;