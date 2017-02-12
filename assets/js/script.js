$(document).ready(function(){

  $('#place-search').click(function() {
    clearRecommendations();
    showSearchResults();
  });

  searchCityCode();

  function clearRecommendations() {
    $("#recommended-places").empty();
  }

  function showSearchResults() {
    var date, time, pay, name, line;

    var busInfoArray = [
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

  ]
  for(var index=0; index<busInfoArray.length;index++) {
     $(".bus-stop-list").append(`<a class="bus-stop" href="./stopinfo/`+ (index + 1) +`">
         <div class="time-area">
             <span class="time">` + busInfoArray[index].departureTime + `</span>
             <span class="time">` + busInfoArray[index].arrivalTime + `</span>
         </div>
         <div class="name-area">
             <span class="name">` + busInfoArray[index].objective + `</span>
             <span class="line">` + busInfoArray[index].recommendationLine + `</span>
             <span class="transfer">乗り換え：<span class="num">1</span>回</span>
             <span class="fare">合計金額：<span class="num">` + busInfoArray[index].sumOfPay + `</span>円</span>
         </div>
         <div class="else-area">
             <div class="thumbnail">
                 <img src="./assets/assets/images/bus-stop/02.jpg" alt="">
             </div>
         </div>
     </a>`);

   }

  }




  function appendRecommendedPlaces(localSpotsList) {
    var recommendedPlaces = localSpotsList;
    for (var index = 0; index < recommendedPlaces.length; index++){
      $("#recommended-places").append(`<a class="spot col col-xs-12 col-sm-6 col-md-4" href="./index.html">
          <div class="img">
              <img src="` + recommendedPlaces[index].img + `" alt="">
          </div>
          <div class="content">
              <span class="name">` + recommendedPlaces[index].name + `</span>
              <span class="place">` + recommendedPlaces[index].place + `</span>
          </div>
      </a>`);
    }

  }

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
          localSpotsList = createLocalSpotObjects(result.result.cities);
          console.log(localSpotsList);
          appendRecommendedPlaces(localSpotsList);
        }
      });
  }

  function createLocalSpotObjects(result) {
    var localSpotsObjects = [];
    for(var index = 0; index < result.length; index++) {
      localSpotsObjects.push({
        name: result[index].placeName,
        place: "那覇市",
        img: "./assets/assets/images/spot/0" + (index + 1) + ".jpg"
      });
      //getPhotoOfLocation(result[index].lat, result[index].lng);
    }
    return localSpotsObjects;
  }

  function getPhotoOfLocation(lat, lon) {
    const APIKEY = "AIzaSyB6fdzCM_HlBDacFwkuGoqeWrpfWsjvVn0";
    var url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=" + lat + "," + lon + "&radius=5000&type=museum&key=" + APIKEY;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        url: url,
        success: function(result) {
          console.log(JSON.stringify(result));
        },
        error: function(result) {
          console.log(JSON.stringify(result));
        }
      });
  }


});
