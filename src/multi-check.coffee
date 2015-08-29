angular.module 'multi-check', []
.directive 'multiCheck', ->
  restrict: 'EA'
  require: 'ngModel'
  transclude: true
  replace: true
  template: '<div class="multi-check"><ng-transclude></ng-transclude></div>'
  link: (scope, elem, attrs, ngModel) ->
    ngModel.$formatters.unshift (val) ->
      if not angular.isArray val
        val = [val + '']
      scope.model = val
      ngModel.$setPristine()
      val
    scope.updateModel = (id, value) ->
      if not value
        if scope.model.indexOf(id) isnt -1
          scope.model.splice scope.model.indexOf(id), 1
        else
          scope.model.splice scope.model.indexOf(parseInt(id)), 1
      else
        scope.model.push id
      ngModel.$setViewValue scope.model
      ngModel.$setDirty()
      return
.directive 'multiCheckItem', ->
  restrict: 'EA'
  transclude: true
  replace: true
  template: '<div class="check-item"><input type="checkbox" ng-model="value" ng-change="change()" ><label><ng-transclude></ng-transclude></label></div>'
  link: (scope, elem, attrs) ->
    scope.$watch 'model', (n) ->
      if n
        scope.value = scope.model.indexOf(attrs.value) isnt -1 or scope.model.indexOf(parseInt(attrs.value)) isnt -1
    scope.change = ->
      scope.updateModel attrs.value, scope.value