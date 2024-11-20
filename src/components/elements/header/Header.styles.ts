import { Platform, StyleSheet } from "react-native";
import { Colors } from "theme";

export default StyleSheet.create({
    container: {
      width: '100%',
      height: Platform.select({
        android:56,
        ios:44,
        web:60
      }),
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
  });
  