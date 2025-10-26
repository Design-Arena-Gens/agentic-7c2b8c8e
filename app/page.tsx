'use client';

import { useCallback, useEffect, useState } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import type { CreateTaskPayload, Task } from '@/types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/tasks', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks.');
      }

      const data = (await response.json()) as Task[];
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error while loading tasks.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (payload: CreateTaskPayload) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const { error: message } = await response.json();
      throw new Error(message ?? 'Failed to create task.');
    }

    await fetchTasks();
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const { error: message } = await response.json();
      throw new Error(message ?? 'Failed to update task.');
    }

    await fetchTasks();
  };

  const handleDelete = async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });

    if (!response.ok) {
      const { error: message } = await response.json();
      throw new Error(message ?? 'Failed to delete task.');
    }

    await fetchTasks();
  };

  return (
    <main className="page">
      <section className="page__hero">
        <div>
          <h1>Student Project Planner</h1>
          <p>
            Organize milestones, keep track of progress, and build a strong foundation for your
            full-stack assignment. Start with simple tasks and iterate as your requirements grow.
          </p>
        </div>
        <div className="page__highlight">
          <strong>Tip:</strong> Keep each task scoped to one actionable item so collaboration stays
          clear.
        </div>
      </section>

      <section className="page__content">
        <div className="page__form">
          <h2>Create a project milestone</h2>
          <TaskForm onCreate={handleCreate} />
        </div>

        <div className="page__list">
          <div className="page__list-header">
            <h2>Your plan</h2>
            <button onClick={() => fetchTasks()} type="button">
              Refresh
            </button>
          </div>

          {isLoading ? <p>Loading tasks...</p> : null}
          {error ? <p className="page__error">{error}</p> : null}

          {!isLoading ? (
            <TaskList tasks={tasks} onDelete={handleDelete} onStatusChange={handleStatusChange} />
          ) : null}
        </div>
      </section>
    </main>
  );
}
