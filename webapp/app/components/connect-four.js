import Component from '@ember/component';

function deepClone(state) {
    var new_state = [];
    for(var idx1 = 0; idx1 < state.length; idx1++) {
        new_state.push(state[idx1].slice(0));
    }
    return new_state;
}

function check_game_winner(state) {
    var patterns = [
        // All possible winning patterns (Vertical, Diagonal and Horizontal)
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[0, 2], [0, 3], [0, 4], [0, 5]],
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[1, 1], [1, 2], [1, 3], [1, 4]],
        [[1, 2], [1, 3], [1, 4], [1, 5]],
        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[2, 1], [2, 2], [2, 3], [2, 4]],
        [[2, 2], [2, 3], [2, 4], [2, 5]],
        [[3, 0], [3, 1], [3, 2], [3, 3]],
        [[3, 1], [3, 2], [3, 3], [3, 4]],
        [[3, 2], [3, 3], [3, 4], [3, 5]],
        [[4, 0], [4, 1], [4, 2], [4, 3]],
        [[4, 1], [4, 2], [4, 3], [4, 4]],
        [[4, 2], [4, 3], [4, 4], [4, 5]],
        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[5, 1], [5, 2], [5, 3], [5, 4]],
        [[5, 2], [5, 3], [5, 4], [5, 5]],
        [[6, 0], [6, 1], [6, 2], [6, 3]],
        [[6, 1], [6, 2], [6, 3], [6, 4]],
        [[6, 2], [6, 3], [6, 4], [6, 5]],

        [[0, 3], [1, 2], [2, 1], [3, 0]],
        [[0, 4], [1, 3], [2, 2], [3, 1]],
        [[1, 4], [2, 3], [3, 2], [4, 1]],
        [[1, 3], [2, 2], [3, 1], [4, 0]],
        [[0, 5], [1, 4], [2, 3], [3, 2]],
        [[1, 4], [2, 3], [3, 2], [4, 1]],
        [[2, 3], [3, 2], [4, 1], [5, 0]],
        [[1, 5], [2, 4], [3, 3], [4, 2]],
        [[2, 4], [3, 3], [4, 2], [5, 1]],
        [[3, 3], [4, 2], [5, 1], [6, 0]],
        [[2, 5], [3, 4], [4, 3], [5, 2]],
        [[3, 4], [4, 3], [5, 2], [6, 1]],
        [[3, 5], [4, 4], [5, 3], [6, 2]],
        [[3, 0], [4, 1], [5, 2], [6, 3]],
        [[2, 0], [3, 1], [4, 2], [5, 3]],
        [[3, 1], [4, 2], [5, 3], [6, 4]],
        [[1, 0], [2, 1], [3, 2], [4, 3]],
        [[2, 1], [3, 2], [4, 3], [5, 4]],
        [[3, 2], [4, 3], [5, 4], [6, 5]],
        [[0, 0], [1, 1], [2, 2], [3, 3]],
        [[1, 1], [2, 2], [3, 3], [4, 4]],
        [[2, 2], [3, 3], [4, 4], [5, 5]],
        [[0, 1], [1, 2], [2, 3], [3, 4]],
        [[1, 2], [2, 3], [3, 4], [4, 5]],
        [[0, 2], [1, 3], [2, 4], [3, 5]],

        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, 0], [3, 0], [4, 0], [5, 0]],
        [[3, 0], [4, 0], [5, 0], [6, 0]],
        [[0, 1], [1, 1], [2, 1], [3, 1]],
        [[1, 1], [2, 1], [3, 1], [4, 1]],
        [[2, 1], [3, 1], [4, 1], [5, 1]],
        [[3, 1], [4, 1], [5, 1], [6, 1]],
        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[1, 2], [2, 2], [3, 2], [4, 2]],
        [[2, 2], [3, 2], [4, 2], [5, 2]],
        [[3, 2], [4, 2], [5, 2], [6, 2]],
        [[0, 3], [1, 3], [2, 3], [3, 3]],
        [[1, 3], [2, 3], [3, 3], [4, 3]],
        [[2, 3], [3, 3], [4, 3], [5, 3]],
        [[3, 3], [4, 3], [5, 3], [6, 3]],
        [[0, 4], [1, 4], [2, 4], [3, 4]],
        [[1, 4], [2, 4], [3, 4], [4, 4]],
        [[2, 4], [3, 4], [4, 4], [5, 4]],
        [[3, 4], [4, 4], [5, 4], [6, 4]],
        [[0, 5], [1, 5], [2, 5], [3, 5]],
        [[1, 5], [2, 5], [3, 5], [4, 5]],
        [[2, 5], [3, 5], [4, 5], [5, 5]],
        [[3, 5], [4, 5], [5, 5], [6, 5]],
    ];
    for(var pidx = 0; pidx < patterns.length; pidx++) {
        var pattern = patterns[pidx];
        var winner = state[pattern[0][0]][pattern[0][1]];
        if(winner) {
            for(var idx = 1; idx < pattern.length; idx++) {
                if(winner != state[pattern[idx][0]][pattern[idx][1]]) {
                    winner = undefined;
                    break;
                }
            }
            if(winner) {
                return winner;
            }
        }
    }
    var draw = true;
    for(var x = 0; x <= 6; x++) {
        for(var y = 0; y <= 5; y++) {
            if(!state[x][y]) {
                return undefined;
            }
        }
    }
    return '';
}

