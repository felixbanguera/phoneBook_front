import 'es6-shim';
import 'reflect-metadata';
import { Request, Response } from 'express-serve-static-core';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';
import MongoClientApp from './mongo-client';

const express = require('express');

// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

class Server {
  public app: any;
  private port = 9090;
  private db:any={};
  private dbMongo:any;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.dbMongo = new MongoClientApp();
    // Added default values
    // this.db.contacts = [
    //   { firstName: 'John',
    //     lastName: 'Doe',
    //     phoneNumber: 1234567
    //   },
    //   { firstName: 'Jane',
    //     lastName: 'Doe',
    //     phoneNumber: 9876543
    //   }
    // ];
    // Create expressjs application
    this.app = express();

    this.app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });

    // Depending on your own needs, this can be extended
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.raw({ limit: '50mb' }));
    this.app.use(bodyParser.text({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));

    // Route our backend calls
    this.app.get('/api', (req, res) => { return res.json({ application: 'Phonebook API' }); });
    // Get contacts
    this.app.get('/api/contacts', (req, res) => {
      this.dbMongo.getAll()
      .then(data => {
        return res.json({ contacts: data });
      })
      //return res.json({ contacts: this.db.contacts });
    });
    // Add contacts
    this.app.post('/api/contact', (req, res) => {
      console.log("POST: ", req.body);
      this.dbMongo.insert(req.body).then((data) => {
        if(!data.result.ok) return res.json({data});
        console.log("postrequest", data);
        return res.json({ inserted: true });
      })
      // this.db.contacts.push(req.body)
      // return res.json({ contacts: this.db.contacts });
    });

    // Redirect all the other resquests
    this.app.get('*', (req: Request, res: Response) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/phonebook${req.url}`));
      } else {
        res.sendFile(path.resolve('dist/phonebook/index.html'));
      }
    });

    // Start the server on the provided port
    this.app.listen(this.port, () => console.log(`http is started ${this.port}`));

    // Catch errors
    this.app.on('error', (error: any) => {
      console.error(moment().format(), 'ERROR', error);
    });

    process.on('uncaughtException', (error: any) => {
      console.log(moment().format(), error);
    });
  }
}

//Bootstrap the server, so it is actualy started
const server = Server.bootstrap();
export default server.app;