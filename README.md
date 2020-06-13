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

> You will be faced with decisions i made that have abundant alternatives and you must not assume by any means i am saying the ones bellow are the best. They work enough for my use cases that i am not looking for replacement right now. I'll be shameless to change then at any moment they limit my workflow but also have no desire to update them to the latest tech while working fine.

# Directory Structure

In the home directory we find a lot of files from various developemnt tools we will explore later and five subdirectories

``` js
📂home
  📁.github // github actions workflow file for ci/cd pipeline.
  📁.vscode // improves sanity with config for my editor of choice.
  📁demo    // files for an example working app that uses the lib code.
  📁lib     // actual npm library code.
```
We will go through them one way or another in the folling sections.

# npm

Npm in the first place to start building our library. After initializing `package.json` the first things to attend are the package name, the location of the library entry point and npm scripts that will be used during development. 

``` json
  "name": "@joaomelo/lib",
  "main": "lib/dist/index.js",
  "scripts": {
    "start": "webpack-dev-server --config demo/config/webpack.config.js",
    "lint": "eslint */src/**/*.js",
    "test": "jest",
    "build": "rimraf lib/dist/* webpack --config lib/config/webpack.config.js",
    "deploy": "npm run build && npm publish --access public"
  },
```

There things above that will be attended later is this file like test and build tools and other that are not shown that de default `npm init` command will take care. I will highlight the care for the `main` entry that affects how people import you library after installing it and the the need to sync deploy script and library name.

If you are publishing a public library but using scoping it under you username like i did in `@joaomelo/lib` , the publish script must have the `--access public` parameter.

This [article](https://docs.npmjs.com/creating-a-package-json-file) and it series have useful information about the ideal `package.json` file for npm libraries. 

One other important file related to npm setup is the `.npmignore`. It tells npm what to include in the package. The template approach is to ignore everything that is not in the `lib\dist` folder. Npm will also include some files no matter of what we write here. You can check more about the file [here](https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package).

# Build Pipeline

The template uses webpack and babel to build demo and library code. 

## Webpack

The root folder has a `webpack.common.js` with shared configuration between the demo and library. The is the typical linting and build of js files with babel.

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

The package and `jest.config` config files are set to test the library code and provide information on test coverage.

To test the library just run the `npm test` command.

# Code We Will

There are really two placeholder code bases one for the demo and other for the library that will be distributed. We are using a silly example just to make sure averything is tied. The library export a `Accumulator` class that creates objects with three methods: `add` wich adds the value to the accumulator states, `value` that returns the accumulator and `clear` that resets the accumulator state to the initial zero value.

## Demo

The demo is a app that uses the library. It is useful to present a library use case to other developers, running code sometimes can be more pedagogical then documentation.

The demo do not import the library from npm itself but directly from the lib page. So do not assume that a working demo means everyone thats import your library will have a positive experience. You can leverage the demo to test the final library distribution locally but you will need to do some work with [npm links](https://docs.npmjs.com/cli/link).

I think demo should have as vanilla as possibile to not confuse who is seen the code. Let's say you have a framework of choice and make your demo with it. An unfamiliar developer maybe have trouble to distinguish wich of your framework is related to the library usage model. That's no cool. So the code on the template aims to stimulate that. 

There is a basic css file to make simple to just overwrite what is there.

## Lib

As stated before the lib exports a simple class. Inside the lib `src` sub-folder we will also find the jest test files following their naming convention. If we type `npm start` in the command line, the script will run Jest in a continuos watch mode, so one can write their library business and test code while watching the tests results evolving in the command line. Like that, is easier to adopt test driven development methodology. 

## Git and Continuos Integration

The way we git has a huge impact in this template because of the use of Github Actions.

Inside `.github` there is a `npm-publish.yml` file that specifies a script that will run every time there is a push to the remote master branch. 

The script will bump the library version accordingly to the last [commit message](https://github.com/phips28/gh-action-bump-version#workflow) and run the test script. If everything went well, it will publish the new version to npm. For that last part to work you must [save your npm key as a secreted](https://help.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages#publishing-packages-to-the-npm-registry) in the repo.

That workflow make the master brach very sensitive. It is important to keep ongoing development in branches. Maybe consider even [restricting pushes to master](https://help.github.com/en/github/administering-a-repository/enabling-branch-restrictions) if not coming from pull requests.

If you don't like that approach make sure to delete the `.github` folder or adjust the trigger event in `npm-publish` file to the desired flag.

# Editor Configuration

We are almost done. Last thing to mention are  my VS Code config files. Inside `.vscode` folder there is file that setup the debug to use a debug profile I made in chrome. That is useful to debug stuff without extensions getting in the way.

Another file related to VS Code is `jsconfig.json` and it sits in the priject root directory. It is there to explicit tell VS Code that this is a JavaScript (and not a TypeScript) project. I had some editor conflicts in the past. The file also makes the editor recognize the folder alias used in the webpack configuration. 

If you don't use VS Code or have your own setup, just delete the `.vscode` folder and `jsconfig.json` file.

## Wrapping up

That was a lot. Thank you for reading all this.

I hope you find template useful. Reforcing what i said before, there is ambition to sell this as the ultimate sharp edge template for npm libraries. I have acumulated some lesson in the small time i am programming and made a effort to share something that is working for me.

I would be glad to hear any feedback from you.

# License

Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.