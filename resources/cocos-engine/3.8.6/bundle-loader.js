System.register(["cc"], function (_export, _context) {
  var assetManager;

  return {
    setters: [
      function (cc) {
        assetManager = cc.assetManager;
      },
    ],
    execute: function () {
      console.log(assetManager);
    },
  };
});