var patterns = [
    {
        pattern: [['p', 0, 1], ['p', 0, 1], ['p', 0, 1], ['p']],
        score: 1000
    },
    {
        pattern: [['p', 1, 0], ['p', 1, 0], ['p', 1, 0], ['p']],
        score: 1000
    },
    {
        pattern: [['p', 1, 1], ['p', 1, 1], ['p', 1, 1], ['p']],
        score: 1000
    },
    {
        pattern: [['p', 1, -1], ['p', 1, -1], ['p', 1, -1], ['p']],
        score: 1000
    },
    {
        pattern: [['p', -1, 1], ['p', -1, 1], ['p', -1, 1], ['p']],
        score: 1000
    },
    {
        pattern: [['p', -1, -1], ['p', -1, -1], ['p', -1, -1], ['p']],
        score: 1000
    },
    {
        pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
        score: 50
    },
    {
        pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
        score: 50
    },
    {
        pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
        score: 50
    },
    {
        pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
        score: 50
    },
    {
        pattern: [['p', -1, 1], ['p', -1, 1], ['p']],
        score: 50
    },
    {
        pattern: [['p', -1, -1], ['p', -1, -1], ['p']],
        score: 50
    },
];

function match_pattern_at(state, pattern, player, x, y) {
    if( x >= 0 && x < state.length) {
        if(y >=0 && y < state[x].length) {
            var element = pattern[0];
            if(element[0] == 'p') {
                if(state[x][y] !== player) {
                    return false;
                }
            } else if(element[0] == ' ') {
                if(state[x][y] !== undefined) {
                    return false;
                }
            }
            if(pattern.length > 1) {
                return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2])
            } else {
                return true;
            }
        }
    }
    return false;
}

function match_pattern(state, pattern, player) {
    for(var idx1 = 0; idx1 < state.length; idx1++) {
        for(var idx2 = 0; idx2 < state[idx1].length; idx2++) {
            var matches = match_pattern_at(state, pattern, player, idx1, idx2);
            if(matches) {
                return true;
            }
        }
    }
    return false;
}

function heuristic(state) {
    var score = 0;
    for(var idx = 0; idx < patterns.length; idx++) {
        if(match_pattern(state, patterns[idx].pattern, 'yellow')) {
            score = score + patterns[idx].score;
        }
        if(match_pattern(state, patterns[idx].pattern, 'red')) {
            score = score - patterns[idx].score;
        }
    }
    return score;
}

