import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import genres from '~/lib/db/genres.json';
import SelectInput from '../SelectInput';

interface SearchValues {
  genre?: number;
  keyword?: string;
}

interface Props {
  onChange({ genre, keyword }: SearchValues): void;
  keyword?: string;
  genre?: number;
}

const SearchForm: FC<Props> = ({ onChange, keyword, genre }: Props) => {
  const router = useRouter();

  const [searchValues, setSearchValues] = useState<SearchValues>(
    {} as SearchValues,
  );

  const pushToRouter = (payload: SearchValues) => {
    if (payload.genre || payload.keyword) {
      router.push(
        {
          query: {
            ...payload,
          },
        },
        undefined,
        {
          shallow: true,
        },
      );
    } else {
      router.push('', undefined, { shallow: true });
    }
  };

  const onChangeGenre = (genre: number) => {
    setSearchValues({
      ...searchValues,
      genre,
    });
  };

  const onChangeKeyword = (keyword: string) => {
    setSearchValues({
      ...searchValues,
      keyword,
    });
  };

  const search = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onChange(searchValues);
    pushToRouter(searchValues);
    e.preventDefault();
  };

  useEffect(() => {
    const payload = {
      keyword,
      genre,
    };
    setSearchValues(payload);
    // onChange(payload);
  }, [genre, keyword]);

  return (
    <form className="w-1/2 flex mx-auto" onSubmit={search}>
      <SelectInput
        options={[{ label: 'All genres', value: 0 }].concat(genres)}
        value={searchValues.genre}
        onChange={onChangeGenre}
      />
      <div className="relative w-full">
        <input
          type="text"
          value={searchValues.keyword}
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search Movie"
          onChange={e => onChangeKeyword(e.target.value)}
        />
        <button className="absolute bg-red top-0 right-0 p-2.5 text-sm font-medium h-full text-white rounded-r-lg focus:ring-4 focus:outline-none">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
