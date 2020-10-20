import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Flight } from './flight.model';
import { flightQueries } from './flight.query';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private _flights$ = new BehaviorSubject([]);
  private flights$ = this._flights$.asObservable();
  private lastFilter = null

  constructor(private apollo: Apollo) { }

  public loadFlights(filterBy = this.lastFilter, sortBy = null, isForUpdate = true): Promise<[]> {    
    let origin: String = null;
    if (filterBy && filterBy.origin) {
      origin = filterBy.origin;
    }
    return this.apollo.query({
      query: flightQueries.getFlights(origin)
    }).toPromise()
      .then(res => res.data['flights'])
      .then(flights => {
        if (this._isStartFilter(filterBy)) {
          return this._filter(filterBy, flights);
        } else return flights;
      })
      .then(flights => {
        if (isForUpdate) this._flights$.next(this._sort(flights, sortBy));
        return flights;
      })
  }

  public setLastFilter(filter) {
    this.lastFilter = filter
  }

  public query() {
    return this.flights$;
  }

  public getFlight(id): Flight {
    let flight: Flight;
    const subscriber = this.flights$.subscribe(flights => {
      flight = flights.find(currFlight => currFlight.id === id);
    })
    subscriber.unsubscribe();
    return flight;
  }

  private _sort(flights: Flight[], sortBy): Flight[] {
    if (!sortBy) return flights
    const { key, direction } = sortBy
    return flights.sort((a, b) => {

      if ((a[key].length || a[key]) < (b[key].length || b[key])) {
        return direction
      }

      if ((a[key].length || a[key]) > (b[key].length || b[key])) {
        return -1 * direction
      }
      return 0;
    })
  }

  private _filter(filterBy, flights): Flight[] {
    filterBy.matchFlights = []
    filterBy.rootOrigin = filterBy.origin

    const potentialFlights = this.getFlights(flights, filterBy.origin, filterBy);
    const connections = (!filterBy.connections && filterBy.connections !== 0) ?
      Infinity : filterBy.connections

    return potentialFlights.reduce((acc, flight) => {
      if (this._isMatchByPrice(flight, filterBy)
        && this._isMatchByConnections(flight, connections)) {
        if (filterBy.startDate && filterBy.endDate) {
          if (this._isMatchByDates(flight, filterBy)) {
            acc.push(flight);
          }
          return acc;
        }
        acc.push(flight);
      }
      return acc;
    }, []);
  }

  public async getAllSelectorValues(selector): Promise<{}> {
    const items = await this.loadFlights(null, null, false);
    const values = items.map(item => item[selector]);
    return [...new Set(values)];
  }

  public getFlights(flights, origin, searchSettings): Flight[] {
    if (!origin) return flights;

    //If the origin and destination there's no match flights: 
    if (origin === searchSettings.destination) return [];

    if (!searchSettings.stations) searchSettings.stations = [];
    for (let i = 0; i < flights.length; i++) {
      const lastStation = searchSettings.stations[searchSettings.stations.length - 1];

      if (flights[i].origin === origin) {
        // The flight is going back to start otigin
        if (flights[i].destination === searchSettings.rootOrigin) continue;

        // The flight is going back to last station
        else if (lastStation && flights[i].departureTime <= lastStation.arrivalTime) continue;
        searchSettings.stations.push(flights[i]);

        // If doesn't match but it could be another connection call the function recursive
        if (flights[i].destination !== searchSettings.destination) {
          this.getFlights(flights, flights[i].destination, searchSettings);
        }

        // Match route found
        else {
          //Create flight
          const flight = this._createFlight(searchSettings);

          // Add the flight to matchFlights only if it's flight length less than 5 days.
          if (flight.flightLength < 7200) searchSettings.matchFlights.push(flight);
          searchSettings.stations = [];
        }
      }
    }
    searchSettings.stations = [];
    return searchSettings.matchFlights;
  }

  _createFlight({ stations, destination }): Flight {
    const price = this._getSumOf('price', stations);
    const departureTime = stations[0].departureTime;
    const arrivalTime = stations[stations.length - 1].arrivalTime;

    const flight = new Flight(null, stations[0].origin,
      destination, departureTime, arrivalTime, price);

    flight.setId();
    flight.setFlightLength(departureTime, arrivalTime);


    if (stations.length > 1) flight.setConnections(stations);
    return flight;
  }

  _getSumOf(key, items): Number {
    return items.reduce((acc, item) => {
      acc += item[key];
      return acc;
    }, 0);
  }

  _isStartFilter(filterBy): Boolean {
    if (filterBy) {
      if (filterBy.origin && filterBy.destination) return true;
      if (filterBy.connections) return true;
      if (filterBy.startDate && filterBy.endDate) return true;
      if (filterBy.minPrice || filterBy.maxPrice) return true;
    }
    return false;
  }

  _isMatchByPrice(flight, { minPrice, maxPrice }): Boolean {
    if (flight.price >= minPrice && flight.price <= maxPrice) return true;
    return false;
  }

  _isMatchByConnections(flight, num): Boolean {
    if (!flight.connections || !flight.connections.length || flight.connections.length <= num) {
      return true;
    }
    return false;
  }
  _isMatchByDates(flight, { startDate, endDate }): Boolean {
    const hour = 1000 * 3600;
    if (flight.departureTime >= startDate
      && flight.departureTime <= (endDate + (hour * 24))) {
      return true;
    }
    return false;
  }
}
