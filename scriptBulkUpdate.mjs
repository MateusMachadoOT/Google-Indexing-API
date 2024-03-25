import fetch from 'node-fetch';
import { google } from 'googleapis';
import key from './PATH/TO/YOUR/KEY.json' assert { type: 'json' };

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

const urlsToUpdate = [
  "YOUR URL HERE",
  "YOUR URL HERE",
  "YOUR URL HERE",
  "YOUR URL HERE",  
  // Add more URLs as needed
  
];

jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.error('Error making request to generate access token:', err);
    return;
  }

  for (const url of urlsToUpdate) {
    try {
      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        },
        body: JSON.stringify({
          url: url,
          type: "URL_UPDATED"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
      }

      const data = await response.json();
      console.log(`Response from API for ${url}:`, data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
});
