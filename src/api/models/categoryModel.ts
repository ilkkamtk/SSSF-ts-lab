import promisePool from '../../database/db';
import {Category, GetCategory} from '../../interfaces/Category';

const getAllCategories = async () => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories'
  );
  if (rows.length === 0) {
    throw new Error('No categories found');
  }
  return rows as Category[];
};

const getCategoryById = async (id: number) => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new Error('No categories found');
  }
  return rows[0] as Category;
};

export {getAllCategories, getCategoryById};
