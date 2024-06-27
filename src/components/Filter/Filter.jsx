
import css from './Filter.module.css';

export default function Filter({handleFilterChange}) {
  

  return (
    <label className={css.formLabel}>
      <input
        className={css.formInput}
        type="text"
        name="filter"
        onChange={handleFilterChange}
        placeholder="Search by name"
        autoComplete="off"
      />
    </label>
  );
}
