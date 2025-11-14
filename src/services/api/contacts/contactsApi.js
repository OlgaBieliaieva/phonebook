import { workspaceApiClient } from "../apiClient";

export const fetchContacts = async ({ page = 1, limit = 20, filter = "" }) => {
  const { data } = await workspaceApiClient.get("/contacts", {
    params: { page, limit, filter },
  });
  return data;
};

export const addContact = async (body) => {
  const { data } = await workspaceApiClient.post("/contacts", body);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await workspaceApiClient.delete(`/contacts/${id}`);
  return data;
};

export const updateContact = async ({ id, ...body }) => {
  const { data } = await workspaceApiClient.patch(`/contacts/${id}`, body);
  return data;
};
