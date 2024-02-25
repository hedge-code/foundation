"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useState } from "react";

interface AutocompleteMultiSelectProps {
  suggestions: Record<string, string>;
}

function AutocompleteMultiSelect (props: AutocompleteMultiSelectProps): ReactNode {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(Object.keys(props.suggestions));
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSelectSuggestion = (selectedSuggestion: string): void => {
    setInputValue("");
    setSelectedItems([...selectedItems, props.suggestions[selectedSuggestion]]);
    setSuggestions([]);
  };

  const handleRemoveItem = (removedItem: string): void => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <span className="selected-item" key={item}>
            {item}
            <button onClick={() => { handleRemoveItem(item); }} type="button">&times;</button>
          </span>
        ))}
      </div>
      <input
        onChange={handleInputChange}
        placeholder="Type to search..."
        type="text"
        value={inputValue}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button onClick={() => { handleSelectSuggestion(suggestion); }} type="button">
              {props.suggestions[suggestion]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteMultiSelect;
