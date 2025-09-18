const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const dayjs = require('dayjs');

const app = express();
const PORT = process.env.PORT || 3334;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body) console.log('Body:', req.body);
  next();
});

// Rotas
app.get('/api/schedules', async (req, res) => {
  try {
    const db = await connect();
    const collection = db.collection('schedules');
    const { when_like } = req.query;

    let schedules = [];
    if (when_like) {
      // Busca por data exata
      const startDate = dayjs(when_like).startOf('day');
      const endDate = dayjs(when_like).endOf('day');
      
      schedules = await collection.find({
        when: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString()
        }
      }).toArray();
    } else {
      schedules = await collection.find({}).toArray();
    }

    console.log('Found schedules:', schedules);
    res.json(schedules);
  } catch (error) {
    console.error('Error reading schedules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/schedules', async (req, res) => {
  try {
    const db = await connect();
    const collection = db.collection('schedules');
    
    const newSchedule = {
      id: Date.now().toString(),
      ...req.body
    };
    
    await collection.insertOne(newSchedule);
    console.log('Created schedule:', newSchedule);
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/schedules/:id', async (req, res) => {
  try {
    const db = await connect();
    const collection = db.collection('schedules');
    const { id } = req.params;
    
    const result = await collection.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    console.log('Deleted schedule:', id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const db = await connect();
    const collection = db.collection('schedules');
    const count = await collection.countDocuments();
    res.json({ status: 'ok', schedules: count });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Handler para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Inicia o servidor se não estiver em produção
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
