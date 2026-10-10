import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
    safeArea: {
      flex: 1,
    },
    
    header: {
      paddingHorizontal: 24,
      paddingVertical: 32,
      paddingBottom: 35,
      paddingTop: 55
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    
    icon: {
      width: 65,
      height: 65,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center"
    },
    titleTextContainer: {
      flex: 1,
    },
    
    title: {
      fontSize: 40,
      fontWeight: "900",
      letterSpacing: -1,
      marginBottom: 4,
      color: colors.text,
    },
    IDtitle: {
      fontSize: 23,
      fontWeight: "500",
      color: colors.text,
      letterSpacing: -1,
      marginLeft: "5%",
      marginRight: "5%"
    },
    
    // FC - short for Flash Card
    FCcontainer: {
     flex: 1,
     alignItems: "center"
   },
   FCtitle: {
     fontSize: 22,
     fontWeight: "600",
     margin: 5,
     color: colors.text,
     textAlign: "center"
   },

   FCtext: {
     fontSize: 13,
     margin: 10,
     color: colors.text,
     textAlign: "center"
   },
  
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    width: '90%',
    
  },
  backText: {
    position: 'absolute',
    top: 0,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  testcontainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  buttonContainer: {
  backgroundColor: colors.primary,
    padding: 10,
    borderColor: colors.border,
    borderWidth: 3,
    width: 160,
    textAlign: "center"
  },
    
    buttonWrapper: {
      marginVertical: 12,
    },
    
    button: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 35,
      borderRadius: 20,
      margin: 15
    },
    buttonIndex: {
      flexDirection: "row",
      alignItems: "flex-start"  
    },
    
    buttonTextContainer: {
      flex: 1,
    },
    
    buttonText: {
      fontSize: 25,
      lineHeight: 24,
      fontWeight: 600,
      marginBottom: 16,
      marginTop: 16,
      marginRight: 16,
      color: colors.text,
    },

    searchBarWrapper: {
      margin: 15,
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },

    searchBar:{
      width: "90%",
      height: 50,
      flex: 1,
      color: colors.text,
      fontSize: 25
    },

    searchIcon: {
      margin: 10
    },

    noMatch: {
      textAlign: "center",
      fontWeight: 600,
      fontSize: 25,
      color: colors.text
    },

    image: {
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 55,
      borderBottomLeftRadius: 55,
      borderBottomRightRadius: 25,
      marginRight: '5%',
      marginLeft: '5%',
      width: '90%',
      height: 500,
      borderColor: colors.border,
      borderWidth: 3,
      marginTop: '8%'
    },

    IDdescription: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },

   textEverythingIs: {
    color: colors.text,
    textAlign:"center",
    fontSize: 25,
    fontWeight: 600
   },
   containerEverythingIs: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center"
   },

   flipIt: {
    padding: 50,
    fontSize: 28,
     fontWeight: "900",
     color: colors.text,
     textAlign: "center"
   }
  });

  return styles;
};