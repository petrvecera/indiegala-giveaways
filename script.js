// ==UserScript==
// @name         AutoJoin IndieGala Giveaways (improved)
// @version      0.4.1
// @date         18/Feb/2017
// @description  AutoJoin for IndieGala Giveaways!
// @author       George Dorn (@GDorn), Sergio Susa (http://sergiosusa.com) and pagep (http://pagep.net)
// @homepage     https://github.com/petrvecera/indiegala-giveaways
// @updateURL    https://raw.githubusercontent.com/petrvecera/indiegala-giveaways/master/script.js
// @downloadURL  https://raw.githubusercontent.com/petrvecera/indiegala-giveaways/master/script.js
// @match        https://www.indiegala.com/giveaways*
// @grant        none
// ==/UserScript==

var reloading = 3 * 60 * 1000; // 3 minutes; delay encountered when out of points with enabled inifinte run
var trying = 40 * 1000; // 10 seconds; delay before loading next page
var min_coins = 5; // number of points to save
var coins_per_page = 10; // number of extra points to save per page, to avoid wasting points on contests hours in the future; cycles to page one after exceeding
var timeBetweenClicks = 4 * 1000; // 2 seconds; delay between clicking on ticket stubs
var max_page = 20; // maximum page number; cycles to page 1 after this or stops script
var start_delay = 5 * 1000; // wait this long on page load, for 'match_games_in_steam_library' to finish.
var max_level = 0; // maximum contest level to try to enter; set to higher if you are a higher level.
var max_participants = 800; // skip contests with more participants than this
var skip_already_owned = true; // skip contests for games you already own (according to indiegala)
var infinite_run = false; // will not stop when you run out of coins or when you reach max page

if (!skip_already_owned) {
    start_delay = 50; //if we don't care about winning games we own, we can run a little faster
}

var autoEnter = function () {
    'use strict';

    console.log("Starting auto-entry.");

    if (skip_already_owned) {
        removeAlreadyHave();
    }

    var coins = parseInt($("#silver-coins-menu").html());
    console.log("Have this many coins: ", coins);
    if (coins < min_coins) {
        if (!infinite_run) {
            console.log('Not enought coints, stopping the script');
            return;
        }
        console.log("Not enough coins, reloading...");
        reloadPage(randomize(reloading));
        return;
    }

    // add more delay for every stub we need to wait to click on
    var next_page_delay = trying;

    var contests = $('div.tickets-col');

    console.log("Got ", contests.length, " contests: ", contests);

    // iterate through contests on the page, scheduling clicks on stubs if they meet our criteria
    for (var i = 0; i < contests.length; i++) {
        // if we spent all our coins, bail
        if (coins < min_coins) {
            console.log("Not enough coins to continue");
            break;
        }

        var contest = contests[i];
        console.log("Considering contest:", contest);

        var name = $(contest).find('div.ticket-right').find('h2').text().trim();
        var price = parseInt($(contest).find('div.ticket-price')[0].textContent);
        var level = get_level(contest);
        var participants = get_participants(contest);
        console.log("Name: ", name, " Price: ", price, " Level: ", level, " Participants: ", participants);


        var stub = contest.getElementsByTagName("aside")[0];
        if (!stub) {
            console.log("Skipping ", name, " because can't find stub?  Maybe already entered?");
            continue;
        }
        if (price > coins) {
            console.log("Skipping ", name, " because price (", price, ") exceeds coins (", coins, ")");
            continue;
        }

        if (level > max_level) {
            console.log("Skipping ", name, " because required level (", level, ") is greater than max_level,", max_level);
            continue;
        }

        if (participants > max_participants) {
            console.log("Skipping ", name, " because ", participants, " users participating, greater than the allowed ", max_participants);
            continue;
        }

        // if we're here, all checks passed, go ahead and click on it.
        var delay = randomize(timeBetweenClicks);

        var newUrl = "https://www.indiegala.com" + stub.querySelector("a.giv-coupon-link").getAttribute('href');
        window.open(newUrl, '_blank');


        console.log("Opening new window on: ", name, stub);
        console.log("New url: ", newUrl);
        next_page_delay += delay; // add the delay to the next page delay so we don't load next page before the click happens
        coins -= price; // deduct cost of contest
    }

    console.log("###### Done with this page, moving on to next. ######");

    var next_page = calculateNextPage();

    // get updated coins now in case our coin tracking broke
    coins = parseInt($(".coins-amount strong").html());

    // avoid spending too many coins on later pages, save them for short-running giveaways with fewer entries
    var needed_coins = min_coins + coins_per_page * (next_page - 1);
    if (coins < needed_coins) {
        console.log("Going back to page 1; we have ", coins, " but want at least ", needed_coins, " to continue.");
        next_page = 1;
        next_page_delay += trying; //some extra delay before loading first page again
    }

    if (next_page > max_page) {
        if (!infinite_run) {
            console.log('Too many pages, exceeded ' + max_page + ' - stoppnig the script!');
            return;
        }
        console.log('Too many pages, starting from 1');
        next_page = 1;
    }

    next_page_delay = randomize(next_page_delay);

    console.log("Going to load page ", next_page, " in about ", next_page_delay, 'ms');

    setTimeout(function () {

        window.location = "https://www.indiegala.com/giveaways/[NUM_PAGE]/expiry/asc".replace("[NUM_PAGE]", next_page);

    }, next_page_delay);

};

$(document).ready(function () {
    var pageUrl = window.location.href;
    if (pageUrl.indexOf("https://www.indiegala.com/giveaways/detail/") > -1) {
        console.log("I am on detail page, going to enter giveaway");
        var ticket = document.querySelector("aside.giv-coupon.relative.animated-coupon ");
        if (ticket) {
            ticket.click();
            console.log("Giveaway probably entered...");
        }
        setTimeout(function () {
            window.close();
        }, 1200);
    } else {
        console.log("I am on the main page, will start autojoin script");
        setTimeout(autoEnter, start_delay);
    }
});

/***********************************************************
 *  Utility Functions
 **********************************************************/

function randomize(number) {
    // returns a random number somewhere between 3/4 and 5/4 of the given value.
    // maybe helps bust bot detection.
    var base = Math.floor(number * 0.75);
    var max_add = Math.floor(number * 0.5);
    return result = base + Math.floor(Math.random() * max_add);
}

function removeAlreadyHave() {
    var count = 0;
    var nodes = $('.on-steam-library-corner');
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ($(node).is(':visible')) {
            $(node).parents('.tickets-col').remove();
            count += 1;
        }
    }
    console.log("Removed ", count, " offers already in steam library.");
}

function get_level(contest) {
    // returns the numeric level requirement for a chunk of text extracted from a ticket
    var text = contest.textContent.trim();
    var position = text.indexOf('LEVEL ') + 6;
    return parseInt(text.slice(position));
}

function get_participants(contest) {
    var text = $(contest).find('.ticket-info-cont div.info-row:nth-of-type(4)').text();
    return parseInt(text);
}

function calculateNextPage() {
    var page = window.location.href.replace("https://www.indiegala.com/giveaways/", "").replace("/expiry/asc", "");
    return parseInt(page) + 1;
}

function reloadPage(miliseconds) {
    console.log("Reloading page in ", miliseconds, " ms");
    setTimeout(function () {
        window.location.reload();
    }, miliseconds);
}

/***********************************************************
 *  Override Functions
 **********************************************************/
window.confirm = function (message, callback, caption) {
    return true;
};
