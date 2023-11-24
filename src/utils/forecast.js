const request = require("request");

const forecast = (address, callback) => {
  const url = "https://65164b8609e3260018c99e80.mockapi.io/QuanLyPhim";
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
