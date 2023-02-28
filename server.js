const express = require('express');
const mongoose = require('mongoose');

// create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded());

// connect to MongoDB
mongoose.connect("mongodb+srv://gupta:gupta@instadb.8wnebub.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>console.log("DB is connected....")
)
app.listen(5000,()=>console.log("server is running..."));

// define contact schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
});
const Contact = mongoose.model('Contact', contactSchema);

// create a new contact
app.post('/v1/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list all contacts
app.get('/v1/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific contact
app.get('/v1/contacts/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(200).json(contact);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a specific contact
  app.delete('/v1/contacts/:id', async (req, res) => {
    try {
      const result = await Contact.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a specific contact
  app.put('/v1/contacts/:id', async (req, res) => {
    try {
      const result = await Contact.updateOne({ _id: req.params.id }, req.body);
      if (result.nModified === 0) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a specific contact with partial data
  app.patch('/v1/contacts/:id', async (req, res) => {
    try {
      const result = await Contact.updateOne({ _id: req.params.id }, req.body);
      if (result.nModified === 0) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });