$(() => {
    class calcGameManager {
        constructor() {
            this.root = $('#prg-contents');
            this.numbers = this.root.find('#prg-numbers');
            this.operators = this.root.find('#prg-operators');
            this.proceed = this.root.find('#prg-proceed');
            this.bindAllListeners();
            this.resetParams();
        }
        resetParams() {
            this.initView();

            this.firstNum = 0;
            this.secondNum = 0;
            this.operator = '';
            console.log(this.proceed.find('.first'));
            this.proceed.find('.first').text('');
            this.proceed.find('.second').text('');
        }
        initView() {
            this.setRandomNumbers();
            this.setGoalNumber();
        }
        bindAllListeners() {
            let ns = this.numbers.find('.number');
            ns.on('click', $.proxy(this, 'onClickedNumberButton'));
            let op = this.operators.find('.operator');
            op.on('click', $.proxy(this, 'onClickedOperatorButton'));
        }
        generateRandom(max, min = 0) {
            return Math.floor( Math.random() * (max + 1 - min) ) + min ;
        }
        setRandomNumbers() {
            let ns = this.numbers.find('.number');
            ns.each((ind, el) => {
                let rand = this.generateRandom(15, -15) * 15
                $(el).text(rand);
            });
        }
        setGoalNumber() {
            this.firstNum = parseFloat($((this.numbers.find('.number'))[this.generateRandom(7, 0)]).text());
            this.secondNum = parseFloat($((this.numbers.find('.number'))[this.generateRandom(7, 0)]).text());
            this.operator = $(this.operators.find('.operator')[this.generateRandom(3, 0)]).data('operator');
            this.proceed.find('.goal').text(this.calcUserAnswer());
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
        calcUserAnswer() {
            let ua = 0;
            if(this.operator === '+') {
                ua = this.firstNum + this.secondNum;
            } else if(this.operator === '-') {
                ua = this.firstNum - this.secondNum;
            } else if(this.operator === '*') {
                ua = this.firstNum * this.secondNum;
            } else if(this.operator === '/') {
                ua = this.firstNum / this.secondNum;
            }
            return ua;
        }
        judgeAnswer() {
            let answer = parseFloat(this.proceed.find('.goal').text());
            let ua = this.calcUserAnswer();

            if(ua === answer) {
                alert('正解です!!');
            } else {
                alert('不正解。。。');
            }
            this.resetParams();
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
