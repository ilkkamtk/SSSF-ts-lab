import {ResultSetHeader} from 'mysql2';
import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Species, GetSpecies, PostSpecies} from '../../interfaces/Species';

const getAllSpecies = async () => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    'SELECT * FROM species'
  );
  if (rows.length === 0) {
    throw new CustomError('No species found', 400);
  }
  return rows as Species[];
};

const getSpeciesById = async (id: number) => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    'SELECT * FROM species WHERE species_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError('No species found', 500);
  }
  return rows[0] as Species;
};

const addSpecies = async (species: Species) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO species (species_name, category, image) VALUES (?, ?, ?)',
    [species.species_name, species.category, species.image]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Could not add species', 500);
  }
  return headers.insertId;
};

const updateSpecies = async (
  id: number,
  species: PostSpecies
): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE species SET species_name = ?, category = ? WHERE species_id = ?',
    [species.species_name, species.category, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not found', 404);
  }
  return true;
};

const deleteSpecies = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM species WHERE species_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not found', 404);
  }
  return true;
};

export {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
  updateSpecies,
  deleteSpecies,
};
