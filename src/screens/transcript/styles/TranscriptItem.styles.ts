import { StyleSheet } from "react-native";
import { Colors } from "theme";

export default StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    alignRight: {
      alignItems: 'flex-end',
      marginLeft: 56
    },
    alignLeft: {
      alignItems: 'flex-start',
      marginRight: 56
    },
    chatBubble: {
      backgroundColor: Colors.backgroundWhite,
      width: '100%',
      maxWidth: 400,
      borderColor:Colors.border,
      marginTop:6,
      borderWidth:1,
      paddingHorizontal: 10,
      paddingVertical:12,
      borderRadius: 8,
      marginBottom: 8,
    },
    activeBubble:{
      backgroundColor: Colors.primary,
    },
    activeTextStyle:{
      color:Colors.accent,
    }
  });