const fetch = require('node-fetch');

const apiKey = 'YOUR_API_KEY'; // Replace with your Adopt a Pet API key
const petListingUrl = 'https://api.adoptapet.com/v1/pets?key=' + apiKey;

fetch(petListingUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Adoptable Pets:', data);
  })
  .catch(error => {
    console.error('Error fetching pet data:', error);
  });