# Mesh React-Native TypeScript Boilerplate

This repository contains the source code for a `React-Native` application built with `react-native init` written in `TypeScript`.

[![CircleCI](https://circleci.com/gh/meshhq/react-native-boilerplate.svg?style=svg)](https://circleci.com/gh/meshhq/react-native-boilerplate)

## Rationale

We wanted to create a repository that allows developers to reap all the benefits of cross-platform development, `TypeScript`, unit testing with `jest`, UI testing with `detox`, easy networking with `axios`, and simple local storage with `Realm` without having to fight through all of the configuration.

(For more information on any of these tools see [Tooling](#tooling) below).

## Objective

Have an 'out of the box' application that developers can use to instantly start working on features and UI instead of spending time configuring their workspace.

## Tooling

[react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html) - We'll use this to create the project. This was chosen over `create-react-native-app` (`CRNA`) because we want to be able to link libraries to the native project files.

[TypeScript](https://www.typescriptlang.org/docs/home.html) - We wanted to create a development environment with strongly typed classes and objects.

[react-native-navigation](https://github.com/wix/react-native-navigation) - Provides native platform navigation on both iOS and Android. In this app, we're using `Navigation.startTabBasedApp()` to create a Tab Navigator container. (See docs [here](https://wix.github.io/react-native-navigation/#/usage))

[jest](https://facebook.github.io/jest/docs/en/getting-started.html) - `jest` ships with React-Native so we're going to use it for our unit tests. Since `jest` is curated by Facebook (much like React Native) so responses to React Native/ `jest` issues should be fast and reliable.

[detox](https://github.com/wix/detox) - `detox` end-to-end testing build for mobile. `detox` is currently set up to test UI components.

[axios](https://github.com/axios/axios) - `axios` is a clean, promise-based, HTTP library built for browser and `node.js`. This application ships with a very simple User Model and built in `CRUD` actions to manipulate that model. We mock these responses in the `UserStore.test.js` file using `nock`.

[nock](https://github.com/node-nock/nock) - `nock` is a HTTP mocking library. We're using this to mock responses in the test suite.

[Realm](https://realm.io/blog/introducing-realm-react-native/) - `Realm` is used to create our local store. `Realm` is great since the tightly defined schema used in the create function lines up nicely with our `TypeScript` model interfaces.

[Watchman](https://facebook.github.io/watchman/) - `Watchman` is used to track files by React Native so it knows when changes are made and can reload the app.

## Getting Started

To begin - you'll need [Homebrew](https://brew.sh/), [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio/), and [node](https://nodejs.org/en/) to get started.

After you have those programs installed and updated use the following directions to set up and run the project.

Update Homebrew so you have the latest version.

```
brew update
```

Install Watchman using Homebrew.

```
brew install watchman && brew upgrade watchman
```

Install the utilities needed for `detox` to communicate with the Xcode simulators.

```
brew tap wix/brew
brew install applesimutils
``` 

Install the `detox` cli.

```
npm install -g detox-cli
```

Clone this repository to your local machine.

```
git clone git@github.com:meshhq/react-native-boilerplate.git
```

Navigate into the root of the cloned directory and install the dependencies.

```
yarn
```

Run the application on the Xcode simulator with:

```
react-native run-ios
```

Note: Running the project on the Android emulator is a little more involved. Get information on setting up an emulator [here](https://developer.android.com/studio/run/emulator).

## Running Tests

To run the entire test suite (both Unit Tests and UI Tests) run the following from the root directory.

```
yarn test
```

To isolate the Unit Tests run the following:

```
yarn jest
```

To isolate the UI Tests run the following:

```
detox build && detox test
```

## Project Structure

The following section will briefly cover the consequential Files and Directories contained in this project's root.

Note: There are a few files used as placeholders that can be removed when using this repository. These will be marked with *Can be deleted*.

| File/Directory  | Purpose       |
| --------------- |:-------------:|
| __tests__       | This directory contains all of the Unit Tests that will be run with `jest`. Note that the `detox` UI tests will *not* be contained in this directory. |
| .circleci       | Contains the Circle CI configuration `YAML` file. For more information go [here](https://circleci.com/docs/1.0/configuration/) |
| android         | This contains all of the native Android code generated by `react-native init`. |
| assets          | A couple place holder images used by the TabNavigation container. *Can be deleted* |
| e2e             | Contains the end-to-end test files run with `detox`. Does *not* contain unit tests run with `jest`. This directory also contains the `init.js` that pulls config options out of the project's `package.json`. |
| ios             | This contains all of the native iOS code generated by `react-native init`. |
| models          | This directory exports model schemas and local storage services. It currently contains a simple User model that is integrated with `Realm` and has test coverage in `./__tests__/models/UserStore.ts` |
| navigation      | Contains a `constants.ts` file that defines the style of the Tab Navigator created in `App.tsx`. It also has two components (`HomeScreen.tsx` and `DetailScreen.tsx`) These are used to demonstrate how the App's navigation works and *can be deleted* |
| services        | Contains all of the files meant to interact with remote resources using `axios`. This is currently not set up to interact with anything but the `UserService.ts` is ready to be plugged in to a server. |
| utilities       | Will be used to house general utilities used throughout the app and in the test suite. |
| App.tsx         | The entry point for the app - this is where we set up the root navigation component and initialize the local store. |

## File Architecture Recommendations

The following section will offer recommendations on how/where to create files to best utilize the structure of this project.

### Models

*See `User.ts` and `UserStore.ts` for reference*

The model files are meant to serve three main purposes. The first is to define the model's properties so our static compiler will throw relevant warning when the model is used throughout the app (see lines 17-37 in `User.ts`). 

The second is to define the `Realm.ObjectSchema` that we'll pass in the `Realm` constructor when creating a store (see `User.ts` line 44 and `/models/index.ts` line 5).

The third is to provide any interfaces needed to define which of the model's properties can be written/ updated by User input. For example, a `username` is writable by the User where an object `UUID` is not (see `User.ts` line 9).

The model store file will handle all of the model's `CRUD` actions and any data verification necessary. Each store class will accept a `Realm` object when it's instantiated - that `Realm` repository will be used with in the `CRUD` actions.

### Navigation

*See `/navigation/index.ts`, `HomeScreen.tsx`, and `DetailScreen.tsx` for reference*

In `react-native-navigation`, all components need to be registered so they can later be referenced by the `Navigator` passed to each component via `props` (see `/navigation/index.ts` line 15 for register and line 19 for component navigation props).

We recommend using the following format for naming registered components - `{TabBarName}.{ScreenName}`.

See an example of how to navigate to a registered component in `HomeScreen.tsx` line 23.

### Services

*See `UserService.ts` for reference*

Service files are meant to handle remote `CRUD` actions by using `axios` HTTP requests. This is not functional yet since there is no remote resource we have set up. Note that if you do have a server set up - you just need to change the value of the `baseURL` on line 4 of `UserService.ts`.
