import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository.createQueryBuilder('games').where("games.title like ':title%'", { title: `%${param}%` }).getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM USERS"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('users_games_games', 'userid')
      .where('users_games_games.gamesid = :id', { id })
      .getMany();
  }
}
