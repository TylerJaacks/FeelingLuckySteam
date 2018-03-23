var Steam = require('steam-webapi');
var fs = require('fs');
var opn = require('opn');

// TODO Get the community id and Steam API key from the tokens file.s
var communityId = process.argv[2];
var steamAPIKey = process.argv[3];

Steam.key = steamAPIKey;

Steam.ready(function (error) {
    if (error) return console.log(error);

    var steam = new Steam();

    steam.resolveVanityURL({vanityurl: communityId}, function (error, data) {
        if (error) return console.log(error);

        data.include_appinfo = true;
        data.include_played_free_games = true;
        data.appids_filter = "";

        steam.getOwnedGames(data, function (error, data) {
            var randomIndex = Math.floor(Math.random() * Math.floor(data.game_count));
            
            var gameAppId = data.games[randomIndex].appid;
            var gameName = data.games[randomIndex].name;

            var gameLaunchUri = constructUri(gameAppId);

            console.log("Launching " + gameName);

            launchGame(gameLaunchUri);
        });
    });
});

function constructUri(appId) {
    return "steam://rungameid/" + appId;
}

/* TODO Launch game with Steam uri. */
function launchGame(gameUri) {
    opn(gameUri);
}