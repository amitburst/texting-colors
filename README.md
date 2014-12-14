# texting-colors

Parses a color string into RGB format to be send to a Spark Core via the Spark Cloud API.

## Usage

Host this server on Heroku or something and make sure to set the `PORT` environment variable to `80`, and the `DEVICE_ID` and `ACCESS_TOKEN` environment variables to match those of your Spark Core and account. The server expects a [CSS color string](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) (keyword, RGB, HSL, HEX, etc.) in the `Body` field to `POST /` (the idea is to set the URL of this server to be hit when an SMS is sent to a phone number given to you by [Twilio](https://www.twilio.com/)). The server parses the given CSS color string into `RRR,GGG,BBB` format and sends it to your Spark Core via the Spark Cloud API at the `/color` endpoint.
