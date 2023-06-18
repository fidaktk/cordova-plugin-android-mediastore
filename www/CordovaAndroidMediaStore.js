/*global cordova, module*/

module.exports = (function() {
  function callPromise(name) {
    return function(...params) {
      return new Promise((resolve, reject) =>
        cordova.exec(resolve, reject, 'CordovaAndroidMediaStore', this.name, params)
      );
    }.bind({ name });
  }

  let exports = {};

  [
    'selectFolder',
    'selectFile',
    'openFolder',
    'openFile',
    'readFile',
    'writeFile',
    'overwriteFile',
    'saveFile',
    'deleteFile',
    'getFileName',
    'getUri'
  ].forEach(action => (exports[action] = callPromise(action)));

  exports.store = function(byteString, fileDir, fileName, type) {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, 'CordovaAndroidMediaStore', 'store', [
        byteString,
        fileDir,
        fileName,
        type
      ])
    );
  };

  return exports;
})();
