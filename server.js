const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];

    try {
        const nasaResponse = await axios.get(`https://images-api.nasa.gov/search?q=${randomPlanet}&media_type=image`);
        const nasaData = nasaResponse.data.collection.items[0].data[0];
        const imageUrl = nasaResponse.data.collection.items[0].links[0].href;

        res.json({
            message: 'File uploaded successfully',
            celestialBody: randomPlanet,
            nasaData: {
                title: nasaData.title,
                description: nasaData.description,
                imageUrl: imageUrl
            }
        });
    } catch (error) {
        console.error('Error fetching NASA data:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const celestialBody = celestialBodies[Math.floor(Math.random() * celestialBodies.length)];
    
    const fileInfo = {
      filename: file.filename,
      originalName: file.originalname,
      celestialBody: celestialBody,
      uploadDate: new Date()
    };
    
    files.push(fileInfo);
    
    const nasaData = await getNASAData(celestialBody);
    
    res.json({ message: 'File uploaded successfully', file: fileInfo, nasaData });
  } catch (error) {
    res.status(500).json({ error: generateSpaceError() });
  }
});

app.get('/files', (req, res) => {
  res.json(files);
});

app.delete('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const index = files.findIndex(file => file.filename === filename);
  
  if (index !== -1) {
    const file = files[index];
    fs.unlink(path.join(__dirname, 'uploads', file.filename), (err) => {
      if (err) {
        return res.status(500).json({ error: generateSpaceError() });
      }
      files.splice(index, 1);
      res.json({ message: 'File deleted successfully' });
    });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

async function getNASAData(celestialBody) {
  try {
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${celestialBody}&media_type=image`);
    const items = response.data.collection.items;
    if (items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      return {
        title: randomItem.data[0].title,
        description: randomItem.data[0].description,
        imageUrl: randomItem.links[0].href
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    return null;
  }
}

function generateSpaceError() {
  const errors = [
    "Houston, we have a problem!",
    "Your file got lost in a black hole.",
    "The space-time continuum disrupted your upload.",
    "Alien interference detected in the upload process."
  ];
  return errors[Math.floor(Math.random() * errors.length)];
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: generateSpaceError() });
});

app.listen(port, () => {
  console.log(`Cosmic File Explorer running at http://localhost:${port}`);
});