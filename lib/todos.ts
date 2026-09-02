import { Todo } from '@/types/todo';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://dummyjson.com/todos', {
    cache: 'no-store', // atau { next: { revalidate: 60 } } kalau mau di-cache
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data todos dari API');
  }

  const data = await res.json();
  return data.todos; // DummyJSON balikin { todos: [...], total, skip, limit }
}

export async function getTodoDetail(id: string | number): Promise<Todo | null> {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}