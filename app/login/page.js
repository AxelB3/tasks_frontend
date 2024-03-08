"use client";
import { useForm } from "react-hook-form";
import InputCustom from "@/components/Input/Input";
import usuariosService from "@/services/usuariosService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (credenciales) => {
    usuariosService.authUser(
      credenciales,
      (data) => {
        router.push("/tareas");
      },
      Error
    );
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-1/2 max-w-md mx-auto p-6 m-7 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputCustom
              name="correo"
              label="Correo"
              size="small"
              fullWidth
              register={register}
              registerProps={{
                required: { value: true, message: "Correo Requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Correo inválido",
                },
              }}
              errors={errors}
            />
          </div>
          <div className="mb-4">
            <InputCustom
              name="password"
              size="small"
              fullWidth
              label="Contraseña"
              register={register}
              registerProps={{
                required: { value: true, message: "Contraseña Requerida" },
              }}
              errors={errors}
              type="password"
            />
          </div>
          <div className="w-100 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
