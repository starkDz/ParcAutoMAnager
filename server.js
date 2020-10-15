const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const cors = require('cors');
connectDB();
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/chauffeur', require('./routes/api/chauffeur'));
app.use('/api/vehicule', require('./routes/api/vehicule'));
app.use('/api/couleur', require('./routes/api/couleur'));
app.use('/api/categorie', require('./routes/api/categorie'));
app.use('/api/carburant', require('./routes/api/carburant'));
app.use('/api/marque', require('./routes/api/marque'));
app.use('/api/statistics', require('./routes/api/statistics'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Serve started on port ' + PORT));
