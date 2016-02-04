'use strict';

function ngCircle() {
  return {
    scope: {
      size: '@ngCircleSize',
      range: '@ngCircleRange',
      pie: '=?ngCirclePie',
      color: '@?ngCircleColor',
      colorMask: '@?ngCircleColorMask'
    },
    controller: CircleCtrl,
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    link: CircleLink,
    template: '\n    <div class="ng-circle" ng-style="vm.style(\'circle\')">\n      <div class="half">\n        <div class="half-progress is-left" style="\n          background: {{vm.style(\'progress\').color}};\n          transform: rotate({{vm.getLeftRange()}}deg);\n          border-radius: {{vm.style(\'progress\').radius.isLeft}}">\n        </div>\n      </div>\n\n      <div class="half">\n        <div class="half-progress is-right" style="\n          background: {{vm.style(\'progress\').color}};\n          -moz-transform: rotate({{vm.getRightRange()}}deg);\n          -ms-transform: rotate({{vm.getRightRange()}}deg);\n          -webkit-transform: rotate({{vm.getRightRange()}}deg);\n          transform: rotate({{vm.getRightRange()}}deg);\n          border-radius: {{vm.style(\'progress\').radius.isRight}}">\n        </div>\n      </div>\n\n      <div ng-if="!vm.pie" class="dot" style="\n        width: {{vm.style(\'dot\').width}};\n        height: {{vm.style(\'dot\').height}};\n        background: {{vm.style(\'dot\').color}};\n        -moz-transform: rotate({{vm.getDotRange()}}deg) translate(-50%, 0);\n        -ms-transform: rotate({{vm.getDotRange()}}deg) translate(-50%, 0);\n        -webkit-transform: rotate({{vm.getDotRange()}}deg) translate(-50%, 0);\n        transform: rotate({{vm.getDotRange()}}deg) translate(-50%, 0);\n        -moz-transform-origin: 0 {{vm.style(\'dot\').origin}};\n        -ms-transform-origin: 0 {{vm.style(\'dot\').origin}};\n        -webkit-transform-origin: 0 {{vm.style(\'dot\').origin}};\n        transform-origin: 0 {{vm.style(\'dot\').origin}};">\n      </div>\n      <div ng-if="!vm.pie" class="dot" style="\n        width: {{vm.style(\'dot\').width}};\n        height: {{vm.style(\'dot\').height}};\n        background: {{vm.style(\'dot\').color}};">\n      </div>\n      <div ng-if="!vm.pie" class="mask" ng-style="vm.style(\'mask\')"></div>\n    </div>\n    '
  };

  function CircleLink(scope, elem, attr, ctrl) {
    scope.$watch(function () {
      return parseInt(ctrl.range);
    }, function (newVal, oldVal) {
      return newVal ? ctrl.formatRange(newVal) : null;
    }, true);
  }

  function CircleCtrl() {
    var vm = this;
    var leftRange = null;
    var rightRange = null;
    var dotRange = null;

    vm.size = parseInt(vm.size);
    vm.range = parseInt(vm.range);

    vm.style = style;
    vm.formatRange = formatRange;
    vm.getLeftRange = getLeftRange;
    vm.getRightRange = getRightRange;
    vm.getDotRange = getDotRange;

    vm.styles = {
      circle: {
        width: vm.size + 'px',
        height: vm.size + 'px'
      },
      mask: {
        width: vm.size - vm.size / 10 * 2 + 'px',
        height: vm.size - vm.size / 10 * 2 + 'px',
        background: vm.colorMask
      },
      dot: {
        width: vm.size / 10 + 'px',
        height: vm.size / 10 + 'px',
        color: vm.color,
        origin: vm.size / 2 + 'px'
      },
      progress: {
        color: vm.color,
        radius: {
          isLeft: vm.size + 'px  0 0 ' + vm.size + 'px',
          isRight: '0 ' + vm.size + 'px ' + vm.size + 'px 0'
        }
      }
    };

    formatRange(vm.range);

    function style(element) {
      return vm.styles[element];
    }

    function setLeftRange(range) {
      return range > -180 ? leftRange = -180 : leftRange = -360 - range;
    }

    function setRightRange(range) {
      return range < -180 ? rightRange = 0 : rightRange = -180 - range;
    }

    function setDotRange(range) {
      range = Math.abs(range);
      dotRange = range;
    }

    function getLeftRange() {
      return leftRange;
    }

    function getRightRange() {
      return rightRange;
    }

    function getDotRange() {
      return dotRange;
    }

    function formatRange(range) {
      range = 360 * range / 100;
      range = parseInt('-' + range);

      setLeftRange(range);
      setRightRange(range);
      setDotRange(range);
    }
  }
}

angular.module('ngCircle', []).directive('ngCircle', ngCircle);