function minmax(state, limit, player) {
    var moves = [];
    if(limit > 0) {
        for(var idx1 = 0; idx1 < 7; idx1++) {
            for(var idx2 = 0; idx2 < 6; idx2++) {
                if(state[idx1][idx2] === undefined) {
                    idx2 = 5;
                    while(state[idx1][idx2]) {
                        idx2 = idx2 - 1;
                    }
                    if(idx2 >= 0) {
                        var move = {
                        x: idx1,
                        y: idx2,
                        state: deepClone(state),
                        score: 0
                    };
                    move.state[idx1][idx2] = player;
                    if(limit === 1 || check_game_winner(move.state) !== undefined) {
                        move.score = heuristic(move.state);
                    } else {
                        move.moves = minmax(move.state, limit - 1, player == 'red' ? 'yellow' : 'red');
                        var score = undefined;
                        for(var idx3 = 0; idx3 < move.moves.length; idx3++) {
                            if(score === undefined) {
                                score = move.moves[idx3].score;
                            } else if(player === 'red') {
                                score = Math.max(score, move.moves[idx3].score);
                            } else if(player === 'yellow') {
                                score = Math.min(score, move.moves[idx3].score);
                            }
                        }
                        move.score = score;
                    }
                    moves.push(move);
                    }
                }
            }
        }
    }
    return moves;
}

function computer_move_medium(state) {
    var moves = minmax(state, 3, 'yellow');
    var max_score = undefined;
    var move = undefined;
    for(var idx = 0; idx < moves.length; idx++) {
        if(max_score === undefined || moves[idx].score > max_score) {
            max_score = moves[idx].score;
            move = {
                x: moves[idx].x,
                y: moves[idx].y
            }
        }
    }
    return move;
}

function computer_move_easy(state) {
    var moves = minmax(state, 1, 'yellow');
    var max_score = undefined;
    var move = undefined;
    for(var idx = 0; idx < moves.length; idx++) {
        if(max_score === undefined || moves[idx].score > max_score) {
            max_score = moves[idx].score;
            move = {
                x: moves[idx].x,
                y: moves[idx].y
            }
        }
    }
    return move;
}

function computer_move_hard(state) {
    var moves = minmax(state, 4, 'yellow');
    var max_score = undefined;
    var move = undefined;
    for(var idx = 0; idx < moves.length; idx++) {
        if(max_score === undefined || moves[idx].score > max_score) {
            max_score = moves[idx].score;
            move = {
                x: moves[idx].x,
                y: moves[idx].y
            }
        }
    }
    return move;
}


