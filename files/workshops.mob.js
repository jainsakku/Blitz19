import fullpage from '../fullpage'
import workshops from './workshops.json'

// import Dramatics from './workshops/Dramatics.mob.html'
// import Film from './workshops/Film.mob.html'
// import Literary from './workshops/Literary.mob.html'
// import Music from './workshops/Music.mob.html'
// import Vyaktiva from './workshops/Vyaktiva.mob.html'
import FineArts from '../workshops/FineArts.mob.html'
// import EDcell from './workshops/EDcell.mob.html'
import registration from '../workshops/register.mob.html'

window.localStorage.setItem('workshops', workshops)

new fullpage('#content', {
  scrollingSpeed: 500,
  navigation: true,
  dragAndMove: true,
  recordHistory: false,
});
