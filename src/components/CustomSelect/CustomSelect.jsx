import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { InputLabel, Avatar } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import css from './CustomSelect.module.css';

export default function CustomSelect({
  placeholder,
  field,
  form,
  contacts = [],
  valuesList,
}) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked(field.value);
  }, [field.value]);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setChecked(typeof value === 'string' ? value.split(',') : value);
    form.setFieldValue(
      field.name,
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
      <Select
        className={css.selectItem}
        labelId="demo-multiple-chip-label"
        id="multiple-chip"
        multiple
        value={checked}
        onChange={handleChange}
        placeholder={placeholder}
        input={<OutlinedInput />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {valuesList.map(item => (
          <MenuItem
            key={item.id}
            value={
              field.name === 'members'
                ? `${item.firstName.trim()} ${item.lastName.trim()}`
                : item.name
            }
          >
            {field.name === 'members' ? (
              <div className={css.item}>
                <Avatar>
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={`${item.firstName} ${item.lastName}`}
                    />
                  ) : (
                    <span>{`${item.firstName.trim().slice(0, 1)}${item.lastName.trim().slice(
                      0,
                      1
                    )}`}</span>
                  )}
                </Avatar>
                <div className={css.descriptionWrapper}>
                  <p
                    className={css.itemName}
                  >{`${item.firstName} ${item.middleName} ${item.lastName}`}</p>
                  <p
                    className={css.itemDescription}
                  >{`${item.jobTitle} | ${item.company}`}</p>
                </div>
              </div>
            ) : (
              <div className={css.item}>
                <div className={css.itemWrapper}>
                  <Avatar>
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.name} />
                    ) : (
                      <GroupsSharpIcon className={css.itemIcon} />
                    )}
                  </Avatar>
                  <div className={css.descriptionWrapper}>
                    <p className={css.itemName}>{item.name}</p>
                    <p className={css.itemDescription}>{item.description}</p>
                  </div>
                  <p className={css.groupItemChip}>{item.members.length}</p>
                </div>
              </div>
            )}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
