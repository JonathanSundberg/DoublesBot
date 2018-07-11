const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./auth.json");
const fs = require("fs");


client.on("ready", () => {
  console.log("I am ready!");
});

var participants = ["","","",""];
var participantsUsername = ["","","",""]
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
    message.channel.send("!prefix [insert new prefix]   - Changes the command prefix (defualt '!')"
    "Current prefix: " + config.prefix +
    "!queue / !q       - Puts you in queue for doubles!"
    "!leavequeue / !lq - Leaves the queue "
    "!viewqueue / !vq  - Views who is in the doubles queue "
    "Created by Ltn");
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
    participantsUsername[tracker] = message.author.username;
    tracker++;
    if (tracker<4)
    {
      message.channel.send( message.author.username + " has joined the doubles queue!");
    }
    else
    {
      message.channel.send("You are now a full team!");
      for (var i = 0; i < participants.length; i++)
       {
        message.channel.send("<@" + participants[i] + ">");
        participants[i] = "";
        participantsUsername[i] = "";
        tracker = 0;
      }

    }

  }
  else if (command === "leavequeue" || command === "lq" )
  {
    for (var i = 0; i < participants.length; i++)
    {
      if (participants[i] === message.author.id)
       {
        if (i === tracker-1)
         {
          participants[i] = "";
          participantsUsername[i] ="";
          tracker--;
          message.channel.send(message.author.username + " has been removed from the doubles queue!");
          return;
         }
         else if(i < tracker-1)
         {
           participants[i] = participants[tracker-1];
           participantsUsername[i] = participantsUsername[tracker-1];
           participants[tracker-1] = "";
           participantsUsername[tracker-1] = "";
           tracker--;
           message.channel.send(message.author.username + " has been removed from the doubles queue!");
           return;
         }
       }
    }
    message.channel.send("No such user is in the queue...");
  }

  else if (command === "viewqueue" || command == "vq") {
    message.channel.send("These people are queued: ")
    for (var i = 0; i < tracker; i++) {
      message.channel.send(participantsUsername[i]);
    }
}

  else if (command === "ping") {
    message.channel.send("pong!");
  }

  else if (command == "foo") {
    message.channel.send("bar!");
  }

});

client.login(process.env.token).catch(err => console.log(err));
