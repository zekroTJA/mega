<p align="center">
  <img src="https://github.com/zekroTJA/mega/blob/master/public/images/Unbenannt.png?raw=true">
</p>

A ~~mini~~ mega URL ~~shortener~~ biggener which I did as a project for fun.

As you can see, this is a fork of rmcproductions' [mini](https://github.com/rmcproductions/mini) project, because who needs short links when you can have massively thick, heavy, fat links with a length of around 2k characters?

I mean, what is this?  
![](https://i.zekro.de/Discord_okIscHED18.png)

When you can have such a thick beauty.  
![](https://i.zekro.de/Discord_8r2pEcXCUS.png)

## How to set up

1. Clone or download the repo.
2. Run `npm i` in the repo folder.
3. Change the config to your needs (see section below).
4. Run `node bin/www` and enjoy!

Or use the provided Dockerfile.

## Config

Alter the values in the config.json. These are the options you can set:

- `baseURL`: The URL the redirection will be performed on. Must have a trailing `/`.
- `appPort`: THe port the content will be served on. Default is `8151`
- `cooldown`: Per-IP Cooldown for generating links in seconds. Default is `60`, that means an IP is allowed one request within 60 seconds.
- `expiration`: For how long a link will be kept. Default is `24` Hours.
- `redis.host`: Redis hostname.
- `redis.port`: Redis port.
- `redis.db`: Database index.
- `redis.password`: Database password.
