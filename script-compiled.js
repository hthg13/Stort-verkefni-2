'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoRentSite = function () {
  function VideoRentSite() {
    _classCallCheck(this, VideoRentSite);

    // this.keyName = 'videos';
    this.container = document.querySelector('.videos');
  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */


  _createClass(VideoRentSite, [{
    key: 'load',
    value: function load() {}

    /* sér um að littli kassinn sem er með lengd myndbandsins sé
     * settur rétt inn, fær inn lengdina í sekúndum og skilar
     * á forminu mín:sek */
    /* þetta fall er á mjög miklu tilraunarstigi */

  }, {
    key: 'videoLength',
    value: function videoLength(duration) {
      if (duration < 60) {
        if (duration < 10) {
          return '0:0' + duration;
        } else {
          return "0:" + duration;
        }
      } else {
        var min = parseInt(duration / 60);
        var sec = duration - min * 60;
        if (sec < 10) {
          sec = "0" + sec;
        }
        return min + ":" + sec;
      }
    }

    /* sér um að það sé rétt lengd frá því myndbandið var birt.
       *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
       *langt er síðan myndbandið var birt */

  }, {
    key: 'sincePosted',
    value: function sincePosted(made) {
      /* þarf að setja betur upp en þetta er svona í grófum dráttum
       * gæti verið að við gætum notað const */
      var current = new Date().getTime();
      var created = current - made;
      var sec = created / 1000;
      var min = sec / 60;
      var klst = min / 60;
      var day = klst / 24;
      var week = void 0;
      var month = void 0;
      var year = void 0;

      /* ef meira en 365 dagar síðan "created" */
      if (day >= 365) {
        year = parseInt(day / 365);
        if (year === 1) {
          return 'Fyrir ' + year + ' ári síðan';
        } else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      } else if (day >= 30) {
        month = parseInt(day / 30);
        if (month === 1) {
          return 'Fyrir ' + month + ' mánuði síðan';
        } else {
          return 'Fyrir ' + month + ' mánuðum síðan';
        }
      } else if (day >= 7) {
        week = parseInt(day / 7);
        if (week === 1) {
          return 'Fyrir ' + week + ' viku síðan';
        } else {
          return 'Fyrir ' + week + ' vikum síðan';
        }
      } else if (klst >= 24) {
        day = parseInt(day);
        if (day === 1) {
          return 'Fyrir ' + day + ' degi síðan';
        } else {
          return 'Fyrir ' + day + ' dögum síðan';
        }
      }
      /*  const klst = Math.floor((sec - day) / (60 * 60));
        const klstString = klst === 1 ? 'klukkustund' : 'klukkustundum';
        return 'Fyrir $(klst) $(klstString) síðan';
         else {
          klst = parseInt(klst);
          if (klst === 1){
            return 'Fyrir ' + klst + ' klukkustund síðan';
          }
          else {
            return 'Fyrir ' + klst + ' klukkustundum síðan';
          } */
    }
  }, {
    key: 'createVideolist',
    value: function createVideolist(data) {
      var categories = data.categories;
      var videos = data.videos;

      for (var i = 0; i < categories.length; i++) {
        console.log('****************TELJARIII****************');
        var cats = categories[i];
        var VideoContainer = document.getElementById(i);
        var heading = document.createElement('h2');

        heading.appendChild(document.createTextNode(categories[i]['title']));
        VideoContainer.appendChild(heading);
        this.createCategorylist(VideoContainer, cats, videos);
      }
    }
  }, {
    key: 'createCategorylist',
    value: function createCategorylist(VideoContainer, cats, videos) {
      for (var i = 0; i <= cats.videos.length - 1; i++) {
        console.log('*************', [i + 1], '*************');
        var id = cats.videos[i];
        var col = document.createElement('div'); //fast
        col.classList.add('cardlist__col');
        var videlement = this.createVideoElement(col, videos[id - 1]['poster'], videos[id - 1]['video'], videos[id - 1]['title'], videos[id - 1]['created'], videos[id - 1]['duration'], videos[id - 1]['id']);
        VideoContainer.appendChild(col);
      }
    }
  }, {
    key: 'createVideoElement',
    value: function createVideoElement(col, poster, video, title, posted, duration, id) {
      console.log('poster', poster);
      console.log('video', video);
      console.log('title', title);
      console.log('posted', posted);
      console.log('duration', duration);
      console.log('id', id);
      var card = document.createElement('div');
      var cardContent = document.createElement('div');
      var aElement = document.createElement('a');
      var cardImg = document.createElement('img');
      var cardHeading = document.createElement('h3');
      var since = document.createElement('p');
      var length = document.createElement('p');
      col.classList.add('cardlist__col');
      card.classList.add('card');
      aElement.setAttribute('href', 'site.html');
      aElement.classList.add('card__imgCont');
      cardImg.classList.add('card__img');
      cardImg.setAttribute('src', poster);
      cardContent.classList.add('cardContent');
      since.classList.add('cardText');
      length.classList.add('time');
      cardHeading.appendChild(document.createTextNode(title));
      since.appendChild(document.createTextNode(this.sincePosted(posted)));
      length.appendChild(document.createTextNode(this.videoLength(duration)));
      col.appendChild(card);
      aElement.appendChild(length);
      aElement.appendChild(cardImg);
      card.appendChild(aElement);
      cardContent.appendChild(cardHeading);
      cardContent.appendChild(since);
      card.appendChild(cardContent);
    }
  }, {
    key: 'getId',
    value: function getId(data) {
      var id = data.videos['id'];
      console.log('************ID*****************', id);
      document.images.addEventListener("click", this.WriteId(id), false);
    }
  }, {
    key: 'WriteId',
    value: function WriteId(id) {
      console.log('************ID*****************', id);
    }
  }, {
    key: 'fetchJson',
    value: function fetchJson() {
      var _this = this;

      var json = 'videos.json';
      var r = new XMLHttpRequest();

      r.open('GET', json, true);
      r.onload = function () {
        if (r.status >= 200 && r.status < 400) {
          var data = JSON.parse(r.response);
          console.log(data);
          _this.createVideolist(data);
          _this.getId(data);
        } else {
          console.log('villa!', r);
        }
      };
      r.onerror = function () {
        console.log('villa í tengingu');
      };
      r.send();
    }
  }]);

  return VideoRentSite;
}();

