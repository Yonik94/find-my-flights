const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(3030, () => {
    console.log('listening for requests on port 3030');
});