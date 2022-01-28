let photosCuriocity = require('./photosCuriocity.json');
let rovers = require('./roverData.json');
// const jsonServer = require('json-server');
// const server = jsonServer.create();

// server.get('/echo', (req, res) => {
//     res.jsonp(req.query)
//   })

module.exports = () => ({
    roverPhotos: photosCuriocity,
    rovers: rovers
})