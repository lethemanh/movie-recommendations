import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  value?: string | number;
  onChange(value: string | number): void;
}

const SelectInput: FC<Props> = (props: Props) => {
  const selectorRef = useRef<HTMLInputElement>(null);

  const { options, value, onChange } = props;
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>(0);

  const closeSelector = useCallback((event: any) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setIsOpenSelector(false);
    }
  }, []);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', closeSelector);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', closeSelector);
    };
  }, [closeSelector]);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const toggleSelector = () => {
    setIsOpenSelector(!isOpenSelector);
  };

  const selectOption = (value: string | number) => {
    setSelectedOption(value);
    onChange(value);
    setIsOpenSelector(false);
  };

  const getOptionLabel = (value: string | number) => {
    return options.find(option => option.value === value)?.label;
  };

  return (
    <>
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        onClick={toggleSelector}
      >
        {getOptionLabel(selectedOption)}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        ref={selectorRef}
        className={`z-10 absolute top-28 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          !isOpenSelector ? 'hidden' : ''
        }`}
      >
        <ul
          className="py-2 h-80 overflow-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => selectOption(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectInput;
