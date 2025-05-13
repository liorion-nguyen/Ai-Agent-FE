import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import debounce from 'lodash/debounce';
import { SearchIcon, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

const Search: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  delay = 500,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useMemo(
    () => debounce(onChange, delay),
    [onChange, delay],
  );

  useEffect(() => {
    debouncedOnChange(inputValue);
    return () => {
      debouncedOnChange.cancel();
    };
  }, [inputValue, debouncedOnChange]);

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <SearchIcon
        className="absolute left-3 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'pl-9 pr-9',
          'rounded-md border-gray-300 dark:border-gray-600',
          'focus:ring-2 focus:ring-blue-500',
          '[&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className={cn(
            'absolute right-2 h-5 w-5 p-0 text-gray-400 hover:text-gray-600 cursor-pointer',
            'bg-transparent',
          )}
          aria-label="Xóa tìm kiếm"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default Search;
