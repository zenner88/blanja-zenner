import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app';
  restItems: any;
  restItemsMovie: any;
  restItemsMovies: any;
  restItemsUrl = 'https://swapi.co/api/people/1/';
  data : any;
  constructor(private http : HttpClient) { }
  
  ngOnInit() {
    this.getRestItems();
    this.getMovieItems();
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.restItemsMovie = restItems['films'][0];
          console.log(this.restItems);
          console.log('MOVIE : ',this.restItemsMovie);

        }
      )
  }
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
  
  getMovieItems(): void {
    this.getMovie()
      .subscribe(
        movieItems => {
          this.restItemsMovies = movieItems;
          console.log('MOVIES : ',this.restItemsMovies);
        }
      )
  }
  getMovie(){
    return this.http
      .get<any[]>(this.restItemsMovie)
      .pipe(map(data => data.slice(2)));
      
  }
}
