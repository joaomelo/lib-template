# Libt

Libt is an optioned JavaScript library template. The code itself has no practical utility; it serves as a replaceable placeholder when using the template.

# Motivation

There are a lot of moving parts when we talk about building an npm library. The fundamental challenges found in the development of modern javascript apps are mixed with nuanced problems particular to the subject of npm packages. 

This repository is a personal approach to the problem. I accumulate here my continuous lessons regarding this subject.

# Getting Started

If you want to install the library from npm (i can not imagine why 😅), you do that by installing the library with npm.

    npm i @joaomelo/lib

There are two ways to start your library project using this repo as a template (now we are talking 🙂). The first is to clone the repo with git and install the dependencies.

    git clone https://github.com/joaomelo/lib.git
    npm i

The second is to create a repository directly in GitHub using this as a template. GitHub has specific instructions on how to do that [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)

From now on, we will explore the template components, but I should warn you about something before that.

> You will be faced with decisions I made that have abundant alternatives. You must not assume by any means that I am saying they are the best decisions regarding building an npm library. They worked enough for my use cases until now, but I'd be shameless to change them.

# Directory Structure

In the home directory, we find a lot of files from various development tools and four subdirectories.

``` js
📂home
  📁.github // github actions file for ci/cd pipeline
  📁.vscode // improves sanity with config for my editor
  📁demo    // app example that uses the lib code
  📁lib     // actual npm library code
```
We will go through all of them one way or another in the following sections.

# npm

Activate npm in the first step to start building our library. You will find the `package.json` file already initialized in the root directory. Don't forget to overwrite with your data the appropriate fields in there like `name` and `version`. 

It is essential to stress the care for the `main` entry since it will affect how people import our library after installing it.

