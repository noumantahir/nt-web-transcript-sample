/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { createRoot } from 'react-dom/client';


//START: integrate vector icons
//ref:https://www.npmjs.com/package/react-native-vector-icons#web-setup

// Generate the required CSS
import Entypo from 'react-native-vector-icons/Fonts/Entypo.ttf';
const EntypoStyles = `@font-face {
  src: url(${Entypo});
  font-family: Entypo;
}`;

// Create a stylesheet
const style = document.createElement('style');
style.type = 'text/css';

// Append the iconFontStyles to the stylesheet
if (style.styleSheet) {
    style.styleSheet.cssText = EntypoStyles;
} else {
    style.appendChild(document.createTextNode(EntypoStyles));
}

// Inject the stylesheet into the document head
document.head.appendChild(style);
//END: integrate vector icons

//app registry
AppRegistry.registerComponent(appName, () => App);

const root = createRoot(document.getElementById('root'));
root.render(<App />);

