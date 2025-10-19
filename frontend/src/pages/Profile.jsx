import { useState, useEffect } from "react";
import { deleteProfile, getProfile, updateProfile } from "../services/profile.service.js";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEdad, setNewEdad] = useState("")


    const handleGetProfile = async () => {
       
        try {
            const data = await getProfile();
            if (data.success) {
                setProfile(data.data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            alert('Error al obtener el perfil');
        }
    };
    const handleUpdateProfile = async () => {
      try {
         const payload = {
            email: newEmail,
            password:newPassword,
           edad: Number(newEdad),
        }
        const data = await updateProfile(payload);
        if(data.success){
          alert('Perfil actualizado con exito');
          handleGetProfile();
        }else{
          alert(data.message);
        }
        
      } catch (error) {
        console.error('error al actualizar el perfil:',error);
        alert('error al actualizar el perfil');
        
      }
    }
    const handleDeleteProfile = async () =>{
      if (confirm('esta seguro de elimanar el perfil')){
        try {
             const data = await deleteProfile();
             if (data.success){
              alert('perfil eliminado');
              setProfile (null);
             }else {
              alert(data.message);
             }
             
        } catch (error) {
          console.error('errror al eliminar el perfil:',error);
          alert('error al eliminar el perfil');
        }
      }
    };

useEffect(() => {
handleGetProfile();
}, [profile]);

    return(
       <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfil del usuario</h1>
      {!profile ? (
        <button
          onClick={handleGetProfile}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Obtener Perfil
        </button>
      ) : (
        <div className="mt-6 p-4 border rounded space-y-4">
          <p><strong>Email actual:</strong> {profile.email}</p>
          <div>
            <label className="block font-semibold">Nuevo email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
            <label className="block font-semibold mt-2">Nueva contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
            <label className="block font-semibold mt-2">edad</label>
            <input
            type="number"
            value={newEdad}
            onChange={(e) => setNewEdad(e.target.value)}
            className="border px-3 py-1 rounded w-full"
            />
        
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleUpdateProfile}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Actualizar
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Profile;