'use client';

import { Task } from '@/components/task';
import { TaskPrototype } from '@/types/tasks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useState, KeyboardEvent, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskPrototype[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const { data: session, status } = useSession();

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
    if (session) {
      fetchTasks();
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-10 text-center shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo(a) ao To-Do List!
          </h1>
          <p className="text-gray-600">
            Para começar a organizar suas tarefas, por favor, faça o login ou
            crie uma conta.
          </p>
          <div>
            <button
              onClick={() => router.push('/login')}
              className="w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
            >
              Ir para Login
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Novo por aqui?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Crie sua conta
            </Link>
          </p>
        </div>
      </main>
    );
  }

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
      {/** CRIAR COMPONENTE HEADER */}
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
      {/** CRIAR COMPONENTE FOOTER */}
      <footer className="absolute bottom-0">
        <p>Logado como {session.user?.email}</p>
        <button onClick={() => signOut()}>Sair</button>
      </footer>
    </>
  );
}
