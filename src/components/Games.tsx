import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import { FOOD_INITIAL_POSITION, GAME_BOUNDS, MOVE_INTERVAL, SCORE_INCREMENT, SNAKE_INITIAL_POSITION } from "../constants/constant";
import Snake from "./Snake";
import { checkGamesUser } from "../utils/checkGameOver";
import Food from "./Food";
import { checksEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";


export default function Game(): JSX.Element {
    const [direction,setDirection] = React.useState<Direction>(Direction.Right);
    const [snake,setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food,setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver,setIsGameOver] = React.useState<boolean>(false);
    const [isPaused,setIsPaused] = React.useState<boolean>(false);
    const [score,setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if(!isGameOver){
            const interval = setInterval(() => {
                !isPaused && movingSnake();
            },MOVE_INTERVAL)
            
            return () => clearInterval(interval)
        }

    },[snake,isGameOver,isPaused])

    const movingSnake = () => {
        const snakeHead = snake[0];
        const newHead = {...snakeHead} // create copy

        if(checkGamesUser(snakeHead, GAME_BOUNDS)){
            setIsGameOver((prev) => !prev);
            return;
        }

        
        // ---- Game over
        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break; 
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
            default:
                break;
        }
        
        if(checksEatsFood(newHead,food,2)){
            setSnake([newHead, ...snake]);
            setFood(randomFoodPosition(GAME_BOUNDS.xMax,GAME_BOUNDS.yMax));
            setScore(score +  SCORE_INCREMENT);
        }else{                          
            setSnake([newHead, ...snake.slice(0,-1)]);
        }

    } 
    const handleGesture = (event:GestureEventType) => {
        const {
            translationX,
            translationY
        } = event.nativeEvent;
        if(Math.abs(translationX) > Math.abs(translationY)){
            // moving X-axis 
            if(translationX > 0){
                // moving right
                setDirection(Direction.Right)
            }else{
                // moving left
                setDirection(Direction.Left)
            }
        }else{
            // moving Y axis
            if(translationY > 0){
                // moving down
                setDirection(Direction.Down)

            }else{
                // moving Up
                setDirection(Direction.Up)
            }
        }
    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0)
        setDirection(Direction.Right);
        setIsPaused(false);
    }

    const pauseGame = () => {
        setIsPaused(!isPaused);
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                    <Header 
                        isPaused={isPaused} 
                        pauseGame={pauseGame} 
                        reloadGame={reloadGame}
                    > 
                        <Text style={{
                             fontSize: 22,
                             fontWeight: "bold",
                             color: Colors.primary,
                        }}>🍎 {score}</Text>
                    </Header>
                    <View style={styles.boundaries}>
                        <Snake snake={snake}/>
                        <Food x={food.x} y={food.y} />
                    </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,

    },
    boundaries : {
        flex:1,
        borderColor: Colors.primary,
        borderWidth: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background
    }
})