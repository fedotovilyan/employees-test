import qs from "qs";

export const getRoute = (
  route: string,
  params: Record<string, string | number | null | undefined>,
  search?: { [key: string | number]: string | number }
) => {
  let routeWithParams = route;
  Object.entries(params).forEach(([key, value]) => {
    routeWithParams = routeWithParams.replace(`:${key}`, value?.toString() || '');
  });
  if (search) routeWithParams += `?${qs.stringify(search)}`;
  return routeWithParams;
};
