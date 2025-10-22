System.register(["cc"], function (_export, _context) {
  var assetManager;

  return {
    setters: [
      function (cc) {
        assetManager = cc.assetManager;
      },
    ],
    execute: function () {
      assetManager.loadBundle(
        "../shared-resources/cocos-engine/3.8.6/custom-internal",
      );
      console.log(assetManager);
    },
  };
});