export default Component.extend({
    desktop: true,
    playing: false,
    multiplayer: false,
    easy: undefined,
    medium: true,
    hard: undefined,
    winner: undefined,
    draw: false,

    // Initialising sounds
    init: function() {
        this._super(...arguments);
        createjs.Sound.registerSound("assets/sounds/falling.mp3", "falling");
        createjs.Sound.registerSound("assets/sounds/applause.wav", "applause");
        createjs.Sound.registerSound("assets/sounds/click.wav", "place-marker");
        createjs.Sound.registerSound("assets/sounds/sad.wav", "sad");
        createjs.Sound.registerSound("assets/sounds/yellowclick.m4a", "yclick");

        var component = this;
        document.addEventListener("deviceready", function() {
            component.set('desktop', false);
            if(shake) {
                shake.startWatch(function() {
                    component.send('start');
                });
            }
        }, false);
    },

    didInsertElement: function() {
        // Initialising the stage
        var stage = new createjs.Stage(this.$('#stage')[0]);
        // Initialising the board
        var board = new createjs.Shape();
        var graphics = board.graphics;

        // Constructing the playing board
        graphics.beginFill('#ffffff');
        graphics.drawRect(50, 0, 2, 300);
        graphics.drawRect(100, 0, 2, 300);
        graphics.drawRect(150, 0, 2, 300);
        graphics.drawRect(200, 0, 2, 300);
        graphics.drawRect(250, 0, 2, 300);
        graphics.drawRect(300, 0, 2, 300);
        graphics.drawRect(350, 0, 2, 300);

        graphics.drawRect(0, 0, 2, 300);
        graphics.drawRect(0, 0, 350, 2);
        graphics.drawRect(0, 50, 350, 2);
        graphics.drawRect(0, 100, 350, 2);
        graphics.drawRect(0, 150, 350, 2);
        graphics.drawRect(0, 200, 350, 2);
        graphics.drawRect(0, 250, 350, 2);
        graphics.drawRect(0, 300, 350, 2);

        board.x = 10;
        board.y = 20;
        board.alpha = 0;
        this.set('board', board);
        stage.addChild(board);

        // Constructing the models for the player pieces.
        var markers = {
            'red': [],
            'yellow': []
        }

        for(var i = 0; i < 21; i++) {
            var redMarker = new createjs.Shape();
            graphics = redMarker.graphics;
            graphics.beginFill('#ff0000');
            graphics.drawCircle(0,0,20);
            redMarker.visible = false;

            stage.addChild(redMarker)
            markers.red.push(redMarker);

            var yellowMarker = new createjs.Shape();
            graphics = yellowMarker.graphics;
            graphics.beginFill('#ffff00');
            graphics.drawCircle(0,0,20);
            yellowMarker.visible = false;

            stage.addChild(yellowMarker)
            markers.yellow.push(yellowMarker);
        }
        this.set('markers', markers);
        this.set('stage', stage);

        createjs.Ticker.addEventListener("tick", stage);
    },

    willDestroyElement: function() {
        this._super(...arguments);
        if(shake) {
            shake.stopWatch()
        }
    },

    // Function to place markers upon user clicks
    // Taking alternating turns, places markers at coordinate locations on the board.
    click: function(ev) {
        var component = this;
        if(component.get('playing') && !component.get('winner')) {
            if(ev.target.tagName.toLowerCase() === "canvas" && ev.originalEvent.offsetX >= 10 && ev.originalEvent.offsetY >= 20 && ev.originalEvent.offsetX < 360 && ev.originalEvent.offsetY < 320) {
                var x = Math.floor((ev.originalEvent.offsetX - 10) / 50);
                // Setting y to the bottom row (top row would be index 0, bottom row index 5)
                var y = 5;

                var state = component.get('state');
                // while loop to decrement each placement vertically until the top cell is reached regardless of which cell is clicked.
                while(state[x][y] == 'red' || state[x][y] == 'yellow') {
                    if(y >= 1) {
                        y = y - 1;
                    } else {
                        break
                    }
                }
                if(!state[x][y]) {
                    // Multiplayer placement rules
                    if(component.get('multiplayer')) {
                        createjs.Sound.play("place-marker");
                        var player = component.get('player');
                        state[x][y] = player;

                        var move_count = component.get('moves')[player];
                        var marker = component.get('markers')[player][move_count];
                        marker.visible = true;
                        if(player == 'red') {
                            marker.x = 35 + x * 50;
                            marker.y = 45 + y * 50;
                        } else {
                            marker.x = 35 + x * 50;
                            marker.y = 45 + y * 50;
                        }

                        component.check_winner();
                        component.get('moves')[player] = move_count + 1;
                        if(player == 'red') {
                            component.set('player', 'yellow');
                        } else {
                            component.set('player', 'red');
                        }
                        if(!component.get('winner') && window.plugins && window.plugins.toast) {
                            window.plugins.toast.showShortBottom(component.get('player').toUpperCase() + ' to play next');
                        }
                    // Singleplayer placement rules
                    } else {
                        createjs.Sound.play("place-marker");
                        var move_count = component.get('moves')['red'];
                        var marker = component.get('markers')['red'][move_count];
                        state[x][y] = 'red';
                        marker.visible = true;
                        marker.x = 35 + x * 50;
                        marker.y = 45 + y * 50;
                        component.check_winner();
                        component.get('moves')['red'] = move_count + 1;

                        setTimeout(function() {
                            if(!component.get('winner') && !component.get('draw')) {
                                if(component.get('medium')) {
                                    createjs.Sound.play("yclick");
                                    var move = computer_move_medium(state);
                                    move_count = component.get('moves')['yellow'];
                                    state[move.x][move.y] = 'yellow';
                                    marker = component.get('markers')['yellow'][move_count];
                                    marker.visible = true;
                                    marker.x = 35 + move.x * 50;
                                    marker.y = 45 + move.y * 50;
                                    component.get('moves')['yellow'] = move_count + 1;
                                    component.get('stage').update();
                                    component.check_winner();
                                } else if(component.get('easy')) {
                                    createjs.Sound.play("yclick");
                                    var move = computer_move_easy(state);
                                    move_count = component.get('moves')['yellow'];
                                    state[move.x][move.y] = 'yellow';
                                    marker = component.get('markers')['yellow'][move_count];
                                    marker.visible = true;
                                    marker.x = 35 + move.x * 50;
                                    marker.y = 45 + move.y * 50;
                                    component.get('moves')['yellow'] = move_count + 1;
                                    component.get('stage').update();
                                    component.check_winner();
                                } else if(component.get('hard')) {
                                    createjs.Sound.play("yclick");
                                    var move = computer_move_hard(state);
                                    move_count = component.get('moves')['yellow'];
                                    state[move.x][move.y] = 'yellow';
                                    marker = component.get('markers')['yellow'][move_count];
                                    marker.visible = true;
                                    marker.x = 35 + move.x * 50;
                                    marker.y = 45 + move.y * 50;
                                    component.get('moves')['yellow'] = move_count + 1;
                                    component.get('stage').update();
                                    component.check_winner();
                                }
                            }
                        }, 500);
                    }
                }
            }
        }
    },

    check_winner: function() {
        var state = this.get('state');
        var multiplayer = this.get('multiplayer');
        var winner = check_game_winner(state);
        if(winner !== undefined) {
            if(winner === '') {
                this.set('draw', true);
            } else {
                this.set('winner', winner);
                if(multiplayer != true) {
                    if(winner === 'yellow') {
                        createjs.Sound.play("sad");
                    } else {
                        createjs.Sound.play("applause");
                    }
                } else {
                    if(winner) {
                        createjs.Sound.play("applause");
                    }
                }
            }
        }
    },

    // Functions to set and update play states of the game.
    actions: {
        start: function() {
            if(window.plugins && window.plugins.toast) {
                window.plugins.toast.showShortBottom('Red to play next');
            }
            var board = this.get('board');
            board.alpha = 0;

            // Board and marker animations
            if(this.get('playing') || this.get('multiplayer')) {
                var markers = this.get('markers');
                for(var idx = 0; idx < 21; idx++) {
                    createjs.Tween.get(markers.red[idx]).to({y: 600}, 500);
                    createjs.Tween.get(markers.yellow[idx]).to({y: 600}, 500);
                }
                createjs.Sound.play("falling");
                createjs.Tween.get(board).wait(500).to({alpha: 1}, 1000);
            } else {
                createjs.Tween.get(board).to({alpha: 1}, 1000);
            }

            this.set('playing', true);
            this.set('winner', undefined);
            this.set('draw', undefined);
            this.set('state', [
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined]]);
            this.set('moves', {'red': 0, 'yellow': 0});
            this.set('player', 'red');
        },

        playing: function() {
            this.set('playing', true);
        },

        // Repeat code of the start function but sets multiplayer to true and forces marker placement rules to change.
        multiplayer: function() {
            var board = this.get('board');
            board.alpha = 0;

            // Board and marker animations
            if(this.get('playing') || this.get('multiplayer')) {
                var markers = this.get('markers');
                for(var idx = 0; idx < 21; idx++) {
                    createjs.Tween.get(markers.red[idx]).to({y: 600}, 500);
                    createjs.Tween.get(markers.yellow[idx]).to({y: 600}, 500);
                }
                createjs.Sound.play("falling");
                createjs.Tween.get(board).wait(500).to({alpha: 1}, 1000);
            } else {
                createjs.Tween.get(board).to({alpha: 1}, 1000);
            }

            this.set('multiplayer', true);
            this.set('playing', true);
            this.set('winner', undefined);
            this.set('draw', undefined);
            this.set('state', [
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined]]);
            this.set('moves', {'red': 0, 'yellow': 0});
            this.set('player', 'red');
        },

        easy: function() {
            this.set('medium', false);
            this.set('hard', false);
            this.set('easy', true);
        },
        medium: function() {
            this.set('easy', false);
            this.set('hard', false);
            this.set('medium', true);
        },
        hard: function() {
            this.set('medium', false);
            this.set('easy', false);
            this.set('hard', true);
        },

        // 'save-highscore': function() {
        //     var action = this.get('on-save-highscore');
        //     if(action !== undefined) {
        //         action(this.get('player_name'), this.get('moves'));
        //     }
        // }
    },
});
