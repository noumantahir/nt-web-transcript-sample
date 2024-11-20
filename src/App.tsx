import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TranscriptScreen } from "screens";


const App = () => {

    //NOTE: This is where router and othere store related initialisations can be referenced
    //but for demo only referencing to single trasncript screen
    return (
        <SafeAreaProvider>
            <TranscriptScreen />
        </SafeAreaProvider>
    )
}

export default App;
