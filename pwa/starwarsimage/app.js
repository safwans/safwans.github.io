// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '.' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

// function for loading each image via XHR

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

function fetchImage(imgURL) {
  // TODO 3c
  fetch(imgURL)
  .then(validateResponse)
  .then(readResponseAsBlob)
  .then(showImage)
  .then(logResult)
  .catch(logResult);
}


function showImage(responseAsBlob) {
  var myImage = document.createElement('img');
  var imageURL = window.URL.createObjectURL(responseAsBlob);
  myImage.src = imageURL;
  imgSection.appendChild(myImage);
}
function validateResponse(response){
  if (!response.ok){
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsBlob(response) {
  return response.blob();
}

function logResult(result) {
  console.log(result);
}

var imgSection = document.querySelector('section');

window.onload = function() {

  // load each set of image, alt text, name and caption
  for(var i = 0; i<=Gallery.images.length-1; i++) {
      fetchImage(Gallery.images[i].url);
  }
};
