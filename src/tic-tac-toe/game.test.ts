import {Cell, TicTacToe} from "./game";


describe('TicTacToe', function () {
    let game: TicTacToe;
    let board: Cell[][];

    beforeEach(() => {
        game = new TicTacToe();
        board = game.getBoard();
    })

    it('should initialise', function () {
        expect(new TicTacToe()).toBeDefined();
    });

    it('should create a board', function () {
        expect(board.length).toEqual(3);
    });

    it('should create a board of 9 cells', function () {
        expect(board.flat().length).toEqual(9);
    });

    it('should a board of objects telling the cells state', function () {
        expect(board).toEqual([
            [{occupier: undefined, coordinates: '0-0'}, {occupier: undefined, coordinates: '0-1'}, {occupier: undefined, coordinates: '0-2'}],
            [{occupier: undefined, coordinates: '1-0'}, {occupier: undefined, coordinates: '1-1'}, {occupier: undefined, coordinates: '1-2'}],
            [{occupier: undefined, coordinates: '2-0'}, {occupier: undefined, coordinates: '2-1'}, {occupier: undefined, coordinates: '2-2'}],
        ]);
    });

    it('should create a board of 9 empty cells', function () {
        expect(board.flat().filter(c => typeof c.occupier === 'undefined').length).toEqual(9);
    });

    it('should let the user click on empty cells', function () {
        const mid = board[1][1];
        const {newBoard} = game.tick('X', mid.coordinates);
        expect(newBoard[1][1].occupier).toEqual('X');
        expect(newBoard[1][1].coordinates).toEqual('1-1');
    });
    it('should not let the X user tick twice in a row', function () {
        game.tick('X', '1-1');

        expect(() => game.tick('X', '1-1')).toThrow("It's Y's turn.");
    });

    it('should not let the Y user tick twice in a row', function () {
        game.tick('Y', '1-1');

        expect(() => game.tick('Y', '1-1')).toThrow("It's X's turn.");
    });
    it('should let know whose turn it is', function () {
        let {nextToPlay} = game.tick('X', '1-1');
        expect(nextToPlay).toEqual('Y');
        let {nextToPlay: xPlayer} = game.tick('Y', '1-2');
        expect(xPlayer).toEqual('X');
    });

    it('should not let the a cell to be clicked twice', function () {
        game.tick('X', '1-1');
        expect(() => game.tick('Y', '1-1')).toThrow('The cell is already occupied by X.');
    });

    it('should not let click outside the game', function () {
        expect(() => game.tick('X', '0-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick('X', '1-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick('X', '2-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick('X', '3-0')).toThrow('You have ticked outside the board.');
        expect(() => game.tick('X', '-1-2')).toThrow('You have ticked outside the board.');
    });

    it('should tell when the game is over and there is a winner', function () {
        let {result: result1} = game.tick('X', '1-1');
        expect(result1).toEqual(undefined);
        let {result: result2} = game.tick('Y', '0-1');
        expect(result2).toEqual(undefined);
        let {result: result3} = game.tick('X', '0-0');
        expect(result3).toEqual(undefined);
        let {result: result4} = game.tick('Y', '2-0');
        expect(result4).toEqual(undefined);
        let {result: result5} = game.tick('X', '2-2');
        expect(result5).toEqual('X');
    });

});