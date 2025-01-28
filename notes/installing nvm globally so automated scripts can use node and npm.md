---
title: installing nvm globally so automated scripts can use node and npm
date: 2024-11-05
tags:
  - node
  - scripting
---
I like to make things automatic, and happen without me being there.

I also like to use things people have made using Node and `npm`.

I also like to use [`nvm`](https://github.com/nvm-sh/nvm) to manage Node versions.

Here is the trouble: using the `npm`  command or using command line scripts installed globally via `npm install -g ...` as a user that is not you.

I am `alifeee`. I would like other users (e.g., `www-data`) to be able to use `npm`, so that I can, say, make a CGI script that changes a file, and then runs `npm run build`. I do this exact thing for <https://github.com/alifeee/simple-calendar>, which uses `yaml` files and an [Eleventy](https://www.11ty.dev/) website to make a simple calendar. Another one is that I want to use `npm` commands in scripts run with <https://github.com/Taitava/obsidian-shellcommands>, which does not run as my current user.

The problem is that the normal way to install `nvm` installs it into your user folder (i.e., `/home/alifeee`), so other users can't use it.

It took me way too long to figure this out (banging my head against `npm`-shaped walls for hours), but I have switched from running the default install script on <https://github.com/nvm-sh/nvm> to now doing this:

```bash
## remove existing nvm/npm installation
rm -rf ~/.nvm
rm -rf ~/.npm
nano ~/.bashrc # (remove nvm sections)
# install nvm to folder
mkdir -p /usr/alifeee/.nvm
export XDG_CONFIG_HOME="/usr/alifeee"
export NVM_DIR=/usr/alifeee/.nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# install npm version you want
nvm install 20
nvm use 20
```

Then, I can use `nvm` because it's sourced in my `~/.bashrc` (as before), but importantly, any user can use `npm` and Node by running:

```bash
## safe (same way it's done in .bashrc - check if the file exists)
export NVM_DIR="/usr/alifeee/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; nvm use 20; npm --version
## less 'safe' but works fine
source /usr/alifeee/.nvm/nvm.sh && nvm use 20 && npm -v
```

And now, I am free.
