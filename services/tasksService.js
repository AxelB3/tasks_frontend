import http from "./axiosService.js";
import Swal from "sweetalert2";

class tasksService {
  getTasks(callback, error) {
    Swal.fire({
      title: "Cargando...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    http
      .get("api/tasks")
      .then((response) => {
        Swal.close();
        callback(response.data);
      })
      .catch((response) => {
        error(response.data);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al cargar las tareas.",
        });
      });
  }

  createTask(params, callback, error) {
    Swal.fire({
      title: "Confirmación de guardado",
      text: "¿Desea guardar esta tarea?",
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
          .post("api/tasks/crear", params)
          .then((response) => {
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Proceso Éxitoso",
              text: "Tarea guardada correctamente.",
            });
            callback(response.data);
          })
          .catch((response) => {
            error(response.data);
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al guardar la tarea.",
            });
          });
      }
    });
  }

  deleteTask(params, callback, error) {
    Swal.fire({
      title: "Confirmación de eliminación",
      text: "¿Desea eliminar esta tarea??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminando...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        http
          .patch(`api/tasks/eliminar/${params}`)
          .then((response) => {
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Proceso Éxitoso",
              text: "Tarea eliminada correctamente.",
            });
            callback(response.data);
          })
          .catch((response) => {
            error(response.data);
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al eliminar la tarea.",
            });
          });
      }
    });
  }

  updateTask(params, callback, error) {
    http
      .patch(`api/tasks/actualizar/${params.id}`, params)
      .then((response) => {
        console.log(response);
        callback(response.data);
      })
      .catch((response) => {
        error(response.data);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al actualizar el estatus de la tarea.",
        });
      });
  }
}
export default new tasksService();
