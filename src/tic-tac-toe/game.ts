export enum Player {
    X='X',
    Y='Y',
}

export class Cell {
    public occupier?: Player;
    public coordinates: string;
    constructor(x: number, y: number) {
        this.coordinates = `${x}-${y}`;
    }
}

export class TicTacToe {
    private board: Cell[][];
    private lastToPlay?: Player;

    constructor() {
        const board = [];
        for (let i = 0; i < 3; i++) {
            let inner = [];
            for (let j = 0; j < 3; j++) {
                inner.push(new Cell(i, j))
            }
            board.push(inner)
        }
        this.board = board;
    }

    getBoard(): Cell[][]{
        return this.board;
    }

    tick(player: Player, coordinates: string) {
        if(player === this.lastToPlay) {
            throw new Error(`It's ${this.getOtherPlayer(player)}'s turn.`)
        }
        const [x, y] = coordinates.split('-');
        let cell = this.board[+x]?.[+y];
        if(!cell || (!x || !y)) {
            throw new Error('You have ticked outside the board.');
        }
        if(cell.occupier) {
            throw new Error(`The cell is already occupied by ${this.getOtherPlayer(player)}.`)
        }

        cell.occupier = player;

        const newBoard: Cell[][] = [];
        for (let i = 0; i < 3; i++) {
            const inner = [];
            for (let j = 0; j < 3; j++) {
                inner.push({...this.board[i][j]})
            }
            newBoard.push(inner);
        }
        this.board = newBoard;
        this.lastToPlay = player;
        return {newBoard, nextToPlay: this.getOtherPlayer(player), result: this.calculateResult()}
    }

    private getOtherPlayer(player: Player) {
        return player === Player.X ? Player.Y : Player.X;
    }

    private calculateResult() {

        return Player.X;
    }
}
