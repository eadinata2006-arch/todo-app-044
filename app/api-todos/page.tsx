import React from 'react';
import { getTodos } from '@/lib/todos';

export default async function ApiTodosPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-70 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>

          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-semibold text-gray-700">Daftar Tugas</h2>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
              {todos.length} Item
            </span>
          </div>

          <div className="space-y-3">
            {todos.map((todo) => {
              const todoTitle = todo.title ?? todo.todo ?? 'Tanpa judul';

              return (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gray-50/50 hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="w-4 h-4 text-blue-600 rounded cursor-not-allowed"
                    />
                    <span
                      className={`font-medium ${
                        todo.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {todoTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      ID: #{todo.id}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      User: {todo.userId ?? 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        todo.completed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {todo.completed ? 'Selesai' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}