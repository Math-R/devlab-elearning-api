import { BaseEntity } from 'typeorm';
import { Level } from './level.entity';
import { Ressource } from '../utils/ressource/Ressource';

export class LevelRessource extends Ressource {
  public static collection(collection: BaseEntity[]) {
    return collection.map((entities: Level) => {
      return {
        id: entities.id,
        name: entities.name,
        slug: entities.slug,
      };
    });
  }

  public static toArray(entities: Level) {
    return {
      id: entities.id,
      name: entities.name,
      slug: entities.slug,
    };
  }
}
