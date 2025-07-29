'use client';
import { Task } from '@/components/task';
import { TaskPrototype } from '@/types/tasks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskPrototype[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [idx, setIdx] = useState(0);

  function addNewTask() {
    if (!inputValue) return;
    const newTasks = tasks;
    newTasks.push({
      index: idx.toString(),
      name: inputValue,
    });

    setIdx(idx + 1);
    setTasks(newTasks);
    setInputValue('');
  }

  return (
    <>
      <main className="mt-30 flex flex-col">
        <div className="mb-10 border-b-1 flex items-center  px-3 py-2 w-full max-w-sm mx-auto overflow-clip shadow-xl shadow-gray-200 ">
          <input
            type="text"
            id="taskInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite uma nova tarefa"
            className="w-full focus:outline-none px-2 text-[#5e4b45]"
          />
          <button onClick={addNewTask}>
            <IconCirclePlus aria-label="pesquisa" />
          </button>
        </div>
        <div className="w-full">
          {tasks.map((task, index) => (
            <Task key={index} name={task.name} index={task.index} />
          ))}
        </div>
      </main>
    </>
  );
}

/**
 *
 * ________ +
 * [ ] titulo       -(remover)
 * descricao (aumenta qnd hover) ()update
 *
 */
