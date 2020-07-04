import {MongoClient} from 'mongodb';
// import { resolve } from '../../webpack.config';


const url ='mongodb://localhost:27017';
const db = 'local';
// const mongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

export default new Promise ( (resolve, reject) => MongoClient.connect(url,{ useUnifiedTopology: true }).then(client=>resolve(client.db(db))).catch(err=>reject(err))); 
