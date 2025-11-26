export const buildFilterParams = (
  searchParams: URLSearchParams,
  updates: Record<string, string | undefined>,
  size: number
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);
  params.set("page", "1");
  params.set("size", String(size));
  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params;
};
