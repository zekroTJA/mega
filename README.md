<p align="center">
  <img src="https://github.com/rmcproductions/mini/blob/master/public/images/Unbenannt.png?raw=true">
</p>

A mini URL ~~shortener~~ biggener which I did as a project for fun.

## How to set up
1. Clone or download the repo.
2. Run `npm i` in the repo folder.
3. Change the config to your needs (see section below).
4. Run `node bin/www` and enjoy!

## Config
Alter the values in the config.json. These are the options you can set:
* `baseURL`: The URL the redirection will be performed on. Must have a trailing `/`.
* `appPort`: THe port the content will be served on. Default is `8151`
* `cooldown`: Per-IP Cooldown for generating links in seconds. Default is `60`, that means an IP is allowed one request within 60 seconds.
* `expiration`: For how long a link will be kept. Default is `24` Hours.
