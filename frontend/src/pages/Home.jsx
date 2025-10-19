import { useState } from 'react';
import { deleteProfile, getProfile, updateProfile } from '../services/profile.service';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEdad, setNewEdad] = useState('')
  

  const handleGetProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getProfile();
      if(result.success){
        setProfileData(result.data);

      }
    }catch(error){
      console.error('error al obtener perfil:', error);
    }
  }
   const handleUpdateProfile = async () => {
        try {
          
          const result = await updateProfile({email:newEmail, password:newPassword, edad:newEdad});
          if(result.success){
            setProfileData(result.data);
            setNewEmail('');
            setNewPassword('');
            setNewEdad('');

            alert('perfil actualizar')
          }
        } catch (error) {
          console.error('error al actualizar el perfil:',error);
          alert('error al actualizar el perfil');
          
        }
      }
  const handleDeleteProfile = async () => {
     if(confirm('esta seguro de aliminar el perfil'))
      try {
        const result = await deleteProfile();
        if (result.success){
          setProfileData(null);
          alert('perfil eliminado')
        }
      } catch (error) {
        console.error('error al eliminar el perfil', error )
        alert('error al eliminar perfil');
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>
        
        <button 
          onClick={handleGetProfile} 
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Obtener Perfil
        </button>
          
           <div className=" space-5">
            <input
            type="edad"
            placeholder='nueva edad '
            value={newEdad}
            onChange={(e) => setNewEdad(e.target.value)}
            className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500'
            />
            <input
            type="email"
            placeholder="nuevo correo"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className='w-full border border-gray-300 p-3 rounded-lg focus:ring-1 focus:ring-indigo-100'
            />
            <input
            type="password"
            placeholder='nueva contraseña'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500'
            />
            
        <button 
           onClick = {handleUpdateProfile}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-4 rounded hover:bg-green-800"
        >
        actualizar
        </button>
        <button
         onClick={handleDeleteProfile}
        className="bg-purple-600 text-white px-6 py-4 rounded hover:bg-red-800"
        >
         elimanar
        </button>


        </div>




        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="text-sm text-gray-700 overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
