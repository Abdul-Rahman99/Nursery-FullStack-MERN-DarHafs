// const { MongoClient } = require("mongodb");
// const { google } = require("googleapis");
// const isOnline = require("is-online");
// const keys = require("../credentials.json"); // Path to your Google API credentials JSON file

// const client = new MongoClient("mongodb://localhost:27017");

// const auth = new google.auth.GoogleAuth({
//   credentials: keys,
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// const sheets = google.sheets({ version: "v4", auth });

// let offlineChanges = [];

// async function handleStudentChange(change) {
//   offlineChanges.push(change);
//   await syncChangesToGoogleSheet();
// }

// async function handleTeacherChange(change) {
//   offlineChanges.push(change);
//   await syncChangesToGoogleSheet();
// }

// async function syncChangesToGoogleSheet() {
//   if (hasInternetConnection()) {
//     for (const change of offlineChanges) {
//       await updateGoogleSheet(change);
//     }
//     offlineChanges = [];
//   }
// }

// async function updateGoogleSheet(data) {
//   try {
//     const spreadsheetId = "15ukOjvvmc7YkHywZK3xWv7jI85SMYos9X5qBaRvQf2U"; // Replace with your Google Sheet ID
//     const range = "Teachers!A1"; // Replace with the range to update

//     const updateOptions = {
//       spreadsheetId,
//       range,
//       valueInputOption: "RAW",
//       resource: { values: data },
//     };

//     const response = await sheets.spreadsheets.values.update(updateOptions);
//     console.log("Google Sheet updated:", response.data);
//   } catch (error) {
//     console.error("Error updating Google Sheet:", error);
//   }
// }

// async function hasInternetConnection() {
//   try {
//     const online = await isOnline();
//     return online;
//   } catch (error) {
//     console.error("Error checking internet connectivity:", error);
//     return false;
//   }
// }

// async function connectToMongoDB() {
//   try {
//     await client.connect();

//     const db = client.db("MyDB");
//     const studentCollection = db.collection("Student");
//     const teacherCollection = db.collection("Teacher");

//     const studentChangeStream = studentCollection.watch();
//     const teacherChangeStream = teacherCollection.watch();

//     studentChangeStream.on("change", async (change) => {
//       await handleStudentChange(change);
//     });

//     teacherChangeStream.on("change", async (change) => {
//       await handleTeacherChange(change);
//     });
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// }

// setInterval(syncChangesToGoogleSheet, 60000); // Check every minute (adjust as needed)

// module.exports = { connectToMongoDB };
