import config from '../config';
import { AddReadingReq, ResponseMessage } from '../interfaces';

const addReadingService = async (
  authorization: string,
  data: AddReadingReq
): Promise<ResponseMessage> => {
  try {
    const response = await fetch(`${config.url}/api/reading`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${authorization}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 400) {
      return {
        type: 'error',
        message: `Can't add this book to your bookshelf`,
      };
    } else {
      return {
        type: 'success',
        message: 'Book added to your bookshelf',
      };
    }
  } catch {
    return {
      type: 'error',
      message: 'internal server error',
    };
  }
};

export { addReadingService };
