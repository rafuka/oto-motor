import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  marca: parseAsString.withDefault(""),
  km: parseAsString.withDefault(""),
  yearFrom: parseAsString.withDefault(""),
  yearTo: parseAsString.withDefault(""),
  fuel: parseAsString.withDefault(""),
  precio: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
});

export type SortValue =
  | ""
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "km-asc"
  | "km-desc";

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "", label: "Por defecto" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "year-desc", label: "Año: más nuevo primero" },
  { value: "year-asc", label: "Año: más antiguo primero" },
  { value: "km-asc", label: "Kilómetros: menos a más" },
  { value: "km-desc", label: "Kilómetros: más a menos" },
];
