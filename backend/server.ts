import 'es6-shim';
import 'reflect-metadata';
import { Request, Response } from 'express-serve-static-core';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';

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


  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    // Added default values
    this.db.contacts = [
      { firstName: 'John',
        lastName: 'Doe',
        phoneNumber: 1234567
      },
      { firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: 9876543
      }
    ];
    // Create expressjs application
    this.app = express();

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
    this.app.get('/api/contacts', (req, res) => { return res.json({ contacts: this.db.contacts }); });
    // Add contacts
    this.app.post('/api/contact', (req, res) => {
      console.log("POST: ", req.body);
      this.db.contacts.push(req.body)
      return res.json({ contacts: this.db.contacts });
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