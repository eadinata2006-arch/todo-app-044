import { NextResponse } from 'next/server';
import { getTodos } from '@/lib/todos';
import { Todo } from '@/types/todo';

// Memory storage sederhana untuk simulasi server
let memoryTodos: Todo[] = [];

// GET /api/todos - Mengambil semua data todos
export async function GET() {
  if (memoryTodos.length === 0) {
    memoryTodos = await getTodos();
  }
  return NextResponse.json(memoryTodos);
}

// POST /api/todos - Menambah tugas baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { message: 'Judul tugas wajib diisi' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      description: 'Tugas ditambahkan via API Route (/api/todos).',
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    memoryTodos = [newTodo, ...memoryTodos];
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Gagal memproses request' },
      { status: 500 }
    );
  }
}