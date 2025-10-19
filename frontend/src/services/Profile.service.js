import api from './root.service.js';

export async function getProfile() {
    try {
        const response = await api.get('/profile/private');
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al obtener perfil',
            data: null
        };
    }
}

export async function updateProfile(payload) {
    try {
       
        const response = await api.patch('/profile/private', payload);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
       console.error(' Error al actulizar el perfil :', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al actualizar el perfil',
            data: null
        };
    }
}
export async function deleteProfile() {
    try {
        const response = await api.delete('/profile/private');
        return{
            success:true,
            data: response.data
        };
    } catch (error) {
        console.error('error al eliminar el perfil:',error)
        return{
            success: false,
            message: error.response?.data?.message || 'errror al eliminar perfil',
            data:null
        };
    }

}