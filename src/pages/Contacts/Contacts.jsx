import { useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import { useTheme, Grid, Pagination } from "@mui/material";
import { useDebounce } from "use-debounce";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { useContacts } from "../../services/api/contacts/queries";
import Modal from "../../components/Modal/Modal";
import PageHeader from "../../components/PageHeader/PageHeader";
import Filter from "../../components/Filter/Filter";
import ContactList from "../../components/ContactList/ContactList";
import AddContactForm from "../../components/ContactForms/AddContactForm";
import InfoText from "../../components/InfoText/InfoText";
import Loader from "../../components/Loader/Loader";
import css from "./Contacts.module.css";

export default function Contacts() {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilter] = useDebounce(filterValue, 600);
  const { data, isLoading, isError } = useContacts({
    page,
    filter: debouncedFilter,
  });

  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const location = useLocation().pathname.split("/");
  const theme = useTheme();

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load contacts</p>;

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Grid
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderColor: theme.palette.grey[300],
        }}
        className={css.contactsWrapper}
      >
        <PageHeader
          title="All Contacts"
          btnTitle="Add Contact"
          btnAction={toggleModal}
        >
          <Filter handleFilterChange={handleFilterChange} value={filterValue} />
        </PageHeader>
        <Grid className={css.contentWrapper}>
          {data.result.length > 0 ? (
            <>
              <ContactList
                contacts={data.result}
                linkBtn={true}
                currentUser={user}
              />
              <Pagination
                count={Math.ceil(data.total / data.limit)}
                page={page}
                onChange={(event, value) => handlePageChange(value)}
                showFirstButton
                showLastButton
                color="primary.light"
                sx={{ mt: 2, mb: 2 }}
              />
            </>
          ) : (
            <InfoText text="You don't have any contact yet" />
          )}
        </Grid>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <AddContactForm
              onClose={toggleModal}
              // userGroups={groups}
              // userTags={tags}
            />
          </Modal>
        )}
      </Grid>
      <Grid className={css.contactDetailsWrapper}>
        {location[location.length - 1] !== "all" ? (
          <Outlet />
        ) : (
          <InfoText text="Choose some contact for details" />
        )}
      </Grid>
    </>
  );
}
