// ==UserScript==
// @name         youtube-continue-watching
// @namespace    https://github.com/camas/userscripts/
// @version      1.0.0
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
    // Find button(s)
    var buttons = document.getElementsByTagName('ytmusic-you-there-renderer')
    for (var button of buttons) {
      // Click button
      button.querySelector('paper-button').click()
      console.log('Clicked Continue Watching button')
    }
  }, 1000)
})()
