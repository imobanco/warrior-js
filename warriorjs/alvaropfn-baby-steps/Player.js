const DIRECTIONS = {
  up: "left",
  right: "forward",
  down: "backward",
  left: "right",
};

const STUFF = {
  empty: "",
  enemy: "e",
  wall: "w",
};

class Player {
  constructor() {
    this.warrior = {};
    this.oldHP = 20;
    this.newHP = this.oldHP;
    this.nearby = {
      up: "",
      right: "",
      down: "",
      left: "",
    };
  }

  playTurn(warrior) {
    this.warrior = warrior;
    this.actions.move(DIRECTIONS.right);

    // Cool code goes here.
    this.print(this.actions.see());
  }

  print = (msg) => this.warrior.think(msg.getLocation());

  actions = {
    move: (direction = DIRECTIONS.right) => this.warrior.walk(direction),
    atk: (direction = DIRECTIONS.right) => this.warrior.walk(direction),
    see: (direction = DIRECTIONS.right) => this.warrior.feel(direction),
  };

  seeAround() {
    const up = STUFF.empty;
    const right = STUFF.empty;
    const down = STUFF.empty;
    const left = STUFF.empty;

    // Map Enemys
    up = this.actions.see(DIRECTIONS.up).isEnemy ? STUFF.enemy : up;
    right = this.actions.see(DIRECTIONS.right).isEnemy ? STUFF.enemy : right;
    down = this.actions.see(DIRECTIONS.down).isEnemy ? STUFF.enemy : down;
    left = this.actions.see(DIRECTIONS.left).isEnemy ? STUFF.enemy : left;

    // Map Walls
    up = this.actions.see(DIRECTIONS.up).isWall ? STUFF.wall : up;
    right = this.actions.see(DIRECTIONS.right).isWall ? STUFF.wall : right;
    down = this.actions.see(DIRECTIONS.down).isWall ? STUFF.wall : down;
    left = this.actions.see(DIRECTIONS.left).isWall ? STUFF.wall : left;

    return { right, down, left, up };
  }
}
/**
 * Context holds all information about the actual enviroment of our warrior
 */
class Context {
  constructor(state, warrior) {
    this.changeState(state);
    this.warrior = warrior;

    this.oldHP = 20;
    this.newHP = this.oldHP;
  }

  changeState(state) {
    this.state = state;
    this.state.SetContext(this);
  }

  setState(state) {
    this.state = state;
    this.state.SetContext(this);
  }

  doStuff() {
    this.warrior.seeAround();

    this.state.doStuff();
  }
}
// States
class AbstractState {
  setState(context) {
    this.context = context;
  }

  doStuff() {
    throw new Error("no implemented method");
  }
}

class Stand extends AbstractState {
  doStuff() {}
}

class Walk extends AbstractState {
  doStuff() {}
}

class Attack extends AbstractState {
  doStuff() {}
}

class Rest extends AbstractState {
  doStuff() {}
}
// getLocation: [Function: getLocation],
// getUnit: [Function: getUnit],
// isEmpty: [Function: bound isEmpty],
// isStairs: [Function: bound isStairs],
// isUnit: [Function: bound isUnit],
// isWall: [Function: bound isWall]
