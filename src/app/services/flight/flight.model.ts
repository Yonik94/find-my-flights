import { UtilService } from '../util/util.service';

export class Flight {

    constructor(public id: string = '', public origin: string = '',
    public destination: string = '', public departureTime: Number,
    public arrivalTime: Number, public price: Number, public flightLength?: Number, 
    public connections?: Object[]) {
    }
    setId?() {
        const utilService = new UtilService 
        this.id = utilService.makeId()
    }
    setConnections?(stations) {
        this.connections = stations;
    }
    setFlightLength?(departureTime, arrivalTime) {
        this.flightLength = (arrivalTime - departureTime) / (1000 * 60)
    }
}