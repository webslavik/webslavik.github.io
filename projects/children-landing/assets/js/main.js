"use strict";
"use strict";
"use strict";
'use strict';

(function () {

    var navbar = document.querySelector('#navbar');
    // scroll = document.querySelectorAll('.scroll');


    // Added 'is-fixed' class for Navbar
    //-----------------------------------------------------
    function onWindowScroll() {
        var wScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (wScroll > 0) {
            navbar.classList.add('is-fixed');
        } else {
            navbar.classList.remove('is-fixed');
        }
    }
    window.addEventListener('scroll', onWindowScroll);

    // Smooth scroll
    //-----------------------------------------------------
    // function smoothScroll(anchor, duration) {
    //     let startLocation = window.pageYOffset;
    //     let endLocation = anchor.offsetTop;
    //     let distance = endLocation - startLocation;
    //     let increments = distance / (duration / 16);
    //     // let stopAnimation;

    //     function animateScroll() {
    //         window.scrollBy(0, increments);
    //         // stopAnimation();
    //         if (increments >= 0) {
    //             scrollDown();
    //         } else {
    //             scrollUp();
    //         }
    //     }

    //     let runAnimation = setInterval(animateScroll, 16);
    //     function scrollDown() {
    //         let travelled = window.pageYOffset;
    //         if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
    //             clearInterval(runAnimation);
    //         }
    //     }

    //     function scrollUp() {
    //         let travelled = window.pageYOffset;
    //         if (travelled <= (endLocation || 0)) {
    //             clearInterval(runAnimation);
    //         }
    //     }


    //     // if (increments >= 0) {
    //     //     stopAnimation = () => {
    //     //         let travelled = window.pageYOffset;
    //     //         if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
    //     //             clearInterval(runAnimation);
    //     //         }
    //     //     };
    //     // } else {
    //     //     stopAnimation = () => {
    //     //         let travelled = window.pageYOffset;
    //     //         if (travelled <= (endLocation || 0)) {
    //     //             clearInterval(runAnimation);
    //     //         }
    //     //     };
    //     // }
    // }

    // Array.prototype.forEach.call(scroll, (toggle) => {
    //     toggle.addEventListener('click', (e) => {
    //         e.preventDefault();

    //         let dataID = toggle.getAttribute('href');
    //         let dataTarget = document.querySelector(dataID);

    //         // console.log(`${dataID}, ${dataTarget}`);

    //         if (dataTarget) {
    //             smoothScroll(dataTarget, 500);
    //         }

    //         // console.log('click - ', e.target);
    //     });
    // }, false);
})();
"use strict";