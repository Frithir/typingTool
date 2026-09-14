export type TrigFunctionName = "sin" | "cos" | "tan" | "csc" | "sec" | "cot";

export type Point = { x: number; y: number };

export type TrigGeometry = {
  angleDeg: number;
  angleRad: number;
  sin: number;
  cos: number;
  tan: number | null;
  csc: number | null;
  sec: number | null;
  cot: number | null;
  point: Point; // (cos, sin) on the unit circle
  cosFoot: Point; // (0, sin) - where the cos segment starts
  sinFoot: Point; // (cos, 0) - where the sin segment starts
  secPoint: Point | null; // (sec, 0) - tangent line meets the x-axis
  cscPoint: Point | null; // (0, csc) - tangent line meets the y-axis
};

const EPS = 1e-9;

// Everything here is computed in "unit circle space" (radius 1, origin at 0,0).
// The diagram component is responsible for scaling/flipping into SVG pixels.
export const computeTrigGeometry = (angleDeg: number): TrigGeometry => {
  const angleRad = (angleDeg * Math.PI) / 180;
  const sin = Math.sin(angleRad);
  const cos = Math.cos(angleRad);

  const tan = Math.abs(cos) < EPS ? null : sin / cos;
  const cot = Math.abs(sin) < EPS ? null : cos / sin;
  const sec = Math.abs(cos) < EPS ? null : 1 / cos;
  const csc = Math.abs(sin) < EPS ? null : 1 / sin;

  return {
    angleDeg,
    angleRad,
    sin,
    cos,
    tan,
    csc,
    sec,
    cot,
    point: { x: cos, y: sin },
    cosFoot: { x: 0, y: sin },
    sinFoot: { x: cos, y: 0 },
    secPoint: sec === null ? null : { x: sec, y: 0 },
    cscPoint: csc === null ? null : { x: 0, y: csc },
  };
};

export const FUNCTION_LABELS: Record<TrigFunctionName, string> = {
  sin: "sin(θ)",
  cos: "cos(θ)",
  tan: "tan(θ)",
  csc: "csc(θ)",
  sec: "sec(θ)",
  cot: "cot(θ)",
};

export const FUNCTION_COLORS: Record<TrigFunctionName, string> = {
  cos: "#22d3ee", // cyan
  sin: "#f43f5e", // rose
  tan: "#f59e0b", // amber
  csc: "#c026d3", // fuchsia
  sec: "#f97316", // orange
  cot: "#2dd4bf", // teal
};

export const formatValue = (value: number | null, digits = 2): string => {
  if (value === null || !Number.isFinite(value)) return "undefined";
  return value.toFixed(digits);
};

const round2 = (n: number) => Math.round(n * 100) / 100;

// Difficulty controls which angles show up in the quiz. Nice round angles
// for "easy", finer steps for "hard".
const QUIZ_ANGLES: Record<"easy" | "medium" | "hard", number[]> = {
  easy: [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330],
  medium: Array.from({ length: 24 }, (_, i) => i * 15),
  hard: Array.from({ length: 72 }, (_, i) => i * 5),
};

export type QuizQuestion = {
  angleDeg: number;
  fn: TrigFunctionName;
  correctValue: number;
  options: number[];
  geometry: TrigGeometry;
};

const ALL_FUNCTIONS: TrigFunctionName[] = ["sin", "cos", "tan", "csc", "sec", "cot"];

// Picks a random angle/function pair that has a defined value, then builds
// four rounded answer options (the correct one plus plausible mix-ups: the
// reciprocal function, the "co" function, and a sign flip).
export const generateQuizQuestion = (
  difficulty: "easy" | "medium" | "hard"
): QuizQuestion => {
  const angles = QUIZ_ANGLES[difficulty];

  for (let attempt = 0; attempt < 50; attempt++) {
    const angleDeg = angles[Math.floor(Math.random() * angles.length)];
    const fn = ALL_FUNCTIONS[Math.floor(Math.random() * ALL_FUNCTIONS.length)];
    const geometry = computeTrigGeometry(angleDeg);
    const correctValueRaw = geometry[fn];

    if (correctValueRaw === null || !Number.isFinite(correctValueRaw)) {
      continue;
    }

    const correctValue = round2(correctValueRaw);

    const distractorPool = [
      geometry.sin,
      geometry.cos,
      geometry.tan,
      geometry.csc,
      geometry.sec,
      geometry.cot,
      -correctValueRaw,
      correctValueRaw !== 0 ? 1 / correctValueRaw : null,
    ]
      .filter((v): v is number => v !== null && Number.isFinite(v))
      .map(round2)
      .filter((v) => Math.abs(v - correctValue) > 0.01);

    const uniqueDistractors: number[] = [];
    for (const candidate of distractorPool) {
      if (!uniqueDistractors.some((v) => Math.abs(v - candidate) <= 0.01)) {
        uniqueDistractors.push(candidate);
      }
    }

    // Top up with small offsets if we didn't get 3 distinct distractors
    // (mostly relevant for tan/cot on nice angles with few natural mix-ups).
    let offset = 0.5;
    while (uniqueDistractors.length < 3) {
      const candidate = round2(correctValue + offset);
      if (
        Math.abs(candidate - correctValue) > 0.01 &&
        !uniqueDistractors.some((v) => Math.abs(v - candidate) <= 0.01)
      ) {
        uniqueDistractors.push(candidate);
      }
      offset = offset > 0 ? -offset - 0.5 : -offset + 0.5;
    }

    const options = shuffle([
      correctValue,
      ...pickRandom(uniqueDistractors, 3),
    ]);

    return { angleDeg, fn, correctValue, options, geometry };
  }

  // Fallback (should not realistically be reached): sin(30) = 0.5
  const geometry = computeTrigGeometry(30);
  return {
    angleDeg: 30,
    fn: "sin",
    correctValue: 0.5,
    options: shuffle([0.5, 0.87, 1.73, -0.5]),
    geometry,
  };
};

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickRandom = <T,>(arr: T[], count: number): T[] => shuffle(arr).slice(0, count);
