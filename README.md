# Libt

An optioned javascript template library. It aims to make npm packages development more straight forward. The code itself has no practical utility; it serves as a placeholder to be replaced by developers using the template.

# Motivation

That are a lot of moving parts when we talk about building a npm library. There are the basic challenges of almost all modern javascript apps like how to lint, compile and build the code, but there is also nuanced problems particularry to the subject of npm packages like with module system will be able to import the final package and should aim to maximum compress or favor readability of the lib code by whom imported it?

The library template is a personal approach to the problem.

# Getting Started

If you want to install the library from npm (i can not image why 😅), you do that installing the library in a project with npm.

    npm i @joaomelo/lib

To start a library project using this repo as a template (now we are talking 🙂) there two ways. The first is clone the repo with git.

    git clone https://github.com/joaomelo/lib.git

Or create a repository directly in github using this as a template. Github has specific instructions how to do that [here] (https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)

From now on, we are going to explore the library pieces. And i should wanr you about something before that.

> You will be faced with decisions i made that haveabundant alternatives and you must not assume by any means i am saying the ones bellow are the best. They work enough for my use cases that i am not looking for replacement right now. I be shameless to change then at any moment they limit my workflow.

# Directory Structure

In the home directory we find a lot of files from various developemnt tools we will explore later and five subdirectories

``` js
📂home
  📁.github // workflow file for github actions ci/cd pipeline.
  📁.vscode // improves sanity with config for my editor. you can just delete it or replace with your own. 
  📁config  // config folder has webpack common configuration file.
  📁demo    // files for an example working app that uses the lib code.
  📁lib     // actual npm library code.
```
We will go trhougth them one way or another in the folling sections.

# npm

Npm in the first place to start building our library. After initializing `package.json` the first things to attend are the package name, the location of the library entry point and npm scripts that will be used during development. 

``` json
  "name": "@joaomelo/lib",
  "main": "lib/dist/index.js",
  "scripts": {
    "start": "webpack-dev-server --config demo/cfg/webpack.config.js",
    "lint": "eslint */src/**/*.js",
    "test": "jest",
    "build": "rimraf lib/dist/* webpack --config lib/cfg/webpack.config.js",
    "deploy": "npm run build && npm publish --access public"
  },
```

There things above that will be attended later is this file like test and build tools and other that are not shown that de default `npm init` command will take care. I will highlight the care for the `main` entry that affects how people import you library after installing it and the the need to sync deploy script and library name.

If you are publishing a public library but using scoping it under you username like i did in `@joaomelo/lib` , the publish script must have the `--access public` parameter.

This [article](https://docs.npmjs.com/creating-a-package-json-file) and it series have useful information about the ideal `package.json` file for npm libraries. 

# Build Pipeline

The template uses webpack and babel to build demo and library code. TheIn the config folder there is a `webpack.common.js` with little shared configuration between the demo and library.

## Webpack

The is the typical linting and build of js files with babel.

It defaults to using source-maps evening in the library output. I find fair to give everyone using a library (including my future self), to be able to debug any unexpected behavior.

There is also the use of `CircularDependencyPlugin` with detect modules referecing each others. Although that valid code, i fear them 😨 more then Balrogs. Those dependencies can give birth to nasty bugs very hard to track.

There is also two other webpack files one in the `demo/config/webpack.config.js` and other in `lib/config/webpack.config.js`.

The demo webpack config has a typical development configuration. There alias to make imports inside the code easier and anticipates the use of env with the `Dotenv` plugin files to setup access to database and apis. 

The lib config is more peculiar because it address the creation of js libraries. The output property has options to make the library more flexible as possible to my knowledge. But is recommend that you check the excellent  webpack guide for [authoring Libraries](https://webpack.js.org/guides/author-libraries/) to make sure this setup corresponds to your needs.

## Babel

Babel is used to compile javascript newest features used in the library code to a code base compatible to the library target environment. 

The temptable uses `@babel/preset-env` that computes the necessary conversion dynamically. You can read more about it [here](https://babeljs.io/docs/en/babel-preset-env).

That will create a clean `babel.config.js` file. But `preset-env` depends on a [Browserslist](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration) configuration that will tell babel to which enviroment comppile to. 

That environment information is saved as enviroment query on `.browserslistrc` file. That is a very particular decision for each project. So I recommended  you check Browserslist [docs](https://github.com/browserslist/browserslist) to make sure the file query is fitted to the project. This template use the project defaults, includes nodes and rejects IE. 

# Code Quality

Linting and testing are important techniques to delivery safe ans useful libraries. The template use [ESLint](https://eslint.org/) and [Jest](https://jestjs.io/) for those tasks.

## Lint Setup

ESlint is very straightforward to setup. We need some packages and a `.eslintrc.js` configurations file.

This template already contains the configuration file content and additional packages to use ESLint with the [standard](https://github.com/standard/eslint-config-standard) configuration. The lint file also have the proper content to integrate Jest.

## Jest

I will admit that as time of this writing i struggle to development using a strong test mindset. I find myself have difficulty to get out of corners when i need to test async code specially dealing with external calls to services like database or auth systems 😳. 

But we only arrive at someplace if we start walking to its direction 😅. That's why Jest is here.

The package and `jest.config` config files are set to test the libraries files and provide information on code coverage.

## .github and .gitignore

The directory holds the all github action workflows for a project. Is this case we have just one. It will respond to every git push to the master branch by testing, updating the package version and publish it in npm.

The intension I wrote a [blog post]() that details the workflow and you can read it to get more insight on how to use the workflow



## Wrapping up

Ending message recapitulating usage. Maybe inform about pitfalls or trade-offs involving the library usage.

# Testing and Demo

If available, inform how to clone and install the package. Also instruction to run the demo and tests. If involved in the process, describe how environment variables are injected.

# License

Made by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for detailsgit pull