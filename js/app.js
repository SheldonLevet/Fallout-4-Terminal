angular.module('falloutFourTerminal', [])
  .controller('mainController', ['$scope', function ($scope) {
    $scope.attemptsRemaining;
    $scope.loadedOnce = false;

    $scope.init = function () {
      $scope.terminalGrid = [];
      $scope.lineHexArr = [];
      $scope.feedbackTerm = ['> '];
      $scope.unlocked = false;

      $scope.attemptsRemaining = 4;
      $scope.createGrid();
      $scope.leftGrid = $scope.termVals(0, 203);
      $scope.rightGrid = $scope.termVals(204, 408);
      $scope.unlocked = false;

      if (!$scope.loadedOnce) {
        $scope.loadedOnce = true;
        $('#terminal').on('click', 'span.word', $scope.checkPasswordAttempt);
      }
    }

    $scope.checkPasswordAttempt = function (event) {
      var wordIndex = parseInt($(event.target).attr('index')),
          wordAttempt = $scope.terminalGrid[wordIndex];
      $scope.feedbackTerm[$scope.feedbackTerm.length-1] = '> ' + wordAttempt;
      if ($scope.password === wordAttempt) {
        $scope.feedbackTerm.push('> ACCESS GRANTED');
        $scope.$apply(function(){$scope.unlocked = true;});
      } else {
        var sim = findSimilarity(wordAttempt, $scope.password);
        $scope.feedbackTerm.push('> ACCESS DENIED');
        $scope.feedbackTerm.push('> LIKENESS ' + sim);
        $scope.feedbackTerm.push('> ');
        $scope.$apply(function(){$scope.attemptsRemaining--;});
      }
    }

    $scope.attemptUnicodes = function () {
      var uni_string = '';
      for (var i=0;i<$scope.attemptsRemaining;i++) {
        uni_string += '\u2591 ';
      }
      return uni_string;
    }

    $scope.hexVals = function (x, y) {
      var tAr = $scope.lineHexArr.slice();
      return tAr.slice(x, y);
    }
    $scope.termVals = function (x, y) {
      var tAr = $scope.terminalGrid.slice(),
          z = 0,
          arr = [];
      $scope.terminalGrid.map(function (e, i) {
        if (z >= x && z <= y) {
          arr.push({
            word : e,
            ar_i : i,
          });
        }
        z += e.length;
      });
      return arr;
    }

    $scope.createGrid = function () {
      //line hex numbers
      var lineHex = intToHex(Math.floor(Math.random()*5000)+12000);
      for (var i=0;i<34;i++) {
        $scope.lineHexArr.push('0x'+lineHex);
        lineHex = hexAddInt(lineHex, 12);
      }

      //words + rand chars
      var password = rWord([]);
      $scope.password = password.toUpperCase();
      var words = gatherWords(password);
      words.shuffle();
      var z = 0;
      var wI = 0;
      var sinceLastWord = 0;
      while (z < 408) {
        if (wordOrChar() && wI !== words.length && sinceLastWord > 4) {
          var w = words[wI];
          $scope.terminalGrid.push(w.toUpperCase());
          z += w.length;
          wI++;
          sinceLastWord = 0;
        } else {
          $scope.terminalGrid.push(rChar());
          z += 1;
          sinceLastWord += 1;
        }
      }
    }
  }]);
