const endpoint =
  "https://www.jsonstore.io/b97cd7794d9fb8026a128bb596be2576eefb69d0dbac8cca897774077796638f";

function getRandom() {
  var randomString =
    Math.random()
      .toString(32)
      .substring(2, 5) +
    Math.random()
      .toString(32)
      .substring(2, 5);
  return randomString;
}

function getURL() {
  var url = document.getElementById("url-input").value;
  var inputValidation =
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("ftp://");
  if (!inputValidation) {
    newURl = `http://${url}`;
    return newURl;
  } else {
    return url;
  }
}

function generateHash() {
  if (window.location.hash === "") {
    window.location.hash = getRandom();
  }
}

function sendRequest(url) {
  this.url = url;
  $.ajax({
    url: `${endpoint}/${window.location.hash.substr(1)}`,
    type: "POST",
    data: JSON.stringify(this.url),
    dataType: "json",
    contentType: "application/json; charset=utf-8"
  });
}

function shortURL() {
  var longURL = getURL();
  generateHash();
  sendRequest(longURL);
}

var hash = window.location.hash.substr(1);
if (window.location.hash !== "") {
  $.getJSON(`${endpoint}/${hash}`, function(data) {
    data = data["result"];
    if (data !== null) {
      window.location.href = data;
    }
  });
}
