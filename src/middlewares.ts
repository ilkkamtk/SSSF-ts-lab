import {NextFunction, Request, Response} from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import CustomError from './classes/CustomError';
import imageFromWikipedia from './functions/imageFromWikipedia';
import {Species} from './interfaces/Species';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log(err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const getImageFromWiki = async (
  req: Request<{}, {}, Species>,
  res: Response,
  next: NextFunction
) => {
  const {species_name} = req.body;
  const url = await imageFromWikipedia(species_name);
  req.body.image = url;
  next();
};

export {notFound, errorHandler, getImageFromWiki};
