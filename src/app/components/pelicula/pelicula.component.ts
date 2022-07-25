import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  @Input() pelicula!: Pelicula;

  @Output() MarcarFavorita = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  seleccionar(event: Event, pelicula: Pelicula): void {
    this.MarcarFavorita.emit({ pelicula: pelicula });
  }
}
