# Omakase Frontend

This is a _blank_ project pre-configured with somr tools and tweaks that I find useful. It can be used to practice React.js or even HTML and css. Just clone the repo and run:

```bash
# To download the nessecary packages
npm install
#Then to run on browser
npm run dev
```

## Vite

The project was created with Vite and I have made the following [tweaks](vite.config.js) on top of the default configuration:

- Uses absolute imports

```js
//correct
import CustomButton '@/components/custom-button'
//wrong
import CustomButton '../../components/custom-buttom'
```

- Uses '' instead of "" for strings
- The names of module.css classes are converted from kebab-case to camelCase automatically

## Included Plugins:

The following are plugins that help with writting code(css, html, javascript). You don't need to do anything.

- eslint packages installed and [configured](eslint.config.js)
- prettier code formatter installed and [configured](.prettierrc)

## Which VS Code extensions do I need?

I have created [this guide](https://github.com/tBaronDar/webdev-essential-tools/blob/main/README.md)
