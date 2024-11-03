import "react-native-gesture-handler"
import Game from './src/components/Games';
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Game/>
    </GestureHandlerRootView>
  )
}
