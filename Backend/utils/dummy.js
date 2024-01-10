// // const { google } = require("googleapis");
// // const mongoose = require("mongoose");
// // const Student = require("../models/studentModel");
// // const Teacher = require("../models/teacherModel");
// // const path = require("path");
// // const fs = require("fs");

// // dotenv.config({ path: "config.env" });

// // const CREDENTIALS = JSON.parse(fs.readFileSync('../dar-hafs-database-8cc52abaffe6.json')) ;

// // // Configure the JWT client
// // const client = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, [
// //   "https://www.googleapis.com/auth/spreadsheets",
// // ]);

// // // Authorize and create a Sheets instance
// // client.authorize(async (err, tokens) => {
// //   if (err) {
// //     console.error("Authorization failed:", err);
// //     return;
// //   }

// //   const sheets = google.sheets({ version: "v4", auth: client });

// //   // Function to append data to a Google Sheet
// //   const writeToSheet = async (data, range) => {
// //     try {
// //       const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
// //       const spreadsheetId = GOOGLE_SHEET_ID; // Replace with your Google Sheet ID
// //       const appendResponse = await sheets.spreadsheets.values.append({
// //         spreadsheetId,
// //         range,
// //         valueInputOption: "RAW",
// //         resource: { values: [data] },
// //       });
// //       console.log("Data appended to Google Sheet:", appendResponse.data);
// //     } catch (error) {
// //       console.error("Error appending data to Google Sheet:", error);
// //     }
// //   };

// //   // MongoDB connection
// //   mongoose.connect("mongodb://localhost:27017/MyDB", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   });

// //   const db = mongoose.connection;

// //   db.once("open", () => {
// //     console.log("Connected to MongoDB");
// //   });

// //   // Listen for updated student data
// //   Student.watch().on("change", (change) => {
// //     if (change.operationType === "insert") {
// //       const { fullDocument } = change;
// //       const studentData = [
// //         fullDocument._id,
// //         fullDocument.name,
// //         fullDocument.age,
// //         fullDocument.classEnrolled,
// //         fullDocument.fatherName,
// //         fullDocument.fahterPhone,
// //         fullDocument.fatherAddress,
// //         fullDocument.fatherNationalId,
// //         fullDocument.fatherJob,
// //         fullDocument.createdAt,
// //       ];
// //       writeToSheet(studentData, "Students!A1"); // Update the range as needed
// //     } else if (change.operationType === "update") {
// //       const { fullDocument } = change.updateDescription.updatedFields;
// //       const updatedStudentData = [
// //         fullDocument.name,
// //         fullDocument.age,
// //         fullDocument.classEnrolled,
// //         fullDocument.fatherName,
// //         fullDocument.fahterPhone,
// //         fullDocument.fatherAddress,
// //         fullDocument.fatherNationalId,
// //         fullDocument.fatherJob,
// //       ];
// //       writeToSheet(updatedStudentData, "Students!A1"); // Update the range as needed
// //     }
// //   });

// //   // Listen for updated teacher data
// //   Teacher.watch().on("change", (change) => {
// //     if (change.operationType === "insert") {
// //       const { fullDocument } = change;
// //       const teacherData = [
// //         fullDocument._id,
// //         fullDocument.name,
// //         fullDocument.age,
// //         fullDocument.phone,
// //         fullDocument.address,
// //         fullDocument.nationalId,
// //         fullDocument.createdAt,
// //       ];
// //       writeToSheet(teacherData, "Teachers!A1"); // Update the range as needed
// //     } else if (change.operationType === "update") {
// //       const { fullDocument } = change.updateDescription.updatedFields;
// //       const updatedTeacherData = [
// //         fullDocument.name,
// //         fullDocument.age,
// //         fullDocument.phone,
// //         fullDocument.address,
// //         fullDocument.nationalId,
// //       ];
// //       writeToSheet(updatedTeacherData, "Teachers!A1"); // Update the range as needed
// //     }
// //   });
// // });

// // const { GoogleSpreadsheet } = require('google-spreadsheet');
// // const fs = require('fs');

// // // Load your Google Sheet ID
// // const SPREADSHEET_ID = "15ukOjvvmc7YkHywZK3xWv7jI85SMYos9X5qBaRvQf2U"; // Replace with your Google Sheet ID

// // // Load your service account credentials
// // const CREDENTIALS = JSON.parse(fs.readFileSync('../dar-hafs-database-8cc52abaffe6.json'));

// // // Create a new GoogleSpreadsheet instance with your Spreadsheet ID
// // const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

// // // Function to add a row (in this case, for a new teacher or student)
// // const addRow = async (rowData) => {
// //   try {
// //     await doc.useServiceAccountAuth({
// //       client_email: CREDENTIALS.client_email,
// //       private_key: CREDENTIALS.private_key
// //     });

// //     await doc.loadInfo();

// //     const sheet = doc.sheetsByIndex[0]; // Assuming your data is on the first sheet

// //     await sheet.addRow(rowData);
// //     console.log('Row added successfully to Google Sheet');
// //   } catch (error) {
// //     console.error('Error adding row to Google Sheet:', error);
// //   }
// // };

// // // Function to update a row based on a specific key-value pair
// // const updateRow = async (keyValue, oldValue, newValue) => {
// //   try {
// //     await doc.useServiceAccountAuth({
// //       client_email: CREDENTIALS.client_email,
// //       private_key: CREDENTIALS.private_key
// //     });

// //     await doc.loadInfo();

// //     const sheet = doc.sheetsByIndex[0];

