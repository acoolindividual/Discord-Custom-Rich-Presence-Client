try {
    var fs = require("fs");
    const { Client } = require('discord.js-selfbot-v13');
    const client = new Client({ checkUpdate: false });
    const { RichPresence, Util } = require('discord.js-selfbot-rpc');
    if (!fs.existsSync(process.cwd()+"/config.json")) throw new Error("JSON_NOT_FOUND"); // error if the config file is not found
    var config;
    try { config = require(process.cwd()+'/config.json'); }
    catch { throw new Error("JSON_FORMAT_ERROR") };
    var requiredKeysRef = ["presenceStatus", "presenceType", "presenceName", "applicationId", "userToken"];
    var requiredKeys = Object.keys(config.required);
    var requiredKeysCheck = requiredKeysRef.every(function (v) { return requiredKeys.indexOf(v) >= 0 }); // check if the required keys are present
    if (!requiredKeysCheck) throw new Error("JSON_KEY_MISSING");
    client.on('ready', async () => { // starts the client
        const applicationId = config.required.applicationId;
        const presence = new RichPresence()
            .setStatus(config.required.presenceStatus)
            .setType(config.required.presenceType)
            .setApplicationId(config.required.applicationId)
            .setName(config.required.presenceName)
        if (config.optional.details) presence.setDetails(config.optional.details);
        if (config.optional.state) presence.setState(config.optional.state);
        if (config.optional.largeImageText) presence.setAssetsLargeText(config.optional.largeImageText);
        if (config.optional.smallImageText) presence.setAssetsSmallText(config.optional.smallImageText);
        if (config.optional.showTimestamp) presence.setTimestamp(parseInt(config.optional.timestamp) || Date.now());
        if (config.optional.largeImageName) { largeImage = await Util.getAssets(applicationId, config.optional.largeImageName); presence.setAssetsLargeImage(largeImage.id); }
        if (config.optional.smallImageName) { smallImage = await Util.getAssets(applicationId, config.optional.smallImageName); presence.setAssetsSmallImage(smallImage.id) }
        //^ applying all relevant config data to the presence
        client.user.setPresence(presence.toData()); // actually setting the presence
        console.log(`\x1b[32mDisplaying presence for \x1b[36m${client.user.tag}.\x1b[0m\nPress\x1b[33m Ctrl+C \x1b[0mor close this window to exit. You will remain online until this window is closed.`); //Logs that the presence is set
    });
    client.login(config.required.userToken).catch((err) => { console.log("\x1b[31m" + err.message + '\n\x1b[0mThe provided token is invalid. Please enter a valid token to config.json'); process.stdin.resume() }); //couldn't actually throw an error because it would not be caught by the catch block
} catch (e) {
    switch (e.message) {
        case 'JSON_KEY_MISSING':
            console.log("\x1b[31m" + e.message + "\n\x1b[0mOne or more required keys are missing in config.json. Please add the missing keys to config.json or redownload");
            process.stdin.resume();
            break;
        case 'LOGIN_ERROR':
            console.log("\x1b[31m" + e.message + '\n\x1b[0mThe provided token is invalid.');
            process.stdin.resume();
            break;
        case 'JSON_FORMAT_ERROR':
            console.log("\x1b[31m" + e.message + '\n\x1b[0mJSON is not formatted correctly. Please fix or re-download the config.json file.');
            process.stdin.resume();
            break;
        case 'JSON_REQUIREMENTS_ERROR':
            console.log("\x1b[31m" + e.message + '\n\x1b[0mJSON is missing required fields. Please fill out all fields in the "required" property.');
            process.stdin.resume();
            break;

        case 'JSON_NOT_FOUND':
            console.log("\x1b[31m" + e.message + '\n\x1b[0mconfig.json file not found. Please re-download the config.json file.');
            process.stdin.resume();
            break;
        default:
            console.log("An unknown error has occured. If this error persists and/or is beyond user control/error, please open an issue on GitHub.");
            console.log("\x1b[31m" + e + "\x1b[0m");
            process.stdin.resume();
            break;
        //^ error handling
    }
}
