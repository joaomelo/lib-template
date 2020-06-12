# Lib

This is a optioned javascript template library that aims to make development of npm packages more straight forward. The code itself has no pratical utility. The point is to serve as placeholder to actual features to be developed using the template.

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

# Files and Directory Structure

In the home directory we find a lot of files from various developemnt tools we will explore later and four subdirectories and some them with subdirectories of their own:

```
- home
  - .github
  - .vscode
  - config
  - demo
    - config
    - dist
    - src
  - lib
    - config
    - dist
    - src
  .browserslistrc
  .eslintrc.js
  .gitignore
  .npmignore
  babel.config.js
  jest.config.js
  jsconfig.json
  LICENSE
  package.json
  package-lock.json
  README.md
```

Those directories and files serve as a guide to present the library template. Talking about them is the canvas for the technical decisions aournd this arranjement we have here.

I built a series of posts following a order that i imagine is the most pedagogical one. And go on the series like we were creating the library from scratch. You can read the posts from the links bellow.

- Creating a NPM library from Scratch: XXX  pt 1  



# npm



## .github and .gitignore

The directory holds the all github action workflows for a project. Is this case we have just one. It will respond to every git push to the master branch by testing, updating the package version and publish it in npm.

The intension I wrote a [blog post]() that details the workflow and you can read it to get more insigth on how to use the workflow

## Another feature

Same as last one.

## Wrapping up

Ending message recapitulating usage. Maybe inform about pitfalls or trade-offs involving the library usage.

# Testing and Demo

If available, inform how to clone and install the package. Also instruction to run the demo and tests. If involved in the process, describe how environment variables are injected.

# License

Made by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details