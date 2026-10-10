import useTheme from '../../hooks/useTheme'
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles  } from '../../assets/images/styles/styles';
import { Lightbulb } from 'lucide-react-native';

 export default function Menu() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const { toggleDarkMode } = useTheme();
   return (
     <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <View style={styles.containerEverythingIs}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
        <Pressable style={styles.buttonTextContainer} onPress={toggleDarkMode}>
          <View style={styles.buttonIndex}>
          <Text style={styles.buttonText}>Change the mode</Text>
          <Lightbulb
                size={56}
                style={[styles.icon, {marginLeft: 30}]}
                color={colors.text}
              />
          </View>
        </Pressable>
        </LinearGradient>
      </View>
     </LinearGradient>
   );
 }