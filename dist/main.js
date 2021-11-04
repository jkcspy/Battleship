/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ai.js":
/*!*******************!*\
  !*** ./src/ai.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ai = {\n  moveList: [],\n  clearMoveList: function clearMoveList() {\n    ai.moveList.splice(0, ai.moveList.length); // Clears the actual array rather than new array or leaving in memory\n  },\n  checkMove: function checkMove(x, y) {\n    return ai.moveList.every(function (i) {\n      return i.x !== x || i.y !== y;\n    });\n  },\n  computerTurn: function computerTurn() {\n    var validMoveFound = false;\n\n    while (!validMoveFound) {\n      var x = Math.ceil(Math.random() * 10); // ceil to avoid rounding down to zero\n\n      var y = Math.ceil(Math.random() * 10);\n\n      if (ai.checkMove(x, y)) {\n        validMoveFound = true;\n        ai.moveList.push({\n          x: x,\n          y: y\n        });\n        return {\n          x: x,\n          y: y\n        };\n      }\n    }\n  }\n}; // TODO: Make better AI with hunt/target and parity\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ai);\n\n//# sourceURL=webpack://battleship/./src/ai.js?");

/***/ }),

/***/ "./src/dom-listeners.js":
/*!******************************!*\
  !*** ./src/dom-listeners.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attackListeners\": () => (/* binding */ attackListeners),\n/* harmony export */   \"attachAllEventListeners\": () => (/* binding */ attachAllEventListeners),\n/* harmony export */   \"buttonsObject\": () => (/* binding */ buttonsObject)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _placement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placement */ \"./src/placement.js\");\n/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai */ \"./src/ai.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n // TODO: break up repeated code and large functions into smaller functions\n\nvar buttonsObject = {\n  viewButton: document.querySelector('.view'),\n  xInput: document.querySelector('#x-input'),\n  yInput: document.querySelector('#y-input'),\n  directionButton: document.querySelector('.direction'),\n  confirmButton: document.querySelector('.confirm'),\n  clearButton: document.querySelector('.clear')\n};\nvar shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];\n\nvar attackListeners = function attackListeners(gameBoardTwoObject, playerOneObject, gameBoardOneObject, playerTwoObject) {\n  var grid = document.querySelector('.grid-2');\n\n  var handler = function handler(e) {\n    var dataIndex = parseInt(e.target.dataset.index);\n    var coordinatesObject = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.arrayTranslate)(dataIndex);\n    playerOneObject.attack(coordinatesObject.x, coordinatesObject.y, gameBoardTwoObject);\n    e.target.removeEventListener('click', handler);\n    var aiCoordinates = _ai__WEBPACK_IMPORTED_MODULE_2__[\"default\"].computerTurn();\n    playerTwoObject.attack(aiCoordinates.x, aiCoordinates.y, gameBoardOneObject);\n  };\n\n  _toConsumableArray(grid.children).forEach(function (item) {\n    item.addEventListener('click', handler);\n  });\n};\n\nvar restartEventListener = function restartEventListener() {\n  var restartButton = document.querySelector('.restart');\n  restartButton.addEventListener('click', function () {\n    location.reload();\n  });\n};\n\nvar startGameListener = function startGameListener() {\n  var startButton = document.querySelector('.start-game');\n  var startContainer = document.querySelector('.start-game-container');\n  var placementInterface = document.querySelector('.placement-interface');\n  var nameHolder = document.querySelector('.title');\n  var name = document.querySelector('#user-name');\n  startButton.addEventListener('click', function () {\n    nameHolder.setAttribute('data-name', name.value);\n    name.value = '';\n    startContainer.style.display = 'none';\n    placementInterface.style.display = 'block';\n  });\n};\n\nvar muteButtonListener = function muteButtonListener() {\n  var muteButton = document.querySelector('.mute');\n  var audio = document.querySelector('.audio');\n  muteButton.addEventListener('click', function () {\n    if (muteButton.innerHTML === 'Un-Mute') {\n      muteButton.innerHTML = 'Mute';\n      audio.muted = false;\n    } else {\n      muteButton.innerHTML = 'Un-Mute';\n      audio.muted = true;\n    }\n  });\n};\n\nvar directionButtonListener = function directionButtonListener(buttonsObject) {\n  var count = 0;\n  var directions = ['Up', 'Down', 'Left', 'Right'];\n  buttonsObject.directionButton.addEventListener('click', function () {\n    if (count < 3) {\n      count++;\n      buttonsObject.directionButton.innerHTML = directions[count];\n    } else {\n      count = 0;\n      buttonsObject.directionButton.innerHTML = directions[count];\n    }\n  });\n};\n\nvar viewButtonListener = function viewButtonListener(buttonsObject) {\n  buttonsObject.viewButton.addEventListener('click', function () {\n    var coordinatesObject = {\n      x: parseInt(buttonsObject.xInput.value),\n      y: parseInt(buttonsObject.yInput.value),\n      direction: buttonsObject.directionButton.innerHTML.toLowerCase(),\n      shipIndex: []\n    };\n    var grid = document.querySelector('.placement-grid');\n    var gridBoxArray = [];\n    shipPlacementLogic(coordinatesObject);\n    placementCheckLogic(coordinatesObject, gridBoxArray, grid, buttonsObject);\n  });\n};\n\nvar placementCheckLogic = function placementCheckLogic(coordinatesObject, gridBoxArray, grid, buttonsObject) {\n  if (coordinatesObject.shipIndex.every(function (item) {\n    return item >= 0 && item < 100;\n  })) {\n    // TODO: stop ships being placed from 10-11 20-21 etc...\n    coordinatesObject.shipIndex.forEach(function (item) {\n      gridBoxArray.push(grid.querySelector(\"[data-index='\".concat(item, \"'\")));\n    });\n\n    if (gridBoxArray.every(function (item) {\n      return !item.classList.contains('ship');\n    })) {\n      gridBoxArray.forEach(function (item) {\n        item.classList.add('ship');\n        item.classList.add('await-confirm');\n      });\n      toggleConfirmButtonsOn(buttonsObject);\n    } else {\n      alert('Try again that is not a valid placement');\n    }\n  } else {\n    alert('Try again that is not a valid placement');\n  }\n};\n\nvar shipPlacementLogic = function shipPlacementLogic(coordinatesObject) {\n  if (coordinatesObject.direction === 'down') {\n    for (var i = 0; i < (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shipTypeCheck)(); i++) {\n      coordinatesObject.shipIndex.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(coordinatesObject.x, coordinatesObject.y + i));\n    }\n  } else if (coordinatesObject.direction === 'up') {\n    for (var _i = 0; _i < (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shipTypeCheck)(); _i++) {\n      coordinatesObject.shipIndex.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(coordinatesObject.x, coordinatesObject.y - _i));\n    }\n  } else if (coordinatesObject.direction === 'right') {\n    for (var _i2 = 0; _i2 < (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shipTypeCheck)(); _i2++) {\n      coordinatesObject.shipIndex.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(coordinatesObject.x + _i2, coordinatesObject.y));\n    }\n  } else if (coordinatesObject.direction === 'left') {\n    for (var _i3 = 0; _i3 < (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shipTypeCheck)(); _i3++) {\n      coordinatesObject.shipIndex.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(coordinatesObject.x - _i3, coordinatesObject.y));\n    }\n  }\n};\n\nvar confirmButtonListener = function confirmButtonListener(buttonsObject) {\n  var count = 0;\n  var message = document.querySelector('.message');\n  var placementInterface = document.querySelector('.placement-interface');\n  var gridOne = document.querySelector('.grid-1');\n  var gridTwo = document.querySelector('.grid-2');\n  buttonsObject.confirmButton.addEventListener('click', function () {\n    var length = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shipTypeCheck)();\n    var x = parseInt(buttonsObject.xInput.value);\n    var y = parseInt(buttonsObject.yInput.value);\n    var direction = buttonsObject.directionButton.innerHTML.toLowerCase();\n    var shipToConfirm = document.querySelectorAll('.await-confirm');\n\n    if (message.dataset.ship === 'destroyer') {\n      _placement__WEBPACK_IMPORTED_MODULE_1__.shipPlacementData.push({\n        length: length,\n        direction: direction,\n        x: x,\n        y: y\n      });\n      placementInterface.style.display = 'none';\n      gridOne.style.display = 'flex';\n      gridTwo.style.display = 'flex';\n      togglePlacementButtonsOn(buttonsObject);\n      (0,_game__WEBPACK_IMPORTED_MODULE_3__.gameLoop)();\n    } else {\n      _placement__WEBPACK_IMPORTED_MODULE_1__.shipPlacementData.push({\n        length: length,\n        direction: direction,\n        x: x,\n        y: y\n      });\n      count++;\n      message.dataset.ship = shipArray[count];\n      message.innerHTML = \"Place your \".concat(shipArray[count]);\n      togglePlacementButtonsOn(buttonsObject);\n\n      _toConsumableArray(shipToConfirm).forEach(function (item) {\n        item.classList.remove('await-confirm');\n      });\n    }\n  });\n};\n\nvar clearButtonListener = function clearButtonListener(buttonsObject) {\n  buttonsObject.clearButton.addEventListener('click', function () {\n    var shipToConfirm = document.querySelectorAll('.await-confirm');\n\n    _toConsumableArray(shipToConfirm).forEach(function (item) {\n      item.classList.remove('ship');\n      item.classList.remove('await-confirm');\n      togglePlacementButtonsOn(buttonsObject);\n    });\n  });\n};\n\nvar togglePlacementButtonsOn = function togglePlacementButtonsOn(buttonsObject) {\n  buttonsObject.xInput.disabled = false;\n  buttonsObject.yInput.disabled = false;\n  buttonsObject.directionButton.disabled = false;\n  buttonsObject.viewButton.disabled = false;\n  buttonsObject.confirmButton.disabled = true;\n  buttonsObject.clearButton.disabled = true;\n};\n\nvar toggleConfirmButtonsOn = function toggleConfirmButtonsOn(buttonsObject) {\n  buttonsObject.xInput.disabled = true;\n  buttonsObject.yInput.disabled = true;\n  buttonsObject.directionButton.disabled = true;\n  buttonsObject.viewButton.disabled = true;\n  buttonsObject.confirmButton.disabled = false;\n  buttonsObject.clearButton.disabled = false;\n};\n\nvar attachAllEventListeners = function attachAllEventListeners(buttonsObject) {\n  viewButtonListener(buttonsObject);\n  directionButtonListener(buttonsObject);\n  confirmButtonListener(buttonsObject);\n  muteButtonListener();\n  startGameListener();\n  restartEventListener();\n  clearButtonListener(buttonsObject);\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/dom-listeners.js?");

