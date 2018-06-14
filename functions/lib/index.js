"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
// from member-routes.js
//export const members = functions.https.onRequest
//# sourceMappingURL=index.js.map