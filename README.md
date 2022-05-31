# Taggy

Taggy is a platform and a bot allowing to save discord messages in categories. You can use it to organize office hours on your discord servers.

## Installation

The project requires [pnpm](https://pnpm.io/) installed.

Before you can start the project, a configuration part is required.

First of all, you will have to create a discord bot application. You can find a documentation about it [here](https://discord.com/developers/docs/getting-started#creating-an-app).

In this application, in the ``OAuth2`` tab, you have to add your redirection URLs, namely ``http://localhost:3000`` (the dev one), and the production domain name. Due to a problem with the oauth api of Discord, think of duplicating your domain name url, by adding a ``/`` at the end of the duplication.

**Example:**

![https://i.imgur.com/QWxLoVp.png](https://i.imgur.com/QWxLoVp.png)

When you have added the urls, you will have to add the environment variables (via a ``.env`` at the root, or any other way you know). This project has the following environment variables:

```bash
DATABASE_URL=""                            # A postgres or cockroach database url
VITE_SOCKET_SERVER="http://localhost:3000" # The url of the project.
VITE_DISCORD_CLIENT_ID=""                  # Your discord Oauth2 client id
DISCORD_GUILD_ID=""                        # Your discord guild id (to test it, mainly for the bot slash commands)
DISCORD_CLIENT_SECRET=""                   # Your discord Oauth2 client secret
DISCORD_TOKEN=""                           # Your discord bot token
NODE_ENV="developement"                    # The environment of the project
```

***Note:** You will receive an error at runtime if you are missing some environment variables, or if some of them don't seem to be right.*

Once the environment variables are prepared, you need to install the different dependencies of the project:

```
pnpm install
```

Finally, to prepare the database, all you have to do is ``pnpm prisma migrate deploy`` and ``pnpm prisma generate``. The "migrate deploy" command will prepare the postgres database, and "generate" will generate the client if it has not been generated correctly.

## Commands:

The project is divided into several "apps":
 - @taggy/bot
 - @taggy/web

The "web" part represents the interface, and the "bot" part, as you may have guessed, the "bot" part.

Different commands are available, with for each one the possibility to execute it for 1 project only. The available commands are:

 * ``build``
 * ``start``
 * ``dev``
 * ``format``

To execute a command in a specific "app", you just have to specify its name:

```bash
pnpm build
pnpm start:web # Starts the web app only
```

## License

This project is licensed under the MIT license with a Commons Clause license.

You can find the full license text [here](/LICENSE).