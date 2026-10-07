import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    // need
    container: {
      flex: 1,
    },
    //need
    safeArea: {
      flex: 1,
    },
    // need
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
    // need
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
    // need
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
    
    // Learn-review styles
    // FC - short for Flash Card
    FCcontainer: {
     flex: 1,
     justifyContent: 'center'
   },
   FCtitle: {
     fontSize: 22,
     fontWeight: 600,
     margin: 10,
     color: colors.text
   },

   FCtext: {
     fontSize: 18,
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
    justifyContent: 'center',
    
  },

  buttonContainer: {
  backgroundColor: colors.primary,
    padding: 10,
    borderColor: colors.border,
    borderWidth: 3
  },
    
    inputSection: {
      paddingHorizontal: 24,
      paddingBottom: 12,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 16,
    },
    input: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 17,
      maxHeight: 120,
      fontWeight: "500",
      backgroundColor: colors.backgrounds.input,
      borderColor: colors.border,
      color: colors.text,
    },
    inputFocused: {
      borderColor: colors.primary,
    },
    addButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonDisabled: {
      opacity: 0.5,
    },
    todoList: {
      flex: 1,
    },
    todoListContent: {
      paddingHorizontal: 24,
      paddingBottom: 100,
    },
    emptyListContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    // ned
    buttonWrapper: {
      marginVertical: 12,
    },
    // need
    button: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 35,
      borderRadius: 20,
      margin: 15
    },
    // need
    buttonTextContainer: {
      flex: 1,
    },
    // need
    buttonText: {
      fontSize: 25,
      lineHeight: 24,
      fontWeight: "600",
      marginBottom: 16,
      marginTop: 16,
      marginRight: 16,
      color: colors.text,
    },

    // need
    searchBarWrapper: {
      margin: 15,
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },

    //need
    searchBar:{
      width: "90%",
      height: 50,
      flex: 1,
      color: colors.text,
      fontSize: 25
    },

    // need
    searchIcon: {
      margin: 10
    },

    //need
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

    todoActions: {
      flexDirection: "row",
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    editContainer: {
      flex: 1,
    },
    editInput: {
      borderWidth: 2,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 17,
      fontWeight: "500",
      marginBottom: 16,
      backgroundColor: colors.backgrounds.editInput,
      borderColor: colors.primary,
      color: colors.text,
    },
    editButtons: {
      flexDirection: "row",
      gap: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
    },
    editButtonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    emptyText: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: colors.text,
    },
    emptySubtext: {
      fontSize: 17,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 24,
      color: colors.textMuted,
    },
  });

  return styles;
};