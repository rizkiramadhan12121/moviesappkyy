'use client';

import { useState, useCallback, useRef } from 'react';

interface UseSearchOptions {
  debounceMs?: number;
  onSearch: (query: string) => void;
}

export function useSearch({ debounceMs = 500, onSearch }: UseSearchOptions) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setIsSearching(true);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      onSearch(newQuery);
      setIsSearching(false);
    }, debounceMs);
  }, [debounceMs, onSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch('');
  }, [onSearch]);

  return {
    query,
    isSearching,
    handleSearch,
    clearSearch
  };
}
