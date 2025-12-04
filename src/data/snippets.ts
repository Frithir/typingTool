export type CodeSnippet = {
  id: string;
  language: string;
  category: string;
  difficulty?: "easy" | "medium" | "hard";
  code: string;
  title?: string;
};

// Helper to convert spaces to tabs
// Note: Whitespace is auto-inserted when typing, so focus on clean code formatting
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

const removeTransition = (event: React.TransitionEvent<HTMLDivElement>) => {
  if (event.propertyName !== 'transform') return;
  event.currentTarget.classList.remove('playing');
};`),
    title: "React useRef with Map",
  },
  {
    id: "react-usecallback",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const playSound = useCallback((event: KeyboardEvent) => {
  const audio = audioRefs.current.get(event.code);
  const key = keyRefs.current.get(event.code);
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
    code: normalizeIndentation(`const handleMove = (event: MouseEvent, element: HTMLElement) => {
  const y = event.pageY - element.offsetTop;
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
  {
    id: "react-useeffect-fetch",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const json = await response.json();
    setData(json);
  };
  fetchData();
}, []);`),
    title: "useEffect with Async Fetch",
  },
  {
    id: "react-custom-hook",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue] as const;
};`),
    title: "Custom Hook with Generic",
  },
  {
    id: "react-usememo",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const expensiveValue = useMemo(() => {
  return items.filter(item => item.active)
    .map(item => item.price)
    .reduce((sum, price) => sum + price, 0);
}, [items]);`),
    title: "useMemo for Expensive Calc",
  },
  {
    id: "react-usecontext",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const ThemeContext = createContext<Theme | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};`),
    title: "Context with Custom Hook",
  },
  {
    id: "react-usereducer",
    language: "typescript",
    category: "react",
    difficulty: "hard",
    code: normalizeIndentation(`type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset'; payload: number };

const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return action.payload;
    default: return state;
  }
};

const [count, dispatch] = useReducer(reducer, 0);`),
    title: "useReducer with TypeScript",
  },
  {
    id: "react-controlled-input",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const [name, setName] = useState('');

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setName(event.target.value);
};

