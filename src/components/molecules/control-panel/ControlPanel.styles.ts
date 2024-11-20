import { StyleSheet } from "react-native";
import { Colors } from "theme";

export default StyleSheet.create({
    container: {
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      borderTopWidth:1,
      backgroundColor:Colors.background,
      borderColor: Colors.border,   
      borderBottomLeftRadius:16,
      borderBottomRightRadius:16,
    },
    controlPanel: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-around', 
      paddingTop: 18,        
    },
  
  });