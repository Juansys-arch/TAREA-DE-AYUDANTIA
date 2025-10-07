import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";


export async function login(req, res) {
  try {
    const { email, password,} = req.body;


    if (!email || !password) {
      return handleErrorClient(res, 400, "Email y contraseña son requeridos");
    }
    
    const data = await loginUser(email, password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 401, error.message);
  }
}

export async function register(req, res) {
  try {
    const { nombre, edad, email, password} = req.body;

    if (!nombre || !edad || !email || !password) {
      return handleErrorClient(res, 400, " Nombre, Edad, Email y contraseña son requeridos");
    }
    
    const newUser = await createUser({nombre, edad, email, password});
    delete newUser.password; 
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { 
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
