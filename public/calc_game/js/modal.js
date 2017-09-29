$(() => {
    class ModalManager {
        constructor() {
            this.initView();
            this.bindAllListeners();
            this.state = 0;
        }
        initView() {
            this.showModalBack();
            this.showRuleExplainModal();
        }
        bindAllListeners() {
            $('.modalBack').on('click', $.proxy(this, 'onModalBackClicked'));
            $('.closeBtn').on('click', $.proxy(this, 'onCloseButtonClicked'));
            $('.gameStart').on('click', $.proxy(this, 'onGameStartButtonClicked'));
            pubsub.subscribe('index.onJudgeCorrect', $.proxy(this, 'showCorrectModal'));
            pubsub.subscribe('index.onJudgeIncorrect', $.proxy(this, 'showIncorrectModal'));
            pubsub.subscribe('index.timeout', $.proxy(this, 'showResultModal'));
        }
        showModalBack() {
            $('.modalBack').removeClass('is-hide');
        }
        showRuleExplainModal() {
            $('.ruleExplain').removeClass('is-hide');
        }
        showCorrectModal(argObj) {
            this.showModalBack();
            $('.correct').removeClass('is-hide');
            $('.correct .detail').text(argObj.detail);
            if (argObj.callback){
                this.callback = argObj.callback;
            }
        }
        showIncorrectModal(argObj) {
            this.showModalBack();
            $('.incorrect').removeClass('is-hide');
            $('.incorrect .detail').text(argObj.detail);
            if (argObj.callback){
                this.callback = argObj.callback;
            }
        }
        showResultModal(argObj) {
            this.closeModal();
            this.showModalBack();
            let count, correct;
            count = $('#prg-count').text();
            correct = $('#prg-correct').text();
            $('.modal .result .count').text(count);
            $('.modal .result .correct').text(correct);

            this.state = 0;
            $('.result').removeClass('is-hide');
        }
        onModalBackClicked() {
            if (this.state === 0){
                return;
            }
            this.closeModal();
        }
        onCloseButtonClicked() {
            this.closeModal();
        }
        onGameStartButtonClicked() {
            this.state = 1;
            pubsub.publish('index.gameStart', {timeLimit: 120});
        }
        closeModal() {
            $('.modalBack').addClass('is-hide');
            $('.modal').addClass('is-hide');
            if (this.callback){
                this.callback();
                this.callback = undefined;
            }
        }
    }
    let m = new ModalManager();
});
