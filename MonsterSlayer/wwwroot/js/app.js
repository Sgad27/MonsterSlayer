new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            var vm = this;
            vm.isGameRunning = true;
            vm.playerHealth = 100;
            vm.monsterHealth = 100;
            vm.turns = [];
        },
        attack() {
            var vm = this;

            var damage = vm.calculateDamage(3, 10);
            vm.playerHealth -= damage;
            vm.turns.unshift({

                isPlayer: true,
                text: "Player hits monster for " + damage
            });
            if (vm.checkWin())
                return;

            vm.monsterAttack();
        },
        specialAttack() {
            var vm = this;

            var damage = vm.calculateDamage(10, 20);
            vm.playerHealth -= damage;
            vm.turns.unshift({

                isPlayer: true,
                text: "Player hits monster hard for " + damage
            });

            vm.monsterAttack();
        },
        heal() {
            var vm = this;

            if (vm.playerHealth <= 90)
                vm.playerHealth += 10;
            else
                vm.playerHealth = 100;

            vm.turns.unshift({

                isPlayer: true,
                text: "Player heals for 10"
            });

            vm.monsterAttack();
        },
        giveUp() {
            this.isGameRunning = false;
        },
        monsterAttack() {
            var vm = this;

            var damage = vm.calculateDamage(5, 12)
            vm.monsterHealth -= damage;
            vm.turns.unshift({

                isPlayer: false,
                text: "Monster hits player for " + damage
            });
            vm.checkWin();
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            var vm = this;
            if (vm.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    vm.startGame()
                }
                else
                    vm.isGameRunning = false;
                return true;
            }
            else if (vm.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    vm.startGame()
                }
                else
                    vm.isGameRunning = false;
                return true;
            }
            return false;
        }

    }
});