"use client"; // Esto es para poder utilizar el componente a lo largo del proyecto.
import tasksService from "@/services/tasksService";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CrearTarea({setNewTask, setTasks}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const cancelDialog = () => {
    //MENSAJE EMERGENTE PARA REAFIRMAR QUE SE VA A
    //CANCELAR EL PROCESO DE GUARDADO
    Swal.fire({
      title: "¿Desea cancelar el proceso?",
      text: "Se eliminarán los datos ingresados",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        setNewTask(false);
      }
    });
  };

  const createNewTask = async (task) => {
    tasksService.createTask(
      {...task, usuarioId:1},
      (data) => {
        setTasks(data)
        setNewTask(false);
      },
      Error
    );
  };

  return (
    <form
      onSubmit={handleSubmit(createNewTask)}
      class="border border-gray-400 flex flex-col rounded-md"
    >
      <div class="py-3 px-6 gap-4 grid">
        <input
          class="text-lg w-full focus:outline-0"
          placeholder="TÍtulo de tarea"
          type="text"
          name="titulo"
          {...register("titulo", {
            required: { value: true, message: "Título Requerido" },
            minLength: {
              value: 4,
              message: "Titulo debe tener un minímo de 4 carácteres",
            },
          })}
        />
        {errors.titulo && (
          <p className="error-message" role="alert">
            {errors.titulo.message}
          </p>
        )}
        <textarea
          class="text-lg w-full focus:outline-0"
          placeholder="Descripción"
          name="descripcion"
          {...register("descripcion", {
            required: { value: true, message: "Descripción Requerida" },
            minLength: {
              value: 20,
              message: "Descripción debe tener un minímo de 20 carácteres",
            },
          })}
        />
        {errors.descripcion && (
          <p className="error-message" role="alert">
            {errors.descripcion.message}
          </p>
        )}
      </div>
      <div class="border-t border-gray-400  w-full flex justify-end p-2 gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Guardar
        </button>

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          onClick={cancelDialog}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
