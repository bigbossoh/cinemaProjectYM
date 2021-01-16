import { Component, OnInit } from '@angular/core';
import{CinemaService} from '../services/cinema.service'


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

public villes;
public cinemas;
public salles;
public currentVille;
public currentCinema;
  private currentProjection: any;
  private selelectedTickets;
  constructor(private cinemaService:CinemaService) { }

  ngOnInit() {
this.cinemaService.getVilles()
.subscribe(data=>{
  this.villes=data;
},err=>{
    console.log(err);
})

  }
  onGetCinemas(v){

    this.currentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)
    .subscribe(data=>{
      this.cinemas=data;
    },err=>{
        console.log(err);
    })
  }

  onGetSalle(c) {
    this.currentCinema=c;
    this.cinemaService.getSalle(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjections(salle)
          .subscribe(data=>{
            salle.projections=data;
          },err=>{
              console.log(err);
          })
        })
      },err=>{
        console.log(err);
      })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets=data;
        this.selelectedTickets=[]
      },err=>{
        console.log(err);
      })
  }

  onSelectedTicket(t) {
    if(!t.selected){
      t.selected=true;
      this.selelectedTickets.push(t);
    }
    else{
      t.selected=false;
      this.selelectedTickets.splice(this.selelectedTickets.indexOf(t),1);
    }
    console.log(this.selelectedTickets);


  }

  getTicketClass(t) {
    let str="btn ticket ";
    if(t.reserve==true){
      str+="btn-danger";
    }
    else if(t.selected){
      str+="btn-warning";
    }
    else {
      str+="btn-success";
    }
    return str;
  }

  OnPayTickets(dataForm) {

    let tickets=[];
    this.selelectedTickets.forEach(t=>{
      tickets.push(t.idTicket);
    });
    dataForm.tickets=tickets;
    console.log(dataForm);
    this.cinemaService.payerTicket(dataForm)
      .subscribe(data=>{
        alert("Ticket réservé avec succès!");
        this.onGetTicketsPlaces(this.currentProjection);
        this.currentProjection.tickets=data;
        this.selelectedTickets=[]
      },err=>{
        console.log(err);
      })
  }
}
