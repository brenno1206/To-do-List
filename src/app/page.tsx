'use client';

import { Task } from '@/components/task';
import { TaskPrototype } from '@/types/tasks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useState, KeyboardEvent, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'minhas-tasks';

export default function Home() {
  const [tasks, setTasks] = useState<TaskPrototype[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Add new Task to the list if the name isn't empty
   * @returns
   */
  function addNewTask(): void {
    if (inputValue.trim() === '') return;
    const newTask: TaskPrototype = {
      index: crypto.randomUUID(),
      name: inputValue.trim(),
      description: descriptionValue.trim(),
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    setDescriptionValue('');
  }
  /**
   * Remove a task by id
   * @param id
   */
  function removeTask(id: string): void {
    const updatedTasks = tasks.filter((task) => task.index !== id);
    setTasks(updatedTasks);
  }

  /**
   * Update a task (Name or Description) by id
   * @param id
   * @param newName
   * @param newDescription
   */
  function updateTask(id: string, newName?: string, newDescription?: string) {
    if (newName || newDescription) {
      if (newName && newDescription) {
        //TODO att nome e descriçao
      } else if (newName) {
        //TODO att nome
      } else {
        //TODO att descricao
      }
    }
  }

  /**
   * Press Enter to save the Task
   * @param event
   */
  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
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
            onKeyDown={handleKeyDown}
            placeholder="Descrição (opcional)"
            className="w-full mt-2 focus:outline-none text-sm text-[#5e4b45] h-16 resize-none"
          />
        </div>
        <div className="w-full">
          {tasks.map((task) => (
            <Task
              key={task.index}
              index={task.index}
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
