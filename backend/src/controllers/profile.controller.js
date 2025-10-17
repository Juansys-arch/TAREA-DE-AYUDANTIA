import {
  handleSuccess,
  handleErrorClient,
  handleErrorServer,
} from "../Handlers/responseHandlers.js";
import { updateUser, deleteUser } from "../services/user.service.js";
import {  updateValidation } from "../validations/user.validations.js";

export function getPublicProfile(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}


export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    const {error} = updateValidation.validate(req.body);
    if ( error ){
      return res.status(400).json({message: "error de validacion",error:error.message});
    }

    if (!data.email || !data.password || !data.edad) {
      return handleErrorClient(res, 400, "Debes enviar email, password y edad");
    }

    const updatedUser = await updateUser(userId, data);
    delete updatedUser.password;

    handleSuccess(res, 200, "Perfil actualizado exitosamente", updatedUser);
  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar perfil", error.message);
  }
}

export async function deleteProfile(req, res) {
  try {
    const userId = req.user.id;
    await deleteUser(userId);

    handleSuccess(res, 200, "Perfil eliminado correctamente");
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar perfil", error.message);
  }
}
