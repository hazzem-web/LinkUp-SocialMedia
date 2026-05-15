import { cert, initializeApp } from 'firebase-admin/app';
import { readFileSync } from "node:fs";
import { resolve } from "path";

let serviceAccountBuffer = readFileSync(resolve("socialmedia-1210b-firebase-adminsdk-fbsvc-35d6810f0b.json"));
let serviceAccount = JSON.parse(serviceAccountBuffer.toString());



initializeApp({
    credential: cert(serviceAccount)
});