// //     const rows = await sheet.getRows();

// //     for (let index = 0; index < rows.length; index++) {
// //       const row = rows[index];
// //       if (row[keyValue] === oldValue) {
// //         row[keyValue] = newValue;
// //         await row.save();
// //         console.log('Row updated successfully in Google Sheet');
// //         break;
// //       }
// //     }
// //   } catch (error) {
// //     console.error('Error updating row in Google Sheet:', error);
// //   }
// // };

// // // Function to delete a row based on a specific key-value pair
// // const deleteRow = async (keyValue, thisValue) => {
// //   try {
// //     await doc.useServiceAccountAuth({
// //       client_email: CREDENTIALS.client_email,
// //       private_key: CREDENTIALS.private_key
// //     });

// //     await doc.loadInfo();

// //     const sheet = doc.sheetsByIndex[0];

// //     const rows = await sheet.getRows();

// //     for (let index = 0; index < rows.length; index++) {
// //       const row = rows[index];
// //       if (row[keyValue] === thisValue) {
// //         await row.delete();
// //         console.log('Row deleted successfully from Google Sheet');
// //         break;
// //       }
// //     }
// //   } catch (error) {
// //     console.error('Error deleting row from Google Sheet:', error);
// //   }
// // };

// // // Usage examples for adding, updating, and deleting rows
// // const teacherRow = {
// //   name: 'Teacher Name',
// //   age: 35,
// //   // Other teacher fields...
// // };

// // const studentRow = {
// //   name: 'Student Name',
// //   age: 20,
// //   // Other student fields...
// // };

// // // Uncomment and use the functions as needed
// // // addRow(teacherRow);
// // // addRow(studentRow);

// // // updateRow('key', 'oldValue', 'newValue');
// // // deleteRow('key', 'value');

// const { google } = require("googleapis");
// const mongoose = require("mongoose");
// const Student = require("../models/studentModel");
// const Teacher = require("../models/teacherModel");
// const dotenv = require("dotenv");
// const path = require("path");
// const fs = require("fs");

// dotenv.config({ path: "config.env" });

// const CREDENTIALS = JSON.parse(
//   fs.readFileSync("../dar-hafs-database-8cc52abaffe6.json")
// );

// // Configure the JWT client
// const client = new google.auth.JWT(
//   CREDENTIALS.client_email,
//   null,
//   CREDENTIALS.private_key,
//   ["https://www.googleapis.com/auth/spreadsheets"]
// );

// // Authorize and create a Sheets instance
// client.authorize(async (err, tokens) => {
//   if (err) {
//     console.error("Authorization failed:", err);
//     return;
//   }

//   const sheets = google.sheets({ version: "v4", auth: client });

//   // Function to append data to a Google Sheet
//   const writeToSheet = async (data, range) => {
//     try {
//       const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
//       const spreadsheetId = GOOGLE_SHEET_ID;
//       const appendResponse = await sheets.spreadsheets.values.append({
//         spreadsheetId,
//         range,
//         valueInputOption: "RAW",
//         resource: { values: [data] },
//       });
//       console.log("Data appended to Google Sheet:", appendResponse.data);
//     } catch (error) {
//       console.error("Error appending data to Google Sheet:", error);
//     }
//   };

//   // MongoDB connection
//   mongoose.connect("mongodb://localhost:27017/MyDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = mongoose.connection;

//   db.once("open", () => {
//     console.log("Connected to MongoDB");
//   });

//   // Listen for updated student data
//   Student.watch().on("change", async (change) => {
//     if (change.operationType === "insert") {
//       const { fullDocument } = change;
//       const studentData = [
//         fullDocument._id,
//         fullDocument.name,
//         fullDocument.age,
//         fullDocument.classEnrolled,
//         fullDocument.fatherName,
//         fullDocument.fahterPhone,
//         fullDocument.fatherAddress,
//         fullDocument.fatherNationalId,
//         fullDocument.fatherJob,
//         fullDocument.createdAt,
//       ];
//       writeToSheet(studentData, "Students!A1"); // Update the range as needed
//     } else if (change.operationType === "update") {
//       const { fullDocument } = change.updateDescription.updatedFields;
//       const updatedStudentData = [
//         fullDocument.name,
//         fullDocument.age,
//         fullDocument.classEnrolled,
//         fullDocument.fatherName,
//         fullDocument.fahterPhone,
//         fullDocument.fatherAddress,
//         fullDocument.fatherNationalId,
//         fullDocument.fatherJob,
//       ];
//       writeToSheet(updatedStudentData, "Students!A1"); // Update the range as needed
//     }
//   });

//   // Listen for updated teacher data
//   Teacher.watch().on("change", async (change) => {
//     if (change.operationType === "insert") {
//       const { fullDocument } = change;
//       const teacherData = [
//         fullDocument._id,
//         fullDocument.name,
//         fullDocument.age,
//         fullDocument.phone,
//         fullDocument.address,
//         fullDocument.nationalId,
//         fullDocument.createdAt,
//       ];
//       writeToSheet(teacherData, "Teachers!A1"); // Update the range as needed
//     } else if (change.operationType === "update") {
//       const { fullDocument } = change.updateDescription.updatedFields;
//       const updatedTeacherData = [
//         fullDocument.name,
//         fullDocument.age,
//         fullDocument.phone,
//         fullDocument.address,
//         fullDocument.nationalId,
//       ];
//       writeToSheet(updatedTeacherData, "Teachers!A1"); // Update the range as needed
//     }
//   });
// });
