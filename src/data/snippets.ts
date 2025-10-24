export interface CodeSnippet {
  id: string;
  language: string;
  category: string;
  difficulty?: "easy" | "medium" | "hard";
  code: string;
  title?: string;
}

export const snippets: CodeSnippet[] = [
  {
    id: "js-async-fetch",
    language: "javascript",
    category: "javascript",
    difficulty: "medium",
    code: `const fetchUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data;
};`,
    title: "Async Fetch Function",
  },
  {
    id: "react-usestate",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: `const [count, setCount] = useState<number>(0);

const increment = () => {
  setCount(prev => prev + 1);
};`,
    title: "React useState Hook",
  },
  {
    id: "ts-arrow-function",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: `const add = (a: number, b: number): number => {
  return a + b;
};`,
    title: "TypeScript Arrow Function",
  },
  // Add more as you go!
];
