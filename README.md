# Node-DynHost

## Requirements

Tested under node v. 5.10.1 under Mac OS X 10.11.5
A valid app token on Ovh API see: [Cretate Token](https://api.ovh.com/createToken/)

**ADVICE:** If you have created an app instead of token, you must go next step to generate a "Consumer Key".

## The Token

You can generate a new consumer key (needed to make api calls) with the permissions you need to run with program just adding `--credentials` param.
This will give you a JSON with an url that you may copy and paste in your browser and **validate manually** and copy/paste the "Consumer Key" to your `.env` file.

## Getting the app

You can get this little app from [github](http://github.com/gtrabanco/dynhost) or through the [npm](https://www.npmjs.com/package/dynhost). 
 
To get the app and run it with npm you should exec:

```bash
$ npm install -g dynhost
```

## Runing the app

First of all you need to run `npm install` if you have it downloaded directly from GitHub.

After that modify `.env-dist` with the values of the app token and save it as `.env` in the dir where you will exec `dynhost` command line program or your home (~) path. Anyway, you will be able to choose your `.env` file with some cli program params.

The app was though to run with the command
```bash
# dynhost --zone example.com --subdomain mydynamicserver
```

To run with your own configuration file whatever you store it use:

```bash
# dynhost --env /path/to/my/.env --zone example.com --subdomain mydynamicserver
```

For more information about the usage run:
```bash
# dynhost -h
```

You should consider run it as cronjob every 5 minute (for example) its ok:

First of all if you have more crontab jobs you must do:
```bash
$ crontab -l > mycronjobs
```

**NOTE:** if you do not know if you have exec first:
```bash
$ crontab -l
```

You should read "crontab: no crontab for" and your computer/server `username.

```bash
$ echo "*/5 * * * * `which dynhost` --zone example.com --subdomain mydynamicserver > /dev/null" >> mycronjobs
$ crontab mycronjobs
```

To delete the crontab job just exec
```bash
$ crontab -e
```
And delete the line of the crontab you do not want to exec anymore.

## License

See LICENSE.md file

## Author

Gabriel Trabanco

[Website](https://gabi.uno)

## More information
