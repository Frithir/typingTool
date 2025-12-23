// Helper function to validate equation
export const validateEquation = (
  equation: string,
  userAnswers: number[],
  category: "addition" | "subtraction" | "multiplication" | "division"
): boolean => {
  if (userAnswers.length !== 2) return false;

  const [a, b] = userAnswers;

  // Extract the result from equation (the number after =)
  const resultMatch = equation.match(/=\s*(\d+)/);
  if (!resultMatch) return false;
  const expectedResult = parseInt(resultMatch[1]);

  switch (category) {
    case "addition":
      // Commutative: a + b = b + a
      return a + b === expectedResult;

    case "subtraction":
      // NOT commutative: only check a - b
      return a - b === expectedResult;

    case "multiplication":
      // Commutative: a × b = b × a
      return a * b === expectedResult;

    case "division":
      // NOT commutative: only check a ÷ b
      return a / b === expectedResult;

    default:
      return false;
  }
};
