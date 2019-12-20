import { Injectable, Logger } from '@nestjs/common';
import { Connection, getConnection, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from '../user/user.entity';
import { Level } from '../level/level.entity';
import slugify from 'slugify';

@Injectable()
export class SeedsService {
  private queryRuner: QueryRunner;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly logger: Logger,
  ) {
    this.queryRuner = getConnection().createQueryRunner();
  }

  async seed() {
    this.logger.debug('Run seeds');
    await this.truncate();

    const levels = await this.seedLevel();
    this.logger.debug('Successfuly completed seeding levels...');

    const users = await this.seedUser();
    this.logger.debug('Successfuly completed seeding users...');

  }

  async seedUser() {
    const users = [];
    for (let i = 1; i < 50; i++) {
      let user = new User();
      user.email = `user-${i}@gmail.com`;
      user.username = 'username' + i;
      user.description = this.lorem();
      user.password = 'password';
      user.level = await this.levelRepository.findOne({ where: { id: 1 } });
      await user.save();
      users.push(user);
    }
    const user = new User();
    user.email = `glrd.remi@gmail.com`;
    user.username = 'glrd';
    user.description = 'Hi Im glrd';
    user.password = 'password';
    user.level = await this.levelRepository.findOne({ where: { id: 1 } });
    await user.save();
    users.push(user);
    return users;
  }

  private lorem(): string {
    return 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker';
  }

  async truncate() {
    this.logger.debug('Clear all tables ...');
    const queryRunnr = getConnection().createQueryRunner();
    // queryRunnr.query('SET FOREIGN_KEY_CHECKS=0;');
    await getConnection().synchronize(true);
  }

  private async seedLevel() {
    for (let i = 1; i < 3; i++) {
      let level = new Level();
      level.name = 'Niveau ' + i;
      level.slug = slugify('Niveau ' + i, {
        replacement: '-',    // replace spaces with replacement
        remove: null,        // regex to remove characters
        lower: true,         // result in lower case
      });
      await level.save();
    }
  }
}
