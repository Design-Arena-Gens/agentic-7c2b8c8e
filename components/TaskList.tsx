'use client';

import type { Task } from '@/types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export function TaskList({ tasks, onDelete, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <h3>No tasks yet</h3>
        <p>Start by adding the first milestone for your project plan.</p>
      </div>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </section>
  );
}
