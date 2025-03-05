import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { Input } from './ui/input';

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
    postcode?: string;
  };
}

interface AddressAutocompleteProps<TFieldValues extends FieldValues> {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    name: Path<TFieldValues>;
    ref: React.Ref<HTMLInputElement>;
  };
  onInputChange: (field: keyof PropertyFormData, value: string) => void;
  getInputStyles: () => string;
  isSubmitting: boolean;
  maxLength?: number;
}

const AddressAutocomplete = forwardRef<
  HTMLInputElement,
  AddressAutocompleteProps<FieldValues>
>(
  (
    { field, onInputChange, getInputStyles, isSubmitting, maxLength = 100 },
    ref
  ) => {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState(field.value || '');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setInputValue(field.value || '');
    }, [field.value]);

    const fetchSuggestions = useCallback(async (query: string) => {
      if (query.length > 2) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&q=${query}&limit=5`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
          }

          const data: LocationSuggestion[] = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching address suggestions:', error);
          setError('Failed to load suggestions');
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, []);

    useEffect(() => {
      const debounceTimer = setTimeout(() => {
        if (isFocused) {
          fetchSuggestions(inputValue);
        }
      }, 300);

      return () => clearTimeout(debounceTimer);
    }, [inputValue, isFocused, fetchSuggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      field.onChange(newValue);
      onInputChange(
        field.name as keyof PropertyFormData,
        newValue as PathValue<FieldValues, Path<FieldValues>>
      );
    };

    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
      const newValue = suggestion.display_name;
      setInputValue(newValue);
      field.onChange(newValue);
      onInputChange(
        field.name as keyof PropertyFormData,
        newValue as PathValue<FieldValues, Path<FieldValues>>
      );
      setSuggestions([]);
      setIsFocused(false);
    };

    const handleBlur = () => {
      setTimeout(() => {
        setIsFocused(false);
        field.onBlur();
      }, 200);
    };

    const handleFocus = () => {
      setIsFocused(true);
      if (inputValue.length > 2) {
        fetchSuggestions(inputValue);
      }
    };

    return (
      <div className="relative">
        <Input
          {...field}
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${getInputStyles()} pr-14`}
          placeholder="Enter property address"
          aria-label="Property address"
          disabled={isSubmitting}
          maxLength={maxLength}
          aria-expanded={suggestions.length > 0}
          aria-controls="address-suggestions-list"
          aria-describedby={error ? 'address-error' : undefined}
          role="combobox"
          autoComplete="off"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {suggestions.length > 0 && isFocused && (
          <ul
            id="address-suggestions-list"
            role="listbox"
            className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                role="option"
                aria-selected="false"
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p id="address-error" className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AddressAutocomplete.displayName = 'AddressAutocomplete';

export default AddressAutocomplete;
