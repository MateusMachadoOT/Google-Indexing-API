import fetch from 'node-fetch';
import { google } from 'googleapis';
import key from './PATH/TO/YOUR/KEY.json' assert { type: 'json' };

const targetUrl = "YOUR URL HERE";

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.error('Error making request to generate access token:', err);
    return;
  } 

  const url = `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from API:", data);
  } catch (error) {
    console.error("Request failed:", error);
  }
});
