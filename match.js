const Player = require('./player.js')

class Match {
  player1
  player2
  date
  players = []
  #winner = null

  constructor (date, player1 = new Player('jugador1'), player2 = new Player('jugador2')) {
    this.player1 = player1
    this.player2 = player2
    this.insertPlayer(this.player1)
    this.insertPlayer(this.player2)
    const [day, month, year] = date.split('/')
    this.date = new Date(year, month - 1, day)
  }

  getDate () {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(this.date)
  }

  setDate (newDate) {
    const [day, month, year] = newDate.split('/')
    // solo modifica la fecha si es valida
    if (!(!day || !month || !year || isNaN(new Date(year, month - 1, day).getTime()))) {
      this.date = new Date(year, month - 1, day)
    }
  }

  insertPlayer (player) {
    if (this.players.length < 2 && player instanceof Player) {
      this.players.push(player)
    }
  }

  get winner () {
    return this.#winner
  }

  setWinner (player) {
    if (this.#winner === null && (this.players[0] === player || this.players[1] === player)) {
      this.#winner = player
    }
  }
}

module.exports = Match
