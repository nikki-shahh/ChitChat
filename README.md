# ChitChat

# Overview

ChitChat is a chat app for mobile devices, developed using React Native. The app will provide users with a chat interface and options to share images and their location.

<img width="244" height="424" src="https://github.com/nikki-shahh/ChitChat/blob/main/assets/image/IMG_6307.jpg" alt="A screenshot of the app's screens"> <img width="244" height="424" src="https://github.com/nikki-shahh/ChitChat/blob/main/assets/image/IMG_6312.jpg" alt="A screenshot of the app's screens">

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Firestore](https://firebase.google.com/)
- [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.


## Permissions

When the user decides to send a picture or share their location, the app will ask permission to access the camera roll and/or the user's location.
Granting the access to the app is necessary for the app to work correctly.
No data gets used or sent without the user's permission.
The data is stored locally on the user's device, and synched with the Firestore database when the device goes online.
The images are stored on Firebase Storage.

## Installation

### 0. Prerequisites

- Node and npm ([installation steps](https://nodejs.org/en/download/))
- Yarn or npm `npm install --global yarn` or `npm install -g npm`
- Expo `npm install expo-cli --global`
-Then, clone the repostory to your machine:
`https://github.com/nikki-shahh/ChitChat` 

### 1. Install dependencies

- From your terminal, navigate to the root folder of the project
- In your terminal, run `yarn install` or `npm install`

### 2. Run the app

- To launch the app run `expo start` or `npm start`
- Expo will start and a browser window will open, that gives you different options to execute the app on a device or emulator

### 3. Set up a device

- Download the Expo app on the device you want to use to run the app
- With your device, scan QR code or send a link via email to connect to expo
- The app will start on your device and you'll be able to use it 
or
- Install Xcode or Android Studio on your machine , in your terminal run i for iOS and a for Android
