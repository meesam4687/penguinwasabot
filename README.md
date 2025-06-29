# Penguin
Penguin the Discord Bot<br>
<h3>Things it can do</h3>
<ul>
  <li>Play Music</li>
  <li>Generate Memes (few)</li>
  <li>Get a Ranom Meme from Reddit</li>
</ul>
...and much more

# How to host
**Make sure [NodeJS](https://nodejs.org/en/download/) is installed on your computer**<br>
First run this command
```sh
npm install
```
Make sure [Lavalink](https://lavalink.dev/) is running and configured for `ytsearch:` to work.

Then create a file called ```.env``` and enter the following (replace your_token with your bots token and your_id with your bots id)
```env
TOKEN=your_token
CLIENT_ID=your_id
LAVAHOST=127.0.0.1
LAVAPORT=2333
LAVAPASSWORD=your_lavalink_password
```
Now run 
```sh
npm start
```
The Bot Should Get Online
