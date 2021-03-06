import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http-exception';
import {
  ChangeReadingStatus,
  DeleteReadingRequest,
  ErrorHandling,
  Reading,
} from '../models';
import { readingService } from '../services/reading-service';

export const readingController = {
  async post(
    req: Request<unknown, unknown, Reading, unknown>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await readingService
      .addBookToShelf(req.body, req.headers)
      .catch(error => {
        next(new HttpException(500, error));
      });

    if (((data as unknown) as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },

  async put(
    req: Request<unknown, unknown, ChangeReadingStatus, unknown>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await readingService
      .updateBookStatus(req.body, req.headers)
      .catch(error => {
        next(new HttpException(500, error));
      });
    if (((data as unknown) as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },

  async delete(
    req: Request<unknown, unknown, DeleteReadingRequest, unknown>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await readingService
      .deleteBookFromShelf(req.body, req.headers)
      .catch(error => {
        next(new HttpException(500, error));
      });

    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(202).json(data);
    }
  },
};
