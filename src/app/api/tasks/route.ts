import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { TaskPrototype } from '@/types/tasks';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [rows] = await pool.query(
      'SELECT idTask, name, description FROM Task WHERE idUser = ?',
      [session.user.id],
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 },
      );
    }

    const query =
      'INSERT INTO Task (name, description, idUser) VALUES (?, ?, ?)';
    const [result] = await pool.query<ResultSetHeader>(query, [
      name,
      description,
      session.user.id,
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
