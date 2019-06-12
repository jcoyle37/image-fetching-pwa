# Image Storage & Fetching PWA
Progressive Web App which allows user to download images then retrieve them while offline.

## Getting Started
1. Run *npm install* to install dependencies
2. Run *gulp* command to initialize development server. **Note:** Since this uses a service worker designed to cache files for offline use, you will likely need to clear local site storage when making certain updates. Do so via the *Application* tab in Chrome DevTools.
3. When finished, your compiled project will reside within the contents of the */dist* folder

## Built With
* [gulp](https://www.npmjs.com/package/gulp) - Browser auto-refresh on save and babel transpiler
* [localForage](https://github.com/localForage/localForage) - Library used to store data locally in IndexedDB

## Acknowledgments
* Special thanks to **Dominik Fiala** for his helpful article on [generating PWA icons](https://dev.to/dominikfiala/hassle-free-pwa-icons-and-splash-screen-generation-3c24)