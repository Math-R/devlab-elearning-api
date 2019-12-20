import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Ressource } from '../utils/ressource/Ressource';

export class UserRessource extends Ressource {
  public static collection(collection: BaseEntity[]) {
    return collection.map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        description: user.description,
        email: user.email,
      };
    });
  }

  public static toArray(entities: User) {
    return {
      id: entities.id,
      username: entities.username,
      description: entities.description,
      email: entities.email,
      level: entities.level.name,
    };
  }
}
