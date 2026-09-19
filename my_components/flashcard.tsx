import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, ScrollView, GestureResponderEvent} from 'react-native';

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

    const [ IsFlipped, setIsFlipped] = useState(false);

    const animation = useRef(new Animated.Value(0)).current;

  /*  useEffect(() => {
        animation.setValue(0);
        setIsFlipped(false);
    }, [props.name])
    */

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
            
            <View style={styles.container}>
                {/* Front side of the card. lets the user flip it */}
                <Animated.View 
                pointerEvents={IsFlipped ? 'none' : 'auto'}
                style={[ styles.card, doFrontFlip]}>
                    <Pressable onPress={Flip}>
                        <Text style={styles.text}> Flip it </Text>
                    </Pressable>
                </Animated.View>

                {/* Back side of the card. Can see answers *name, description* and 2 buttons */}
                <Animated.View 
                pointerEvents={IsFlipped ? 'auto' : 'none'}
                style={[ styles.card, styles.backText, doBackFlip]}>
                    <Text  style={styles.text}> {props.name} </Text>
                    <Text> {props.description} </Text>
                    {/* This is either i memorized it, learn it* learn or got it* review button */}
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
                        <Text> {props.button2} </Text>
                    </Pressable>
                </Animated.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center'
   },
   text: {
     fontSize: 20,
     fontWeight: 'bold',
     margin: 10
   },
   image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 55,
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: '5%',
    width: '90%',
    height: 500,
    borderColor: '#48cae4',
    borderWidth: 3
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

  buttonContainer: {
  backgroundColor: 'gray',
    padding: 10,
    borderColor: 'black',
    borderWidth: 3
  }
 });

export default Flashcard