'use strict';

function ngCircle() {
  return {
    scope: {
      size: '@ngCircleSize',
      range: '@ngCircleRange',
      color: '@?ngCircleColor',
      stroke: '@?ngCircleStroke',
      fill: '@?ngCircleFill',
      pie: '=?ngCirclePie'
    },
    controller: CircleCtrl,
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    link: CircleLink,
    template: '\n    <div class="ng-circle" ng-style="vm.get(\'circle\')">\n      <div class="ng-circle__half">\n        <div class="ng-circle__half-stroke is-left" style="\n          background: {{vm.get(\'stroke\').color}};\n          border-radius: {{vm.get(\'stroke\').radius.leftHalf}};\n          {{vm.setSupportClient(\'transform\')}}: rotate({{vm.get(\'stroke\').range.leftHalf}})">\n        </div>\n      </div>\n\n      <div class="ng-circle__half">\n        <div class="ng-circle__half-stroke is-right" style="\n          background: {{vm.get(\'stroke\').color}};\n          border-radius: {{vm.get(\'stroke\').radius.rightHalf}};\n          {{vm.setSupportClient(\'transform\')}}: rotate({{vm.get(\'stroke\').range.rightHalf}})">\n        </div>\n      </div>\n\n      <div ng-if="!vm.pie" class="ng-circle__dot" style="\n        width: {{vm.get(\'dot\').width}};\n        height: {{vm.get(\'dot\').height}};\n        background: {{vm.get(\'dot\').color}};\n        {{vm.setSupportClient(\'transform\')}}: rotate({{vm.get(\'dot\').range}}) translate(-50%, 0);\n        {{vm.setSupportClient(\'transform-origin\')}}: 0 {{vm.get(\'dot\').origin}};">\n      </div>\n      <div ng-if="!vm.pie" class="ng-circle__dot" style="\n        width: {{vm.get(\'dot\').width}};\n        height: {{vm.get(\'dot\').height}};\n        background: {{vm.get(\'dot\').color}};">\n      </div>\n      <div ng-if="!vm.pie" class="ng-circle__fill" ng-style="vm.get(\'fill\')"></div>\n    </div>\n    '
  };

  function CircleLink(scope, elem, attr, ctrl) {
    scope.$watch(function () {
      return parseInt(ctrl.range);
    }, function (newVal, oldVal) {
      return newVal ? ctrl.setRange(newVal) : null;
    });
  }

  function CircleCtrl() {
    var vm = this;

    vm.size = parseInt(vm.size);
    vm.range = parseInt(vm.range);
    vm.stroke = parseInt(vm.stroke);

    vm.get = get;
    vm.setRange = setRange;
    vm.setSupportClient = setSupportClient;

    vm.styles = {
      circle: {
        width: vm.size + 'px',
        height: vm.size + 'px'
      },
      fill: {
        width: vm.size - (vm.stroke * 2 || vm.size / 10 * 2) + 'px',
        height: vm.size - (vm.stroke * 2 || vm.size / 10 * 2) + 'px',
        background: vm.fill
      },
      dot: {
        width: (vm.stroke || vm.size / 10) + 'px',
        height: (vm.stroke || vm.size / 10) + 'px',
        color: vm.color,
        origin: vm.size / 2 + 'px',
        range: 0
      },
      stroke: {
        color: vm.color,
        range: {
          leftHalf: 0,
          rightHalf: 0
        },
        radius: {
          leftHalf: vm.size + 'px  0 0 ' + vm.size + 'px',
          rightHalf: '0 ' + vm.size + 'px ' + vm.size + 'px 0'
        }
      }
    };

    // On init
    setRange(vm.range);

    ///////////////////

    function setRange(range) {
      range = 360 * range / 100;
      range = parseInt('-' + range);

      _setLeftRange(range);
      _setRightRange(range);
      _setDotRange(range);
    }

    function get(element) {
      return vm.styles[element];
    }

    function setSupportClient(prop) {
      var style = document.body.style;
      if ('WebkitTransform' in style) {
        return '-webkit-' + prop;
      } else if ('MozTransform' in style) {
        return '-moz-' + prop;
      } else if ('MsTransform' in style) {
        return '-ms-' + prop;
      } else if ('OTransform' in style) {
        return '-o-' + prop;
      } else if ('transform' in style) {
        return prop;
      }
    }

    function _setLeftRange(range) {
      vm.styles.stroke.range.leftHalf = range > -180 ? -180 + 'deg' : -360 - range + 'deg';
    }

    function _setRightRange(range) {
      vm.styles.stroke.range.rightHalf = range < -180 ? 0 + 'deg' : -180 - range + 'deg';
    }

    function _setDotRange(range) {
      range = Math.abs(range);
      vm.styles.dot.range = range + 'deg';
    }
  }
}

angular.module('ngCircle', []).directive('ngCircle', ngCircle);