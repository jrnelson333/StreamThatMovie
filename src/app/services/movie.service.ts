import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { LoginComponent } from "app/components/login/login.component";


@Injectable()
export class MovieService {
  options: RequestOptions;

  serverURL: String = 'http://localhost:3000/';

  constructor(private http: Http, private mdDialog: MdDialog) { 
    this.options = new RequestOptions();
    this.options.withCredentials = true;
  }

  getRating(id: number): Observable<Response> {
    return this.http.get(this.serverURL + `api/movie/rating/${id}`, this.options)
      .map(res => res.json())
  }

  getAvgRating(id: number): Observable<Response> {
    return this.http.get(this.serverURL + `api/movie/rating/avg/${id}`, this.options)
      .map(res => res.json())
  }

  rateMovie(id: number, rating: number): Observable<Response> {
    return this.http.post(this.serverURL + `api/movie/rating/${id}`, {rating}, this.options)
      .map(res => res.json())
      .catch(res => this.authCatch(res))
  }

  getFavorite(id?: number) {
    return this.http.get(this.serverURL + `api/movie/favorite/${id}`, this.options)
  }

  favoriteMovie(id: number) {
    return this.http.post(this.serverURL + `api/movie/favorite/${id}`, {}, this.options)
      .catch(res => this.authCatch(res))
  }

  deleteFavorite(id: number) {
    return this.http.delete(this.serverURL + `api/movie/favorite/${id}`, this.options)
      .catch(res => this.authCatch(res))
  }

  authCatch(res: Response): Observable<Response> {
    if (res.status === 403) {
      let diagReference = this.mdDialog.open(LoginComponent, {hasBackdrop: true, disableClose: false})
    }
    return Observable.of(res);
  }

}
