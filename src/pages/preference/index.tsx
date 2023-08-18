import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Button, Select, SelectChangeEvent, Typography } from '@mui/material';
import { getPreference, savePreference } from '@API/requests';
import genres from '~/lib/db/genres.json';
import casts from '~/lib/db/casts.json';
import companies from '~/lib/db/companies.json';
import { useSnackbar } from 'notistack';

const Preference: NextPage<any> = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState<IPreference>({
    favoriteGenres: [],
    favoriteCasts: [],
    favoriteCompanies: [],
  });

  useEffect(() => {
    const preference = getPreference();
    setFormValues(preference);
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      [e.target.name]:
        typeof e.target.value === 'string'
          ? e.target.value?.split(',')
          : e.target.value,
    });
  };

  const save = () => {
    try {
      savePreference(formValues);
      enqueueSnackbar('Save success!', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="w-1/2 mx-auto pt-5"
    >
      <Typography className="text-white text-2xl mb-5">
        Add Your Favorite
      </Typography>
      <FormControl className="w-full mb-5">
        <InputLabel htmlFor="component-outlined" className="text-white">
          Favorite Genres
        </InputLabel>
        <Select
          multiple
          name="favoriteGenres"
          value={formValues.favoriteGenres}
          className="text-white bg-zinc-800"
          input={
            <OutlinedInput className="text-white" label="Favorite Genres" />
          }
          onChange={handleChange}
        >
          {genres.map(genre => (
            <MenuItem key={genre.value} value={genre.value}>
              {genre.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="w-full mb-5">
        <InputLabel htmlFor="component-outlined" className="text-white">
          Favorite Casts
        </InputLabel>
        <Select
          multiple
          name="favoriteCasts"
          value={formValues.favoriteCasts}
          input={
            <OutlinedInput className="text-white" label="Favorite Casts" />
          }
          className="text-white bg-zinc-800"
          onChange={handleChange}
        >
          {casts.map(cast => (
            <MenuItem key={cast.value} value={cast.value}>
              {cast.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="w-full mb-5">
        <InputLabel htmlFor="component-outlined" className="text-white">
          Favorite Companies
        </InputLabel>
        <Select
          multiple
          name="favoriteCompanies"
          value={formValues.favoriteCompanies}
          input={
            <OutlinedInput className="text-white" label="Favorite Companies" />
          }
          className="text-white bg-zinc-800"
          onChange={handleChange}
        >
          {companies.map(company => (
            <MenuItem key={company.value} value={company.value}>
              {company.label}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          className="bg-red hover:bg-dark-red mt-5"
          onClick={save}
        >
          Save
        </Button>
      </FormControl>
    </Box>
  );
};

export default Preference;
