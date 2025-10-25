export type CodeSnippet = {
  id: string;
  language: string;
  category: string;
  difficulty?: "easy" | "medium" | "hard";
  code: string;
  title?: string;
};

const normalizeIndentation = (
  code: string,
  spacesPerTab: number = 2
): string => {
  const lines = code.split("\n");
  return lines
    .map((line) => {
      // Count leading spaces
      const leadingSpaces = line.match(/^ */)?.[0].length || 0;
      const tabs = "\t".repeat(Math.floor(leadingSpaces / spacesPerTab));
      const remainingSpaces = " ".repeat(leadingSpaces % spacesPerTab);
      return tabs + remainingSpaces + line.trimStart();
    })
    .join("\n");
};

export const snippets: CodeSnippet[] = [
  {
    id: "js-async-fetch",
    language: "javascript",
    category: "javascript",
    difficulty: "medium",
    code: normalizeIndentation(`const fetchUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data;
};`),
    title: "Async Fetch Function",
  },
  {
    id: "react-usestate",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const [count, setCount] = useState<number>(0);

const increment = () => {
  setCount(prev => prev + 1);
};`),
    title: "React useState Hook",
  },
  {
    id: "ts-arrow-function",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const add = (a: number, b: number): number => {
  return a + b;
};`),
    title: "TypeScript Arrow Function",
  },
  {
    id: "react-useref-map",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
const keyRefs = useRef<Map<string, HTMLDivElement>>(new Map());

const removeTransition = (e: React.TransitionEvent<HTMLDivElement>) => {
  if (e.propertyName !== 'transform') return;
  e.currentTarget.classList.remove('playing');
};`),
    title: "React useRef with Map",
  },
  {
    id: "react-usecallback",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const playSound = useCallback((e: KeyboardEvent) => {
  const audio = audioRefs.current.get(e.code);
  const key = keyRefs.current.get(e.code);
  if (!audio || !key) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}, []);`),
    title: "React useCallback Hook",
  },
  {
    id: "react-useeffect-cleanup",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`useEffect(() => {
  window.addEventListener('keydown', playSound);
  return () => {
    window.removeEventListener('keydown', playSound);
  };
}, [playSound]);`),
    title: "React useEffect with Cleanup",
  },
  {
    id: "array-filter",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const filtered = inventors.filter(inventor => {
  return inventor.year >= 1500 && inventor.year < 1600;
});`),
    title: "Array Filter Method",
  },
  {
    id: "array-map-sort",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const fullNames = inventors
  .map(inventor => inventor.first + ' ' + inventor.last)
  .sort((a, b) => a.year > b.year ? 1 : -1);`),
    title: "Array Map and Sort",
  },
  {
    id: "array-reduce",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);`),
    title: "Array Reduce Method",
  },
  {
    id: "array-sort-comparison",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const oldest = inventors.sort((a, b) => {
  const lastInventor = a.passed - a.year;
  const nextInventor = b.passed - b.year;
  return lastInventor > nextInventor ? -1 : 1;
});`),
    title: "Array Sort with Comparison",
  },
  {
    id: "string-split-sort",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});`),
    title: "Sort by Split Values",
  },
  {
    id: "reduce-object-count",
    language: "typescript",
    category: "typescript",
    difficulty: "medium",
    code: normalizeIndentation(`const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {} as Record<string, number>);`),
    title: "Reduce to Count Instances",
  },
  {
    id: "regex-filter",
    language: "typescript",
    category: "typescript",
    difficulty: "medium",
    code: normalizeIndentation(`const findMatches = (wordToMatch: string, cities: City[]) => {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
};`),
    title: "Filter with RegEx Match",
  },
  {
    id: "array-methods-combo",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const isAdult = people.some(person => person.age >= 18);
const allAdults = people.every(person => person.age >= 18);
const foundPerson = people.find(person => person.name === 'John');
const index = comments.findIndex(comment => comment.id === 823423);`),
    title: "Array Some Every Find",
  },
  {
    id: "array-flat-methods",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const allPeople = families.flat();
const allNames = families.flatMap(family => {
  return family.map(person => person.name);
});`),
    title: "Array Flat and FlatMap",
  },
  {
    id: "array-splice-slice",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const removed = array.splice(startIndex, deleteCount, item1, item2);
const newArray = array.slice(beginIndex, endIndex);`),
    title: "Array Splice vs Slice",
  },
  {
    id: "localstorage-typescript",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`localStorage.setItem('key', JSON.stringify(data));

const stored = localStorage.getItem('key');
const data = stored ? JSON.parse(stored) : {};`),
    title: "LocalStorage with TypeScript",
  },
  {
    id: "map-reduce-chain",
    language: "typescript",
    category: "typescript",
    difficulty: "medium",
    code: normalizeIndentation(`const seconds = timeNodes
  .map(node => {
    const [mins, secs] = node.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);`),
    title: "Map and Reduce Chain",
  },
  {
    id: "getusermedia-api",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    video.srcObject = stream;
    video.play();
  } catch (error) {
    console.error('Camera access denied:', error);
  }
};`),
    title: "Get User Media Stream",
  },
  {
    id: "geolocation-api",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const getLocation = () => {
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(\`Location: \${latitude}, \${longitude}\`);
  });
};`),
    title: "Geolocation API",
  },
  {
    id: "video-playback-control",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const handleMove = (e: MouseEvent, element: HTMLElement) => {
  const y = e.pageY - element.offsetTop;
  const percent = y / element.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + '×';
  video.playbackRate = playbackRate;
};`),
    title: "Video Playback Controller",
  },
  {
    id: "countdown-timer",
    language: "typescript",
    category: "typescript",
    difficulty: "medium",
    code: normalizeIndentation(`const countdown = (seconds: number) => {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  
  const interval = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(interval);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};`),
    title: "Countdown Timer",
  },
];
