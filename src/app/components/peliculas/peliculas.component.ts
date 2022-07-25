import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService],
})
export class PeliculasComponent implements OnInit {
  public titulo: String;
  public peliculas: Pelicula[];
  public favorita!: Pelicula;
  public fecha: any;
  constructor(private _peliclaService: PeliculaService) {
    this.titulo = 'Componente peliculas';

    this.peliculas = this._peliclaService.getPeliculas();
    this.fecha = new Date(2022, 7, 10);
  }

  ngOnInit(): void {
    console.log('Componente iniciado');
  }

  ngDoCheck() {
    console.log('Docheck lanzado');
  }

  cambiarTitulo() {
    this.titulo = 'El titulo ha sido cambiado';
  }

  ngOnDestroy() {
    console.log('El componente se va a eliminar ');
  }

  mostrarFavorita(event: any) {
    this.favorita = event.pelicula;
  }
}
