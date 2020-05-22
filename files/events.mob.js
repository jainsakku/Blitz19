import fullpage from '../fullpage'
// import navbar from './navbar'
import events from './events.json'

import Dramatics from './events/Dramatics.mob.html'
import Film from './events/Film.mob.html'
import Literary from './events/Literary.mob.html'
import Music from './events/Music.mob.html'
import Vyaktiva from './events/Vyaktiva.mob.html'
import FineArts from './events/FineArts.mob.html'
import EDcell from './events/EDcell.mob.html'
import registration from './events/register.mob.html'
import registrationt from './events/registert.mob.html'

window.localStorage.setItem('events', events)

new fullpage('#content', {
  scrollingSpeed: 500,
  navigation: true,
  dragAndMove: true,
  recordHistory: false,
});
