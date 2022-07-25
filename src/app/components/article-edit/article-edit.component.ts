import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../services/article.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Article } from '../../models/article';

import { Global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public article: Article;

  public url: string = '';

  public status: string = '';
  public is_edit!: boolean;
  public page_title!: string;

  afuConfig = {
    multiple: false,

    formatsAllowed: '.jpg,.png,.gif,.jpeg',

    uploadAPI: {
      url: Global.url + 'upload-image',
    },

    theme: 'attachPin',

    hideProgressBar: true,

    hideResetBtn: true,

    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Select Files',

      resetBtn: 'Reset',

      uploadBtn: 'Upload',

      dragNDropBox: 'Drag N Drop',

      attachPinBtn: 'Sube tu imagen para el articulo...',

      afterUploadMsg_success: 'Successfully Uploaded !',

      afterUploadMsg_error: 'Upload Failed !',

      sizeLimit: 'Size Limit',
    },
  };

  constructor(
    private _articleService: ArticleService,

    private _route: ActivatedRoute,

    private _router: Router
  ) {
    this.article = new Article('', '', '', '', null);

    this.url = Global.url;
    this.is_edit = true;
    this.page_title = 'Editar articulo';
  }

  ngOnInit(): void {
    this.getArticle();
  }
  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      (response) => {
        let res = response.status;
        console.log(response);
        if (res == 'success') {
          this.status = 'success';

          this.article = response.articleUpdated;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Articulo Editado!!',
            text: 'El Articulo fue Editado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
        }
      },

      (error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al Editar!!',
          text: 'El Articulo no se edito correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.status = 'error';
      }
    );
  }

  imageUpload(data: any) {
    this.article.image = data.body.image;
  }

  getArticle() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
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
}
