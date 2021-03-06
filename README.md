# --- SCRIPT NO LONGER WORKS - CAPTCHA IN PLACE ---
# IndieGala Giveaways - Auto-join user script
User script to auto-join giveaways on indiegala.com

## Instalation
- Install Tampermonkey or GreeseMonkey or any other plugin for user script to your browser
- In the plugin select add new script, copy the content of script.js

## Usage

- Edit the settings at the start of the script based on your liking. (There is quite a lot of settings you can use)
- Enable the script in the plugin settings
- Visit the page https://www.indiegala.com/giveaways/1/expiry/asc (or any equivalent /participants/desc etc)
- Disable the script once you are finished (or not, depens on you)

### What it does / how it works?
Script detects that is at https://www.indiegala.com/giveaways/1/expiry/asc  
Detects all the giveaways, assess the settings - if wants to join the giveaway it sends the request to enter.  
Moves to higher page https://www.indiegala.com/giveaways/2/expiry/asc etc  
Script can automatically detect DLC using SteamAPI and skip them.  
  
Open browser dev tools to see details (press `F12`) about current status.

## Warning
**Use this script at your own risk. Might violate IndieGala TOS.**  
Also don't be pathetic and don't abuse giveaways. Enjoy this IndieGala feature. Use the script just to save your time.

### Authors

The script is based on https://greasyfork.org/en/scripts/21412-autojoin-indiegala-giveaways-improved  
Which was created by George Dorn (@GDorn) and Sergio Susa (http://sergiosusa.com)

Modifications:

- Fixed the script to work with latest IndieGala website.
- Added SteamAPI checker.
- Additional tweaks and improvements. 

Any additional edits and improvements are welcomed.

### Changelog

You can find the latest changelog in the [release tab](https://github.com/petrvecera/indiegala-giveaways/releases)

**0.5.3**
- Fix the Indie coins selector for the new design

**0.5.2**
- Fix the url change on multi digits pages.

**0.5.1**
- Will respect your URL settings, you can use `/participants/asc` or `/expiry/asc` etc.
- Will not be started when you open `https://www.indiegala.com/giveaways/` you have to set some settings.

**0.5.0**
- Added checking for the DLC using Steam API, default value  is `var skipDlc = true;`
- Added option for max price, default value is `var max_price = 30;`
- Fixed bug when script was executed when browsing single page

**0.4.7**
- Added lifetime counter of entered give-aways. Prints the info at the start of the script.

**0.4.6**
- Tweaked the default configs.
