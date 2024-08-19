
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    
    const { sessionId, sender, messageText } = req.body;
  
    
    if (!sessionId || !sender || !messageText) {
      return res.status(400).send("Missing required fields");
    }
  
    
    const messageData = {
      sender: sender,
      messageText: messageText,
      sentAt: admin.firestore.FieldValue.serverTimestamp(), 
      messageType: "text",  
    };
  
    try {
      
      await db.collection("ChatSessions").doc(sessionId)
        .collection("Messages").add(messageData);
  
     
      res.status(200).send("Message added successfully");
    } catch (error) {
     
      res.status(500).send("Error adding message: " + error.message);
    }
  });
  
