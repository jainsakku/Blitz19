import fullpage from './fullpage'
import signup from './signup'
import html from './index.html'
import lan from './src/images/lan.jpg'

new fullpage('#content', {
    anchors: ['home','events','registration','contact'],
    scrollingSpeed: 500,
    dragAndMove: true,
    scrollHorizontally: true,
    recordHistory: false,
    slidesNavigation: true,
    loopHorizontal: false,
    scrollingSpeed: 475
});
