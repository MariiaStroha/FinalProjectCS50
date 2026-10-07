import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Portrait, portraits } from '../portraits';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyles  } from '../assets/images/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../hooks/useTheme';;

export default function HomePage() {

  const { colors } = useTheme();

  const styles = createStyles(colors);

  let { id } =  useLocalSearchParams<{id: string}>();
  const ID = Number(id);
  const portrait = portraits.find((person: Portrait) => person.id === ID);

  return(
    <>
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
    <SafeAreaView  style={styles.safeArea}>
    <ScrollView>
       <Stack.Screen options={{ title: portrait?.name}}/>
       <View style={styles.titleContainer}>
           <Text style={styles.IDtitle}> {portrait?.name} </Text>
        </View>
        <Image
          source={ portrait?.image }
          style={styles.image}
        />
        <LinearGradient
              colors={colors.gradients.surface}
              style={styles.button}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              >
        <View style={styles.buttonTextContainer}>
          <Text style={styles.IDdescription}>{ portrait?.description }</Text>
        </View>
      </LinearGradient>
      </ScrollView>
      </SafeAreaView>
      </LinearGradient>
    </>
  )
}