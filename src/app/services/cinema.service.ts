import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

// tslint:disable-next-line: typedef-whitespace
public host = 'http://localhost:8181';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  public getVilles(){
    return this.http.get(this.host + '/villes');
  }
  // tslint:disable-next-line: typedef
  getCinemas(v){
    return this.http.get(v._links.cinemas.href);
  }

  // tslint:disable-next-line: typedef
  getSalle(c) {
    return this.http.get(c._links.salle.href);
  }

  // tslint:disable-next-line: typedef
  getProjections(salle) {
  const url = salle._links.projections.href.replace('{?projection}', '');
  return this.http.get(url + '?projection=p1');
  }

  // tslint:disable-next-line: typedef
  getTicketsPlaces(p) {
  const url = p._links.tickets.href.replace('{?projection}', '');
  return this.http.get(url + '?projection=t1');
  }

  // tslint:disable-next-line: typedef
  payerTicket(dataForm) {
    return this.http.post(this.host + '/payerTicket', dataForm);
  }
}
