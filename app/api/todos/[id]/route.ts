import { NextResponse } from 'next/server';
import { Todo } from '@/types/todo';

// Kueri parameter dinamis [id]
type RouteParams = {
  params: Promise<{ id: string }>;
};

// PATCH /api/todos/[id] - Mengubah status completed atau detail tugas
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const todoId = Number(id);
    const body = await request.json();

    // Di simulasi ini kita mengembalikan respon sukses dengan data ter-update
    const updatedTodo: Partial<Todo> = {
      id: todoId,
      ...body,
    };

    return NextResponse.json(updatedTodo);
  } catch {
    return NextResponse.json(
      { message: 'Gagal memperbarui tugas' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Menghapus tugas
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const todoId = Number(id);

    return NextResponse.json({
      message: `Tugas dengan ID ${todoId} berhasil dihapus`,
      id: todoId,
    });
  } catch {
    return NextResponse.json(
      { message: 'Gagal menghapus tugas' },
      { status: 500 }
    );
  }
}