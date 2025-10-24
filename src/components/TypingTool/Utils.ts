import { CodeSnippet, snippets } from "../../data/snippets";
// Token types for syntax highlighting (One Dark theme colors)
export const getTokenType = (char, index, code) => {
  const word = getWordAt(code, index);

  // Keywords
  const keywords = [
    "const",
    "let",
    "var",
    "async",
    "await",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "import",
    "export",
    "from",
    "default",
  ];
  if (keywords.includes(word)) return "keyword";

  // Function names (word followed by parenthesis)
  if (word && code[index + word.length] === "(") return "function";

  // Strings
  if (char === '"' || char === "'" || char === "`") return "string";
  if (isInsideString(code, index)) return "string";

  // Numbers
  if (/\d/.test(char)) return "number";

  // Operators and punctuation
  if ("+-*/%=<>!&|".includes(char)) return "operator";
  if ("(){}[]".includes(char)) return "punctuation";
  if (",;.".includes(char)) return "punctuation";

  // Comments
  if (char === "/" && code[index + 1] === "/") return "comment";

  return "default";
};

export const getWordAt = (code, index) => {
  let start = index;
  let end = index;

  while (start > 0 && /[a-zA-Z_]/.test(code[start - 1])) start--;
  while (end < code.length && /[a-zA-Z_]/.test(code[end])) end++;

  return code.slice(start, end);
};

export const isInsideString = (code, index) => {
  let inString = false;
  let stringChar = null;

  for (let i = 0; i < index; i++) {
    if (
      (code[i] === '"' || code[i] === "'" || code[i] === "`") &&
      code[i - 1] !== "\\"
    ) {
      if (!inString) {
        inString = true;
        stringChar = code[i];
      } else if (code[i] === stringChar) {
        inString = false;
        stringChar = null;
      }
    }
  }

  return inString;
};

export const getSyntaxColor = (tokenType) => {
  // One Dark theme colors
  const colors = {
    keyword: "text-purple-400", // const, let, async, await, return
    function: "text-blue-400", // function names
    string: "text-green-400", // strings
    number: "text-orange-400", // numbers
    operator: "text-cyan-400", // =, +=, etc
    punctuation: "text-gray-400", // () {} [] , ;
    comment: "text-gray-500", // comments
    default: "text-gray-300", // variables and other text
  };
  return colors[tokenType] || colors.default;
};

export const getCharColor = (index, codeSnippet, input) => {
  const tokenType = getTokenType(codeSnippet[index], index, codeSnippet);
  const syntaxColor = getSyntaxColor(tokenType);

  if (index < input.length) {
    if (input[index] === codeSnippet[index]) {
      return syntaxColor; // Keep syntax color for correct chars
    } else {
      return "text-red-400 bg-red-900/30"; // Error styling
    }
  }
  return syntaxColor; // Not yet typed
};

export const getCharOpacity = (index, input) => {
  if (index < input.length) {
    return "opacity-100";
  }
  return "opacity-60";
};

export const getRandomSnippet = (
  category: string | null,
  usedIds: Set<string>
): CodeSnippet => {
  let availableSnippets = category
    ? snippets.filter((s) => s.category === category)
    : snippets;

  availableSnippets = availableSnippets.filter((s) => !usedIds.has(s.id));

  if (availableSnippets.length === 0) {
    availableSnippets = category
      ? snippets.filter((s) => s.category === category)
      : snippets;
  }

  const randomIndex = Math.floor(Math.random() * availableSnippets.length);
  return availableSnippets[randomIndex];
};
