import { BaseEntity } from 'typeorm';

export interface IRessource {
  toArray(entity: BaseEntity): {};

  collection(collection: BaseEntity[]): any[];
}


