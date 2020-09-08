import React, {useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXISTOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null, //es cuando entramos en sesion y dice Hola 'nombre'
        mensaje: null, //está muy realacionado con las alertas
        cargando: true //evita que al recargar la página logeada, muestre el form de logeo
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Las funciones para usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);//con datos le pasamos toda la información que se requiera
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtenemos usuario. Una vez que el registro es exitoso vemos si el usuario está bien autenticado
            usuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //Retorna al usuario autenticado (sirve cuando un usuario crea una cuenta o inicia sesion)
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            //ToDo: Función para enviar el token por headers
            tokenAuth(token);//le pasamos el token que obtenemos en localstorage
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type:LOGIN_EXISTOSO,
                payload: respuesta.data //en el authController, cuando un usuario se autentica correctamente enviamos el token
            });

            //Obtenemos usuario. Una vez que el inicio es exitoso
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Cierra la sesión de usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;