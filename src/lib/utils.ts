import { FilterFn, Row, RowModel } from '@tanstack/react-table';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const stringOrNumberColumn = <TData>(
  rowModel: RowModel<TData>,
  columnId: string
) => {
  const firstValue = rowModel.flatRows[0].getValue(columnId);
  return typeof firstValue === 'string'
    ? 'string'
    : typeof firstValue === 'number'
    ? 'number'
    : null;
};

export const capitalize = (input: string) => {
  return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
};

export const matchSearch = (searchResult: string, searchValue: string) => {
  const lowercasedSearchResult = searchResult.trim().toLowerCase();
  const lowercasedSearchValue = searchValue.trim().toLowerCase();

  if (!lowercasedSearchValue.length) {
    return null;
  }

  const searchValueFirstIndex = lowercasedSearchResult.indexOf(
    lowercasedSearchValue
  );
  const searchValueLastIndex = lowercasedSearchResult.lastIndexOf(
    lowercasedSearchValue
  );
  const rest = lowercasedSearchResult
    .split(lowercasedSearchValue)
    .filter(Boolean);
  let result: string[] = [];

  //if length is 1, this means that searchValue is only at the beginning OR the end of the searchResult
  if (rest.length === 1) {
    if (searchValueFirstIndex === searchValueLastIndex) {
      result = [`<b>${capitalize(lowercasedSearchValue)}</b>`, ...rest];
    } else {
      if (searchValueFirstIndex === 0) {
        result = [`<b>${capitalize(lowercasedSearchValue)}</b>`, ...rest];
      }
      if (
        searchValueLastIndex + lowercasedSearchValue.length - 1 ===
        lowercasedSearchResult.length - 1
      ) {
        result = [...rest, `<b>${lowercasedSearchValue}</b>`];
      }
    }
  } else {
    //if length is not 1, then searchValue appears more than once is searchResult
    //this loop takes care of cases where searchValue is found inside the searchResult
    result = rest.map((elem, index, array) => {
      if (index === array.length - 1) {
        return elem;
      }
      return `${elem}<b>${lowercasedSearchValue}</b>`;
    });
    //this takes care of edge cases, beginning and end of searchResult
    if (searchValueFirstIndex === 0) {
      result = [`<b>${capitalize(lowercasedSearchValue)}</b>`, ...result];
    }
    if (
      searchValueLastIndex + lowercasedSearchValue.length - 1 ===
      lowercasedSearchResult.length - 1
    ) {
      result = [...result, `<b>${lowercasedSearchValue}</b>`];
    }
  }

  result = [capitalize(result[0]), ...result.slice(1)];
  console.log(result);
  return result;
};

export const arrIncludeSomeNumber: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValues: string[]
) =>
  filterValues.some((value) => {
    const rowValue =
      typeof row.getValue<number | string>(columnId) === 'string'
        ? parseFloat(row.getValue<string>(columnId))
        : row.getValue<number>(columnId);
    return rowValue === parseFloat(value);
  });
arrIncludeSomeNumber.autoRemove = (value: any) => !value;
