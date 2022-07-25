import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  public article!: Article;
  public url!: string;
  constructor(
    private _aticleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._aticleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            console.log();
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        (error) => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }
  delete(id: any = null) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras revertir estos cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._aticleService.delete(id).subscribe(
          (response) => {
            this._router.navigate(['/blog']);
          },
          (error) => {
            console.log(error);
            this._router.navigate(['/blog']);
          }
        );
        Swal.fire('Borrado!', 'Tu articulo a sido eliminado', 'success');
      } else {
        Swal.fire('Seguro!', 'Tu articulo esta a salvo.', 'success');
      }
    });
  }
}
