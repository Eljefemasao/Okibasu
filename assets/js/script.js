$(document).ready(function(){

  $('#place-search').click(function() {
    clearRecommendations();
    showSearchResults();
  });

  appendRecommendedPlaces();

  function clearRecommendations() {
    $("#recommended-places").empty();
  }

  function showSearchResults() {
    $(".bus-stop-list").append(`<a class="bus-stop" href="./bus-stop.html">
        <span class="date">17:32発</span>
        <span class="time">60分</span>
        <span class="pay">合計1,180円</span>
        <span class="name">貨物ターミナル前〔那覇空港〕</span>
        <span class="line">沖縄バス [120]名護西空港線 名護バスターミナル行</span>
    </a>
    <a class="bus-stop" href="./bus-stop.html">
        <span class="date">17:32発</span>
        <span class="time">60分</span>
        <span class="pay">合計1,180円</span>
        <span class="name">貨物ターミナル前〔那覇空港〕</span>
        <span class="line">沖縄バス [120]名護西空港線 名護バスターミナル行</span>
    </a>
    <a class="bus-stop" href="./bus-stop.html">
        <span class="date">17:32発</span>
        <span class="time">60分</span>
        <span class="pay">合計1,180円</span>
        <span class="name">貨物ターミナル前〔那覇空港〕</span>
        <span class="line">沖縄バス [120]名護西空港線 名護バスターミナル行</span>
    </a>`);
  }


  function appendRecommendedPlaces() {
    var recommendedPlaces = [
      { name: "沖縄美ら海水族館",
        place: "沖縄県国頭郡本部町",
        img: "./assets/images/spot/01.jpg",
      },
      { name: "海中道路",
        place: "沖縄県うるま市",
        img: "./assets/images/spot/02.jpg",
      },
      { name: "ガンガラーの谷",
        place: "沖縄県南城市",
        img: "./assets/images/spot/03.jpg",
      },
      { name: "古宇利島",
        place: "沖縄県国頭郡今帰仁村",
        img: "./assets/images/spot/04.jpg",
      },
      { name: "国際通り",
        place: "沖縄県那覇市",
        img: "./assets/images/spot/05.jpg",
      },
      { name: "琉球村",
        place: "沖縄県国頭郡恩納村",
        img: "./assets/images/spot/06.jpg",
      },
      { name: "オリオンハッピーパーク",
        place: "沖縄県名護市",
        img: "./assets/images/spot/07.jpg",
      },
      { name: "首里城公園",
        place: "沖縄県那覇市",
        img: "./assets/images/spot/08.jpg",
      },
      { name: "伊計ビーチ",
        place: "沖縄県うるま市",
        img: "./assets/images/spot/09.jpg",
      },
      { name: "もとぶ元気村",
        place: "沖縄県国頭郡本部町",
        img: "./assets/images/spot/10.jpg",
      },
      { name: "やちむんの里",
        place: "沖縄県中頭郡読谷村",
        img: "./assets/images/spot/11.jpg",
      },
      { name: "真栄田岬",
        place: "沖縄県国頭郡恩納村",
        img: "./assets/images/spot/12.jpg",
      }
    ];

    for (var index = 0; index < recommendedPlaces.length; index++){
      $("#recommended-places").append(`<a class="spot" href="./index.html">
          <img src="` + recommendedPlaces[index].img + `" alt="">
          <div class="content">
              <span class="name">` + recommendedPlaces[index].name + `</span>
              <span class="place">` + recommendedPlaces[index].place + `</span>
          </div>
      </a>`);
    }


  }

});
