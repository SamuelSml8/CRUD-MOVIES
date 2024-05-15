import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
