import html from './pronite.html'
import html2 from './celeb.html'
import fullpage from '../fullpage'

new fullpage('#content', {
    anchors: ['panache','ramba-samba', 'celeb-night','battle-of-bands','edm-night'],
    scrollingSpeed: 500,
    dragAndMove: true,
    scrollHorizontally: true,
    recordHistory: false,
    slidesNavigation: true,
    loopHorizontal: true,
    scrollingSpeed: 475
});
