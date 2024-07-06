const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const  {ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
require('dotenv').config();

const startServer = async()=>{
     const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection : true
     })
     await server.start();
     app.use(cors());
     app.use(bodyParser.json());
     app.use('/graphql', expressMiddleware(server , {
        context: ({ req }) => ({ token: req.headers.authorization }),
      }));
     app.use('/',(req,res)=>(res.send('Graphql server started')))
     app.listen(3000, ()=>{
         console.log('listening on port 3000');
     })
}
startServer();