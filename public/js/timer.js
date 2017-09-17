$(() => {
    class Timer {
        constructor() {
            this.timeLimit = 0;
            this.bindAllListeners();
        }
        bindAllListeners() {
            pubsub.subscribe('index.gameStart', $.proxy(this, 'startTimer'));
        }
        startTimer(argObj) {
            this.timeLimit = argObj.timeLimit;
            setTimeout($.proxy(this, 'decrementSecond'), 1000);
        }
        decrementSecond() {
            this.timeLimit -= 1;
            if (this.timeLimit === 0) {
                pubsub.publish('index.timeout', {});
                return;
            }
            pubsub.publish('index.timeChanged', {time: this.timeLimit});
            setTimeout($.proxy(this, 'decrementSecond'), 1000);
        }
    }
    let t = new Timer();
});
