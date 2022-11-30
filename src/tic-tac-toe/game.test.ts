import {Cell, Player, TicTacToe} from "./game";
import {Simulate} from "react-dom/test-utils";


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
        const {newBoard} = game.tick(Player.X, mid.coordinates);
        expect(newBoard[1][1].occupier).toEqual(Player.X);
        expect(newBoard[1][1].coordinates).toEqual('1-1');
    });
    it('should not let the X user tick twice in a row', function () {
        game.tick(Player.X, '1-1');

        expect(() => game.tick(Player.X, '1-1')).toThrow("It's Y's turn.");
    });

    it('should not let the Y user tick twice in a row', function () {
        game.tick(Player.Y, '1-1');

        expect(() => game.tick(Player.Y, '1-1')).toThrow("It's X's turn.");
    });
    it('should let know whose turn it is', function () {
        let {nextToPlay} = game.tick(Player.X, '1-1');
        expect(nextToPlay).toEqual(Player.Y);
        let {nextToPlay: xPlayer} = game.tick(Player.Y, '1-2');
        expect(xPlayer).toEqual(Player.X);
    });

    it('should not let the a cell to be clicked twice', function () {
        game.tick(Player.X, '1-1');
        expect(() => game.tick(Player.Y, '1-1')).toThrow('The cell is already occupied by X.');
    });

    it('should not let click outside the game', function () {
        expect(() => game.tick(Player.X, '0-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick(Player.X, '1-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick(Player.X, '2-4')).toThrow('You have ticked outside the board.');
        expect(() => game.tick(Player.X, '3-0')).toThrow('You have ticked outside the board.');
        expect(() => game.tick(Player.X, '-1-2')).toThrow('You have ticked outside the board.');
    });

    it('should tell when the game is over and there is a winner', function () {
        const plays = [
            ['0-0', '1-0', '0-1', '1-1', '0-2'],
            ['0-0', '0-1', '1-0', '1-1', '2-0'],
            ['1-1', '0-1', '0-0', '2-0', '2-2'],
            ['1-1', '0-1', '0-2', '2-1', '2-0'],
        ];
        plays.forEach(moves => {
            const game = new TicTacToe();
            let nextToPlay = Player.X;
            let gameResult;
            moves.slice(0, moves.length - 1).forEach((coordinates, index) => {
                const {nextToPlay: next, result} = game.tick(nextToPlay, coordinates);
                nextToPlay = next;
                gameResult = result;
                expect(gameResult).toEqual(undefined);
            });
            const {result} = game.tick(nextToPlay, moves[moves.length - 1]);
            expect(result).toEqual(Player.X);
        })
    });

});