import axios from './root.service.js';

export async function getProfile() {
    try {
        const response= await axios.get('/profile/private');
        return {
            success: true,
            data:response.data
        };
    } catch (error) {
        console.error('error al obtener el perfil:',error)
        return {
            success:false,
            message: error.response?.data?.message || 'Error al obtener perfil',
             data: null
        };
    }
}
