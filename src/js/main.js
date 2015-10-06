require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular");

var app = angular.module("prep-recruits", []);

app.controller("PrepController", ["$scope", function($scope) {
  $scope.recruits = prepData;

  $scope.headers = [
    { title: "Name", short: "last" },
    { title: "Position", short: "position" },
    { title: "School", short: "school" },
    { title: "Commitment", short: "commitment" },
    { title: "Offers", short: "offers" },
    { title: "Ranking", short: "rivals" }
  ];

  $scope.selected = $scope.headers[0];
  $scope.sortOrder = -1;

  $scope.sortTable = function(header) {
    if (header.short == "offers") return;

    if ($scope.selected == header) {
      $scope.sortOrder *= -1;
    } else {
      $scope.selected = header;
      $scope.sortOrder = 1;
    }

    $scope.recruits.sort(function(a, b) {
      a = a[header.short] || ( header.short == "rivals" ? 999999999 : "ZZZZZZZZZZ" );
      b = b[header.short] || ( header.short == "rivals" ? 999999999 : "ZZZZZZZZZZ" );

      if (a > b) {
        return 1 * $scope.sortOrder;
      } else if (a < b) {
        return -1 * $scope.sortOrder;
      } else if (a == b) {
        return 0;
      }
    });
  };
  $scope.sortTable($scope.selected);
}]);

var Share = require("share");
new Share(".share-bottom", {
  ui: {
    flyout: "top left"
  }
});
