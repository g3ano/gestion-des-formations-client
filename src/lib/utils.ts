import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const searchInValues = (values: string[], searchValue: string) => {
  const lowercasedValue = searchValue.trim().toLowerCase();
  return lowercasedValue
    ? values.filter((value) =>
        value.trim().toLowerCase().includes(lowercasedValue)
      )
    : values;
};

export const capitalize = (input: string) => {
  return `${input.charAt(0).toUpperCase()}${input
    .slice(1)
    .toLocaleLowerCase()}`;
};

export const unique = <T>(values: T[]) => {
  return values.filter((value, index, array) => array.indexOf(value) === index);
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

  if (rest.length === 0) {
    //this handles cases where only the searchValue is present
    //and it's repeated.
    const searchResultWithoutSearchValue = lowercasedSearchResult.slice(
      lowercasedSearchResult.indexOf(lowercasedSearchValue) +
        lowercasedSearchValue.length
    );
    if (searchResultWithoutSearchValue.length) {
      result = [
        `<b>${capitalize(lowercasedSearchValue)}</b>`,
        searchResultWithoutSearchValue,
      ];
    } else {
      result = [`<b>${capitalize(lowercasedSearchValue)}</b>`];
    }
  }

  const toStart = searchValueFirstIndex === 0;
  const toEnd =
    searchValueLastIndex + lowercasedSearchValue.length - 1 ===
    lowercasedSearchResult.length - 1;
  let skip = false;

  if (rest.length === 1) {
    if (toStart) {
      result = [`<b>${capitalize(lowercasedSearchValue)}</b>`, ...rest];
      //in order to avoid searchValue added to both sides, unnecessary
      //this could happen when rest is found one or more times in the searchValue,
      //e.g: searchValue: 555, searchResult: 5555
      if (lowercasedSearchValue.includes(rest[0])) {
        skip = true;
      }
    }
    if (toEnd && !skip) {
      result = [
        ...(result.length ? result : rest),
        `<b>${lowercasedSearchValue}</b>`,
      ];
    }

    result = [capitalize(result[0]), ...result.slice(1)];
  }
  if (rest.length > 1) {
    result = rest.map((elem, index, array) => {
      if (index === array.length - 1) {
        return elem;
      }
      return `${elem}<b>${lowercasedSearchValue}</b>`;
    });

    if (toStart) {
      result = [`<b>${capitalize(lowercasedSearchValue)}</b>`, ...result];
    }
    if (toEnd) {
      result = [...result, `<b>${lowercasedSearchValue}</b>`];
    }
    result = [capitalize(result[0]), ...result.slice(1)];
  }

  return result;
};

/**
 * A simple function that compares two given objects literals, it returns true if `obj` is identical to `target`, false otherwise.
 * **PS**: if the values are not string/number it return false.
 * @param obj Object to compare
 * @param target Object compared with object
 */
export function objCompare<T, P extends T>(
  obj: Partial<T>,
  target: Partial<P>
) {
  const objKeys = Object.keys(obj).sort();
  const compareToKeys = Object.keys(target).sort();

  if (objKeys.length !== compareToKeys.length) return false;

  for (let i = 0; i < objKeys.length; i++) {
    if (objKeys[i] !== compareToKeys[i]) return false;

    let objValue: unknown = obj[objKeys[i] as keyof T];
    let targetValue: unknown = target[compareToKeys[i] as keyof P];
    objValue =
      typeof objValue === 'string'
        ? objValue.trim()
        : typeof objValue === 'number'
          ? objValue
          : null;
    targetValue =
      typeof targetValue === 'string'
        ? targetValue.trim()
        : typeof targetValue === 'number'
          ? targetValue
          : null;

    if (objValue === null || targetValue === null) return false;
    if (objValue !== targetValue) return false;
  }
  return true;
}
