# SimpleAR Editor

SimpleAR Editor is an Augmented Reality Authoring Tool using [Google Blockly](https://developers.google.com/blockly/). With visual programming you can create augmented reality apps.

## Installing / Getting started

1. Clone this repository
2. Install NPM
3. Run the following commands:

```shell
npm install
npm start
```

This will start an Angular client server on localhost:4200, open your browser in this URL.

### Firebase configuration

Create a new Firebase app on the [Firebase console](https://console.firebase.google.com/) with your Google Account by clicking on ``Add project`` and typing a name for your app.

After that click on ``Add Firebase to your web app``, and replace the config info (available under Authentication tab, then click on Web Setup on the upper right corner) on the ``environment.firebase`` fields into [src/environments/environment.ts](src/environments/environment.ts), do the same to [src/environments/environment.prod.ts](src/environments/environment.prod.ts).

Go to Database (Enable Realtime Database) > Rules, and enable anonymous access by copying the following on the text box:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Poly API configuration

Follow the [Poly API Guide](https://developers.google.com/poly/develop/api) to get a Poly API Key, then replace the API key on the ``environment.poly.apiKey`` into [src/environments/environment.ts](src/environments/environment.ts), do the same to [src/environments/environment.prod.ts](src/environments/environment.prod.ts).

## Developing

After following the steps from [Getting started](#installing--getting-started), do the next steps:

1. Install Angular CLI

```shell
npm install -g @angular/cli
```

2. To prevent your keys from being exposed on Github, use the following commands:

```shell
git update-index --assume-unchanged src/environments/environment.ts
git update-index --assume-unchanged src/environments/environment.prod.ts
```

## Licensing

The code in this project is licensed under [MIT License](LICENSE.md).