var Player = function () {
  /* hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
   *þarf að vera this. á undan þeim */
  function Player() {
    _classCallCheck(this, Player);

    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /* gætum svo þurft að bæta við add addEventListener á takkana hérna */
  }

  _createClass(Player, [{
    key: 'tempVid',
    value: function tempVid() {
      var vidContainer = document.querySelector('.video');
      var div = document.createElement('div');
      var vid = document.createElement('video');
      var overButton = document.createElement('button');
      var playImg = document.createElement('img');
      vid.classList.add('vid');
      vid.setAttribute('src', '/videos/bunny.mp4');
      vid.setAttribute('type', 'video/mp4');
      overButton.classList.add('display');
      playImg.setAttribute('src', '/img/play.svg');
      overButton.appendChild(playImg);
      overButton.addEventListener('click', this.overlayButton.bind());
      div.appendChild(vid);
      div.appendChild(overButton);
      vidContainer.appendChild(div);
    }
  }, {
    key: 'load',
    value: function load() {
      this.tempVid();
      this.createControls();
      /* það sem valentín gerði á töflunni ;) */
      // const request = new XMLHttpRequest();
      // const qs = new URLSerchParams(window.location.serch);
      // const id = parseInt(qs.get('id'), 10);
      // request.open. ()
      // this.getVideo(); // nær í myndbandið?
    }

    // býr til grunnin að controls

  }, {
    key: 'createControls',
    value: function createControls() {
      var controlContainer = document.querySelector('.video');
      var playingButton = document.createElement('button');
      var forwardButton = document.createElement('button');
      var backButton = document.createElement('button');
      var screenButton = document.createElement('button');
      var soundButton = document.createElement('button');
      var backImg = document.createElement('img');
      var playImg = document.createElement('img');
      var soundImg = document.createElement('img');
      var screenImg = document.createElement('img');
      var forwardImg = document.createElement('img');
      var divCon = document.createElement('div');
      var button = document.createElement('div');
      var aEl = document.createElement('a');
      aEl.setAttribute('href', 'index.html');
      aEl.classList.add('back--button');
      aEl.appendChild(document.createTextNode('Til baka'));
      divCon.classList.add('buttons__container');
      button.classList.add('buttons');
      playingButton.classList.add('pause');
      forwardButton.classList.add('forward');
      backButton.classList.add('back');
      soundButton.classList.add('unmute');
      screenButton.classList.add('normalSize'); // þegar myndbandið er venjulegt
      soundButton.appendChild(soundImg);
      playingButton.appendChild(playImg);
      forwardButton.appendChild(forwardImg);
      backButton.appendChild(backImg);
      screenButton.appendChild(screenImg);
      soundImg.setAttribute('src', '/img/mute.svg');
      soundImg.classList.add('button');
      playImg.setAttribute('src', '/img/play.svg');
      playImg.classList.add('button');
      forwardImg.setAttribute('src', '/img/next.svg');
      forwardImg.classList.add('button');
      backImg.setAttribute('src', '/img/back.svg');
      backImg.classList.add('button');
      screenImg.setAttribute('src', '/img/fullscreen.svg');
      screenImg.classList.add('button');
      button.appendChild(backButton);
      button.appendChild(playingButton);
      button.appendChild(soundButton);
      button.appendChild(screenButton);
      button.appendChild(forwardButton);
      divCon.appendChild(button);
      controlContainer.appendChild(divCon);
      controlContainer.appendChild(aEl);
      playingButton.addEventListener('click', this.playPause.bind());
      forwardButton.addEventListener('click', this.skip.bind(3));
      backButton.addEventListener('click', this.skip.bind(-3));
      screenButton.addEventListener('click', this.fullscreen.bind());
      soundButton.addEventListener('click', this.sound.bind());
    }
  }, {
    key: 'overlayButton',
    value: function overlayButton() {
      var vid = document.querySelector('.vid');
      if (document.querySelector('.display')) {
        vid.play();
        var dis = document.querySelector('.display');
        dis.classList.remove('display');
        dis.classList.add('none');
      } else {
        vid.pause();
        var none = document.querySelector('.none');
        none.classList.remove('none');
        none.classList.add('display');
      }
      return;
    }

    // spólar framm og til baka

  }, {
    key: 'skip',
    value: function skip(value) {
      var vid = document.querySelector('.vid'); // klasinn sem þarf til þess að við vitum hvaða mynd
      var time = vid.currentTime;
      if (time < 3) {
        vid.currentTime += value;
      }
    }

    // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið

  }, {
    key: 'sound',
    value: function sound() {
      var video = document.querySelector('.vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
      if (document.querySelector('.mute')) {
        video.muted = false;
        var mute = document.querySelector('.mute');
        mute.classList.remove('mute');
        mute.classList.add('unmute');
        mute.firstChild.removeAttribute('src');
        mute.firstChild.setAttribute('src', '/img/mute.svg');
      } else {
        video.muted = true;
        var unmute = document.querySelector('.unmute');
        unmute.classList.remove('unmute');
        unmute.classList.add('mute');
        unmute.firstChild.removeAttribute('src');
        unmute.firstChild.setAttribute('src', '/img/unmute.svg');
      }
    }

    // gerir skjáinn annaðhvort fullscreen eða tekur það af

  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      var vid = document.querySelector('.vid');
      var rfs = vid.requestFullscreen || vid.webkitRequestFullScreen || vid.mozRequestFullScreen || vid.msRequestFullscreen;
      rfs.call(vid);
    }

    /* fær inn id af myndbandi og annaðhvort byrjar að spila það
     * eða setur það á pásu. Ætti líklega líka að breyta play takkanum
     * í pause takka og öfugt */

  }, {
    key: 'playPause',
    value: function playPause() {
      var vid = document.querySelector('.vid'); // klasinn sem þarf til þess að við vitum hvaða myndband er verið að tala um
      if (vid.paused) {
        vid.play();
        var play = document.querySelector('.pause');
        play.classList.remove('pause');
        play.classList.add('play');
        play.firstChild.removeAttribute('src');
        play.firstChild.setAttribute('src', '/img/pause.svg');
      } else {
        vid.pause();
        var pause = document.querySelector('.play');
        pause.classList.remove('play');
        pause.classList.add('pause');
        pause.firstChild.removeAttribute('src');
        pause.firstChild.setAttribute('src', '/img/play.svg');
      }
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var VideoSite = new VideoRentSite();
  var player = new Player();
  VideoSite.fetchJson();
  var findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});

//# sourceMappingURL=script-compiled.js.map