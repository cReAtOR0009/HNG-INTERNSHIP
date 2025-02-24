import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // openController: {
  //   position: "absolute",
  //   width:50,
  //   height:50,
  //   flex:1,
  //   alignItems:"center",
  //   bottom: 5,
  //   right: 10,
  //   padding: 10,
  //   backgroundColor: "#007bff",
  //   borderRadius: 10,
  // },

  loaderContainer:{
    flex:1,
    backgroundColor:"white"
  },
    container: {
      flex: 1,
      backgroundColor: "#1e1e1e",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
    },
    controlsContainer: {
      position: "absolute",
    //   backgroundColor:"red",
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      bottom: 20,
      left: 0,
      right: 0,
    //   flexDirection: "row",
    //   justifyContent: "space-between",
      // paddingHorizontal: 20,
    },
    dPadWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 150, // Fixed size for the D-pad
      height: 150, // Fixed size for the D-pad
      position: "relative",
    },
    dPadButton: {
      position: "absolute",
      backgroundColor: "#333",
      borderRadius: 10, // Circular buttons
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5, // Shadow for depth
    },
    dPadText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 24,
    },
    dPadUp: {
      top: 0,
      left: "50%",
      transform: [{ translateX: -30 }], // Center horizontally
    },
    dPadDown: {
      bottom: 0,
      left: "50%",
      transform: [{ translateX: -30 }], // Center horizontally
    },
    dPadLeft: {
      left: 0,
      top: "50%",
      transform: [{ translateY: -30 }], // Center vertically
    },
    dPadRight: {
      right: 0,
      top: "50%",
      transform: [{ translateY: -30 }], // Center vertically
    },
    characterContainer: {
      alignItems: "center",
      display:"flex",
    //   backgroundColor:"green",
      
    },
    characterLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 10,
    },
    characterButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent:"center",
      alignItems:"center",
      marginInline:10,
      gap:20,
    //   backgroundColor:"red"
    },
    toggleContainer:{display:"flex", flexDirection:"row", gap:10},
    toggleCharacter:{

    },
    toggleCharacterButton:{
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#333",   
    },
    buttonAnimationContainer: {
      flexDirection: "row",
      gap: 10,
    },
    button: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: "#333",
    },
    moveButton: {
      backgroundColor: "#3498db", // Blue color for movement buttons
    },
    buttonSymbol: {
      fontSize: 24,
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    triangleButton: {
      backgroundColor: "#ff4757",
    },
    circleButton: {
      backgroundColor: "#2ed573",
    },
    crossButton: {
      backgroundColor: "#ffa502",
    },

    openAddModel:{
      position:"absolute",
      top:0,
      right:10,
      padding:10,
      backgroundColor:"#007bff",
      borderRadius:10

    },
    openController: {
      position: "absolute",
      top: 0,
      left: 10,
      padding: 10,
      backgroundColor: "#007bff",
      borderRadius: 10,
    },
  });