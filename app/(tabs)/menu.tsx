import useTheme from '../../hooks/useTheme'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
 
 export default function HomePage() {
  const { toggleDarkMode } = useTheme();
   return (
     <View style={styles.container}>
       <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Change the mode</Text>
       </TouchableOpacity>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   text: {
     fontSize: 20,
     fontWeight: 'bold',
   },
 });