Also worth mentioning that if you are posting a [scoped public library](https://docs.npmjs.com/using-npm/scope.html), the publish script must have the `--access public` parameter.

If you have any doubts, this npm [article](https://docs.npmjs.com/creating-a-package-json-file) has useful information about the ideal `package.json` file for npm libraries. 

Beyond `package.json`, one other important file related to npm setup is `.npmignore`. It tells npm what to not include in the package. Libt ignores everything that is not in the `lib\dist` folder. Npm will also add some files, no matter what. You can check more about ignoring data [here](https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package).

# Build Pipeline

Libt uses [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) to build a demo app and the final library code. 

## Webpack

The root folder has the `webpack.common.js` file with configuration shared between the demo and the library. Its content has typical instructions for linting and building js files with Babel.

Libt creates [source-maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) even for the library final output. I believe it is a fair game to give everyone using a library (including my future self) the ability to debug unexpected behavior.

The common build also uses the `CircularDependencyPlugin` to detect modules referencing each other. Although circular reference is a valid code, I fear it 😨 more then Balrogs. Those dependencies can give birth to nasty bugs very hard to track.

There are two other Webpack files, one in `demo/config/webpack.config.js` and the other in `lib/config/webpack.config.js.`

The demo Webpack config has aliases to make imports inside the code more accessible. It also anticipates the use of environment variables setting the `Dotenv` plugin. 

The lib config is more peculiar. The output property is set with options to make the bundle as flexible as possible to import. Nevertheless, I recommend that you check the excellent Webpack guide for [authoring libraries](https://webpack.js.org/guides/author-libraries/) to ensure this setup corresponds to your needs.

## Babel

Babel is used to compile code with JavaScript's newest features to a codebase compatible to an arbitrary target environment. Libt uses the` @babel/preset-env` package to compute the necessary conversions. 

The [Browserslist](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration) configuration file (`.browserslistrc`) has an environment string query that guides `preset-env` to the desired environment. Libt query uses Browserslist defaults, includes node, and rejects IE. 

The target environment is a particular decision for each project. I recommended you check Browserslist [docs](https://github.com/browserslist/browserslist) to choose a query that fits your goals. 

# Code Quality

Linting and testing are important techniques to deliver safe and useful libraries. Libt uses [ESLint](https://eslint.org/) and [Jest](https://jestjs.io/) for those tasks.

## ESLint

ESLint is very straightforward to setup. We need some packages and a `.eslintrc.js` configuration file.

Libt contains setup values and additional packages to use ESLint with the [standard](https://github.com/standard/eslint-config-standard) configuration. The lint file also has the proper content to integrate Jest.

## Jest

As of the time of this writing, I confess the struggle to develop using a healthy test mindset 😳. I find myself having difficulty to test async code, especially dealing with external calls to services like database or auth systems. But we only arrive at someplace if we start walking in its direction 😅. That's why Libt includes Jest.

Besides the package, there is an essential `jest.config` file set to record test coverage. The `package.json` also has a test script to lint and test the project and a start script, which will run tests continually while development is ongoing.  This way, it is easier to adopt a test-driven development methodology. 

# Time to Code

There are two placeholder codebases: one for the demo and another for the library package. They reside in `demo` and `lib` folders, respectively. We are using dummy code in both; the goal is just to make sure everything is tied and sound. 

## Lib

The library export an `Accumulator` class that instantiates objects with three methods: `add` the passed value to the object state, `value` returns the object state, and `clear` resets the object state to zero.

Inside the lib `src` sub-folder, we will also find Jest test files following their naming convention.

## Demo

The demo is an example app that uses the library but will not ship to npm. It resides in the repository to complement our documentation with a running code example.

The demo does not import the library from npm itself but directly from the lib folder. That way, we cannot assume that a working demo means everyone will import the library with a positive experience. Nevertheless, one can leverage the demo to test the final library distribution locally, but some work with [npm links](https://docs.npmjs.com/cli/link) will be needed.

I believe the demo app should be as vanilla as possible. Let's say you have a framework of choice and make your demo with it. An unfamiliar developer will probably be confused distinguishing if the framework code is related or even required to use the library.

There is also a dummy CSS file to simplify styling. Just overwrite what is there, and we should be good to go. Just type `npm run dev:demo` in the command line.

## Git and Continuous Integration

The way we git has a massive impact on Libt because of the use of GitHub Actions.

Inside `.github` folder, there is an `npm-publish.yml` file. This file specifies a script to run every time a git push occurs on the remote master branch. 

The script will bump the library version accordingly to the last [commit message](https://github.com/phips28/gh-action-bump-version#workflow) and run the `npm test` script. If everything goes well, it will publish the new library version to npm. 

For that last part to work, you must save your [npm key as a secret](https://help.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages#publishing-packages-to-the-npm-registry) in the repo settings.

That workflow makes the master branch very sensitive. It is essential to keep ongoing development in secondary branches. Maybe consider even [restricting pushes to master](https://help.github.com/en/github/administering-a-repository/enabling-branch-restrictions) and enforce "pull requests" with test conditions.

If you don't like that approach just delete the `.github` folder or adjust the trigger event in the `npm-publish` file.

# Editor Configuration

We are almost done here. The last thing to mention is the VS Code configuration. 

Inside `.vscode` folder, there is a file that set VS Code's debug feature to use a specific profile in Chrome. That is useful to debug stuff without browser extensions getting in the way.

Another file related to VS Code is `jsconfig.json`. It sits in the project root directory and explicitly tells VS Code that this is a JavaScript (not a TypeScript) project. I had some hard editor conflicts in the past. The file also makes the editor recognize folder aliases used in Webpack configuration. 

If you don't use VS Code or have your setup, just delete `.vscode` folder and `jsconfig.json` file.

## Wrapping up

That was a lot. Thank you for staying until the end 🙏.

I hope you find Libt useful. Reinforcing what I said before, there is no ambition to sell this as the ultimate sharp edge template for npm libraries. I learned some lessons in the small-time I am programming, this template is an effort to share them.

I would be glad to hear any feedback from you.

# License

Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.