import { StyleSheet, Text, Pressable} from 'react-native';

type Props = {
  onPress: () => void,
  text: string,
  color: string,
  selectedColor: string,
}
function Button(props: Props) {
  return (
    <Pressable style={({pressed}) => pressed ? [styles.button, {backgroundColor: props.selectedColor}] : [styles.button, {backgroundColor: props.color}]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
    backgroundColor: 'purple',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  }
});

export default Button;