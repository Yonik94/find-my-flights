import { Query } from '@angular/core';
import { gql } from 'apollo-angular';

export const flightQueries = {
    getFlights
}

function getFlights(origin = null) {
    return gql`
    {
      flights(origin: "${origin}") {
        id
        origin
        destination
        price
        departureTime,
        arrivalTime
        flightLength
      }
    }`
  }