/***/ }),

/***/ "./src/dom-render.js":
/*!***************************!*\
  !*** ./src/dom-render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initRenderGrid\": () => (/* binding */ initRenderGrid),\n/* harmony export */   \"renderPlayerGrid\": () => (/* binding */ renderPlayerGrid),\n/* harmony export */   \"renderOpponentGrid\": () => (/* binding */ renderOpponentGrid)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar initRenderGrid = function initRenderGrid() {\n  var gridBoxHtml = document.createElement('div');\n  var grids = document.querySelectorAll('.grid');\n\n  _toConsumableArray(grids).forEach(function (grid) {\n    for (var i = 0; i < 100; i++) {\n      var box = grid.appendChild(gridBoxHtml.cloneNode(true));\n      box.setAttribute('data-index', i); // so that DOM grid can be linked to gameBoard array\n\n      box.classList.add('box');\n    }\n  });\n};\n\nvar renderPlayerGrid = function renderPlayerGrid(gameBoardObject) {\n  var grid = document.querySelector('.grid-1');\n  var count = 0;\n\n  _toConsumableArray(grid.children).forEach(function (item) {\n    item.className = ''; // clear classes from previous turns so that correct classes are on boxes for each turn.\n\n    item.classList.add('box');\n  });\n\n  gameBoardObject.gameBoard.forEach(function (item) {\n    if (item === 'x') {\n      grid.children[count].classList.add('miss');\n    }\n\n    if (_typeof(item) === 'object') {\n      grid.children[count].classList.add('ship');\n\n      if (item.isHit === true) {\n        grid.children[count].classList.add('hit');\n      }\n\n      if (item.ship.sunk[0] === true) {\n        grid.children[count].classList.add('sunk');\n        grid.children[count].innerHTML = 'X';\n      }\n    }\n\n    count++;\n  });\n};\n\nvar renderOpponentGrid = function renderOpponentGrid(gameBoardObject) {\n  var grid = document.querySelector('.grid-2');\n  var count = 0;\n\n  _toConsumableArray(grid.children).forEach(function (item) {\n    item.className = '';\n    item.classList.add('box');\n  });\n\n  gameBoardObject.gameBoard.forEach(function (item) {\n    if (item === 'x') {\n      grid.children[count].classList.add('miss');\n    }\n\n    if (item.isHit === true) {\n      grid.children[count].classList.add('hit');\n    }\n\n    if (_typeof(item) === 'object') {\n      if (item.ship.sunk[0] === true) {\n        grid.children[count].classList.add('sunk');\n        grid.children[count].innerHTML = 'X';\n      }\n    }\n\n    count++;\n  });\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/dom-render.js?");

