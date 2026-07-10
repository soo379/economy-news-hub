export function withParam(
  pathname: string,
  searchParams: URLSearchParams,
  key: string,
  value: string | null,
) {
  const params = new URLSearchParams(searchParams.toString());
  if (value) params.set(key, value);
  else params.delete(key);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
