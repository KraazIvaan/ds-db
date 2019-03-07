// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAFkkKWxAz_zMavD0X7qnjwb3zzP3cryKQ",
    authDomain: "rm-ds-db.firebaseapp.com",
    databaseURL: "https://rm-ds-db.firebaseio.com",
    projectId: "rm-ds-db",
    storageBucket: "rm-ds-db.appspot.com",
    messagingSenderId: "680883852831"
  }
};
