module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝐒𝐨𝐫𝐫𝐲 एडमिन नीलम राय इसे दुबारा 𝐀𝐝𝐝 नहीं कर पाया 🥺 ${name} ग्रुप मे :( `, event.threadID)
   } else api.sendMessage(`मेरे एडमिन नीलम राय के 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 के बिना भाग नहीं सकते 😂, ${name} बेबी , देखो फिर से 𝐀𝐝𝐝 कर दिया आपको`, event.threadID);
  })
 }
}
