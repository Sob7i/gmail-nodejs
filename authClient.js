import { google } from 'googleapis';
import dotenv from 'dotenv'
dotenv.config()

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URL
} = process.env

export const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URL,
);

export const gmail = google.gmail({
  version: 'v1',
  auth: oAuth2Client
});
