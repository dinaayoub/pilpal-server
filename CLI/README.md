# Command Line Interface for message board

## Usage

  usage:
    msg <command> <arguments>

    commands can be:

    signup <username> <password>:                   used to create a new user
    signin <username> <password>:                   used to authenticate with the server
    create <-t title (optional)> <message>:         used to create a new message
    read:                                           used to retrieve all messages (authentication not required)
    update <id> <-t title (optional)> <message>:    used to update a message (admin only)
    delete <id>:                                    used to delete a message (admin only)
    help:                                           used to print the usage guide

## References:

* [How to build command line applications with node.js](https://www.digitalocean.com/community/tutorials/how-to-build-command-line-applications-with-node-js)