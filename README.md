# Sample React Native Audio Transcriber App

The app is part of an assessment process and should not be considered a final product. 

🚀 [**Try Live App**](https://brilliant-cocada-ec4b19.netlify.app/) 🚀

This is a simple React Native application designed to serve as a basic audio transcriber. The app accepts uses language audio and transcript metadata as inputs, plays the audio, and highlights the corresponding spoken phrases in real-time. The goal is to create an interactive experience where users can listen to the audio while the spoken phrases are visually emphasized on the screen.

**Features**
- Auido Play/pause web and native
- Phrase highlight based on current time
- Next button seeks to next phrase
- Prev button playbacks current phrase
- Prev button seeks to previous phrase if tapped under 700ms

**Extra Features**
- Phrase item playbacks by tapping on them
- Scroll to phrase being played if not already on screen
- smooth animations -- `entry phrases`, `entry panel`, `phrase switch`, `play button`

### Screenshots

<img width="293" alt="Screenshot 2024-11-21 at 00 10 01" src="https://github.com/user-attachments/assets/da2acafe-34d5-42ca-af50-989ced340052">
<img width="1280" alt="Screenshot 2024-11-21 at 00 10 53" src="https://github.com/user-attachments/assets/a3861459-0c3d-4a9e-890c-0c0041f0c742">


### Video Demo

Mobile Demo
https://github.com/user-attachments/assets/adfb337f-1ba4-4472-931d-730579744366


Web Demo
https://github.com/user-attachments/assets/7f9bd7a1-5bdb-446a-a599-2cd2d169d996




# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# install pods if required
npx pod-install

# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Build for Web

To build and run the app for the web, follow the instructions below:

### 1. Install Webpack

Before you can build the app for the web, you need to install **Webpack** and its dependencies.

Run the following command to install Webpack using Yarn:

```bash
# Using Yarn
yarn add webpack webpack-cli webpack-dev-server --dev
```

### 2. Run Web Version
Once Webpack is installed, you can start the app on the web by running:

```bash

# Using Yarn
yarn web
```

This will launch the app in your default browser. The application will be live at http://localhost:8080 by default.

### 3. Build for Production
To package your app for production, use the following command to create an optimized build:

```bash
# Using Yarn
yarn web:build
```

This will generate a production-ready build of your app and output it in the build/ directory. You can then deploy this build to your web server or hosting service.
