const directions = {
  backward: 'backward',
  forward: 'forward',
  left: 'left',
  right: 'right'
}

const revertDirections = {
  backward: 'forward',
  forward: 'backward',
  left: 'right',
  right: 'left'
}

const actions = {
  attack: 'attack',
  walk: 'walk',
  rest: 'rest',
  rescue: 'rescue'
}

class Player {
  constructor(){
    this.maxHealth = 20
    this.restHealthThreshold = 10
    this.currentHealth = 20
  }

  walk(){
    this.warrior.walk(this.direction)
    this.lastAction = actions.walk
  }

  attack(){
    this.warrior.attack(this.direction)
    this.lastAction = actions.walk
  }

  feel(direction){
    return this.warrior.feel(direction)
  }

  feelSpaces(){
    this.forwardSpace = this.feel(directions.forward)
    this.isFowardEmpty = this.forwardSpace.isEmpty()

    this.backwardSpace = this.feel(directions.backward)
    this.isBackwardEmpty = this.backwardSpace.isEmpty()

    this.leftSpace = this.feel(directions.left)
    this.isLeftEmpty = this.leftSpace.isEmpty()

    this.rightSpace = this.feel(directions.right)
    this.isRightEmpty = this.rightSpace.isEmpty()
  }

  decideDirection(){
    this.direction = directions.forward

    this.directionSpace = this.feel(this.direction)
    this.isDirectionEmpty = this.directionSpace.isEmpty()
  }

  init(warrior){
    this.warrior = warrior
    this.feelSpaces()
    this.decideDirection()
  }

  end(){
    // this.lastHealth = this.warrior.health()
  }

  walkOrAttack(){
    // if

  }

  decideStrategy(){
    
  }

  doStrategy(){
    this.warrior.walk()
  }



  playTurn(warrior) {
      this.init(warrior)
      this.decideStrategy()
      this.doStrategy()
      this.end()
  }
}
