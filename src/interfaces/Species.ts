import {RowDataPacket} from 'mysql2';
// interfaces for Species

import {Category} from './Category';

interface Species {
  species_id: number;
  species_name: string;
  category: number | Category;
  image: string;
}

interface GetSpecies extends RowDataPacket, Species {}

type PostSpecies = Omit<Species, 'species_id' | 'image'>;

type PutSpecies = Partial<PostSpecies>;

export {Species, PostSpecies, PutSpecies, GetSpecies};
