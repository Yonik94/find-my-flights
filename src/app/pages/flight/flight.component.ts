//Component settings
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
//Services & Classes
import { Flight } from '../../services/flight/flight.model';
import { FlightService } from '../../services/flight/flight.service';
//Components
import { FlightListComponent } from '../../components/flight-list/flight-list.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { flightQueries } from 'src/app/services/flight/flight.query';
@Component({
  selector: 'flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  constructor(private flightService: FlightService, private apollo: Apollo) { }
  filter: Object = null;
  sort: Object = null;
  origins: Object;
  destinations: Object;

  get getFlights(): Flight[] {
    let flights: any[];
    this.flightService.query().subscribe(currFlights => {
      flights = currFlights;
    });
    return flights;
  }

  setFlights(ev): void {
    this.filter = ev;
    this.flightService.setLastFilter(this.filter);
    this.flightService.loadFlights(this.filter, this.sort);
  }
  setSort(ev): void {
    this.sort = ev;
    this.flightService.loadFlights(this.filter, this.sort);
  }

  async ngOnInit(): Promise<any> {
    this.flightService.loadFlights();
    this.origins = await this.flightService.getAllSelectorValues('origin');
    this.destinations = await this.flightService.getAllSelectorValues('destination');
  }

}
