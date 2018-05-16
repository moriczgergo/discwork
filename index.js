var Discord = require('discord.js')

/**
 * This callback handles messages from Discord.
 * @callback messageCallback
 * @param {string[]} matches The matches of the message's regex.
 * @param {Discord.Message} message The message object from Discord.js
 */

/**
 * Command object used internally.
 * @typedef {Object} command
 * @property {RegExp} regex The command's regex.
 * @property {messageCallback} action The command's callback.
 */

/**
 * Main discwork objext returned by init.
 * @typedef {Object} discwork
 * @property {function} add
 * @property {function} done
 * @property {command} commands
 * @property {Discord.Client} client
 */

/**
 * Add a new command.
 * @param {RegExp} regex The command's regex.
 * @callback {messageCallback} The callback that handles the message.
 */
function add (regex, action) {
  if (!(regex instanceof RegExp)) {
    throw new Error('Passed regex is not an instance of RegExp.')
  }

  this.commands.push({
    regex,
    action
  })
}

/**
 * Finish command list.
 */
function done () {
  this.client.on('message', function (message) {
    this.commands.some(function (cmd) {
      var matches = message.content.match(cmd.regex)
      if (matches) {
        cmd.action(message, matches)
        return true
      } else return false
    })
  }.bind(this))
}

/**
 * Initializes a discwork instance.
 * @param {Discord.Client} client Your discord.js client.
 * @returns {discwork} The main discwork object.
 */
function init (client) {
  if (!(client instanceof Discord.Client)) {
    throw new Error('The client needs to be a discord.js client.')
  }

  return {
    client,
    commands: [],
    add,
    done
  }
}

module.exports = init
