import React, { useState, useRef } from 'react';
import { Text, View, Image, Pressable, Animated, GestureResponderEvent, ScrollView, SafeAreaView} from 'react-native';
import useTheme from '../hooks/useTheme';
import { createStyles  } from '../assets/images/styles/styles';

interface FlashcardProps {
  button1: string,
  button2: string,
  name: string,
  description: string,
  image: number
  onPress1: (event: GestureResponderEvent) => void;
  onPress2: (event: GestureResponderEvent) => void;
}

const Flashcard: React.FC<FlashcardProps> = (props: FlashcardProps) => {
     const { colors } = useTheme();

    const styles = createStyles(colors);

    const [ IsFlipped, setIsFlipped] = useState(false);

    const animation = useRef(new Animated.Value(0)).current;

    const handleClick = () => {
        setIsFlipped(false);
        animation.setValue(0);
    }
    // The card can only rotate to the back
    const frontRotation = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    });

    const doFrontFlip = {
        transform: [{rotateY: frontRotation}]
    }

    const backRotation = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    });

    const doBackFlip = {
        transform: [{rotateY: backRotation}]
    }

    // This function is called when user presses 'flip it'
    const Flip = () =>{
        Animated.spring(animation, {
            toValue: 180, 
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start()

        setIsFlipped(true)
    }

    return (
        <>
            <Image source={ props.image } style={styles.image}/>
            
            <View style={styles.FCcontainer}>
                {/* Front side of the card. lets the user flip it */}
                <Animated.View 
                pointerEvents={IsFlipped ? 'none' : 'auto'}
                style={[ styles.card, doFrontFlip]}>
                    <Pressable onPress={Flip}>
                        <Text style={styles.flipIt}> Flip it </Text>
                    </Pressable>
                </Animated.View>

                {/* Back side of the card. Can see answers *name, description* and 2 buttons */}
                <Animated.View 
                pointerEvents={IsFlipped ? 'auto' : 'none'}
                style={[ styles.card, styles.backText, doBackFlip]}>
                    <Text  style={styles.FCtitle}> {props.name} </Text>
                    <Text style={styles.FCtext}> {props.description} </Text>
                    {/* This is either memorized it, learn it* learn or got it* review button */}
                    <View style={styles.testcontainer}>
                    <Pressable
                    onPress={(event) => {
                        props.onPress1(event);
                        handleClick()
                    }}>
                        <Text style={styles.buttonContainer}> {props.button1} </Text>
                    </Pressable>
                    {/* This is either keep showing* learn  or missed it* review button */}
                    <Pressable
                    onPress={(event) => {
                        props.onPress2(event);
                        handleClick()
                    }}>
                        <Text style={styles.buttonContainer}> {props.button2} </Text>
                    </Pressable>
                    </View>
                </Animated.View>
            </View>
        </>
    );
};

export default Flashcard