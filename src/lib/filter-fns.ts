import { FilterFn, Row } from '@tanstack/react-table';

export function arrIncludeSomeNumber<T>(): FilterFn<T> {
  return (row: Row<T>, columnId: string, filterValues: string[]) =>
    filterValues.some((value) => {
      const rowValue =
        typeof row.getValue<number | string>(columnId) === 'string'
          ? parseFloat(row.getValue<string>(columnId))
          : row.getValue<number>(columnId);
      return rowValue === parseFloat(value);
    });
}
arrIncludeSomeNumber.autoRemove = (value: unknown) => !value;

export function arrEquals<T>(): FilterFn<T> {
  return (row: Row<T>, columnId: string, filterValues: string[]) =>
    filterValues.some((value) => value === row.getValue(columnId));
}
arrEquals.autoRemove = (value: unknown) => !value;
