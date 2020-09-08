import clienteAxios from './axios';

const tokenAuth = token => {
    if(token){
        //si hay un token, lo enviamos por el header
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        //si el usuario cierra sesión o el token expira, lo borramos
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;