# discwork [![npm](https://img.shields.io/npm/v/discwork.svg)](https://www.npmjs.com/package/discwork) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
💿 A Discord.js command framework. 🛠

## Setup
The following will install discwork and Discord.js:
```
npm i -s discwork discord.js
```

For additional packages of Discord.js, see the [Discord.js Installation page](https://discord.js.org/#/docs/main/stable/general/welcome?scrollTo=installation).

## Usage

```js
const Discord = require('discord.js')
const client = new Discord.Client()

var discwork = require('discwork')(client)

client.on('ready', () => {
  console.log(`MyBot logged in as ${client.user.tag}!`);
})

discwork.add(/^mb!ping$/, (message, matches) => { // Simple command
  message.reply(`${client.ping}ms`)
})

discwork.add(/^mb!echo (.+)$/, (message, matches) => { // Command with parameters
  message.reply(matches[1]) // Get first parameter (0th element of array is the full command text)
})

discwork.done()

client.login('token')
```

## Documentation

### .add

Adds a command.

#### Parameters

 * regex - The command RegExp
 * action - The command handler function

#### Example

```js
discwork.add(/^mb!ping$/, (message, matches) => {
  message.reply(`${client.ping}ms`)
})
```

### .done

Finishes the command list. Must be called after all commands were added.

#### Example

```js
discwork.done()
```
