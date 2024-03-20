import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'redux/contactBookAppSlice';
import { getFilterQuery } from 'redux/selectors';
import css from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch(filter(value));
  };

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
