import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  marca: parseAsString.withDefault(""),
  km: parseAsString.withDefault(""),
  yearFrom: parseAsString.withDefault(""),
  yearTo: parseAsString.withDefault(""),
  fuel: parseAsString.withDefault(""),
});
