export const RECIPE_PAGE_SIZE = 30;
export const MAX_RECIPE_PAGE_SIZE = 100;
export const LISTING_STALE_TIME = 60_000;

export type ListingSearchParams = Record<string, string | string[] | undefined>;
export type RecipeFilters = {
  categories?: number[];
  difficulties?: number[];
  maxTime?: number | null;
};

export class InvalidListingParamsError extends Error {}
export class RecipePageNotFoundError extends Error {}

export function parsePositiveInteger(
  value: string | string[] | undefined,
  fallback = 1,
  maximum = Number.MAX_SAFE_INTEGER,
): number {
  if (value === undefined) return fallback;
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    throw new InvalidListingParamsError("Expected a positive integer");
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed > maximum) {
    throw new InvalidListingParamsError("Integer exceeds the allowed range");
  }
  return parsed;
}

function scalar(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) throw new InvalidListingParamsError("Repeated parameter");
  return value;
}

function parseIds(value: string | string[] | undefined): number[] {
  const input = scalar(value);
  if (!input) return [];
  const parts = input.split(",");
  if (parts.length > 20) throw new InvalidListingParamsError("Too many filters");
  return [...new Set(parts.map((part) => parsePositiveInteger(part)))].sort((a, b) => a - b);
}

export function parseListingParams(params: ListingSearchParams) {
  const search = (scalar(params.search) ?? "").trim().toLowerCase();
  if (search.length > 100) throw new InvalidListingParamsError("Search is too long");
  const time = scalar(params.maxTime);
  // Infinity is the existing UI's "60+" selection, which applies no upper bound.
  const maxTime = !time ? null : time === "Infinity" ? Infinity : parsePositiveInteger(time, 1, 1440);
  return {
    page: parsePositiveInteger(params.page),
    pageSize: parsePositiveInteger(params.pageSize, RECIPE_PAGE_SIZE, MAX_RECIPE_PAGE_SIZE),
    search,
    filters: {
      categories: parseIds(params.categories),
      difficulties: parseIds(params.difficulties),
      maxTime,
    },
  };
}

export function listingCanonical(pathname: string, page: number) {
  return page === 1 ? pathname : `${pathname}?page=${page}`;
}
