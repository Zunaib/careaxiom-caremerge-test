const express = require("express");
const router = express.Router();

//Controllers
const taskPlainNode = require("../controllers/withPlainNodeJS.js");
const taskAsync = require("../controllers/withAsync");
const taskRsvp = require("../controllers/withRsvp");
const taskRXJS = require("../controllers/withRx");

const taskNumber = process.argv[2];

console.log("------------------------------------");
console.log("This is ", taskNumber);
console.log("------------------------------------");

/* TASK 1 */
if (taskNumber === "PlainNode") {
    router.get("/I/want/title", taskPlainNode.getTitle);
} else if (taskNumber === "Async") {
    /* TASK2 */
    router.get("/I/want/title", taskAsync.getTitle);
} else if (taskNumber === "Rsvp") {
    // /* TASK3 */
    router.get("/I/want/title", taskRsvp.getTitle);
} else if (taskNumber === "Rxjs") {
    // /* TASK4 */
    router.get("/I/want/title", taskRXJS.getTitle);
} else {
    console.log("Default Task Set To Plain NodeJS");
    router.get("/I/want/title", taskPlainNode.getTitle);
}

module.exports = router;
