import { google } from 'googleapis';
import dotenv from 'dotenv'
dotenv.config()

/* Auth credentials */
const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URL
} = process.env

/* Creating a global google auth client */
export const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URL,
);

/* Creating an authorized global gmail client auth */ 
export const gmail = new google.gmail({
  version: 'v1',
  auth: oAuth2Client
});
