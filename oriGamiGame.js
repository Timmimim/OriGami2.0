var app = angular.module("oriGamiGame", ['leaflet-directive','ui.bootstrap']);

app.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: "navbar.html"
  }
});

app.controller("NavigationController", [ "$scope", function($scope) {
  console.log("Create navigation controller");
  $scope.navbarCollapsed = true;
  $scope.dropdownCollapsed = true;

  $scope.items = [
    'OpenStreetMap',
    'Streets',
    'Topographic',
    'Satellite'
  ];

  $scope.setLayer = function (layerName) {
    if (layerName==$scope.items[0]) {
      $scope.layers.baselayers.osm.top = true
      $scope.layers.baselayers.streets.top = false
      $scope.layers.baselayers.topographic.top = false
      $scope.layers.baselayers.satellite.top = false
    } else if (layerName==$scope.items[1]) {
      $scope.layers.baselayers.osm.top = false
      $scope.layers.baselayers.streets.top = true
      $scope.layers.baselayers.topographic.top = false
      $scope.layers.baselayers.satellite.top = false
    } else if (layerName==$scope.items[2]) {
      $scope.layers.baselayers.osm.top = false
      $scope.layers.baselayers.streets.top = false
      $scope.layers.baselayers.topographic.top = true
      $scope.layers.baselayers.satellite.top = false
    } else if (layerName==$scope.items[3]) {
      $scope.layers.baselayers.osm.top = false
      $scope.layers.baselayers.streets.top = false
      $scope.layers.baselayers.topographic.top = false
      $scope.layers.baselayers.satellite.top = true
    }
  }

}]);


app.controller("MapController", [ "$scope", function($scope, $http) {
  console.log("Create map controller");
  angular.extend($scope, {
    // Center the map
    center: {
      autoDiscover: true,
      zoom: 8
    },
    defaults: {
      lat: 52,
      lng: 7,
      zoom: 6
    },
    paths: {
      userPos: {
        type: 'circleMarker',
        color: '#2E64FE',
        weight: 2,
        radius: 1,
        opacity: 0.0,
        clickable : false,
        latlngs: {lat: 52, lng: 7}
      }
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz',
          top: true,
          layerOptions: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            continuousWorld: false
          }
        },
        streets: {
          name: 'Streets',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          type: 'xyz',
          top: false,
          layerOptions: {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            continuousWorld: false
          }
        },
        topographic: {
          name: 'Topographic',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          type: 'xyz',
          top: false,
          layerOptions: {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            continuousWorld: false
          }
        },
        satellite: {
          name: 'Satellite',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          type: 'xyz',
          top: false,
          layerOptions: {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            continuousWorld: false
          }
        }
      }
    }
  });
}]);

app.controller("GeoCtrl", function($scope, $window){

  $window.navigator.geolocation.watchPosition( function(position) {
    $scope.position = position
    console.log(position.coords.latitude+' '+position.coords.longitude);
    // update map
    $scope.$apply(function(){
      $scope.center.lat = $scope.position.coords.latitude
      $scope.center.lng = $scope.position.coords.longitude
      //$scope.center.zoom = 14
      $scope.updateMarker()
    });
  });

  $scope.updateMarker = function() {
    $scope.paths.userPos.latlngs.lat = $scope.position.coords.latitude
    $scope.paths.userPos.latlngs.lng = $scope.position.coords.longitude
    $scope.paths.userPos.opacity = 1.0
    $scope.paths.userPos.radius = $scope.position.coords.accuracy
  }

  $scope.metersToPixels = function(meters) {
    //TODO: implement function
  }

});

    /*
    Geolocation Controller
    get current position with HTML5 Geolocation
    /*
    app.controller('GeolocationController',['$geolocation', '$scope', function ($geolocation, $scope){
    $scope.myPosition = $geolocation.getCurrentPosition({
    timeout: 60000
  }).then(function(position) {
  $scope.myPosition = position;
});
}]);

//watch position

app.controller('GeolocationController',['$geolocation', '$scope' function ($geolocation, $scope){
$geolocation.watchPosition({
timeout: 60000,
maximumAge: 250,
enableHighAccuracy: true
};
$scope.myCoords = $geolocation.position.coords; // this is regularly updated
$scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
}]);
);
*/
