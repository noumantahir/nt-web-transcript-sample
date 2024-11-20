import { StyleSheet } from "react-native";
import { Colors } from "theme";

export default StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden', // Ensures fill bar stays within the bounds
        backgroundColor: Colors.primary,
        height: 8,
    },
    fillBar: {
        height: '100%',
        backgroundColor:Colors.accent,
        borderTopRightRadius:4,
        borderBottomRightRadius:4
    },
});