// Verification script
const verifyEquations = (equations) => {
  const broken = [];

  equations.forEach(eq => {
    const [a, b] = eq.answers;
    let result;
    let expected = parseInt(eq.equation.match(/=\s*(\d+)/)[1]);

    switch(eq.category) {
      case 'addition':
        result = a + b;
        break;
      case 'subtraction':
        result = a - b;
        break;
      case 'multiplication':
        result = a * b;
        break;
      case 'division':
        result = a / b;
        break;
    }

    // Check if answer is correct
    if (result !== expected) {
      broken.push({
        id: eq.id,
        equation: eq.equation,
        answers: eq.answers,
        calculated: result,
        expected: expected,
        category: eq.category
      });
    }

    // Check if options contain both answer numbers
    const hasA = eq.options.includes(a);
    const hasB = eq.options.includes(b);

    if (!hasA || !hasB) {
      broken.push({
        id: eq.id,
        equation: eq.equation,
        answers: eq.answers,
        options: eq.options,
        issue: Missing ${!hasA ? a : ''} ${!hasB ? b : ''} in options
      });
    }
  });

  return broken;
};