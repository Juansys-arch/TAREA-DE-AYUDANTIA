import { useState, useEffect } from "react";
import { getProfile } from "../services/profile.service.js";

const Profile = () => {
    const [profile, setProfile] = useState(null);

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
    }
useEffect(() => {
handleGetProfile();
}, []);

    return(
        <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfil del usuario</h1>
      <button
        onClick={handleGetProfile}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Obtener Perfil
      </button>

      {profile && (
        <div className="mt-6 p-4 border rounded">
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
    </div>
  );
};
export default Profile;