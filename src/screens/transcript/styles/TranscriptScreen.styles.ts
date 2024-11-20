import { StyleSheet } from "react-native";
import { Colors } from "theme";

export const CONTENT_WIDTH_THRESHOLD = 700

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:Colors.backgroundScreen
    },
    wideContainer:{
      alignItems:'center'
    },
    content: {
      flex: 1,
    },
    wideContent: {
      width:CONTENT_WIDTH_THRESHOLD,
      margin:56,
      borderRadius: 16, 
      shadowOpacity: 0.2, 
      shadowRadius: 5, 
    },
    listContent: {
      flex: 1,
      backgroundColor:Colors.background,
      padding: 16,
      maxWidth: 700,
    }
  });