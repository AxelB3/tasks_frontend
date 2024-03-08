"use client";

import { Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import CrearTarea from "@/components/Tareas/CrearTarea";
import { useForm } from "react-hook-form";
import tasksService from "@/services/tasksService";
import CustomCard from "@/components/Card/CustomCard";
import { TextField, Box  } from "@mui/material";

export default function Tareas() {
  // Variable para poder manejar cuando se necesite crear un nuevo card
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState(null);


  //Trae todas las tareas existentes
  useEffect(() => {
    tasksService.getTasks(setTasks, Error);
  }, []);

  // Funcion que cambia el estado de mi newTask cuando se necesite crear un nuevo card
  const CreateNewTask = () => {
    setNewTask(!newTask);
  };

  return (
    <main className={"main m-auto"}>
      <div className="flex justify-center p-3">
        {!newTask && (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={CreateNewTask}
          >
            Nueva Tarea
          </button>
        )}
      </div>

      {newTask && (
        <div className="w-full justify-content-center p-10">
          <div>
            <CrearTarea setNewTask={CreateNewTask} setTasks={setTasks}/>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-12">
          {tasks?.map((task, index) => {
            return (
              <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5" key={index}>
                <CustomCard
                  data={task}
                  setTasks={setTasks}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
