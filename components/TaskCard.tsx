'use client';

import type { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const statusColors: Record<Task['status'], string> = {
  pending: '#fbbf24',
  in_progress: '#38bdf8',
  completed: '#22c55e'
};

const statusLabels: Record<Task['status'], string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed'
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return (
    <article className="task-card">
      <header className="task-card__header">
        <div>
          <h3>{task.title}</h3>
          <p className="task-card__meta">
            Due {new Date(task.dueDate).toLocaleDateString()} · Created{' '}
            {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
        <span className="task-card__status" style={{ backgroundColor: statusColors[task.status] }}>
          {statusLabels[task.status]}
        </span>
      </header>

      <p className="task-card__description">{task.description}</p>

      <footer className="task-card__footer">
        <div className="task-card__actions">
          {task.status !== 'pending' ? (
            <button onClick={() => onStatusChange(task.id, 'pending')}>Mark pending</button>
          ) : null}
          {task.status !== 'in_progress' ? (
            <button onClick={() => onStatusChange(task.id, 'in_progress')}>Start</button>
          ) : null}
          {task.status !== 'completed' ? (
            <button onClick={() => onStatusChange(task.id, 'completed')}>Complete</button>
          ) : null}
        </div>
        <button className="task-card__delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </footer>
    </article>
  );
}
