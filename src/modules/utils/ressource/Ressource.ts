import { BaseEntity } from 'typeorm';
import { AnonymousResource } from './AnonymousResource';
import { AnonymousResourceCollection } from './AnonymousResourceCollection';

export class Ressource {
  public toArray(entity: BaseEntity): {} {
    return new AnonymousResource(entity);
  }

  public collection(collection: BaseEntity[]) {
    return new AnonymousResourceCollection(collection);
  }
}
