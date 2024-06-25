import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import css from './CustomSelect.module.css';

export default function CustomSelect({
  placeholder,
  field,
  form,  
  valuesList,
}) {
  const [groupName, setGroupName] = useState([]);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setGroupName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    form.setFieldValue(
      field.name,
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      <Select
      className={css.selectItem}
        id="multiple-chip"
        multiple
        value={groupName}        
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" placeholder={placeholder} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {valuesList.map(item => (
          <MenuItem key={item.name} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
