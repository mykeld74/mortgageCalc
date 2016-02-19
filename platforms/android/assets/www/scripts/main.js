var app = angular.module("myApp", []);

app.controller('mortgageCtrl', function($scope) {
    $scope.mortData = {};
    $scope.Math = window.Math;
    $scope.change = function() {
        var housePrice = $scope.mortData.housePrice,
            downPayment = 0,
            loanAmount = 0,
            interestRate = $scope.mortData.interestRate / 100 / 12,
            term = $scope.mortData.term * 12,
            amount1 = 1 + interestRate,
            sect1 = Math.pow(amount1, term) * interestRate,
            sect2 = Math.pow(amount1, term) - 1,
            combo = sect1 / sect2,
            pmi_rate = 0,
            pmi = 0,
            tax_rate = 0,
            tax = 0,
            payment = loanAmount;

        $scope.pmi_required = true;

        if ($scope.mortData.downPayment > 0) {
            if ($scope.mortData.downPayment < 100) {
                downPayment = housePrice * ($scope.mortData.downPayment / 100);
            } else {
                downPayment = $scope.mortData.downPayment;
            }
        }
        if ($scope.mortData.pmi_rate > 0) {
            pmi_rate = $scope.mortData.pmi_rate / 100;
        }
        if ($scope.mortData.tax_rate > 0) {
            tax_rate = $scope.mortData.tax_rate / 100;
        }
        $scope.loanAmount = housePrice - downPayment;
        loanAmount = $scope.loanAmount;
        pmi = (loanAmount * pmi_rate) / 12;
        tax = (loanAmount * tax_rate) / 12;
        payment = (loanAmount * combo) + pmi + tax;
        if ((loanAmount / housePrice) > 0.8) {
            $scope.pmi_required = true;
        } else {
            $scope.pmi_required = false;
            $scope.mortData.pmi_rate = 0;
        }
        $scope.payment = payment;
        // console.log("---------------------");
        // console.log(housePrice);
        // console.log(downPayment);
        // console.log(loanAmount);
        // console.log(interestRate);
        // console.log(term);
        // console.log(pmi);
        // console.log(tax);
        // console.log(payment);
    };

});
