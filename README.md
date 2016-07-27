# Node-DynHost

## Requirements

Tested under node v. 5.10.1 under Mac OS X 10.11.5
A valid app token on Ovh API see: [https://api.ovh.com/createToken/](Cretate Token)

## Runing the app

First of all you need to modify .env-dist with the values of the app token and save it as .env in this dir.

The app was though to run with the command
'''
# node /path/to/node-dynhost --zone example.com --subdomain mydynamicserver
'''

For more information about the usage run:
'''
# node . -h
'''

You should consider run it as cronjob every 5 minute (for example) its ok:

First of all if you have more crontab jobs you must do:
'''
$ crontab -l > mycronjobs
'''

***NOTE:*** if you do not know if you have exec first:
'''
$ crontab -l
'''
You should read "crontab: no crontab for" and your computer/server username.

'''
$ echo "*/5 * * * * node `pwd` --domain example.com --subdomain mydynamicserver" >> mycronjobs
$ crontab mycronjobs
'''

To delete the crontab job just exec
'''
$ crontab -e
'''
And delete the line of the crontab you do not want to exec anymore.

## License

See LICENSE.md file

## Author

Gabriel Trabanco <gtrabanco@fwok.org>
http://gabi.com.es