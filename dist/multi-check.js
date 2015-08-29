(function() {
  angular.module('multi-check', []).directive('multiCheck', function() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      transclude: true,
      replace: true,
      template: '<div class="multi-check"><ng-transclude></ng-transclude></div>',
      link: function(scope, elem, attrs, ngModel) {
        ngModel.$formatters.unshift(function(val) {
          if (!angular.isArray(val)) {
            val = [val + ''];
          }
          scope.model = val;
          ngModel.$setPristine();
          return val;
        });
        return scope.updateModel = function(id, value) {
          if (!value) {
            if (scope.model.indexOf(id) !== -1) {
              scope.model.splice(scope.model.indexOf(id), 1);
            } else {
              scope.model.splice(scope.model.indexOf(parseInt(id)), 1);
            }
          } else {
            scope.model.push(id);
          }
          ngModel.$setViewValue(scope.model);
          ngModel.$setDirty();
        };
      }
    };
  }).directive('multiCheckItem', function() {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      template: '<div class="check-item"><input type="checkbox" ng-model="value" ng-change="change()" ><label><ng-transclude></ng-transclude></label></div>',
      link: function(scope, elem, attrs) {
        scope.$watch('model', function(n) {
          if (n) {
            return scope.value = scope.model.indexOf(attrs.value) !== -1 || scope.model.indexOf(parseInt(attrs.value)) !== -1;
          }
        });
        return scope.change = function() {
          return scope.updateModel(attrs.value, scope.value);
        };
      }
    };
  });

}).call(this);
