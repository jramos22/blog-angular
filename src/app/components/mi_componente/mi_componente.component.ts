import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: './mi_componente.component.html' 
})
export class Micomponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostarPeliculas: Boolean;
    constructor(){
        this.titulo = "Hola mundo este es mi primer componente";
        this.comentario ="Soy un parrafo";
        this.year = 2022;
        this.mostarPeliculas = true;
        console.log("Componente mi-componente cargado !!!");
        console.log(this.titulo, this.comentario, this.year);
    }
    ocultarPeliculas(){
        this.mostarPeliculas =false;
    }
}