import type { FC, ChangeEvent } from "react";
import { useState, useEffect } from "react";

interface AutocompleteMultiSelectProps {
  suggestions: string[];
}

const AutocompleteMultiSelect: FC<AutocompleteMultiSelectProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(props.suggestions);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setSuggestions(props.suggestions);
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectSuggestion = (selectedSuggestion: string) => {
    setInputValue("");
    setSelectedItems([...selectedItems, selectedSuggestion]);
    setSuggestions([]);
  };

  const handleRemoveItem = (removedItem: string) => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  return (
    <div>
      <div>
        {selectedItems.map((item, index) => (
          <span key={index} className="selected-item">
            {item}
            <button onClick={() => handleRemoveItem(item)}>&times;</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <button onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteMultiSelect;
