// ==UserScript==
// @name         aoc-markdown
// @namespace    https://github.com/camas/userscripts/
// @version      1.0.0
// @description  Converts Advent of Code puzzle descriptions into markdown
// @author       Camas
// @homepage     https://github.com/camas/userscripts
// @homepageURL  https://github.com/camas/userscripts
// @supportURL   https://github.com/camas/userscripts/issues
// @license      MIT
// @match        *://adventofcode.com/*/day/*
// @exclude      *://adventofcode.com/*/day/*/input
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://unpkg.com/turndown/dist/turndown.js
// @updateURL    https://github.com/camas/userscripts/raw/master/aoc-markdown.user.js
// @downloadURL  https://github.com/camas/userscripts/raw/master/aoc-markdown.user.js
// ==/UserScript==

(function () {
  'use strict'

  // Add button
  var node = document.createElement('div')
  node.innerHTML = 'Copy as markdown<div></div>'
  node.setAttribute('id', 'copyButton')
  document.body.appendChild(node)

  // Add function to button
  document.getElementById('copyButton').addEventListener('click', CopyAsMarkdown, false)

  function CopyAsMarkdown (eventArgs) {
    // Get all description elements
    var elements = document.getElementsByClassName('day-desc')

    // Use Turndown to convert elements to markup
    var turndownService = new TurndownService({ emDelimiter: '__' })
    // Remove dashes from headers
    turndownService.addRule('remove-dashes', {
      filter: 'h2',
      replacement: function (content) {
        return '\n\n## ' + content.replace('--- ', '').replace(' ---', '') + '\n\n'
      }
    })
    var fullMarkdown = ''
    for (var e of elements) {
      var markdown = turndownService.turndown(e)
      fullMarkdown += markdown
      fullMarkdown += '\n\n'
    }
    fullMarkdown = fullMarkdown.slice(0, -1)
    GM_setClipboard(fullMarkdown)
    document.getElementById('copyButton').innerHTML = 'Done<div></div>'
  }

  // Style button
  GM_addStyle(`
#copyButton {
    backface-visibility: hidden;
    cursor: pointer;
    white-space: nowrap;
    background: #3ceb55;
    border-radius: 0px;
    border: 0px solid #1f7d14;
    border-width: 0px 0px 4px 0px;
    padding: 10px 20px 10px 20px;
    color: #fff;
    font-size: initial;
    font-family: Helvetica Neue;
    font-weight: 900;
    font-style: normal;
    z-index: 1101;
    bottom: 5px;
    right: 5px;
    position: fixed;
}
#copyButton > div {
    color: #999;
    font-size: 10px;
    font-family: Helvetica Neue;
    font-weight: initial;
    font-style: normal;
    text-align: center;
    margin: 0px 0px 0px 0px
}
#copyButton > i {
    font-size: 1em;
    border-radius: 0px;
    border: 0px solid transparent;
    border-width: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
    position: static
}
#copyButton > .ld {
    font-size: initial
}
`)
})()
