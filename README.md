# Discord Custom Rich Presence Client
This is a simple client for Discord's Rich Presence API. It allows you to set a custom activity for your Discord profile, allowing the use of images and multiple fields

![Example](/example.png "Example")

## Quick Setup
1. Download the latest release from the [releases page](https://github.com/acoolindividual/Discord-Custom-Rich-Presence-Client/releases/)
2. Make yourself an application on the [Discord Developer Portal](https://discord.com/developers/applications)
3. Under the Rich Presence tab, upload the images you'd like to use and take note of their names
4. Take note of your application's Client ID, present in the General Information tab
5. Unzip the release file and open config.json in a text editor
6. Get your Discord token by following [this guide](https://discordhelp.net/discord-token)
7. Fill out the config.json file using the config guide (below)
8. Start the client by running the .exe file
9. End the client by closing the command prompt window or pressing Ctrl+C

## Config Guide
The config.json file is very stringent on formatting and will not work if important characters (such as commas, brackets, and quotes) are missing or misplaced. It is recommended to use a JSON validator to ensure that your config file is valid before starting the client.

You must remove optional fields which you do not use. For example, if you do not want to use the "state" field, you must remove the entire "state" key/value pair from the config file. Ensure that the commas in the field are correct, and that the last field in the config file does not have a comma after it.

I intend to add an easier way to configure the client in the future, but for now this is the only way.

## JSON Keys (optional)
- details - The first inline field of text in the activity
- state - The second inline field of text in the activity
- largeImageName - The name of the asset you'd like to use as your large image (can be added at https://discord.com/developers/applications/(YOUR APP ID)/rich-presence/assets) (if applicable)
- largeImageText - The text to display when hovering over the large image (if applicable)
- smallImageName - The name of the asset you'd like to use as your small image (can be added at https://discord.com/developers/applications/(YOUR APP ID)/rich-presence/assets) (if applicable)
- smallImageText - The text to display when hovering over the small image (if applicable)
- showTimestamp - Whether or not to show the timestamp in the activity, can be true or false (do not put quotes around the value)
- timestamp - The timestamp to use in the activity in [Epoch format](https://www.epochconverter.com/) (if applicable) (string)

## JSON keys (required)
- userToken - Your Discord [user token](https://discordhelp.net/discord-token)
- applicationID - Your application's [Client ID](https://discord.com/developers/applications)
- presenceName - What you'd like the name of the presence to show up as
- presenceStatus - online, idle, or dnd (string)
- presenceType - PLAYING, WATCHING, LISTENING, or STREAMING (string)

# Responsibility Disclaimer
This client technically puts your account online as a selfbot, which is against Discord's Terms of Service. The risk of having action taken against your account is negligibly low, but in any event, I am not responsible for bans, suspensions, or other punishments you may receive for using this client. 

# To-Do list
- [ ] add a user-configurable .txt file with easier configuration options
- [ ] better error handling and bug fixes
- [ ] revamp README guide to be more user-friendly and easier to understand