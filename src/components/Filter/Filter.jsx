import css from "./Filter.module.css";

export default function Filter({ handleFilterChange, value }) {
  return (
    <label className={css.formLabel}>
      <input
        className={css.formInput}
        type="text"
        name="filter"
        value={value}
        onChange={handleFilterChange}
        placeholder="Search by name, department or position"
        autoComplete="off"
      />
    </label>
  );
}