return <Input value={name} onChange={handleChange} />;`),
    title: "Controlled Input Component",
  },
  {
    id: "react-form-submit",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = formData.get('email') as string;
  console.log('Submitted:', email);
};`),
    title: "Form Submit Handler",
  },
  {
    id: "react-conditional-render",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const UserGreeting = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
};`),
    title: "Conditional Rendering",
  },
  {
    id: "react-list-key",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};`),
    title: "List Rendering with Keys",
  },
  {
    id: "react-children-props",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};`),
    title: "Component with Children",
  },
  {
    id: "react-optional-props",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

const Button = ({ onClick, disabled = false, variant = 'primary' }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled} className={variant} />;
};`),
    title: "Optional Props with Defaults",
  },
  {
    id: "react-forward-ref",
    language: "typescript",
    category: "react",
    difficulty: "hard",
    code: normalizeIndentation(`const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
    />
  );
});

Input.displayName = 'Input';`),
    title: "forwardRef with TypeScript",
  },
  {
    id: "react-useimperativehandle",
    language: "typescript",
    category: "react",
    difficulty: "hard",
    code: normalizeIndentation(`const Input = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current && (inputRef.current.value = '')
  }));
  
  return <Input ref={inputRef} />;
});`),
    title: "useImperativeHandle Hook",
  },
  {
    id: "react-lazy-suspense",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const LazyComponent = lazy(() => import('./Component'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);`),
    title: "Lazy Loading with Suspense",
  },
  {
    id: "react-portal",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const Modal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.getElementById('modal-root')!
  );
};`),
    title: "Portal for Modal",
  },
  {
    id: "react-debounce-hook",
    language: "typescript",
    category: "react",
    difficulty: "hard",
    code: normalizeIndentation(`const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};`),
    title: "Debounce Custom Hook",
  },
  {
    id: "react-previous-value",
    language: "typescript",
    category: "react",
    difficulty: "medium",
    code: normalizeIndentation(`const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
};`),
    title: "Previous Value Hook",
  },
  {
    id: "react-intersection-observer",
    language: "typescript",
    category: "react",
    difficulty: "hard",
    code: normalizeIndentation(`const useIntersectionObserver = (ref: RefObject<Element>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [ref]);
  
  return isVisible;
};`),
    title: "Intersection Observer Hook",
  },
  {
    id: "react-toggle-hook",
    language: "typescript",
    category: "react",
    difficulty: "easy",
    code: normalizeIndentation(`const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
};`),
    title: "Toggle Custom Hook",
  },
  {
    id: "tanstack-query-basic",
    language: "typescript",
    category: "tanstack",
    difficulty: "easy",
    code: normalizeIndentation(`const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
});`),
    title: "Basic TanStack Query",
  },
  {
    id: "tanstack-query-mutation",
    language: "typescript",
    category: "tanstack",
    difficulty: "medium",
    code: normalizeIndentation(`const mutation = useMutation({
  mutationFn: async (userData: User) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});`),
    title: "TanStack Mutation",
  },
  {
    id: "tanstack-query-params",
    language: "typescript",
    category: "tanstack",
    difficulty: "medium",
    code: normalizeIndentation(`const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  },
  enabled: !!userId
});`),
    title: "Query with Dynamic Params",
  },
  {
    id: "tanstack-infinite-query",
    language: "typescript",
    category: "tanstack",
    difficulty: "hard",
    code: normalizeIndentation(`const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await fetch(\`/api/posts?page=\${pageParam}\`);
    return response.json();
  },
  getNextPageParam: (lastPage) => lastPage.nextCursor
});`),
    title: "Infinite Query Pagination",
  },
  {
    id: "tanstack-optimistic-update",
    language: "typescript",
    category: "tanstack",
    difficulty: "hard",
    code: normalizeIndentation(`const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old: Todo[]) => [...old, newTodo]);
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context?.previous);
  }
});`),
    title: "Optimistic Update Pattern",
  },
  {
    id: "api-controller-get",
    language: "typescript",
    category: "api",
    difficulty: "medium",
    code: normalizeIndentation(`export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};`),
    title: "API GET Controller",
  },
  {
    id: "api-controller-post",
    language: "typescript",
    category: "api",
    difficulty: "medium",
    code: normalizeIndentation(`export const createUser = async (req: Request, res: Response) => {
  try {
    const validated = userSchema.parse(req.body);
    const user = await db.user.create({ data: validated });
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid data' });
  }
};`),
    title: "API POST Controller",
  },
  {
    id: "api-controller-put",
    language: "typescript",
    category: "api",
    difficulty: "medium",
    code: normalizeIndentation(`export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = userSchema.parse(req.body);
    const user = await db.user.update({ 
      where: { id }, 
      data: validated 
    });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(400).json({ error: 'Update failed' });
  }
};`),
    title: "API PUT Controller",
  },
  {
    id: "api-controller-delete",
    language: "typescript",
    category: "api",
    difficulty: "easy",
    code: normalizeIndentation(`export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.user.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: 'User not found' });
  }
};`),
    title: "API DELETE Controller",
  },
  {
    id: "mapper-dto-to-entity",
    language: "typescript",
    category: "mapper",
    difficulty: "medium",
    code: normalizeIndentation(`const mapDtoToEntity = (dto: UserDto): User => ({
  id: dto.userId,
  name: \`\${dto.firstName} \${dto.lastName}\`,
  email: dto.emailAddress,
  createdAt: new Date(dto.created),
  isActive: dto.status === 'active'
});`),
    title: "DTO to Entity Mapper",
  },
  {
    id: "mapper-entity-to-dto",
    language: "typescript",
    category: "mapper",
    difficulty: "medium",
    code: normalizeIndentation(`const mapEntityToDto = (user: User): UserDto => {
  const [firstName, lastName] = user.name.split(' ');
  return {
    userId: user.id,
    firstName,
    lastName,
    emailAddress: user.email,
    created: user.createdAt.toISOString(),
    status: user.isActive ? 'active' : 'inactive'
  };
};`),
    title: "Entity to DTO Mapper",
  },
  {
    id: "mapper-array-transform",
    language: "typescript",
    category: "mapper",
    difficulty: "easy",
    code: normalizeIndentation(`const mapUsersToViewModel = (users: User[]): UserViewModel[] => {
  return users.map(user => ({
    id: user.id,
    displayName: user.name,
    avatar: user.avatarUrl || '/default-avatar.png',
    role: user.role.toUpperCase()
  }));
};`),
    title: "Array Transform Mapper",
  },
  {
    id: "mapper-nested-object",
    language: "typescript",
    category: "mapper",
    difficulty: "hard",
    code: normalizeIndentation(`const mapOrderToView = (order: Order): OrderView => ({
  id: order.id,
  total: order.items.reduce((sum, item) => sum + item.price, 0),
  itemCount: order.items.length,
  customer: {
    name: order.user.name,
    email: order.user.email
  },
  items: order.items.map(item => ({
    name: item.product.name,
    quantity: item.quantity
  }))
});`),
    title: "Nested Object Mapper",
  },
  {
    id: "array-group-by",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const groupBy = <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> => {
  return arr.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};`),
    title: "GroupBy Utility Function",
  },
  {
    id: "array-unique-by",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const uniqueBy = <T, K extends keyof T>(arr: T[], key: K): T[] => {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};`),
    title: "Unique By Key Utility",
  },
  {
    id: "array-chunk",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const chunk = <T>(arr: T[], size: number): T[][] => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(arr.slice(i, i + size));
    }
    return acc;
  }, [] as T[][]);
};`),
    title: "Array Chunk Utility",
  },
  {
    id: "array-partition",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const partition = <T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  return arr.reduce(([pass, fail], item) => {
    return predicate(item) 
      ? [[...pass, item], fail]
      : [pass, [...fail, item]];
  }, [[], []] as [T[], T[]]);
};`),
    title: "Array Partition Utility",
  },
  {
    id: "object-pick",
    language: "typescript",
    category: "utils",
    difficulty: "easy",
    code: normalizeIndentation(`const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};`),
    title: "Object Pick Utility",
  },
  {
    id: "object-omit",
    language: "typescript",
    category: "utils",
    difficulty: "easy",
    code: normalizeIndentation(`const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};`),
    title: "Object Omit Utility",
  },
  {
    id: "deep-clone",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj) as T;
  if (Array.isArray(obj)) return obj.map(deepClone) as T;
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = deepClone(obj[key]);
    return acc;
  }, {} as any);
};`),
    title: "Deep Clone Utility",
  },
  {
    id: "retry-async",
    language: "typescript",
    category: "utils",
    difficulty: "hard",
    code: normalizeIndentation(`const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return retry(fn, retries - 1);
  }
};`),
    title: "Retry Async Utility",
  },
  {
    id: "api-error-handler",
    language: "typescript",
    category: "api",
    difficulty: "medium",
    code: normalizeIndentation(`const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  
  return res.status(500).json({ error: 'Internal server error' });
};`),
    title: "API Error Handler Middleware",
  },
  {
    id: "api-auth-middleware",
    language: "typescript",
    category: "api",
    difficulty: "medium",
    code: normalizeIndentation(`const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};`),
    title: "Auth Middleware",
  },
  {
    id: "api-rate-limiter",
    language: "typescript",
    category: "api",
    difficulty: "hard",
    code: normalizeIndentation(`const rateLimiter = (limit: number, window: number) => {
  const requests = new Map<string, number[]>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip;
    const now = Date.now();
    const timestamps = requests.get(key) || [];
    const recent = timestamps.filter(t => now - t < window);
    
    if (recent.length >= limit) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    requests.set(key, [...recent, now]);
    next();
  };
};`),
    title: "Rate Limiter Middleware",
  },
  {
    id: "promise-all-settled",
    language: "typescript",
    category: "utils",
    difficulty: "medium",
    code: normalizeIndentation(`const fetchAllUsers = async (ids: string[]) => {
  const promises = ids.map(id => fetch(\`/api/users/\${id}\`));
  const results = await Promise.allSettled(promises);
  
  return results
    .filter((result): result is PromiseFulfilledResult<Response> => 
      result.status === 'fulfilled'
    )
    .map(result => result.value);
};`),
    title: "Promise AllSettled Pattern",
  },
];
