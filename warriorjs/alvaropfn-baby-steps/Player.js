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
  playTurn(warrior) {
    this.context = this.context
      ? this.context
      : new Context(new Stand(), warrior);

    // Cool code goes here.
    // this.print(this.actions.see());
    // this.context.doStuff()
  }
}
/**
 * Context holds all information about the actual enviroment of our warrior
 */
class Context {
  constructor(state, warrior) {
    this.warrior = warrior;

    this.oldHP = 20;
    this.newHP = this.oldHP;
    this.map = this.seeAround();
    this.print(this.map);

    // this.print(this.actions.see(DIRECTIONS.left));

    this.setState(state);
  }

  setState(state) {
    this.state = state;
    this.state.setContext(this);
  }

  doStuff() {
    this.warrior.seeAround();

    this.state.doStuff();
  }

  print = (msg) => this.warrior.think(msg);

  actions = {
    move: (direction = DIRECTIONS.right) => this.warrior.walk(direction),
    atk: (direction = DIRECTIONS.right) => this.warrior.walk(direction),
    see: (direction = DIRECTIONS.right) => this.warrior.feel(direction),
  };

  seeAround() {
    let up = STUFF.empty;
    let right = STUFF.empty;
    let down = STUFF.empty;
    let left = STUFF.empty;

    // Map Enemys
    up = this.actions.see(DIRECTIONS.up).isUnit() ? STUFF.enemy : up;
    right = this.actions.see(DIRECTIONS.right).isUnit() ? STUFF.enemy : right;
    down = this.actions.see(DIRECTIONS.down).isUnit() ? STUFF.enemy : down;
    left = this.actions.see(DIRECTIONS.left).isUnit() ? STUFF.enemy : left;

    // Map Walls
    up = this.actions.see(DIRECTIONS.up).isWall() ? STUFF.wall : up;
    right = this.actions.see(DIRECTIONS.right).isWall() ? STUFF.wall : right;
    down = this.actions.see(DIRECTIONS.down).isWall() ? STUFF.wall : down;
    left = this.actions.see(DIRECTIONS.left).isWall() ? STUFF.wall : left;

    // Map Empty
    up = this.actions.see(DIRECTIONS.up).isEmpty() ? STUFF.empty : up;
    right = this.actions.see(DIRECTIONS.right).isEmpty() ? STUFF.empty : right;
    down = this.actions.see(DIRECTIONS.down).isEmpty() ? STUFF.empty : down;
    left = this.actions.see(DIRECTIONS.left).isEmpty() ? STUFF.empty : left;

    return { right, down, left, up };
  }
}
// States
class AbstractState {
  setContext(context) {
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
