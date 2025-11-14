import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContact, deleteContact, updateContact } from "./contactsApi";
import { CONTACTS_QUERY_KEY } from "./queries";

export function useAddContact() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      qc.invalidateQueries(CONTACTS_QUERY_KEY);
    },
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      qc.invalidateQueries(CONTACTS_QUERY_KEY);
    },
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      qc.invalidateQueries(CONTACTS_QUERY_KEY);
    },
  });
}
