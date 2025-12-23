export type Equation = {
  id: string;
  category: "addition" | "subtraction" | "multiplication" | "division";
  difficulty: "easy" | "medium" | "hard";
  equation: string; // Format: "_ + _ = 11" where _ represents blanks
  answers: number[]; // Correct answers for each blank in order
  options: number[]; // Available number options
  title: string;
  timeLimit: number; // seconds
};

export const equations: Equation[] = [
  // ADDITION - EASY
  {
    id: "add-easy-1",
    category: "addition",
    difficulty: "easy",
    equation: "_ + _ = 11",
    answers: [4, 7],
    options: [1, 2, 4, 6, 7, 8],
    title: "Single Digit Addition",
    timeLimit: 30,
  },
  {
    id: "add-easy-2",
    category: "addition",
    difficulty: "easy",
    equation: "_ + _ = 9",
    answers: [3, 6],
    options: [1, 3, 4, 5, 6, 8],
    title: "Single Digit Addition",
    timeLimit: 30,
  },
  {
    id: "add-easy-3",
    category: "addition",
    difficulty: "easy",
    equation: "_ + _ = 15",
    answers: [8, 7],
    options: [3, 5, 7, 8, 9, 6],
    title: "Single Digit Addition",
    timeLimit: 30,
  },

  // SUBTRACTION - EASY
  {
    id: "sub-easy-1",
    category: "subtraction",
    difficulty: "easy",
    equation: "_ - _ = 5",
    answers: [12, 7],
    options: [3, 7, 9, 12, 15, 18],
    title: "Simple Subtraction",
    timeLimit: 30,
  },
  {
    id: "sub-easy-2",
    category: "subtraction",
    difficulty: "easy",
    equation: "_ - _ = 8",
    answers: [15, 7],
    options: [5, 7, 10, 12, 15, 20],
    title: "Simple Subtraction",
    timeLimit: 30,
  },

  // MULTIPLICATION - EASY
  {
    id: "mult-easy-1",
    category: "multiplication",
    difficulty: "easy",
    equation: "_ × _ = 12",
    answers: [3, 4],
    options: [2, 3, 4, 5, 6, 8],
    title: "Times Tables",
    timeLimit: 30,
  },
  {
    id: "mult-easy-2",
    category: "multiplication",
    difficulty: "easy",
    equation: "_ × _ = 24",
    answers: [6, 4],
    options: [3, 4, 6, 7, 8, 12],
    title: "Times Tables",
    timeLimit: 30,
  },
  {
    id: "mult-easy-3",
    category: "multiplication",
    difficulty: "easy",
    equation: "_ × _ = 18",
    answers: [3, 6],
    options: [2, 3, 6, 7, 9, 12],
    title: "Times Tables",
    timeLimit: 30,
  },

  // DIVISION - EASY
  {
    id: "div-easy-1",
    category: "division",
    difficulty: "easy",
    equation: "_ ÷ _ = 4",
    answers: [12, 3],
    options: [2, 3, 6, 8, 12, 16],
    title: "Simple Division",
    timeLimit: 30,
  },
  {
    id: "div-easy-2",
    category: "division",
    difficulty: "easy",
    equation: "_ ÷ _ = 5",
    answers: [20, 4],
    options: [4, 5, 10, 15, 20, 25],
    title: "Simple Division",
    timeLimit: 30,
  },

  // ADDITION - MEDIUM
  {
    id: "add-med-1",
    category: "addition",
    difficulty: "medium",
    equation: "_ + _ = 47",
    answers: [23, 24],
    options: [12, 15, 23, 24, 28, 35],
    title: "Two Digit Addition",
    timeLimit: 45,
  },
  {
    id: "add-med-2",
    category: "addition",
    difficulty: "medium",
    equation: "_ + _ = 83",
    answers: [39, 44],
    options: [25, 32, 39, 44, 51, 58],
    title: "Two Digit Addition",
    timeLimit: 45,
  },

  // SUBTRACTION - MEDIUM
  {
    id: "sub-med-1",
    category: "subtraction",
    difficulty: "medium",
    equation: "_ - _ = 27",
    answers: [65, 38],
    options: [25, 32, 38, 42, 50, 65],
    title: "Two Digit Subtraction",
    timeLimit: 45,
  },

  // MULTIPLICATION - MEDIUM
  {
    id: "mult-med-1",
    category: "multiplication",
    difficulty: "medium",
    equation: "_ × _ = 72",
    answers: [8, 9],
    options: [6, 7, 8, 9, 11, 12],
    title: "Times Tables",
    timeLimit: 45,
  },
  {
    id: "mult-med-2",
    category: "multiplication",
    difficulty: "medium",
    equation: "_ × _ = 144",
    answers: [12, 12],
    options: [8, 9, 11, 12, 14, 16],
    title: "Times Tables",
    timeLimit: 45,
  },

  // DIVISION - MEDIUM
  {
    id: "div-med-1",
    category: "division",
    difficulty: "medium",
    equation: "_ ÷ _ = 9",
    answers: [81, 9],
    options: [7, 9, 11, 54, 72, 81],
    title: "Division Practice",
    timeLimit: 45,
  },

  // ADDITION - HARD
  {
    id: "add-hard-1",
    category: "addition",
    difficulty: "hard",
    equation: "_ + _ = 157",
    answers: [89, 68],
    options: [45, 68, 73, 89, 92, 115],
    title: "Large Number Addition",
    timeLimit: 60,
  },

  // MULTIPLICATION - HARD
  {
    id: "mult-hard-1",
    category: "multiplication",
    difficulty: "hard",
    equation: "_ × _ = 156",
    answers: [13, 12],
    options: [11, 12, 13, 14, 15, 16],
    title: "Advanced Multiplication",
    timeLimit: 60,
  },
  {
    id: "mult-hard-2",
    category: "multiplication",
    difficulty: "hard",
    equation: "_ × _ = 221",
    answers: [13, 17],
    options: [11, 13, 15, 17, 19, 21],
    title: "Advanced Multiplication",
    timeLimit: 60,
  },

  // DIVISION - HARD
  {
    id: "div-hard-1",
    category: "division",
    difficulty: "hard",
    equation: "_ ÷ _ = 14",
    answers: [168, 12],
    options: [11, 12, 13, 144, 156, 168],
    title: "Advanced Division",
    timeLimit: 60,
  },
];

// Helper to get random equation
export const getRandomEquation = (
  difficulty?: "easy" | "medium" | "hard",
  usedIds: Set<string> = new Set()
): Equation => {
  let available = difficulty
    ? equations.filter((eq) => eq.difficulty === difficulty)
    : equations;

  available = available.filter((eq) => !usedIds.has(eq.id));

  if (available.length === 0) {
    available = difficulty
      ? equations.filter((eq) => eq.difficulty === difficulty)
      : equations;
  }

  return available[Math.floor(Math.random() * available.length)];
};
