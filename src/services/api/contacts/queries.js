import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "./contactsApi";

export const CONTACTS_QUERY_KEY = ["contacts"];

export function useContacts({ page = 1, limit = 20, filter = "" }) {
  return useQuery({
    queryKey: [...CONTACTS_QUERY_KEY, page, filter],
    queryFn: () => fetchContacts({ page, limit, filter }),
    keepPreviousData: true,
  });
}
