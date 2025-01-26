const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");



const multer = require('multer');

const FormData = require('form-data');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });


const cors = require("cors");

// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow common HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers (Authorization for API keys)
  })
);

const port = process.env.PORT || 3000;

// MongoDB setup
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Meeting schema
const meetingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  conversation: { type: String, required: true },
  attendees: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  additionalInfo: { type: String, default: "" },
});

// Create a text index for the relevant fields
meetingSchema.index({ date:"text" , time:"text", conversation: "text", "attendees.name": "text",additionalInfo:"text" });

// Create the Meeting model after defining the schema
const Meeting = mongoose.model("Meeting", meetingSchema);

// Ensure the index is created when the app starts
Meeting.createIndexes()
  .then(() => console.log("Text index created successfully"))
  .catch((err) => console.error("Error creating text index:", err));

  app.post("/api/search", async (req, res) => {
    const { query } = req.body; // The search query from frontend
  
    try {
      // Step 1: Search the database for relevant meetings
      const searchResults = await searchDatabase(query);
  
      // Step 2: Process the search results using the free LLM (Hugging Face's GPT-2)
      const llmResponse = await queryLLM(searchResults, query);
      console.log("LLM Response1:", llmResponse);
  
      // Send results back to frontend, including both the search results and the LLM response
      res.status(200).json({
        searchResults: searchResults,  // Send search results separately
        llmResponse: llmResponse,      // Send LLM response separately
      });
    } catch (error) {
      console.error("Error processing search query:", error);
      res.status(500).json({ message: "Error processing the search" });
    }
  });
  

  app.post('/api/audio-transcription', upload.single('file'), async (req, res) => {
    const file = req.file;
    
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
  
    try {
      // Prepare the FormData to send the file to GroqCloud API
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path), file.originalname);
      formData.append('model', 'whisper-large-v3');  // GroqCloud model for transcription
      formData.append('response_format', 'json');   // Response format (json)
      
      // Send request to GroqCloud API
      const response = await axios.post(
        'https://api.groq.com/openai/v1/audio/translations',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${process.env.GROQCLOUD_API_KEY}`,
          },
        }
      );
  
      const transcriptionResult = response.data;
  
      console.log('Transcription Result:', transcriptionResult);
  
      // Check if the transcription text is present
      if (!transcriptionResult.text || transcriptionResult.text.trim() === '') {
        return res.status(400).send('No transcription result available');
      }
  
      const meetingData = {
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString(),
        conversation: transcriptionResult.text, // Assuming 'text' contains the transcription
        attendees: [
          { name: 'Random User', email: 'randomuser@example.com' },
        ],
        additionalInfo: 'Transcribed audio from the meeting',
      };
  
      // Save the meeting data to the database
      try {
        const newMeeting = new Meeting(meetingData);
        await newMeeting.save();
        // Send only one response after saving the meeting data
        return res.status(200).json({ transcription: transcriptionResult });
      } catch (dbError) {
        console.error('Database error:', dbError);
        return res.status(500).send('Error saving meeting data to the database');
      }
  
    } catch (error) {
      console.error('Error during audio transcription:', error);
      return res.status(500).send('Error processing audio transcription');
    } finally {
      // Clean up the uploaded file
      fs.unlinkSync(file.path);
    }
  });
  

// Endpoint to handle meeting data
app.post('/api/meetings', async (req, res) => {
  try {
    const meetingData = req.body;

    const newMeeting = new Meeting(meetingData);
    await newMeeting.save();

    res.status(201).json({ message: 'Meeting data saved successfully' });
  } catch (error) {
    console.error('Error saving meeting data:', error);
    res.status(500).json({ message: 'Failed to save meeting data' });
  }
});

// Function to search the database for meetings
const searchDatabase = async (query) => {
  console.log("Search Query:", query); // Log the incoming query to make sure it's correct

  try {
    const results = await Meeting.find({
      $text: { $search: query }, // MongoDB full-text search
    }).limit(1); // Limiting to 5 results

    console.log("Database Search Results:", results); // Log the search results to check if they are correct

    return results.map((meeting) => {
      return {
        date: meeting.date,
        time: meeting.time,
        conversation: meeting.conversation,
        attendees: meeting.attendees,
      };
    });
  } catch (error) {
    console.error("Error querying database:", error); // Log the error for debugging
    throw new Error("Error querying database");
  }
};
const queryLLM = async (meetingData, queryText) => {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const formattedData = meetingData
        .map((meeting) => {
          return `Date: ${meeting.date}\nTime: ${meeting.time}\nAttendees: ${meeting.attendees
            .map((att) => att.name)
            .join(", ")}\nConversation: ${meeting.conversation}\n`;
        })
        .join("\n\n");

      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: `Search query: ${queryText}\n\nRelevant Meeting Information:\n${formattedData}\n\nProvide a summary or answer based on the above information.`
        }
      ];

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions", // Replace with GroqCloud's correct API endpoint
        {
          model: "llama3-8b-8192", // Replace with the appropriate model ID
          messages: messages,
          max_completion_tokens: 150,
          temperature: 1.0,
          stop: ["\n", "stop"]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQCLOUD_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log the entire response object to inspect the structure
      console.log("Full response:", JSON.stringify(response.data, null, 2));

      // Check if the response contains choices and retrieve the first message's content
      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        if (choice.message && choice.message.content && typeof choice.message.content === 'string') {
          return choice.message.content.trim();
        } else {
          throw new Error("No valid message content in the response.");
        }
      } else {
        throw new Error("Response does not contain expected 'choices' field.");
      }
    } catch (error) {
      console.error("Error with LLM query:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 503) {
        console.log(`Server unavailable (503), retrying in ${RETRY_DELAY * (attempt + 1)}ms...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
      } else {
        throw new Error("Failed to process query with LLM");
      }
    }
  }

  throw new Error("Max retries exceeded for LLM query");
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
