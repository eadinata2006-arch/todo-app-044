'use client';

import React, { useState } from 'react';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!task.trim()) return;

    onAddTodo(task.trim());
    setTask(''); // Reset input setelah dikirim
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-lg transition cursor-pointer"
      >
        Tambah
      </button>
    </form>
  );
}