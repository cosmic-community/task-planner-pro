// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';
import { hasStatus } from '@/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const metadata: Record<string, unknown> = {};

    if (body.description !== undefined) {
      metadata.description = body.description;
    }
    if (body.deadline !== undefined) {
      metadata.deadline = body.deadline;
    }
    if (body.status_field !== undefined) {
      metadata.status_field = body.status_field;
    }
    if (body.priority !== undefined) {
      metadata.priority = body.priority;
    }
    if (body.group !== undefined) {
      metadata.group = body.group || '';
    }

    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) {
      updateData.title = body.title;
    }

    if (Object.keys(metadata).length > 0) {
      updateData.metadata = metadata;
    }

    const response = await cosmic.objects.updateOne(id, updateData);

    return NextResponse.json({ object: response.object });
  } catch (error) {
    console.error('Error updating task:', error);
    if (hasStatus(error)) {
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await cosmic.objects.deleteOne(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (hasStatus(error)) {
      return NextResponse.json(
        { error: 'Failed to delete task' },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}