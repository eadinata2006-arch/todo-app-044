'use client';

import React, { useState, useEffect } from 'react';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { Todo } from '@/types/todo';

type TodoFetchedAppProps = {
  initialTodos: Todo[];
};

export default function TodoFetchedApp({ initialTodos }: TodoFetchedAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(false);

  // Mengambil data terbaru dari API saat pertama kali dirender
  useEffect(() => {
    const fetchLatestTodos = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/todos');
        if (res.ok) {
          const data = await res.json();
          setTodos(data);
        }
      } catch (error) {
        console.error('Gagal mengambil data dari API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTodos();
  }, []);

  // Handler POST (Tambah Data)
  const handleAddTodo = async (title: string) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        const newTodo = await res.json();
        setTodos((prev) => [newTodo, ...prev]);
      }
    } catch (error) {
      console.error('Gagal menambah todo:', error);
    }
  };

  // Handler PATCH (Toggle Completed)
  const handleToggleTodo = async (id: number) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    const nextState = !targetTodo.completed;

    // Optimistic Update UI
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextState } : t))
    );

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: nextState }),
      });
    } catch (error) {
      console.error('Gagal mengubah status todo:', error);
    }
  };

  // Handler DELETE (Hapus Data)
  const handleDeleteTodo = async (id: number) => {
    // Optimistic Update UI
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Gagal menghapus todo:', error);
    }
  };

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="flex items-center justify-between text-xs text-gray-500 mb-2 px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          API Routes Sync Active (/api/todos)
        </span>
        {loading && <span className="text-gray-400">Syncing...</span>}
      </div>

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}