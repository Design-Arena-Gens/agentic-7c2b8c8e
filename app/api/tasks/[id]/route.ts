import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { deleteTask, listTasks, updateTask } from '@/lib/taskStore';

interface RouteParams {
  params: { id: string };
}

export async function GET(_: NextRequest, { params }: RouteParams) {
  const tasks = await listTasks();
  const task = tasks.find((item) => item.id === params.id);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const payload = await request.json();
    const updated = await updateTask(params.id, payload);
    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Failed to update task', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
  try {
    const deleted = await deleteTask(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete task', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
