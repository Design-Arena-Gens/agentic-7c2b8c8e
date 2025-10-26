import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createTask, listTasks } from '@/lib/taskStore';

export async function GET() {
  const tasks = await listTasks();
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, dueDate } = await request.json();

    if (!title || !description || !dueDate) {
      return NextResponse.json(
        {
          error: 'Missing required fields. Title, description, and due date are required.'
        },
        { status: 400 }
      );
    }

    const newTask = await createTask({ title, description, dueDate });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Failed to create task', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
