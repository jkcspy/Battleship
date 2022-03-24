# Battleship
A single player Battleship game web app. Built using TDD(unit testing) with Jest and styled using Scss/Sass.

- [Access a live version here.](https://jkcswd.github.io/Battleship/)

## Demo
![Battleship Demo](https://github.com/jkcswd/Battleship/blob/main/README/Demo1.gif)
![Battleship Demo](https://github.com/jkcswd/Battleship/blob/main/README/Demo2.gif)

## Tech
- JavaScript
- Jest
- Scss
- Webpack

## Functionality 
- The user can enter a name.
- The user can place thier ships on the grid using coordinates and buttons.
- The user can then play a game against a computer player.
- The computer will attack back randomly(this can be upgraded to a better alogrithm later).
- Hits, misses and sunk ships will be displayed with different colour squares on the grid.
- Game over message will be displayed when victory condition achieved for 
- Background music can be muted and unmuted.
- The app can be restarted.

## Design
- A front end only application built using vanilla JavaScript.
- All non DOM functions built using TDD unit testing.
- Ship, player and gameboard factory functions produce the objects that interact with each other.
- All other functions split into modules.
- The game module calls these factories to instantiate objects and functions to run the program.

## Reflections
I was able to better understand the basics of TDD and unit testing after completing this project. I could see how well TDD works to create more decoupled code with less bugs to fix once completed.
