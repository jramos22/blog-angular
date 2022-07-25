import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {
  public peliculas: Pelicula[];
  constructor() {
    this.peliculas = [
      new Pelicula(
        'Spiderman 4',
        2022,
        'https://www.nacion.com/resizer/6VHvOPaxGzBmOIcfigzOJdzWHlU=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gruponacion/YFFTRYWU3VDRZJBYXJBPUBPOPE.jpg'
      ),
      new Pelicula(
        'Vengadores',
        2018,
        'https://static.guiainfantil.com/pictures/2243-los-vengadores-peliculas-para-ninos-de-superheroes.jpg'
      ),
      new Pelicula(
        'Vengadores 2',
        2020,
        'https://es.web.img2.acsta.net/pictures/19/03/26/17/22/0896830.jpg'
      ),
      new Pelicula(
        'Tranformers',
        2012,
        'https://media.vandalsports.com/i/2880x2160/2-2022/202221693527_1.jpg'
      ),
    ];
  }
  holaMundo() {
    return 'hola mundo desde un servicio de Angular ';
  }
  getPeliculas() {
    return this.peliculas;
  }
}
