'use client';

import { Task } from '@/components/task';
import { TaskPrototype } from '@/types/tasks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useState, KeyboardEvent, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskPrototype[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  /**
   * GET Tasks
   */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('api/tasks/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: TaskPrototype[] = await response.json();

        const formattedTasks = data.map((task) => ({
          idTask: task.idTask.toString(),
          name: task.name,
          description: task.description,
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  /**
   * Add new Task t if the name isn't empty
   * @returns
   */
  async function addNewTask() {
    if (inputValue.trim() === '') return;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inputValue,
        description: descriptionValue,
      }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue('');
      setDescriptionValue('');
    } else {
      console.error('Failed to create task');
    }
  }

  /**
   * Remove a task by id
   * @param idToRemove
   */
  async function removeTask(idToRemove: string) {
    const response = await fetch(`/api/tasks/${idToRemove}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.idTask !== idToRemove),
      );
    } else {
      console.error('Failed to delete task');
    }
  }

  /**
   * Update a task (Name or Description) by id
   * @param idToUpdate
   * @param newName
   * @param newDescription
   */
  async function updateTask(
    idToUpdate: string,
    newName: string,
    newDescription: string,
  ) {
    const response = await fetch(`/api/tasks/${idToUpdate}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, description: newDescription }),
    });

    if (response.ok) {
      // Atualiza a tarefa no estado local
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.idTask === idToUpdate
            ? { ...task, name: newName, description: newDescription }
            : task,
        ),
      );
    } else {
      console.error('Failed to update task');
    }
  }
  /**
   * Press Enter to save the Task
   * @param event
   */
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewTask();
    }
  }

  return (
    <>
      <main className="mt-30 flex flex-col">
        <div className="mb-10 w-full max-w-sm mx-auto p-4 border rounded-lg shadow-xl shadow-gray-200 bg-white">
          <div className="flex items-center border-b-2 pb-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Título da tarefa"
              className="w-full focus:outline-none text-[#5e4b45]"
            />
            <button
              onClick={addNewTask}
              className="text-[#5e4b45] hover:text-green-700"
            >
              <IconCirclePlus aria-label="Adicionar Tarefa" />
            </button>
          </div>
          <textarea
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            placeholder="Descrição (opcional)"
            className="w-full mt-2 focus:outline-none text-sm text-[#5e4b45] h-16 resize-none"
          />
        </div>
        <div className="w-full">
          {tasks.map((task, index) => (
            <Task
              key={index}
              idTask={task.idTask}
              name={task.name}
              description={task.description}
              onRemove={removeTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </main>
    </>
  );
}
