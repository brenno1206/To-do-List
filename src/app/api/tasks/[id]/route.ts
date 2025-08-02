import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    const { name, description } = await request.json();

    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json({ message: 'Invalid Task ID' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 },
      );
    }

    const query = 'UPDATE Task SET name = ?, description = ? WHERE idTask = ?';
    await pool.query<ResultSetHeader>(query, [name, description, id]);

    return NextResponse.json(
      { message: 'Task updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json(
      { message: 'Error updating task' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json({ message: 'Invalid Task ID' }, { status: 400 });
    }

    const query = 'DELETE FROM Task WHERE idTask = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete task:', error);
    return NextResponse.json(
      { message: 'Error deleting task' },
      { status: 500 },
    );
  }
}
