import { Coordinate } from "../types/types";

export const checkGamesUser = (
    snakeHead:Coordinate,
    boundaries:any
):boolean => {
    return (
        snakeHead.x < boundaries.xMin || 
        snakeHead.y < boundaries.yMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y > boundaries.yMax 
    );
}