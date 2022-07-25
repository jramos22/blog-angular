import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../services/article.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Article } from '../../models/article';

import { Global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-new',

  templateUrl: './article-new.component.html',

  styleUrls: ['./article-new.component.css'],

  providers: [ArticleService],
})
export class ArticleNewComponent implements OnInit {
  public article: Article;

  public url: string = '';

  public status: string = '';
  public page_title!: string;
  public is_edit!: Boolean;

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
    this.page_title = 'Crear Nuevo articulo';
  }

  ngOnInit(): void {}

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      (response) => {
        let res = response.status;

        if (res == 'success') {
          this.status = 'success';

          this.article = response.article;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Articulo Creado!!',
            text: 'El Articulo fue creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      },

      (error) => {
        console.log(error);

        this.status = 'error';
      }
    );
  }

  imageUpload(data: any) {
    this.article.image = data.body.image;
  }
}
