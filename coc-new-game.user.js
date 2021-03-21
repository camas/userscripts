// ==UserScript==
// @name         coc-new-game
// @namespace    https://github.com/camas/userscripts/
// @version      1.0.0
// @description  Create a new game quickly from after-game screen
// @author       Camas
// @homepage     https://github.com/camas/userscripts
// @homepageURL  https://github.com/camas/userscripts
// @supportURL   https://github.com/camas/userscripts/issues
// @license      MIT
// @match        *://www.codingame.com/clashofcode/clash/report/*
// @icon         https://www.google.com/s2/favicons?domain=codingame.com
// @grant        GM_setClipboard
// @updateURL    https://github.com/camas/userscripts/raw/master/coc-new-game.user.js
// @downloadURL  https://github.com/camas/userscripts/raw/master/coc-new-game.user.js
// ==/UserScript==
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(addLeaveButton, 500);

    function addLeaveButton(eventArgs) {
        // Find Home button
        var homeNode = document.getElementsByClassName("leave-button")
        if (homeNode.length == 0) {
            setTimeout(addLeaveButton, 500);
            return
        }
        homeNode = homeNode[0]

        // Create button
        var node = document.createElement('button')
        node.innerHTML = 'Create New Game'
        node.setAttribute('class', 'leave-button')
        node.setAttribute('id', 'new-game-button')

        // Add click event
        node.addEventListener('click', createNewGame, false);

        // Add new button after home button
        homeNode.parentNode.parentNode.appendChild(node)
    }

    function createNewGame(eventArgs) {
        // Send request
        var data = [unsafeWindow.session.codinGamer.userId, { "SHORT": true }, [], ["FASTEST", "SHORTEST", "REVERSE"]]
        fetch("/services/ClashOfCode/createPrivateClash", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(data => {
                document.getElementById('new-game-button').innerHTML = 'Done. Set clipboard'
                var url = "https://www.codingame.com/clashofcode/clash/" + data.publicHandle
                GM_setClipboard(url)
                window.location = url
            })
    }
})();
