/* eslint-env jest */

const Match = require('./Match')
const Player = require('./player')

test('Crear un partido', () => {
  const player1 = new Player('jugador1')
  const player2 = new Player('jugador2')
  const match1 = new Match('1/1/2000', player1, player2)
  expect(match1.player1).toBe(player1)
  expect(match1.player2).toBe(player2)
  expect(match1.date).toEqual(new Date(2000, 0, 1))
})

test('Crear un partido sin jugadores, se deben crear jugadores por defecto', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.player1.name).toBe('jugador1')
  expect(match1.player2.name).toBe('jugador2')
})

test('Cambiamos la fecha del partido solo si la fecha cambiada es valida', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.date).toEqual(new Date(2000, 0, 1))
  expect(match1.getDate()).toBe('01/01/2000')
  match1.setDate('10/10/2000')
  expect(match1.date).toEqual(new Date(2000, 9, 10))
  expect(match1.getDate()).toBe('10/10/2000')
  match1.setDate('23/50/2000/20')
  expect(match1.date).not.toEqual(new Date(2004, 49, 23))
  expect(match1.date).toEqual(new Date(2004, 1, 23))
})

test('Comprueba de que solo se pueden añadir 2 jugadores', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.players.length).toBe(2)
  match1.insertPlayer(match1.player1)
  expect(match1.players.length).not.toBe(3)
})

test('Comprueba de que si no hay ganadores aun devuelve null', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.winner).toBe(null)
})

test('Creamos un ganador en el partido', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.winner).toBe(null)
  match1.setWinner(match1.player2)
  expect(match1.winner).toBe(match1.player2)
})

test('Creamos un ganador en el partido pero el jugador no esta en el partido por ende debe mantenerse como null', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.winner).toBe(null)
  match1.setWinner(new Player('juanito'))
  expect(match1.winner).toBe(null)
})

test('Creamos un ganador en el partido y si intentamos cambiarlo y poner otro no dejara porque ya existe un ganador y dejara el ganador que ya existia', () => {
  const match1 = new Match('1/1/2000')
  expect(match1.winner).toBe(null)
  match1.setWinner(match1.player2)
  expect(match1.winner).toBe(match1.player2)
  match1.setWinner(match1.player1)
  expect(match1.winner).not.toBe(match1.player1)
  expect(match1.winner).toBe(match1.player2)
})
