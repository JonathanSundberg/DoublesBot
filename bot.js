const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./auth.json");
const fs = require("fs");


client.on("ready", () => {
  console.log("I am ready!");
});

var participants = ["","","",""];
var tracker = 0;

client.on("message", (message) => {

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

 if (message.content.startsWith(config.prefix + "prefix")) {

    let newPrefix = message.content.split(" ").slice(1,2)[0];
    if (typeof newPrefix === "undefined")
    {
        message.channel.send("You must have a prefix");
        return;
    }
    message.channel.send("New prefix: " + newPrefix);
    config.prefix = newPrefix;

    fs.writeFile("./auth.json",JSON.stringify(config),(err) => console.error);
  }

  if (message.author.id === config.ownerID) {
    // private functions
  }


  if (command === "help")
  {
    message.channel.send("!queue / !q       - Puts you in queue for doubles!");
    message.channel.send("!leavequeue / !lq - Leaves the queue ");
    message.channel.send("!prefix [insert new prefix]   - Changes the command prefix (defualt '!')");
    message.channel.send("Current prefix: " + config.prefix);
    message.channel.send("Created by Ltn");
  }
  else if (command === "queue" || command === "q")
  {
    for (var i = 0; i < participants.length; i++)
    {
      if (participants[i] === message.author.id)
        {
          message.channel.send(message.author.username + " is already queued!");
          return;
        }
    }

    participants[tracker] = message.author.id;
    tracker++;
    if (tracker<2)
    {
      message.channel.send( message.author.username + " have joined the doubles queue!");
    }
    else
    {
      message.channel.send("You are now a full team!");
      for (var i = 0; i < participants.length; i++)
       {
        message.channel.send("<@" + participants[i] + ">");
        participants[i] = "";
      }

    }

  }
  else if (command === "leavequeue" || command === "lq" )
  {
    for (var i = 0; i < participants.length; i++)
    {
      if (participants[i] === message.author.id)
       {
        if (i === tracker)
         {
          participants[i] = "";
          tracker--;
          message.channel.send(message.author.username + " has been removed from the doubles queue!");
          return;
         }
         else
         {
           participants[i] = participants[tracker];
           participants[tracker] = "";
           tracker--;
           message.channel.send(message.author.username + " has been removed from the doubles queue!");
           return;
         }
       }
    }
    message.channel.send("No such user is in the queue...");
  }


  else if (command === "ping") {
    message.channel.send("pong!");
  }

  else if (command == "foo") {
    message.channel.send("bar!");
  }

});

client.login(process.env.token).catch(err => console.log(err));
