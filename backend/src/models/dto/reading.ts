export interface Reading {
  id?: number;
  userId: number;
  bookId: number;
  status: string;
  rating?: number;
  finish?: Date;
}

export interface ReadingResponse {
  message: string;
}

export interface DeleteReadingRequest {
  id: number;
  userId: number;
}
