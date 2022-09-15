"use strict";



;define('webapp/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.JSONAPIAdapter.extend({
        host: 'http://localhost:4201'
    });
});
;define('webapp/app', ['exports', 'webapp/resolver', 'ember-load-initializers', 'webapp/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('webapp/components/connect-four', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    function deepClone(state) {
        var new_state = [];
        for (var idx1 = 0; idx1 < state.length; idx1++) {
            new_state.push(state[idx1].slice(0));
        }
        return new_state;
    }

    function check_game_winner(state) {
        var patterns = [
        // All possible winning patterns (Vertical, Diagonal and Horizontal)
        [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]], [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]], [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]], [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]], [[6, 0], [6, 1], [6, 2], [6, 3]], [[6, 1], [6, 2], [6, 3], [6, 4]], [[6, 2], [6, 3], [6, 4], [6, 5]], [[0, 3], [1, 2], [2, 1], [3, 0]], [[0, 4], [1, 3], [2, 2], [3, 1]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[1, 3], [2, 2], [3, 1], [4, 0]], [[0, 5], [1, 4], [2, 3], [3, 2]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[2, 3], [3, 2], [4, 1], [5, 0]], [[1, 5], [2, 4], [3, 3], [4, 2]], [[2, 4], [3, 3], [4, 2], [5, 1]], [[3, 3], [4, 2], [5, 1], [6, 0]], [[2, 5], [3, 4], [4, 3], [5, 2]], [[3, 4], [4, 3], [5, 2], [6, 1]], [[3, 5], [4, 4], [5, 3], [6, 2]], [[3, 0], [4, 1], [5, 2], [6, 3]], [[2, 0], [3, 1], [4, 2], [5, 3]], [[3, 1], [4, 2], [5, 3], [6, 4]], [[1, 0], [2, 1], [3, 2], [4, 3]], [[2, 1], [3, 2], [4, 3], [5, 4]], [[3, 2], [4, 3], [5, 4], [6, 5]], [[0, 0], [1, 1], [2, 2], [3, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]], [[2, 2], [3, 3], [4, 4], [5, 5]], [[0, 1], [1, 2], [2, 3], [3, 4]], [[1, 2], [2, 3], [3, 4], [4, 5]], [[0, 2], [1, 3], [2, 4], [3, 5]], [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]], [[3, 0], [4, 0], [5, 0], [6, 0]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]], [[3, 1], [4, 1], [5, 1], [6, 1]], [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]], [[3, 2], [4, 2], [5, 2], [6, 2]], [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]], [[3, 3], [4, 3], [5, 3], [6, 3]], [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]], [[3, 4], [4, 4], [5, 4], [6, 4]], [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]], [[3, 5], [4, 5], [5, 5], [6, 5]]];
        for (var pidx = 0; pidx < patterns.length; pidx++) {
            var pattern = patterns[pidx];
            var winner = state[pattern[0][0]][pattern[0][1]];
            if (winner) {
                for (var idx = 1; idx < pattern.length; idx++) {
                    if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
                        winner = undefined;
                        break;
                    }
                }
                if (winner) {
                    return winner;
                }
            }
        }
        var draw = true;
        for (var x = 0; x <= 6; x++) {
            for (var y = 0; y <= 5; y++) {
                if (!state[x][y]) {
                    return undefined;
                }
            }
        }
        return '';
    }

    var patterns = [{
        pattern: [['p', 0, 1], ['p', 0, 1], ['p', 0, 1], ['p']],
        score: 1000
    }, {
        pattern: [['p', 1, 0], ['p', 1, 0], ['p', 1, 0], ['p']],
        score: 1000
    }, {
        pattern: [['p', 1, 1], ['p', 1, 1], ['p', 1, 1], ['p']],
        score: 1000
    }, {
        pattern: [['p', 1, -1], ['p', 1, -1], ['p', 1, -1], ['p']],
        score: 1000
    }, {
        pattern: [['p', -1, 1], ['p', -1, 1], ['p', -1, 1], ['p']],
        score: 1000
    }, {
        pattern: [['p', -1, -1], ['p', -1, -1], ['p', -1, -1], ['p']],
        score: 1000
    }, {
        pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
        score: 50
    }, {
        pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
        score: 50
    }, {
        pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
        score: 50
    }, {
        pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
        score: 50
    }, {
        pattern: [['p', -1, 1], ['p', -1, 1], ['p']],
        score: 50
    }, {
        pattern: [['p', -1, -1], ['p', -1, -1], ['p']],
        score: 50
    }];

    function match_pattern_at(state, pattern, player, x, y) {
        if (x >= 0 && x < state.length) {
            if (y >= 0 && y < state[x].length) {
                var element = pattern[0];
                if (element[0] == 'p') {
                    if (state[x][y] !== player) {
                        return false;
                    }
                } else if (element[0] == ' ') {
                    if (state[x][y] !== undefined) {
                        return false;
                    }
                }
                if (pattern.length > 1) {
                    return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2]);
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    function match_pattern(state, pattern, player) {
        for (var idx1 = 0; idx1 < state.length; idx1++) {
            for (var idx2 = 0; idx2 < state[idx1].length; idx2++) {
                var matches = match_pattern_at(state, pattern, player, idx1, idx2);
                if (matches) {
                    return true;
                }
            }
        }
        return false;
    }

    function heuristic(state) {
        var score = 0;
        for (var idx = 0; idx < patterns.length; idx++) {
            if (match_pattern(state, patterns[idx].pattern, 'yellow')) {
                score = score + patterns[idx].score;
            }
            if (match_pattern(state, patterns[idx].pattern, 'red')) {
                score = score - patterns[idx].score;
            }
        }
        return score;
    }

    function minmax(state, limit, player) {
        var moves = [];
        if (limit > 0) {
            for (var idx1 = 0; idx1 < 7; idx1++) {
                for (var idx2 = 0; idx2 < 6; idx2++) {
                    if (state[idx1][idx2] === undefined) {
                        idx2 = 5;
                        while (state[idx1][idx2]) {
                            idx2 = idx2 - 1;
                        }
                        if (idx2 >= 0) {
                            var move = {
                                x: idx1,
                                y: idx2,
                                state: deepClone(state),
                                score: 0
                            };
                            move.state[idx1][idx2] = player;
                            if (limit === 1 || check_game_winner(move.state) !== undefined) {
                                move.score = heuristic(move.state);
                            } else {
                                move.moves = minmax(move.state, limit - 1, player == 'red' ? 'yellow' : 'red');
                                var score = undefined;
                                for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                                    if (score === undefined) {
                                        score = move.moves[idx3].score;
                                    } else if (player === 'red') {
                                        score = Math.max(score, move.moves[idx3].score);
                                    } else if (player === 'yellow') {
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
        for (var idx = 0; idx < moves.length; idx++) {
            if (max_score === undefined || moves[idx].score > max_score) {
                max_score = moves[idx].score;
                move = {
                    x: moves[idx].x,
                    y: moves[idx].y
                };
            }
        }
        return move;
    }

    function computer_move_easy(state) {
        var moves = minmax(state, 1, 'yellow');
        var max_score = undefined;
        var move = undefined;
        for (var idx = 0; idx < moves.length; idx++) {
            if (max_score === undefined || moves[idx].score > max_score) {
                max_score = moves[idx].score;
                move = {
                    x: moves[idx].x,
                    y: moves[idx].y
                };
            }
        }
        return move;
    }

    function computer_move_hard(state) {
        var moves = minmax(state, 4, 'yellow');
        var max_score = undefined;
        var move = undefined;
        for (var idx = 0; idx < moves.length; idx++) {
            if (max_score === undefined || moves[idx].score > max_score) {
                max_score = moves[idx].score;
                move = {
                    x: moves[idx].x,
                    y: moves[idx].y
                };
            }
        }
        return move;
    }

    exports.default = Ember.Component.extend({
        desktop: true,
        playing: false,
        multiplayer: false,
        easy: undefined,
        medium: true,
        hard: undefined,
        winner: undefined,
        draw: false,

        // Initialising sounds
        init: function () {
            this._super(...arguments);
            createjs.Sound.registerSound("assets/sounds/falling.mp3", "falling");
            createjs.Sound.registerSound("assets/sounds/applause.wav", "applause");
            createjs.Sound.registerSound("assets/sounds/click.wav", "place-marker");
            createjs.Sound.registerSound("assets/sounds/sad.wav", "sad");
            createjs.Sound.registerSound("assets/sounds/yellowclick.m4a", "yclick");

            var component = this;
            document.addEventListener("deviceready", function () {
                component.set('desktop', false);
                if (shake) {
                    shake.startWatch(function () {
                        component.send('start');
                    });
                }
            }, false);
        },

        didInsertElement: function () {
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
            };

            for (var i = 0; i < 21; i++) {
                var redMarker = new createjs.Shape();
                graphics = redMarker.graphics;
                graphics.beginFill('#ff0000');
                graphics.drawCircle(0, 0, 20);
                redMarker.visible = false;

                stage.addChild(redMarker);
                markers.red.push(redMarker);

                var yellowMarker = new createjs.Shape();
                graphics = yellowMarker.graphics;
                graphics.beginFill('#ffff00');
                graphics.drawCircle(0, 0, 20);
                yellowMarker.visible = false;

                stage.addChild(yellowMarker);
                markers.yellow.push(yellowMarker);
            }
            this.set('markers', markers);
            this.set('stage', stage);

            createjs.Ticker.addEventListener("tick", stage);
        },

        willDestroyElement: function () {
            this._super(...arguments);
            if (shake) {
                shake.stopWatch();
            }
        },

        // Function to place markers upon user clicks
        // Taking alternating turns, places markers at coordinate locations on the board.
        click: function (ev) {
            var component = this;
            if (component.get('playing') && !component.get('winner')) {
                if (ev.target.tagName.toLowerCase() === "canvas" && ev.originalEvent.offsetX >= 10 && ev.originalEvent.offsetY >= 20 && ev.originalEvent.offsetX < 360 && ev.originalEvent.offsetY < 320) {
                    var x = Math.floor((ev.originalEvent.offsetX - 10) / 50);
                    // Setting y to the bottom row (top row would be index 0, bottom row index 5)
                    var y = 5;

                    var state = component.get('state');
                    // while loop to decrement each placement vertically until the top cell is reached regardless of which cell is clicked.
                    while (state[x][y] == 'red' || state[x][y] == 'yellow') {
                        if (y >= 1) {
                            y = y - 1;
                        } else {
                            break;
                        }
                    }
                    if (!state[x][y]) {
                        // Multiplayer placement rules
                        if (component.get('multiplayer')) {
                            createjs.Sound.play("place-marker");
                            var player = component.get('player');
                            state[x][y] = player;

                            var move_count = component.get('moves')[player];
                            var marker = component.get('markers')[player][move_count];
                            marker.visible = true;
                            if (player == 'red') {
                                marker.x = 35 + x * 50;
                                marker.y = 45 + y * 50;
                            } else {
                                marker.x = 35 + x * 50;
                                marker.y = 45 + y * 50;
                            }

                            component.check_winner();
                            component.get('moves')[player] = move_count + 1;
                            if (player == 'red') {
                                component.set('player', 'yellow');
                            } else {
                                component.set('player', 'red');
                            }
                            if (!component.get('winner') && window.plugins && window.plugins.toast) {
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

                            setTimeout(function () {
                                if (!component.get('winner') && !component.get('draw')) {
                                    if (component.get('medium')) {
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
                                    } else if (component.get('easy')) {
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
                                    } else if (component.get('hard')) {
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

        check_winner: function () {
            var state = this.get('state');
            var multiplayer = this.get('multiplayer');
            var winner = check_game_winner(state);
            if (winner !== undefined) {
                if (winner === '') {
                    this.set('draw', true);
                } else {
                    this.set('winner', winner);
                    if (multiplayer != true) {
                        if (winner === 'yellow') {
                            createjs.Sound.play("sad");
                        } else {
                            createjs.Sound.play("applause");
                        }
                    } else {
                        if (winner) {
                            createjs.Sound.play("applause");
                        }
                    }
                }
            }
        },

        // Functions to set and update play states of the game.
        actions: {
            start: function () {
                if (window.plugins && window.plugins.toast) {
                    window.plugins.toast.showShortBottom('Red to play next');
                }
                var board = this.get('board');
                board.alpha = 0;

                // Board and marker animations
                if (this.get('playing') || this.get('multiplayer')) {
                    var markers = this.get('markers');
                    for (var idx = 0; idx < 21; idx++) {
                        createjs.Tween.get(markers.red[idx]).to({ y: 600 }, 500);
                        createjs.Tween.get(markers.yellow[idx]).to({ y: 600 }, 500);
                    }
                    createjs.Sound.play("falling");
                    createjs.Tween.get(board).wait(500).to({ alpha: 1 }, 1000);
                } else {
                    createjs.Tween.get(board).to({ alpha: 1 }, 1000);
                }

                this.set('playing', true);
                this.set('winner', undefined);
                this.set('draw', undefined);
                this.set('state', [[undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
                this.set('moves', { 'red': 0, 'yellow': 0 });
                this.set('player', 'red');
            },

            playing: function () {
                this.set('playing', true);
            },

            // Repeat code of the start function but sets multiplayer to true and forces marker placement rules to change.
            multiplayer: function () {
                var board = this.get('board');
                board.alpha = 0;

                // Board and marker animations
                if (this.get('playing') || this.get('multiplayer')) {
                    var markers = this.get('markers');
                    for (var idx = 0; idx < 21; idx++) {
                        createjs.Tween.get(markers.red[idx]).to({ y: 600 }, 500);
                        createjs.Tween.get(markers.yellow[idx]).to({ y: 600 }, 500);
                    }
                    createjs.Sound.play("falling");
                    createjs.Tween.get(board).wait(500).to({ alpha: 1 }, 1000);
                } else {
                    createjs.Tween.get(board).to({ alpha: 1 }, 1000);
                }

                this.set('multiplayer', true);
                this.set('playing', true);
                this.set('winner', undefined);
                this.set('draw', undefined);
                this.set('state', [[undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
                this.set('moves', { 'red': 0, 'yellow': 0 });
                this.set('player', 'red');
            },

            easy: function () {
                this.set('medium', false);
                this.set('hard', false);
                this.set('easy', true);
            },
            medium: function () {
                this.set('easy', false);
                this.set('hard', false);
                this.set('medium', true);
            },
            hard: function () {
                this.set('medium', false);
                this.set('easy', false);
                this.set('hard', true);
            }

            // 'save-highscore': function() {
            //     var action = this.get('on-save-highscore');
            //     if(action !== undefined) {
            //         action(this.get('player_name'), this.get('moves'));
            //     }
            // }
        }
    });
});
;define('webapp/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('webapp/controllers/game', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            'save-highscore': function (name, score) {
                var controller = this;
                var highscore = controller.store.createRecord('highscore', {
                    name: name,
                    score: score
                });
                highscore.save().then(function () {
                    controller.store.unloadAll();
                    controller.transitionToRoute('highscores');
                });
            }
        }
    });
});
;define('webapp/helpers/app-version', ['exports', 'webapp/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('webapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('webapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('webapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'webapp/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('webapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('webapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('webapp/initializers/export-application-global', ['exports', 'webapp/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define("webapp/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
;define('webapp/models/highscore', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        name: _emberData.default.attr('string'),
        score: _emberData.default.attr('number')
    });
});
;define('webapp/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('webapp/router', ['exports', 'webapp/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('game', { path: '/' });
    this.route('highscores');
  });

  exports.default = Router;
});
;define('webapp/routes/game', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('webapp/routes/highscores', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function () {
            return this.store.findAll('highscore');
        }
    });
});
;define('webapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("webapp/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hQPdPg0V", "block": "{\"symbols\":[],\"statements\":[[6,\"section\"],[10,\"id\",\"app\"],[8],[0,\"\\n    \"],[6,\"header\"],[8],[0,\"\\n        \"],[6,\"h1\"],[8],[4,\"link-to\",[\"game\"],null,{\"statements\":[[0,\"Connect 4\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"article\"],[8],[0,\"\\n        \"],[1,[20,\"outlet\"],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"footer\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"float-left\"],[8],[0,\"\\n            Powered by Ember.\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"float-right\"],[8],[0,\"\\n            \"],[4,\"link-to\",[\"highscores\"],null,{\"statements\":[[0,\"High-scores\"]],\"parameters\":[]},null],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "webapp/templates/application.hbs" } });
});
;define("webapp/templates/components/connect-four", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "C/AjvJTK", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"playing\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"winner\"]]],null,{\"statements\":[[0,\"            Player \"],[1,[20,\"winner\"],false],[0,\" Won!\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"draw\"]]],null,{\"statements\":[[0,\"        We'll call it a draw.\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"desktop\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"class\",\"float-right\"],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"\\n        Restart\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    Shake the device to restart\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"div\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"multiplayer\"]]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"easy\"]]],null,{\"statements\":[[0,\"        Easy Difficulty\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"medium\"]]],null,{\"statements\":[[0,\"        Medium Difficulty\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"hard\"]]],null,{\"statements\":[[0,\"        Hard Difficulty\\n    \"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"multiplayer\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"winner\"]]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[0,\"                Player \"],[1,[20,\"player\"],false],[0,\"s turn.\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"            You are \"],[1,[20,\"player\"],false],[0,\"!\\n            \"],[6,\"div\"],[10,\"class\",\"difficulties\"],[8],[0,\"\\n                \"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"easy\"]],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"Easy\"],[9],[0,\"\\n                \"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"medium\"]],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"Medium\"],[9],[0,\"\\n                \"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"hard\"]],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"Hard\"],[9],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"multiplayer\"]],[8],[0,\"\\n        Multiplayer\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n        2 Human controlled players taking alternate turns.\\n    \"],[9],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"space\"],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"\\n        Single Player\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n        Single player game taking alternate turns against a computer.\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[6,\"canvas\"],[10,\"id\",\"stage\"],[10,\"width\",\"380\"],[10,\"height\",\"380\"],[8],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "webapp/templates/components/connect-four.hbs" } });
});
;define("webapp/templates/game", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "c/Di30Re", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"connect-four\",null,[[\"on-save-highscore\"],[[26,\"action\",[[21,0,[]],\"save-highscore\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "webapp/templates/game.hbs" } });
});
;define("webapp/templates/highscores", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "C2rfO/kV", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"div\"],[10,\"class\",\"text-center\"],[8],[0,\"\\n    \"],[6,\"h2\"],[8],[0,\"High-scores\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"ol\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"float-left\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"float-right\"],[8],[1,[21,1,[\"score\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "webapp/templates/highscores.hbs" } });
});
;

;define('webapp/config/environment', [], function() {
  var prefix = 'webapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("webapp/app")["default"].create({"name":"webapp","version":"0.0.0"});
          }
        
//# sourceMappingURL=webapp.map
