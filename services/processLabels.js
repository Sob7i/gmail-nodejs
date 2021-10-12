import { google } from 'googleapis';

const gmail = google.gmail({ version: 'v1' });
export const getLabels = async () => {
  try {
    const res = await gmail.users.labels.list({
      userId: 'me'
    })
    const { lables } = res.data;

    return lables
  } catch (error) {
    return console.log(`Error fetching lebels: ${error}`)
  }
}
export const getLabelsId = (lables) => (lables ?? [])
  .map(lable => lable.id)
