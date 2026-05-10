import { createNote } from "../packages/db/src/queries/notes.js";

async function seed() {
  const demoNotes = [
    {
      title: "Welcome to Next.js Server Components",
      content: "Server Components are React components that run exclusively on the server. They can access databases, file systems, and backend resources directly—no API layer needed. This note itself was fetched directly from PostgreSQL inside a Server Component."
    },
    {
      title: "Zero JavaScript on the Client",
      content: "One of the most powerful features of Server Components is that they ship ZERO JavaScript to the browser. The server renders them to HTML and sends only the HTML. This dramatically reduces your bundle size and improves initial page load performance."
    },
    {
      title: "The Mental Model: Server vs Client",
      content: "Think of Server Components as your data layer—they fetch, process, and prepare data. Client Components are your interactivity layer—they handle clicks, forms, animations, and browser APIs. You compose them together: Server Components can render Client Components as children, passing data as props."
    },
    {
      title: "Why I Chose Drizzle ORM",
      content: "Drizzle ORM is a TypeScript-first SQL-like ORM. It gives you the perfect balance: type-safe queries that look like SQL, excellent performance, and a tiny bundle footprint. Unlike Prisma, there's no query engine binary—just pure TypeScript that compiles to SQL."
    },
    {
      title: "React 19 Is a Game Changer",
      content: "React 19 introduces useActionState, useOptimistic, and automatic memoization. These hooks eliminate entire categories of boilerplate. useActionState alone replaces the useState + useEffect + manual error handling pattern we've all written a thousand times."
    },
    {
      title: "Building This Notes App",
      content: "This app demonstrates the complete modern React stack: Next.js 19 App Router, Server Components for data fetching, Server Actions for mutations, React 19 hooks for form state, Zod for validation, Drizzle ORM for database access, and shadcn/ui for beautiful components."
    }
  ];

  for (const note of demoNotes) {
    await createNote(note);
    console.log(`Created: ${note.title}`);
  }

  console.log(`\nSeeded ${demoNotes.length} notes successfully!`);
}

seed().catch(console.error);
