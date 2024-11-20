import { StyleSheet } from "react-native";

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
      backgroundColor: '#f0f0f0',
      width: '80%',
      padding: 10,
      borderRadius: 8,
      marginBottom: 8,
    },
    activeBubble:{
      backgroundColor: '#8794FF33',
    }
  });