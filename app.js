var app = angular.module("HangmanApp", []);

app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout){
    var words = ["maharashtra", "carphonewarehouse", "lonavala", "india"];
    $scope.incorrectWordChosen = [];
    $scope.correctWordChosen = [];
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter: ''
    }

    var selectRandomWord = function(){
        var index = Math.round(Math.random()*words.length);
        while(index >= 4){
            index = Math.round(Math.random()*words.length);
        }
        console.log(index);
        return words[index];
    }

    var newGame = function(){
        $scope.incorrectWordChosen = [];
        $scope.correctWordChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = '';

        selectedWord = selectRandomWord();

        tempDisplayWord = '';
        for(var i=0; i < selectedWord.length; i++){
            tempDisplayWord += '*';
        }

        $scope.displayWord = tempDisplayWord;
    }

    $scope.letterChosen = function(){
        if($scope.input.letter.length > 1){
            alert("Please enter a single alphabet");
            $scope.input.letter = "";
            return
        }

        for(var i=0; i < $scope.incorrectWordChosen.length; i++){
            if($scope.incorrectWordChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                return
            }
        }

        for(var i=0; i < $scope.correctWordChosen.length; i++){
            if($scope.correctWordChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                return
            }
        }

        var correct = false;
        console.log(selectedWord);
        for(var i=0; i < selectedWord.length; i++){
            if(selectedWord[i] == $scope.input.letter){
                $scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1, selectedWord.length);
                correct = true;
            }
        }
        if(correct) {
            $scope.correctWordChosen.push($scope.input.letter.toLowerCase());
        }else{
            $scope.guesses--;
            $scope.incorrectWordChosen.push($scope.input.letter.toLowerCase());
        }
        $scope.input.letter = "";

        if($scope.guesses <= 0){
            alert("You lost, ohh!");
            $timeout(function(){
                newGame();
            }, 500);
            newGame();
        }
        if($scope.displayWord.indexOf("*") == -1){
            alert("You won, yeeh");
            $timeout(function(){
                newGame();
            }, 500);
        }
    }
    newGame();
}]);