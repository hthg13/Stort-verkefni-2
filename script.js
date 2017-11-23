class VideoRentSite {
  /* hérna setjum við inn allar breytur sem þarf að upphasstilla, fer í gang um leið
   * og við notum new */
  constructor() {
    this.keyName = '';
  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */
  load() {

  }

  getJson() {
    const r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function() { //laga þetta!
      if (r.status >= 200 && r.status < 400) {
        const obj = JSON.parse(r.response);
        createVideos(obj);
        createCategories(obj);
      } else {
        console.log('villa!', r);
      }
    };
    r.onerror = function() {
      console.log('villa í tengingu');
    };
    r.send();
  }
  // Sækir videos í json hlut
  createVideos(data) {
    const videos = data.videos;
    const id = data.videos[0]['id'];
    console.log('id FRÁ JSON', id);
    const title = data.videos[1];
    console.log('VIDEOS FRÁ JSON', videos);
    return id;
  }

  // Sækir categories í json hlut
  createCategories(data) {
    const categories = data.categories;
    // const prufa = data.videos[0].created;
    // data['videos'][0]['created'];
    console.log('CATEGORIES FRÁ JSON', categories);
    // console.log('PRUFA', prufa);
  }

  getElements() {
    const vid = createVideos();
    console.log('id FRÁ FALLI', id);
    // console.log('VIDEOS FRÁ FALLI', videos);

    // console.log('title FRÁ FALLI', title);
  }

  /* sér um að littli kassinn sem er með lengd myndbandsins sé
   * settur rétt inn, fær inn lengdina í sekúndum og skilar
   * á forminu mín:sek */
  /* þetta fall er á mjög miklu tilraunarstigi */
  videoLenght(duration) {
    if (duration < 60) {
      if (duration < 10) {
        return '0:0' + duration;
      } else {
        return "0:" + duration;
      }
    } else {
      const min = parseInt(duration/60);
      const sec = duration -(min*60);
      if (sec < 10){
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }
  }

  /* sér um að það sé rétt lengd frá því myndbandið var birt.
     *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
     *langt er síðan myndbandið var birt */
  sincePosted(created){
    /* þarf að setja betur upp en þetta er svona í grófum dráttum
     * gæti verið að við gætum notað const */
      var current = new Date().getTime();
      var created = current - created;
      var sec = created/1000;
      var min = sec/60;
      var klst = min/60;
      var day = klst/24;
      var week;
      var month;
      var year;
debugger
      /*ef meira en 365 dagar síðan "created"*/
      if (day >= 365) {
        year = parseInt(day/365);
        if (year === 1){
          return 'Fyrir ' + year + ' ári síðan';
        }
        else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      }
      /*ef meiri en 30 dagar síðan "created"*/
      else if (day >= 30){
        month = parseInt(day/30);
        if (month === 1){
          return 'Fyrir ' + month + ' mánuði síðan';
        }
        else {
          return 'Fyrir ' + month + ' mánuðum síðan';
        }
      }
      /*ef meira en 7 dagae er síðan "created"*/
      else if (day >= 7){
        week = parseInt(day/7);
        if(week === 1){
          return 'Fyrir ' + week + ' viku síðan';
        }
        else {
          return 'Fyrir ' + week + ' vikum síðan';
        }
      }
      /*ef meira en 24klst síðan "created"*/
      else if (klst >= 24){
        day = parseInt(day);
        if (day === 1){
          return 'Fyrir ' + day + ' degi síðan';
        }
        else {
          return 'Fyrir ' + day + ' dögum síðan';
        }
      }
      else {
        klst = parseInt(klst);
        if (klst === 1){
          return 'Fyrir ' + klst + ' klukkustund síðan';
        }
        else {
          return 'Fyrir ' + klst + ' klukkustundum síðan';
        }
      }
    }

    /*útfærir controles gæjan, það sem kemur undir þegar*/

    createElement(poster, /* video? ,*/ title) {
      const row = document.createElement('div');
      row.classList.add('cardlist__row');
      const col = document.createElement('div');
      col.classList.add('cardlist__col');
      col.appendChild(document.createElement(blabla));
      row.appendChild(col);

      const card = document.createElement('div');
      card.classList.add('card');
      const cardImage = document.createElement('img');
      cardImage.classList.add('card__img');
      cardImage.src = 'poster'; // ?????
      console.log(cardImage.src);
      cardImage.setAttribute('src', poster); // ???????
      //cardImage.appendChild(document.createElement(poster));
      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');
      cardContent.appendChild(document.createElement(blalba));
      const cardHeading = document.createElement('div');
      cardHeading.classList.add('card__heading');
      cardHeading.appendChild(document.createTextNode(title));
      card.appendChild(cardImage); //???
      card.appendChild(cardContent);
      card.appendChild(cardHeading);

      row.appendChild(card);

      return row;
    }


}

class Player{

/*hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
 *þarf að vera this. á undan þeim*/
  constructor() {
    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /*gætum svo þurft að bæta við add addEventListener á takkana hérna*/
  }

  load() {
    const request = new XMLHttpRequest();
    const qs = new URLSerchParams(window.location.serch);
    const id = parseInt(qs.get('id'), 10);
    //request.open. ()
  }

  /*fær inn id af myndbandi og annaðhvort byrjar að spila það
   *eða setur það á pásu. Ætti líklega líka að breyta play takkanum
   *í pause takka og öfugt*/
  playPause(videoId){
    var video = videoId;
    if(video.paused){
      /*held ég sé að finna takkann sem er að hafa þetta á pásu og breyta honum í play takka*/
      var pauseButton = button.querySelector('.button--pause');
      pauseButton.classList.remove('.button--pause');
      pauseButton.classList.add('.button--play');
      video.play();
    }
    else {
      video.pause();
      var playButton = button.querySelector('.button--play');
      playButton.classList.remove('.button--play');
      playButton.classList.add('.button--pause');
    }
    return;
  }

  /*útfærir control gæjann, það sem kemur undir þegar
  maður er að horfa á myndand*/
}

document.addEventListener('DOMContentLoaded', () => {
  const VideoSite = new VideoRentSite();
  const player = new Player();
  const findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});
