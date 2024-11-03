import { StyleSheet, Text, View } from "react-native";
import { Coordinate } from "../types/types";
import { useMemo } from "react";

function getRandomFruitEmoji() {
    const fruitEmojis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    return fruitEmojis[randomIndex];
  }
interface FoodProps extends Coordinate {}
  export default function Food({ x, y }: FoodProps): JSX.Element { 
    const foodIcon = useMemo(() => {
        return getRandomFruitEmoji();
    },[x,y]);
    return(
        <View>
            <Text style={[{ top: y * 10, left: x * 10 },styles.food]}>{foodIcon}</Text>
        </View>
    )
  }

const styles = StyleSheet.create({
    food : {
        width: 30,
        height:30,
        borderRadius:7,
        position:"absolute"
    }
})