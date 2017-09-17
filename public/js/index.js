$(() => {
    class calcGameManager {
        constructor() {
            this.root = $('#prg-contents');
            this.numbers = this.root.find('#prg-numbers');
            this.operators = this.root.find('#prg-operators');
            this.proceed = this.root.find('#prg-proceed');
            this.footer = this.root.find('#prg-footer');

            this.initView();
            this.bindAllListeners();
            this.resetParams();
        }
        resetParams() {
            this.prepareQuestion();
        }
        initView() {
            this.randBase = 10;
            this.randMax = 15;
            this.randMin = -15;

            this.footer.find('#prg-count').text('0');
            this.footer.find('#prg-correct').text('0');
            this.footer.find('#prg-timeLimit').text('120');
        }
        prepareQuestion() {
            this.setRandomNumbers();
            this.setGoalNumber();

            this.proceed.find('.first').text('');
            this.proceed.find('.second').text('');
            this.proceed.find('.operator').text('');

            this.firstNum = 0;
            this.secondNum = 0;
            this.operator = '';

            this.unsetGrayBackGround(this.numbers.find('.number'));
            this.setGrayBackGround(this.operators.find('.operator'));
        }
        bindAllListeners() {
            let ns = this.numbers.find('.number');
            ns.on('click', $.proxy(this, 'onClickedNumberButton'));
            let op = this.operators.find('.operator');
            op.on('click', $.proxy(this, 'onClickedOperatorButton'));

            pubsub.subscribe('index.gameStart', $.proxy(this, 'onGameStarted'));
            pubsub.subscribe('index.timeChanged', $.proxy(this, 'onTimeChanged'));
        }
        onGameStarted(argObj) {
            console.log('hogehoge');
            this.initView();
            this.prepareQuestion();
            $("#prg-timeLimit").text(argObj.timeLimit);
        }
        onTimeChanged(argObj) {
            let time = argObj.time;
            if (time < 40) {
                this.randBase = 17;
            } else if (time < 70) {
                this.randBase = 15;
            }
            $("#prg-timeLimit").text(time);
        }
        generateRandom(max, min = 0) {
            return Math.floor( Math.random() * (max + 1 - min) ) + min ;
        }
        setRandomNumbers() {
            let ns = this.numbers.find('.number');
            ns.each((ind, el) => {
                let rand = this.generateRandom(this.randMax, this.randMin) * this.randBase; 
                if (rand === 0){
                    rand = 1;
                }
                $(el).text(rand);
            });
        }
        setGoalNumber() {
            this.firstAnswer = parseFloat($((this.numbers.find('.number'))[this.generateRandom(7, 0)]).text());
            this.secondAnswer = parseFloat($((this.numbers.find('.number'))[this.generateRandom(7, 0)]).text());
            this.operatorAnswer = $(this.operators.find('.operator')[this.generateRandom(3, 0)]).data('operator');
            this.proceed.find('.goal').text(this.calcUserAnswer(this.firstAnswer, this.secondAnswer, this.operatorAnswer));
        }
        onClickedNumberButton(evt) {
            let num = parseFloat($(evt.currentTarget).text());
            if(this.firstNum === 0) {
                this.firstNum = num;
                this.proceed.find('.first').text(this.firstNum);
                this.setGrayBackGround(this.numbers.find('.number'));
                this.unsetGrayBackGround(this.operators.find('.operator'));
            } else {
                this.secondNum = num;
                this.proceed.find('.second').text(this.secondNum);
                this.judgeAnswer();
                this.unsetGrayBackGround(this.numbers.find('.number'));
                this.setGrayBackGround(this.operators.find('.operator'));
            }
        }
        onClickedOperatorButton(evt) {
            this.operator = $(evt.currentTarget).data('operator');
            this.proceed.find('.operator').text(this.operator);
            this.unsetGrayBackGround(this.numbers.find('.number'));
            this.setGrayBackGround(this.operators.find('.operator'));
        }
        calcUserAnswer(firstNum = this.firstNum, secondNum = this.secondNum, operator = this.operator) {
            let ua = 0;
            if(operator === '+') {
                ua = firstNum + secondNum;
            } else if(operator === '-') {
                ua = firstNum - secondNum;
            } else if(operator === '*') {
                ua = firstNum * secondNum;
            } else if(operator === '/') {
                ua = firstNum / secondNum;
            }
            return ua;
        }
        judgeAnswer() {
            let answer = parseFloat(this.proceed.find('.goal').text());
            let ua = this.calcUserAnswer();
            let detail = this.firstAnswer + this.operatorAnswer + this.secondAnswer + '=' + answer;

            if(ua === answer) {
                pubsub.publish('index.onJudgeCorrect', {'detail': detail, 'callback': $.proxy(this, 'resetParams')});
                this.countUpCorrect();
            } else {
                pubsub.publish('index.onJudgeIncorrect', {'detail': detail, 'callback': $.proxy(this, 'resetParams')});
            }
            this.countUpQuestion();
        }
        countUpQuestion() {
            let count = parseInt(this.footer.find('#prg-count').text(), 10);
            count += 1;
            this.footer.find('#prg-count').text(count);
        }
        countUpCorrect() {
            let count = parseInt(this.footer.find('#prg-correct').text(), 10);
            count += 1;
            this.footer.find('#prg-correct').text(count);
        }
        setGrayBackGround(element) {
            element.addClass('gray');
            element.prop("disabled", true);
        }
        unsetGrayBackGround(element) {
            element.removeClass('gray');
            element.prop("disabled", false);
        }
    }
    let m = new calcGameManager();
});
