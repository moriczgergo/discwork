var Discord = require('discord.js')

function add (regex, action) {
  if (Array.isArray(regex)) {
    regex.forEach(function(r) {
      if (!(r instanceof RegExp)) {
        throw new Error('Passed regex is not an instance of RegExp.')
      }
    
      this.commands.push({
        regex: r,
        action
      })
    }.bind(this));
  } else {
    if (!(regex instanceof RegExp)) {
      throw new Error('Passed regex is not an instance of RegExp.')
    }
  
    this.commands.push({
      regex,
      action
    })
  }
}

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
