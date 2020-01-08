// ==UserScript==
// @name         youtube-continue-watching
// @namespace    https://github.com/camas/userscripts/
// @version      1.0.1
// @description  Auto-click "Continue Watching" whenever it pops up
// @author       Camas
// @homepage     https://github.com/camas/userscripts
// @homepageURL  https://github.com/camas/userscripts
// @supportURL   https://github.com/camas/userscripts/issues
// @license      MIT
// @match        *://*.youtube.com/*
// @updateURL    https://github.com/camas/userscripts/raw/master/youtube-continue-watching.user.js
// @downloadURL  https://github.com/camas/userscripts/raw/master/youtube-continue-watching.user.js
// ==/UserScript==

(function () {
  'use strict'

  // Run check at intervals
  setInterval(function () {
    // Inital declarations
    var buttons
    var button

    // Find button(s) for music.youtube.com
    buttons = document.getElementsByTagName('ytmusic-you-there-renderer')
    for (button of buttons) {
      // Click button
      button.querySelector('paper-button').click()
    }
    // Find button(s) for youtube.com
    buttons = document.getElementsByTagName('yt-confirm-dialog-renderer')
    for (button of buttons) {
      // Check right button and click
      if (button.querySelector('#scrollable').innerText === 'Video paused. Continue watching?') {
        button.querySelector('#confirm-button').click()
      }
    }
  }, 1000)
})()
