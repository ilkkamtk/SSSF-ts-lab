import {RowDataPacket} from 'mysql2';
import {Species} from './Species';

interface Animal {
  animal_id: number;
  animal_name: string;
  species: number;
  birthdate: Date;
}

interface GetAnimal extends RowDataPacket, Animal {}

type PostAnimal = Omit<Animal, 'animal_id'>;

type PutAnimal = Partial<PostAnimal>;

export {Animal, PostAnimal, PutAnimal, GetAnimal};
