const graphql = require('graphql');
const {TimestampType} = require('./custom-scalar-types/dateScalar');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
} = graphql;

const hour = 1000 * 3600

const flights = [
    {
        id: '1',
        origin: 'Israel',
        destination: 'United States',
        departureTime: Date.now() + (hour * 3),
        arrivalTime: Date.now() + (hour * 3) + (hour * 12),
        price: 250,
        flightLength: 720,
    },
    {
        id: '2',
        origin: 'Israel',
        destination: 'Greece',
        departureTime: Date.now() + hour,
        arrivalTime: Date.now() + hour + (hour * 3),
        price: 250,
        flightLength: 180,
    },
    {
        id: '3',
        origin: 'United States',
        destination: 'Israel',
        departureTime: Date.now() + (hour * 8),
        arrivalTime: Date.now() + (hour * 8) + (hour * 12),
        price: 250,
        flightLength: 720,
    },
    {
        id: '4',
        origin: 'Greece',
        destination: 'United States',
        departureTime: Date.now() + (hour * 5),
        arrivalTime: Date.now() + (hour * 5) + (hour * 10),
        price: 250,
        flightLength: 600,
    },
    {
        id: '5',
        origin: 'United States',
        destination: 'Greece',
        departureTime: Date.now() + (hour * 2),
        arrivalTime: Date.now() + (hour * 2) + (hour * 10),
        price: 700,
        flightLength: 600,
    },
    {
        id: '6',
        origin: 'Belgium',
        destination: 'United States',
        departureTime: Date.now() + (hour * 16),
        arrivalTime: Date.now() + (hour * 16) + (hour * 8),
        price: 250,
        flightLength: 480,
    },
    {
        id: '7',
        origin: 'Israel',
        destination: 'Belgium',
        departureTime: Date.now() + (hour * 4),
        arrivalTime: Date.now() + (hour * 4) + (hour * 8),
        price: 250,
        flightLength: 480,
    },
    {
        id: '8',
        origin: 'Greece',
        destination: 'Canada',
        departureTime: Date.now() + (hour * 50),
        arrivalTime: Date.now() + (hour * 50) + (hour * 14),
        price: 250,
        flightLength: 840,
    },
    {
        id: '9',
        origin: 'Canada',
        destination: 'Israel',
        departureTime: Date.now() + (hour * 12),
        arrivalTime: Date.now() + (hour * 12) + (hour * 16),
        price: 250,
        flightLength: 960,
    },
    {
        id: '10',
        origin: 'Canda',
        destination: 'United States',
        departureTime: Date.now() + (hour * 4),
        arrivalTime: Date.now() + (hour * 4) + (hour * 6),
        price: 700,
        flightLength: 360,
    },
    {
        id: '11',
        origin: 'Cyprus',
        destination: 'Greece',
        departureTime: Date.now() + (hour * 6),
        arrivalTime: Date.now() + (hour * 6) + (hour * 4),
        price: 700,
        flightLength: 240,
    },
]

const FlightType = new GraphQLObjectType({
    name: 'Flight',
    fields: () => ({
        id: { type: GraphQLID },
        origin: { type: GraphQLString },
        destination: { type: GraphQLString },
        departureTime: { type: TimestampType },
        arrivalTime: { type: TimestampType },
        price: { type: GraphQLInt },
        flightLength: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        flights: {
            type: GraphQLList(FlightType),
            resolve(parent, args) {
                return flights
            }
        },
        flights: {
            type: GraphQLList(FlightType),
            args: { origin: { type: GraphQLString } },
            resolve(parent, args) {
                return flights.filter(flight => flight.destination !== args.origin)
            }
        },        
        flight: {
            type: FlightType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return flights.find(flight => flight.id === args.id)
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})