'use client';

import { useState } from 'react';
import type { CreateTaskPayload } from '@/types/task';

interface TaskFormProps {
  onCreate: (task: CreateTaskPayload) => Promise<void>;
}

const initialState: CreateTaskPayload = {
  title: '',
  description: '',
  dueDate: ''
};

export function TaskForm({ onCreate }: TaskFormProps) {
  const [form, setForm] = useState<CreateTaskPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      setError('Please fill out all fields before creating a task.');
      setIsSubmitting(false);
      return;
    }

    try {
      await onCreate(form);
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__fieldset">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g., Gather project requirements"
          required
        />
      </div>

      <div className="task-form__fieldset">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What needs to be done and why it matters"
          rows={4}
          required
        />
      </div>

      <div className="task-form__row">
        <div className="task-form__fieldset">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button className="task-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add task'}
        </button>
      </div>

      {error ? <p className="task-form__error">{error}</p> : null}
    </form>
  );
}
