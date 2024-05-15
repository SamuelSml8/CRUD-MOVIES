import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('all')
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findById(id);
  }

  @Post('create')
  create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.moviesService.remove(id);
  }
}
