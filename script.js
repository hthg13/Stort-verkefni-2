class VideoRentSite {
  /* hérna setjum við inn allar breytur sem þarf að upphasstilla, fer í gang um leið
   * og við notum new */
  constructor() {
    //this.keyName = 'videos';
    this.container = document.querySelector('.videos');


  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */
  load() {

  }

  getJson() {
    const r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function() {
      if (r.status >= 200 && r.status < 400) {
        const obj = JSON.parse(r.response);
        createVideos(obj);
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
    const categories = data.categories;
    const videos = data.videos;

    for (let i=0; i<categories.length; i++) {
      const cats = cats[i];
      createCategory(cat, videos);
    }
    /*
    const id = data.videos[0]['id'];
    console.log('id FRÁ JSON', id);
    const title = data.videos[1];
    console.log('VIDEOS FRÁ JSON', videos);
    return id;
    */
  }

/*
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
  */

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
      let current = new Date().getTime();
      let created = current - created;
      let sec = created/1000;
      let min = sec/60;
      let klst = min/60;
      let day = klst/24;
      let week;
      let month;
      let year;
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
    }

  /* útfærir controles gæjan, það sem kemur undir þegar */

  createElement(poster, video, title, posted) {
    const row = document.createElement('div'); // ætti kannski að vera bara eitt á hvert section?
    const col = document.createElement('div');
    const vid = document.createElement('video');
    const AElement = document.createElement('a');
    row.classList.add('cardlist__row');
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
    // cardImage.appendChild(document.createElement(poster));
    const cardContent = document.createElement('div');
    cardContent.classList.add('card__content');
    cardContent.appendChild(document.createElement(blalba));
    const cardHeading = document.createElement('div');
    cardHeading.classList.add('card__heading');
    cardHeading.appendChild(document.createTextNode(title));
    card.appendChild(cardImage); // ???
    card.appendChild(cardContent);
    card.appendChild(cardHeading);

    row.appendChild(card);

    return row;
  }

  // fær inn upplýsingar um myndband og "byggir" það upp, fallið sem ég var að gera en má alveg breyta eða nota annað fall
  createVideoElement(poster, video, title, posted, duration) {
    const col = document.createElement('div');
    const vid = document.createElement('video'); // spurning hvort það þurfi að kalla á myndbandið hérna?
    const aElement = document.createElement('a');
    const cardImg = document.createElement('img');
    const cardTitle = document.createElement('h2');
    const since = document.createElement('p');
    const lenght = document.createElement('p');
    col.classList.add('cardlist__col');
    aElement.setAttribute('href', site.html);
    cardImg.classList.add('card__img');
    cardImg.setAttribute('src', poster);
    since.createTextNode(sincePosted(posted));
    length.createTextNode(videoLength(duration));
    a.appendChild(vid);
    col.appendChild(a);
    col.appendChild(cardTitle);
    col.appendChild(since);
    col.appendChild(length);
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
    // request.open. ()
  }

  // býr til grunnin að controles
  createControles(){
    const controleContainer = document.createElement('div');
    const playingButton = document.createElement('button');
    const forwardButton = document.createElement('button');
    const backButton = document.createElement('button');
    const fullscreenButton = document.createElement('button');
    const soundButton = document.createElement('button');
    controleContainer.classList.add('controles');
    playingButton.setAttribute('click', playPause();
    playingButton.classList.add('button--play');
    forwardButton.setAttribute('click', skip(3));
    backButton.setAttribute('click', skip(-3));
    fullscreenButton.setAttribute('click', fullscreen());
    fullscreenButton.classList.add('normalSize'); //þegar myndbandið er venjulegt
    soundButton.setAttribute('click', sound());
    controleContainer.appendChild(playingButton);
    controleContainer.appendChild(forwardButton);
    controleContainer.appendChild(backButton);
    controleContainer.appendChild(fullscreenButton);
    controleContainer.appendChild(soundButton);
    return;
  }

  // spólar framm og til baka
  skip(value){
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    video.currentTime += value;
    return; // veit ekki hvort það þarf að vera return
  }

  // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið
  sound(){
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    if (video.muted){
      video.muted = false;
    } else {
      video.muted = true;
    }
  }

  // gerir skjáinn annaðhvort fullscreen eða tekur það af
  fullscreen(){
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    if (document.querySelector('normalSize')){
      let norm = button.querySelector('normalSize');
      norm.classList.remove('normalSize');
      norm.classList.add('fullscreenSize');
    } else {
      let full = button.querySelector('fullscreenSize');
      full.classList.remove('fullscreenSize');
      full.classList.add('normalSize');
    }
  }

/* fær inn id af myndbandi og annaðhvort byrjar að spila það
 * eða setur það á pásu. Ætti líklega líka að breyta play takkanum
 * í pause takka og öfugt */
  playPause(){
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndband er verið að tala um
    if(video.paused){
      video.play();
      /*held ég sé að finna takkann sem er að hafa þetta á pásu og breyta honum í play takka*/
      let play = button.querySelector('.button--pause');
      play.classList.remove('.button--pause');
      play.classList.add('.button--play');
    }
    else {
      video.pause();
      let pause = button.querySelector('.button--play');
      pause.classList.remove('.button--play');
      pause.classList.add('.button--pause');
    }
    return; // veit ekki hvort það þarf að vera return :/
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getJson();
  const VideoSite = new VideoRentSite();
  const player = new Player();
  const findingClass = document.querySelector('.videos');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});
