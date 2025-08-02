import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { TaskPrototype } from '@/types/tasks';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT idTask, name, description FROM Task',
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed ro fetch tasks: ', error);
    return NextResponse.json(
      { message: 'Error fetching tasks' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 },
      );
    }
    // NOTA: idUser está fixo como 1. No futuro, isso virá de um sistema de autenticação.
    const query =
      'INSERT INTO Task (name, description, User_idUser) VALUES (?, ?, ?)';
    const [result] = await pool.query<ResultSetHeader>(query, [
      name,
      description,
      1,
    ]);

    const newTaskId = result.insertId;
    const newTask: TaskPrototype = {
      idTask: newTaskId.toString(),
      name,
      description,
    };

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json(
      { message: 'Error creating task' },
      { status: 500 },
    );
  }
}
