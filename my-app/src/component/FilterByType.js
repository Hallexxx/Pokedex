import React, { useEffect, useState, useContext } from 'react';
import { Box, Checkbox, Switch, Typography, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';

const FilterByType = ({
  types = {},
  selectedTypes = [],
  onTypeChange,
  isAndMode = false,
  onModeChange,
}) => {
  const { language } = useContext(LanguageContext);
  const [typesData, setTypesData] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);

  useEffect(() => {
    if (types) {
      const typesArray = Object.entries(types).map(([typeId, typeDetails]) => ({
        id: typeId,
        name: typeDetails.translations?.[language] || typeDetails.translations?.['en'] || 'Unknown',
        color: typeDetails.backgroundColor || '#ccc',
      }));
      setTypesData(typesArray);
    }
  }, [types, language]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    onTypeChange(value);
  };

  const handleModeChange = (e) => {
    onModeChange(e.target.checked);
  };

  if (!typesData.length) {
    return <Typography variant="subtitle1">Loading types...</Typography>;
  }

  return (
    <Box sx={{ width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Filter by Type :
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <FormControl sx={{ width: '250px' }}>
          <InputLabel>Types</InputLabel>
          <Select
            multiple
            value={selectedTypes}
            onChange={handleSelectChange}
            open={openSelect}
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((typeId) => {
                  const type = typesData.find((t) => t.id === typeId);
                  return type ? (
                    <Chip key={type.id} label={type.name} sx={{ backgroundColor: type.color, color: 'white' }} />
                  ) : null;
                })}
              </Box>
            )}
          >
            {typesData.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Checkbox checked={selectedTypes.includes(type.id)} />
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ marginRight: 1 }}>
          Match All Selected Types
        </Typography>
        <Switch checked={isAndMode} onChange={handleModeChange} color="primary" />
      </Box>
    </Box>
  );
};

export default FilterByType;
