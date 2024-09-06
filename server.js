const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Set up the MySQL connection
const db = mysql.createConnection({
  host: '10.11.90.15',
  user: 'AppUser',
  password: 'Special888%',
  database: 'Study',
  port: 3306,
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Define a POST route to handle form submissions
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Extract data from the received structure
  const form_id = formData.Form.Id;
  const form_internal_name = formData.Form.InternalName;
  const form_name = formData.Form.Name;
  const first_name = formData.Name.First;
  const second_name = formData.Name.Last;
  const city = formData.Address.City;
  const city_state_postal_code = formData.Address.CityStatePostalCode;
  const country = formData.Address.Country;
  const country_code = formData.Address.CountryCode;
  const full_address = formData.Address.FullAddress;
  const full_international_address = formData.Address.FullInternationalAddress;
  const latitude = formData.Address.Latitude;
  const longitude = formData.Address.Longitude;
  const postal_code = formData.Address.PostalCode;
  const state = formData.Address.State;
  const street_address = formData.Address.StreetAddress;
  const address_type = formData.Address.Type;
  const date = formData.Date;
  const id_entry = formData.Id;

  // Check if data with the same id_entry already exists
  const checkQuery = 'SELECT * FROM example_table WHERE id_entry = ?';
  db.query(checkQuery, [id_entry], (err, results) => {
    if (err) {
      console.error('Error checking for existing data:', err);
      return res.status(500).send('Error checking data');
    }

    if (results.length > 0) {
      // Data already exists
      console.log('Data already exists:', results);
      res.status(200).send('Data already exists');
    } else {
      // Prepare the SQL query to insert data
      const insertQuery = `INSERT INTO example_table (form_id, form_internal_name, form_name, first_name, second_name, city, city_state_postal_code, country, country_code, full_address, full_international_address, latitude, longitude, postal_code, state, street_address, address_type, date, id_entry)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        form_id,
        form_internal_name,
        form_name,
        first_name,
        second_name,
        city,
        city_state_postal_code,
        country,
        country_code,
        full_address,
        full_international_address,
        latitude,
        longitude,
        postal_code,
        state,
        street_address,
        address_type,
        date,
        id_entry
      ];

      // Execute the insert query
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Error inserting data');
        } else {
          console.log('Data inserted successfully:', result);
          res.status(200).send('Form data saved successfully');
        }
      });
    }
  });
});

app.post('/update-form', (req, res) => {
  const formData = req.body;

  // Extract data from the received structure
  const form_id = formData.Form.Id;
  const form_internal_name = formData.Form.InternalName;
  const form_name = formData.Form.Name;
  const first_name = formData.Name.First;
  const second_name = formData.Name.Last;
  const city = formData.Address.City;
  const city_state_postal_code = formData.Address.CityStatePostalCode;
  const country = formData.Address.Country;
  const country_code = formData.Address.CountryCode;
  const full_address = formData.Address.FullAddress;
  const full_international_address = formData.Address.FullInternationalAddress;
  const latitude = formData.Address.Latitude;
  const longitude = formData.Address.Longitude;
  const postal_code = formData.Address.PostalCode;
  const state = formData.Address.State;
  const street_address = formData.Address.StreetAddress;
  const address_type = formData.Address.Type;
  const date = formData.Date;
  const id_entry = formData.Id;

  // Check if data with the same id_entry already exists
  const checkQuery = 'SELECT * FROM example_table WHERE id_entry = ?';
  db.query(checkQuery, [id_entry], (err, results) => {
    if (err) {
      console.error('Error checking for existing data:', err);
      return res.status(500).send('Error checking data');
    }

    if (results.length > 0) {
      // Data already exists, perform an update
      console.log('Data already exists. Updating data:', results);

      const updateQuery = `UPDATE example_table SET form_id = ?, form_internal_name = ?, form_name = ?, first_name = ?, second_name = ?, city = ?, city_state_postal_code = ?, country = ?, country_code = ?, full_address = ?, full_international_address = ?, latitude = ?, longitude = ?, postal_code = ?, state = ?, street_address = ?, address_type = ?, date = ?
                           WHERE id_entry = ?`;

      const values = [
        form_id,
        form_internal_name,
        form_name,
        first_name,
        second_name,
        city,
        city_state_postal_code,
        country,
        country_code,
        full_address,
        full_international_address,
        latitude,
        longitude,
        postal_code,
        state,
        street_address,
        address_type,
        date,
        id_entry
      ];

      // Execute the update query
      db.query(updateQuery, values, (err, result) => {
        if (err) {
          console.error('Error updating data:', err);
          res.status(500).send('Error updating data');
        } else {
          console.log('Data updated successfully:', result);
          res.status(200).send('Form data updated successfully');
        }
      });
    } else {
      // Data does not exist, perform an insert
      console.log('Data does not exist. Inserting data:', formData);

      const insertQuery = `INSERT INTO example_table (form_id, form_internal_name, form_name, first_name, second_name, city, city_state_postal_code, country, country_code, full_address, full_international_address, latitude, longitude, postal_code, state, street_address, address_type, date, id_entry)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        form_id,
        form_internal_name,
        form_name,
        first_name,
        second_name,
        city,
        city_state_postal_code,
        country,
        country_code,
        full_address,
        full_international_address,
        latitude,
        longitude,
        postal_code,
        state,
        street_address,
        address_type,
        date,
        id_entry
      ];

      // Execute the insert query
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Error inserting data');
        } else {
          console.log('Data inserted successfully:', result);
          res.status(200).send('Form data saved successfully');
        }
      });
    }
  });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
