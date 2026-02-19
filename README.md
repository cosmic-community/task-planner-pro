# ✅ Task Planner Pro

![Task Planner Pro](https://imgix.cosmicjs.com/a0df1260-0d4e-11f1-b972-459e0ce1e52b-photo-1497215842964-222b430dc094-1771476675674.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, full-featured task management application built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Manage tasks with deadlines, priorities, group categorization, file attachments, and rich markdown descriptions — all powered by your Cosmic content.

## Features

- ✅ **Kanban Board View** — Visualize tasks across status columns (To Do, In Progress, Done)
- 📋 **List View** — Browse all tasks in a detailed, filterable list
- ➕ **Create Tasks** — Add new tasks with title, description, deadline, priority, group, and attachments
- ✏️ **Edit Tasks** — Update any task field inline or via a dedicated edit form
- 🗑️ **Delete Tasks** — Remove tasks with confirmation dialog
- 🏷️ **Group Filtering** — Filter by Work, Personal, Learning, or any custom group
- 🎯 **Priority Levels** — High, Medium, Low with color-coded badges
- 📎 **File Attachments** — View and manage attached images and files
- 📝 **Markdown Support** — Rich text descriptions with full markdown rendering
- ⏰ **Deadline Tracking** — Visual indicators for upcoming and overdue tasks
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=699695cefc83ec3ef0727702&clone_repository=69969dd0fc83ec3ef0727f94)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "web application which helps to add tasks along with deadline, description, allows to add image or other files as attachment to the task, the task added should also specify when the task was added, the tasks should be able to be grouped, editing of tasks should be allowed"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router and Server Components
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the Task Planner bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-planner-pro
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Cosmic SDK Examples

### Fetching Tasks with Group Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: tasks } = await cosmic.objects
  .find({ type: 'tasks' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Task
```typescript
await cosmic.objects.insertOne({
  type: 'tasks',
  title: 'New Task',
  metadata: {
    description: '## Task Description',
    deadline: '2025-03-01',
    status_field: 'To Do',
    priority: 'Medium',
    group: groupId,
    created_at: new Date().toISOString()
  }
})
```

### Updating Task Status
```typescript
await cosmic.objects.updateOne(taskId, {
  metadata: {
    status_field: 'In Progress'
  }
})
```

## Cosmic CMS Integration

This application uses two Cosmic object types:

### Tasks (`tasks`)
| Field | Type | Description |
|-------|------|-------------|
| description | Markdown | Rich text task description |
| deadline | Date | Task due date |
| status_field | Select Dropdown | To Do, In Progress, Done |
| priority | Select Dropdown | Low, Medium, High |
| group | Object (task-groups) | Task group/category |
| attachments | Files | Image and file attachments |
| created_at | Text | Timestamp of task creation |

### Task Groups (`task-groups`)
| Field | Type | Description |
|-------|------|-------------|
| name | Text | Group display name |
| description | Textarea | Group description |
| color | Color | Hex color for visual coding |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

<!-- README_END -->