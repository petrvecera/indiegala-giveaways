# IndieGala Giveaways - Auto-join user script
User script to auto-join giveaways on indiegala.com

## Instalation
- Install Tampermonkey or GreeseMonkey or any other plugin for user script to your browser
- In the plugin select add new script, copy the content of script.js

## Usage

- Edit the settings at the start of the script based on your liking
- Enable the script in the plugin settings
- Visit the page https://www.indiegala.com/giveaways/1/expiry/asc
- Disable the script once you are finished

### What it does / how it works?
Scrcipt detects that is at https://www.indiegala.com/giveaways/1/expiry/asc
Detects all the giveaways, assess the settings - if wants to join the giveaway it sends the request to enter.
Open browser dev tools to see details (press `F12`) about current status.

## Warning
**Use this script at your own risk. Might violate IndieGala TOS.**  
Also don't be pathetic and don't abuse giveaways. Enjoy this IndieGala feature. Use the script just to save your time.

### Authors

The script is mostly based on https://greasyfork.org/en/scripts/21412-autojoin-indiegala-giveaways-improved  
Which was created by George Dorn (@GDorn) and Sergio Susa (http://sergiosusa.com)

Added fixes to work with the latest version of the IndieGala website as per 19/Feb/2017 and few other tweaks.

Any additional edits and improvements are welcomed.

### Changelog

**0.4.7**
- Added lifetime counter of entered give-aways. Prints the info at the start of the script.

**0.4.6**
- Tweaked the default configs.
