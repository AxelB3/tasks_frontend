import http from "./axiosService.js";
import Swal from "sweetalert2";

class usuariosService {
  createUser(params, callback, error) {
    Swal.fire({
      title: "Confirmación de registro",
      text: "¿Desea registrarse?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Guardando...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        http
          .post("api/users/crear", params)
          .then((response) => {
            Swal.close();
            if (response.data.message) {
              Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: response.data.message,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Registro Éxitoso",
                text: "Se ha registrado correctamente.",
              });
              callback(response.data);
            }
          })
          .catch((response) => {
            error(response.data);
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al registrarse.",
            });
          });
      }
    });
  }

  authUser(params, callback, error) {
    http
      .post("api/auth/login", params)
      .then((response) => {
        Swal.close();
        if (response.data.message) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: response.data.message,
          });
        } else {
          callback(response.data);
        }
      })
      .catch((response) => {
        error(response.data);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al iniciar sesión.",
        });
      });
  }
}
export default new usuariosService();
