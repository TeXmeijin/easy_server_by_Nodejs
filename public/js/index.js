$(() => {
    class calcGameManager {
        constructor() {
            this.root = $('#prg-contents');
            this.numbers = this.root.find('#prg-numbers');
        }
        generateRandom(max, min = 0) {
            return Math.floor( Math.random() * (max + 1 - min) ) + min ;
        }
        setRandomNumbers() {
            let ns = this.numbers.find('.number');
            ns.each((el, ind) => {
            });
        }
    }
});
