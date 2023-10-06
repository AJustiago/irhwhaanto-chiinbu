const express = require("express");
const Ably = require('ably');
const async = require('async')
const dotenv = require('dotenv').config();

const KEY  = process.env.ACCESSKEY
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "PING!!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// SDK SERVICE

// Token in Ably
var realtime = new Ably.Realtime({ key: KEY });
// const realtime = new Ably.Realtime({ authUrl: '/auth' }); //authUrl

const ablyClient = new Ably.Realtime({
    authCallback: async (tokenParams, callback) => {
        try {
            const tokenRequest = await createTokenRequest() // Make a network request to your server
            callback(null, tokenRequest)
        } catch (error) {
            callback(error, null)
        }
    }
}); // authCallback

// const realtime = new Ably.Realtime({ authUrl: "/auth", authMethod: "POST", authParams: { p1: param1, b: param2}, authHeaders: {h1: header1, h2: header2} }); // authOption


async function ablyConnection(){
    const ably = new Ably.Realtime.Promise(KEY);
    await ably.connection.once('connected');
    console.log('Connected to Ably!');
}
    
app.get("/api/ably", (req, res) => {
    ablyConnection();
    res.json({ message: "Connected To Ably!" });
  });

const ably = new Ably.Realtime(
    {
        key: KEY,
        transportParams: { heartbeatInterval: 10000 }
    }
);

ably.close(); // runs synchronously
console.log('Closed the connection to Ably.');



