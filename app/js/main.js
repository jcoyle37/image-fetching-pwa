if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

var numImgs = 3;

function dlImg(title) {
  var promiseArray = [];

  for(var i=1; i<=numImgs; i++) {
    var imgName = title + i + ".png";

    promiseArray.push(img2base64('img/' + imgName));
  }

  console.log("promise array", promiseArray);
  var promises = Promise.all(promiseArray);

  promises.then(function(res) {
    res.forEach(function(base64img, i) {
      setLocalStorage(title + (i+1), base64img);
    });
    alert("All " + title + " images downloaded.");
  });
}

var img2base64 = function(imgUrl) {
  return new Promise(function (resolve, reject) {
    toDataURL(imgUrl, function(base64data) {
      resolve(base64data);
    });
  });
}

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function showImg(title) {
  var promiseArray = [];

  for(var i=1; i<=numImgs; i++) {
    var imgName = title + i;

    promiseArray.push(localforage.getItem(imgName));
  }

  var promises = Promise.all(promiseArray);

  promises.then(function(res) {
    let numFailed = 0;

    res.forEach(function(base64img, i) {
      if(base64img === null) {
        document.getElementById("imgOutput" + (i+1)).src = "img/error.png";
        numFailed += 1;
      }
      else document.getElementById("imgOutput" + (i+1)).src = base64img;
    });

    if(numFailed > 0) alert("Image set failed for " + numFailed + " images failed. They may need to be downloaded first.");
  });
}

function setLocalStorage(key, value) {
  localforage.setDriver([
    localforage.INDEXEDDB
  ]).then(function() {
    localforage.setItem(key, value, function() {
      console.log('Saved: ' + value + "\nUsing: " + localforage.driver());
    });
  });
}






let deferredPrompt;
var btnAdd = document.getElementById("installBtn");

window.addEventListener('beforeinstallprompt', (e) => {
	console.log("beforeinstallprompt fired", e);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.opacity = .5;
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});