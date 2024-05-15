import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findById(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }

  create(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }

  async update(id: number, updateMovieDto: Partial<Movie>): Promise<Movie> {
    const movieFound = await this.moviesRepository.findOne({ where: { id } });
    if (!movieFound)
      throw new HttpException(
        { ok: false, message: `Movie with ID ${id} not found`, data: null },
        HttpStatus.NOT_FOUND,
      );

    Object.assign(movieFound, updateMovieDto);
    return this.moviesRepository.save(movieFound);
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete({ id });
  }
}
