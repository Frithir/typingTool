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
    id: "drums1",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const keyRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const removeTransition = (e: React.TransitionEvent<HTMLDivElement>): void => {
    if (e.propertyName !== 'transform') return;
    e.currentTarget.classList.remove('playing');
  };`),
    title: "Drum Kit Setup Part 1",
  },
  {
    id: "drums2",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const playSound = useCallback((e: KeyboardEvent): void => {
  const audio = audioRefs.current.get(e.code);
  const key = keyRefs.current.get(e.code);
  if (!audio || !key) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}, []);`),
    title: "Drum Kit Setup Part 2",
  },
  {
    id: "drums3",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`useEffect(() => {
  window.addEventListener('keydown', playSound);
  return () => window.removeEventListener('keydown', playSound);
}, [playSound]);

return <div>Drum Kit Component</div>;
};`),
    title: "Drum Kit Setup Part 3",
  },
  {
    id: "filter",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const inventors15 = 
      inventors.filter(inventor => 
        (inventor.year >= 1500 && inventor.year < 1600)
      );`),
    title: "Filter inventors born in 1500s",
  },
  {
    id: "map and sort",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const fullNames = inventors.map(inventor => ${inventor.first} ${inventor.last})
    .sort((a, b) => a.year > b.year ? 1 : -1);`),
    title: "Map and sort inventors by birthdate",
  },
  {
    id: "reduce",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);`),
    title: "Total years lived by all inventors",
  },
  {
    id: "sort by years lived",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const oldest = inventors.sort((a, b) => {
  const lastInventor = a.passed - a.year;
  const nextInventor = b.passed - b.year;
  return lastInventor > nextInventor ? -1 : 1;
});`),
    title: "Sort inventors by years lived",
  },
  {
    id: "sort alphabetically",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});`),
    title: "Sort people alphabetically by last name",
  },
  {
    id: "reduce instances",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const transportation = data.reduce(function(obj, item) {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});`),
    title: "Sum the instances of each item in an array",
  },
  {
    id: "Find matches",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const findMatches = (wordToMatch, cities) {
return cities.filter(place => {
  const regex = new RegExp(wordToMatch, 'gi');
  return place.city.match(regex) || place.state.match(regex)
});
}`),
    title: "Find matches in an array",
  },
  {
    id: "Some Every Find",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const isAdult = people.some(person => person.age >= 18);
const allAdults = people.every(person => person.age >= 18);
const foundPerson = people.find(person => person.name === 'John');
const index = comments.findIndex(comment => comment.id === 823423);`),
    title: "Array some, every, and find methods",
  },
  {
    id: "flat and flatMap",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const allPeople = families.flat();
const allNames = families.flatMap(family => family.map(person => person.name));`),
    title: "Array flat and flatMap methods",
  },
  {
    id: "splice and slice",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`const removedItems = array.splice(startIndex, deleteCount, item1, item2);
const newArray = array.slice(beginIndex, endIndex);`),
    title: "Array splice and slice methods",
  },
  {
    id: "local storage",
    language: "typescript",
    category: "typescript",
    difficulty: "easy",
    code: normalizeIndentation(`// Save data to local storage
localStorage.setItem('key', JSON.stringify(data));

// Retrieve data from local storage
const data = JSON.parse(localStorage.getItem('key') || '{}');`),
    title: "Using Local Storage in TypeScript",
  },
  {
    id: "Map reduce filter",
    language: "typescript",
    category: "typescript",
    difficulty: "medium",
    code: normalizeIndentation(`const seconds = timeNodes
.map(timeCode => {
  const [mins, secs] = timeCode.split(':').map(parseFloat);
  return (mins * 60) + secs;
})
.reduce((total, vidSeconds) => total + vidSeconds);`),
    title: "Basic Map, Filter, and Reduce Operations",
  },
  {
    id: "devices",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const getVideo = () => {
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(localMediaStream => {
  console.log(localMediaStream);
  video.src = window.URL.createObjectURL(localMediaStream);
  video.play();
})
.catch(error => {
  console.error(error);
});
}`),
    title: "Get user Media Devices",
  },
  {
    id: "geolocation",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const getLocation = () => {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log('Geometry:', lat, lon);   
  });
} else {
  console.error("Navigation geolocation is not supported");
} 
}`),
    title: "Get User Geolocation",
  },
  {
    id: "speed controller",
    language: "typescript",
    category: "typescript",
    difficulty: "hard",
    code: normalizeIndentation(`const handleMove = (e) => {
      const y = e.pageY - this.offsetTop;
      const percent = y / this.offsetHeight;
      const min = 0.4;
      const max = 4;
      const height = Math.round(percent * 100) + '%';
      const playbackRate = percent * (max - min) + min;
      bar.style.height = height;
      bar.textContent = playbackRate.toFixed(2) + '×';
      video.playbackRate = playbackRate;
    }`),
    title: "Video Speed Controller",
  },
  {
    id: "countdown",
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
    title: "Countdown Timer Function",
  },
];
