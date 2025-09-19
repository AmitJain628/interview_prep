import "./styles.css";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
  placeholder?: string;
}

/**
 * Custom hook to debounce a function (e.g., fetchSuggestions).
 * @param func The function to debounce (fetchSuggestions).
 * @param delay The debounce delay in milliseconds.
 */
const useDebouncedFetch = (
  func: (query: string) => Promise<string[]>,
  delay: number
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedFetch = (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      setIsOpen(false);

      try {
        const results = await func(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch (err) {
        setError("Failed to fetch suggestions");
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, delay);
  };

  return {
    debouncedFetch,
    suggestions,
    isLoading,
    error,
    isOpen,
    setIsOpen,
    setSuggestions,
  };
};

const SuggestionItem = React.memo(
  ({
    suggestion,
    query,
    isSelected,
    onClick,
    index,
  }: {
    suggestion: string;
    query: string;
    isSelected: boolean;
    onClick: () => void;
    index: number;
  }) => {
    const highlightMatch = (text: string, query: string) => {
      if (!query.trim()) return text;

      const regex = new RegExp(
        (${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}),
        "gi"
      );
      const parts = text.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    };

    return (
      <li
        className={autocomplete-item ${isSelected ? "selected" : ""}}
        onClick={onClick}
        data-index={index}
      >
        {highlightMatch(suggestion, query)}
      </li>
    );
  }
);

const AutoComplete: React.FC<AutocompleteProps> = ({
  fetchSuggestions,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const {
    debouncedFetch,
    setSuggestions,
    isOpen,
    suggestions,
    isLoading,
    error,
    setIsOpen,
  } = useDebouncedFetch(fetchSuggestions, 100);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedFetch(value);
    },
    [debouncedFetch]
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSuggestionSelect(suggestions[selectedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSuggestions([]);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;

        case "Tab":
          setIsOpen(false);
          setSuggestions([]);
          setSelectedIndex(-1);
          break;
      }
    },
    [isOpen, selectedIndex, suggestions, handleSuggestionSelect]
  );

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  // Memoized suggestion list
  const suggestionList = useMemo(() => {
    return suggestions.map((suggestion, index) => (
      <SuggestionItem
        key={index}
        suggestion={suggestion}
        query={query}
        isSelected={index === selectedIndex}
        onClick={() => handleSuggestionSelect(suggestion)}
        index={index}
      />
    ));
  }, [suggestions, query, selectedIndex, handleSuggestionSelect]);

  console.log(
    isOpen,
    !isLoading,
    suggestions.length === 0,
    query.trim(),
    error
  );

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={autocomplete-input ${isLoading ? "loading" : ""}}
        autoComplete="off"
        aria-expanded={isOpen}
        aria-activedescendant={
          selectedIndex >= 0 ? suggestion-${selectedIndex} : undefined
        }
      />

      {isLoading && <div className="spinner"></div>}

      {error && <div className="autocomplete-error">{error}</div>}

      {isOpen && suggestions.length > 0 && (
        <ul ref={listRef} className="autocomplete-list" role="listbox">
          {suggestionList}
        </ul>
      )}

      {!isLoading && suggestions.length === 0 && query.trim() && !error && (
        <div className="autocomplete-no-results">No suggestions found</div>
      )}
    </div>
  );
};

const fetchSuggestions = async (query: string): Promise<string[]> => {
  // Simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

  // Mock data
  const mockData = [
    "Apple",
    "Banana",
    "Orange",
    "Grape",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Watermelon",
    "Cantaloupe",
    "Peach",
    "Pear",
    "Plum",
    "Cherry",
    "Apricot",
    "Kiwi",
    "Papaya",
    "Coconut",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
  ];

  // Filter the mock data based on the query
  return mockData
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8); // Limit to 8 results
};

export default function App() {
  return (
    <div className="App">
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        placeholder="Search for fruits or programming languages..."
      />
    </div>
  );
}


/* Basic container for the Autocomplete input and dropdown */
.autocomplete-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.autocomplete-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, padding-right 0.3s ease;
}

.autocomplete-input:focus {
  border-color: #007bff;
}

.autocomplete-input.loading {
  padding-right: 40px;
}

.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 50;
  padding: 12px 16px; /* Remove padding to prevent indentation */
  list-style-type: none; /* Remove the bullet points */
}

.autocomplete-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.autocomplete-item:hover {
  background-color: #f0f0f0;
}

.autocomplete-item.selected {
  background-color: #007bff;
  color: #fff;
}

.autocomplete-item mark {
  background-color: yellow;
  font-weight: bold;
}

/* Loading spinner */
.spinner {
  position: absolute;
  top: 25%;
  right: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 3px solid #007bff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error message styling */
.autocomplete-error {
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
}

.autocomplete-no-results {
  padding: 12px 16px;
  text-align: center;
  color: #777;
}