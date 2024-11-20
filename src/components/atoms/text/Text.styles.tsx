import { StyleSheet } from "react-native";
import { Colors } from "theme";

export default StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bodyText: {
        fontSize: 17,
        marginBottom: 4,
        fontWeight: '600',
        color: Colors.textPrimary
    },
    labelText: {
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 4,
        color: Colors.textBlack
    },
    captionText: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
});
