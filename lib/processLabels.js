import { google } from 'googleapis';

const gmail = google.gmail({ version: 'v1' });

export default function listLabels() {
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const { labels } = res.data;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name} : ${label.id}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}