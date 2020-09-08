import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = (props) => {

    //Extraer información de autenticación
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;