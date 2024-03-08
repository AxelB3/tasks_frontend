"use client"; // Esto es para poder utilizar el componente a lo largo del proyecto.

// Importaciones de liberias necesarias para crear el card
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { SlLike, SlTrash } from "react-icons/sl";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import tasksService from "@/services/tasksService";

function CustomCard({ data, setTasks }) {
  const [dataTask, setDataTask] = useState(data);

  const deleteTask = async (task_id) => {
    tasksService.deleteTask(task_id, setTasks, Error);
  };

  useEffect(() => {
    // Actualizar datatask cuando data cambia
    setDataTask(data);
  }, [data]);

  const handleChange = (e, task_id) => {
    e.target.checked === true ? tasksService.updateTask({ id: task_id, estatus: "TERMINADA" }, setTasks, Error): tasksService.updateTask({ id: task_id, estatus: "PENDIENTE" }, setTasks, Error)
  };

  return (
    <div>
      <div className="p-8">
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          {dataTask.titulo}
        </p>
        <p className="mt-2 text-gray-500">{dataTask.descripcion}</p>
      </div>
      <div className="flex justify-between align-center mt-4 px-8 pb-5">
        <Button
          variant="none"
          className="border-0"
          onClick={() => {
            deleteTask(dataTask.id);
          }}
        >
          <SlTrash />
        </Button>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={dataTask.estatus == "TERMINADA"}
                onClick={(e) => handleChange(e, dataTask.id)}
              />
            }
            label="Completada"
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default CustomCard;