/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shipFactory\": () => (/* binding */ shipFactory),\n/* harmony export */   \"gameBoardFactory\": () => (/* binding */ gameBoardFactory),\n/* harmony export */   \"playerFactory\": () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar shipFactory = function shipFactory(length) {\n  var hitBoard = new Array(length).fill(0);\n  var sunk = [false]; // this works as array is mutable but primitive is not and obj on game board is a reference.\n\n  var isSunk = function isSunk() {\n    sunk[0] = hitBoard.every(function (x) {\n      return x === 1;\n    });\n  };\n\n  var hit = function hit(position) {\n    hitBoard[position] = 1;\n    isSunk();\n  };\n\n  return {\n    hitBoard: hitBoard,\n    sunk: sunk,\n    hit: hit\n  };\n};\n\nvar gameBoardFactory = function gameBoardFactory() {\n  var gameBoard = new Array(100).fill('');\n\n  var placeShip = function placeShip(x, y, length, direction) {\n    var ship = shipFactory(length);\n\n    switch (direction) {\n      case 'up':\n        for (var i = 0; i < length; i++) {\n          gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y - i)] = {\n            hitIndex: i,\n            isHit: false,\n            ship: ship\n          };\n        }\n\n        break;\n\n      case 'down':\n        for (var _i = 0; _i < length; _i++) {\n          gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y + _i)] = {\n            hitIndex: _i,\n            isHit: false,\n            ship: ship\n          };\n        }\n\n        break;\n\n      case 'left':\n        for (var _i2 = 0; _i2 < length; _i2++) {\n          gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x - _i2, y)] = {\n            hitIndex: _i2,\n            isHit: false,\n            ship: ship\n          };\n        }\n\n        break;\n\n      case 'right':\n        for (var _i3 = 0; _i3 < length; _i3++) {\n          gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x + _i3, y)] = {\n            hitIndex: _i3,\n            isHit: false,\n            ship: ship\n          };\n        }\n\n        break;\n\n      default:\n        console.log('Error:invalid direction for ship placement');\n    }\n  };\n\n  var receiveAttack = function receiveAttack(x, y) {\n    if (gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y)] === '') {\n      gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y)] = 'x';\n    } else {\n      gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y)].ship.hit(gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y)].hitIndex);\n      gameBoard[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.coordinateTranslate)(x, y)].isHit = true;\n    }\n  };\n\n  var checkAllSunk = function checkAllSunk() {\n    var allShips = gameBoard.filter(function (e) {\n      return _typeof(e) === 'object' && _typeof(e.ship) === 'object';\n    });\n    return allShips.every(function (x) {\n      return x.ship.sunk[0] === true;\n    });\n  };\n\n  return {\n    gameBoard: gameBoard,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    checkAllSunk: checkAllSunk\n  };\n};\n\nvar playerFactory = function playerFactory(name) {\n  var attack = function attack(x, y, targetBoard) {\n    targetBoard.receiveAttack(x, y);\n  };\n\n  return {\n    name: name,\n    attack: attack\n  };\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/factories.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameLoop\": () => (/* binding */ gameLoop),\n/* harmony export */   \"initGame\": () => (/* binding */ initGame),\n/* harmony export */   \"gameCompleteCheck\": () => (/* binding */ gameCompleteCheck)\n/* harmony export */ });\n/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories */ \"./src/factories.js\");\n/* harmony import */ var _dom_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-render */ \"./src/dom-render.js\");\n/* harmony import */ var _dom_listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-listeners */ \"./src/dom-listeners.js\");\n/* harmony import */ var _placement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placement */ \"./src/placement.js\");\n\n\n\n\n\nvar initGame = function initGame() {\n  var playerOne = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.playerFactory)('Player 1');\n  var playerTwo = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.playerFactory)('Player 2');\n  var playerOneBoard = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.gameBoardFactory)();\n  var playerTwoBoard = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.gameBoardFactory)();\n  (0,_placement__WEBPACK_IMPORTED_MODULE_3__.placePlayerShips)(playerOneBoard); // TODO: function for placing AI ships\n\n  playerTwoBoard.placeShip(1, 1, 5, 'down');\n  playerTwoBoard.placeShip(2, 1, 4, 'down');\n  playerTwoBoard.placeShip(3, 1, 3, 'right');\n  playerTwoBoard.placeShip(2, 9, 3, 'right');\n  playerTwoBoard.placeShip(5, 5, 2, 'down');\n  return {\n    playerOne: playerOne,\n    playerOneBoard: playerOneBoard,\n    playerTwo: playerTwo,\n    playerTwoBoard: playerTwoBoard\n  };\n};\n\nvar gameCompleteCheck = function gameCompleteCheck(gameBoardOneObject, gameBoardTwoObject) {\n  if (gameBoardOneObject.checkAllSunk()) {\n    return false;\n  }\n\n  if (gameBoardTwoObject.checkAllSunk()) {\n    return false;\n  }\n\n  return true;\n};\n\nvar gameLoop = function gameLoop() {\n  var game = initGame();\n  (0,_dom_listeners__WEBPACK_IMPORTED_MODULE_2__.attackListeners)(game.playerTwoBoard, game.playerOne, game.playerOneBoard, game.playerTwo);\n\n  var innerGameLoop = function innerGameLoop() {\n    (0,_dom_render__WEBPACK_IMPORTED_MODULE_1__.renderOpponentGrid)(game.playerTwoBoard);\n    (0,_dom_render__WEBPACK_IMPORTED_MODULE_1__.renderPlayerGrid)(game.playerOneBoard);\n\n    if (gameCompleteCheck(game.playerOneBoard, game.playerTwoBoard)) {\n      // if func returns false recursion reaches base case and stops.\n      setTimeout(innerGameLoop, 100); // JavaScript is single threaded so traditional while loop will block thread.\n    } else {\n      if (game.playerTwoBoard.checkAllSunk()) {\n        alert('The day is ours. All enemy ships have been sunk');\n      } else {\n        alert('All is lost. Our fleet is destroyed');\n      }\n    }\n  };\n\n  innerGameLoop();\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-listeners */ \"./src/dom-listeners.js\");\n/* harmony import */ var _dom_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-render */ \"./src/dom-render.js\");\n\n\n(0,_dom_render__WEBPACK_IMPORTED_MODULE_1__.initRenderGrid)();\n(0,_dom_listeners__WEBPACK_IMPORTED_MODULE_0__.attachAllEventListeners)(_dom_listeners__WEBPACK_IMPORTED_MODULE_0__.buttonsObject);\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/placement.js":
/*!**************************!*\
  !*** ./src/placement.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"placePlayerShips\": () => (/* binding */ placePlayerShips),\n/* harmony export */   \"shipPlacementData\": () => (/* binding */ shipPlacementData)\n/* harmony export */ });\nvar shipPlacementData = [];\n\nvar placePlayerShips = function placePlayerShips(gameBoardObject) {\n  shipPlacementData.forEach(function (item) {\n    gameBoardObject.placeShip(item.x, item.y, item.length, item.direction);\n  });\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/placement.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"coordinateTranslate\": () => (/* binding */ coordinateTranslate),\n/* harmony export */   \"arrayTranslate\": () => (/* binding */ arrayTranslate),\n/* harmony export */   \"shipTypeCheck\": () => (/* binding */ shipTypeCheck)\n/* harmony export */ });\nvar coordinateTranslate = function coordinateTranslate(x, y) {\n  var arrayIndex = (y - 1) * 10 + (x - 1);\n  return arrayIndex;\n};\n\nvar arrayTranslate = function arrayTranslate(index) {\n  var adjustedIndex = index + 1;\n  var indexString = adjustedIndex.toString();\n  var x = indexString.slice(-1) === '0' ? 10 : parseInt(indexString.slice(-1));\n  var y = Math.ceil(adjustedIndex / 10 - 0.01);\n  return {\n    x: x,\n    y: y\n  };\n};\n\nvar shipTypeCheck = function shipTypeCheck() {\n  var messageDiv = document.querySelector('.message');\n  var shipType = messageDiv.dataset.ship;\n  var shipTable = {\n    carrier: 5,\n    battleship: 4,\n    cruiser: 3,\n    submarine: 3,\n    destroyer: 2\n  };\n  return shipTable[shipType];\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;