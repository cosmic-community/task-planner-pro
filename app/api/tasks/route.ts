import { NextRequest, NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';
import { hasStatus, TaskFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: TaskFormData = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!body.deadline) {
      return NextResponse.json(
        { error: 'Deadline is required' },
        { status: 400 }
      );
    }

    const metadata: Record<string, unknown> = {
      description: body.description || '',
      deadline: body.deadline,
      status_field: body.status_field || 'To Do',
      priority: body.priority || 'Medium',
      created_at: new Date().toISOString(),
    };

    if (body.group) {
      metadata.group = body.group;
    }

    const response = await cosmic.objects.insertOne({
      type: 'tasks',
      title: body.title.trim(),
      metadata,
    });

    return NextResponse.json({ object: response.object }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    if (hasStatus(error)) {
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}