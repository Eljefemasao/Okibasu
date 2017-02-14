var app = new Vue({
  el: '#app',
  data: {
    tourismActive: true,
    hotelsActive: false,
    restaurantsActive: false,
    tabStatuses: {
      'tourism': { tourism: true, hotels: false, restaurants: false },
      'hotels': { tourism: false, hotels: true, restaurants: false },
      'restaurants': { tourism: false, hotels: false, restaurants: true }
    },
    locationSearched: false,
    currentRecommendedSites: [],
    busInfoArray: [
      { departureTime: "11:15",
        arrivalTime: "12:55",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "琉球バス [25]"
      },
      { departureTime: "13:25",
        arrivalTime: "14:12",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "琉球バス [25]"
      },
      { departureTime: "14:11",
        arrivalTime: "15:28",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "琉球バス [25]"
      }
    ],
    namiInfoArray: [
      { departureTime: "11:15",
        arrivalTime: "11:28",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "沖縄バス [120]名護西空港線 名護バスターミナル行"
      },
      { departureTime: "11:15",
        arrivalTime: "11:28",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "沖縄バス [120]名護西空港線 名護バスターミナル行"
      },
      { departureTime: "11:15",
        arrivalTime: "11:28",
        sumOfPay: "1,180",
        objective: "貨物ターミナル前（那覇空港）",
        recommendationLine: "沖縄バス [120]名護西空港線 名護バスターミナル行"
      }
    ],
    recommendedSpots: {
      "tourism": [],
      "restaurants": [
        {
          img: "./assets/images/restaurant/01.jpg",
          name: "首里そば",
          place:　"〒903-0813 Okinawa-ken, Naha-shi, 首里赤田町Shuriakatachō, 1 Chome−7"
        },
        {
          img: "./assets/images/restaurant/02.jpg",
          name: "琉球料理赤田風",
          place:　"1 Chome-1-37 Shuriakatachō, Naha-shi, Okinawa-ken 903-0813"
        }
      ],
      "hotels": [
        {
          img: "./assets/images/hotel/01.jpg",
          name: "沖縄ホテル",
          place:　"1 Chome-1-37 Shuriakatachō, Naha-shi, Okinawa-ken 903-0813"
        }
      ]
    }
  },
  created: function() {
    searchCityCode();
  },
  methods: {
    toggleSitesTab: function(tabClicked) {
      if(this.locationSearched == true){
        this.locationSearched = false;
      }
      var tabStatus = this.tabStatuses[tabClicked];

      this.tourismActive = tabStatus.tourism;
      this.hotelsActive = tabStatus.hotels;
      this.restaurantsActive = tabStatus.restaurants;

      this.currentRecommendedSites = this.recommendedSpots[tabClicked];
    },
    searchLocation: function() {
      this.locationSearched = !this.locationSearched;
    },
    recommendedSpotSelected: function() {
      this.searchLocation();
    },

  }
})

function searchCityCode() {
  var city = "那覇市"
  var cityList;
  var cityCode
  $.ajax({
      type: "GET",
      beforeSend: function(request) {
        request.setRequestHeader("X-API-KEY", "A7unKhX9cxZIQJaJlQdRRhWgYbP0K8xmy1ncdX74");
      },
      url: "https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=47",
      success: function(msg) {
        cityList = msg.result;
        cityCode = $.grep(cityList, function(e){ return e.cityName == city; })[0].cityCode;
        searchLocalSpots(cityCode)
      }
    });
}

function searchLocalSpots(cityCode) {
  var localSpotsList;
  $.ajax({
      type: "GET",
      beforeSend: function(request) {
        request.setRequestHeader("X-API-KEY", "A7unKhX9cxZIQJaJlQdRRhWgYbP0K8xmy1ncdX74");
      },
      url: "https://opendata.resas-portal.go.jp/api/v1/partner/nightley/places?targetType=2&cityCode=" + cityCode + "&year=2016&seasonCode=1&periodOfTime=1",
      success: function(result) {
        app.recommendedSpots["tourism"] = createLocalSpotObjects(result.result.cities);
        app.currentRecommendedSites = app.recommendedSpots["tourism"];
      }
    });
}

function createLocalSpotObjects(result) {
  var localSpotsObjects = [];
  for(var index = 0; index < result.length; index++) {
    localSpotsObjects.push({
      name: result[index].placeName,
      place: "那覇市",
      img: "./assets/images/spot/0" + (index + 1) + ".jpg"
    });
  }
  return localSpotsObjects;
}
