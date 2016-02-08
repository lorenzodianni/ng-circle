'use strict';

function ngCircle(){
  return {
    scope: true,
    bindToController: {
      size: '@ngCircleSize',
      value: '@ngCircleValue',
      color: '@?ngCircleColor',
      stroke: '@?ngCircleStroke',
      fill: '@?ngCircleFill',
      pie: '=?ngCirclePie',
      maxValue: '@?ngCircleMaxValue'
    },
    controller: CircleCtrl,
    controllerAs: 'vm',
    link: CircleLink,
    replace: true,
    template: `
    <div class="ng-circle" style="
      width: {{vm.get('circle').width}};
      height: {{vm.get('circle').height}};
      background: {{vm.get('circle').color}};
      {{vm.setSupportClient('border-radius')}}: {{vm.get('circle').radius}};
    ">
      <div class="ng-circle__half">
        <div class="ng-circle__half-stroke is-left" style="
          background: {{vm.get('stroke').color}};
          {{vm.setSupportClient('border-radius')}}: {{vm.get('stroke').radius.leftHalf}};
          {{vm.setSupportClient('transform')}}: rotate({{vm.get('stroke').value.leftHalf}})">
        </div>
      </div>

      <div class="ng-circle__half">
        <div class="ng-circle__half-stroke is-right" style="
          background: {{vm.get('stroke').color}};
          {{vm.setSupportClient('border-radius')}}: {{vm.get('stroke').radius.rightHalf}};
          {{vm.setSupportClient('transform')}}: rotate({{vm.get('stroke').value.rightHalf}})">
        </div>
      </div>

      <div ng-if="!vm.pie" class="ng-circle__dot" style="
        width: {{vm.get('dot').width}};
        height: {{vm.get('dot').height}};
        background: {{vm.get('dot').color}};
        {{vm.setSupportClient('transform')}}: rotate({{vm.get('dot').value}}) translate(-50%, 0);
        {{vm.setSupportClient('transform-origin')}}: 0 {{vm.get('dot').origin}};">
      </div>
      <div ng-if="!vm.pie" class="ng-circle__dot" style="
        width: {{vm.get('dot').width}};
        height: {{vm.get('dot').height}};
        background: {{vm.get('dot').color}};">
      </div>
      <div ng-if="!vm.pie" class="ng-circle__fill" ng-style="vm.get('fill')"></div>
    </div>
    `
  };

  function CircleLink(scope, elem, attr, ctrl) {
    scope.$watch(function(){
      return parseInt(ctrl.value);
    }, function(newVal, oldVal){
      return newVal ? ctrl.setRange(newVal) : null;
    });
  }

  function CircleCtrl() {
    var vm = this;

    vm.size = parseInt(vm.size);
    vm.value = parseInt(vm.value);
    vm.stroke = parseInt(vm.stroke);
    vm.fill = _formatColor(vm.fill, 'fill');
    vm.color = _formatColor(vm.color, 'circle');
    vm.maxValue = parseInt(vm.maxValue) || 100;

    vm.get = get;
    vm.setRange = setRange;
    vm.setSupportClient = setSupportClient;

    vm.styles = {
      circle: {
        width: `${vm.size}px`,
        height: `${vm.size}px`,
        radius: '100%',
        color: `rgba(${vm.color[0]}, ${vm.color[1]}, ${vm.color[2]}, .2)`
      },
      fill: {
        width: `${vm.size - (vm.stroke * 2 || vm.size/10 * 2)}px`,
        height: `${vm.size - (vm.stroke * 2 || vm.size/10 * 2)}px`,
        background: `rgba(${vm.fill[0]}, ${vm.fill[1]}, ${vm.fill[2]}, 1)`
      },
      dot: {
        width: `${(vm.stroke || vm.size/10)}px`,
        height: `${(vm.stroke || vm.size/10)}px`,
        color: `rgba(${vm.color[0]}, ${vm.color[1]}, ${vm.color[2]}, 1)`,
        origin: `${vm.size/2}px`,
        value: 0
      },
      stroke: {
        color: `rgba(${vm.color[0]}, ${vm.color[1]}, ${vm.color[2]}, 1)`,
        value: {
          leftHalf: 0,
          rightHalf: 0
        },
        radius: {
          leftHalf: `${vm.size}px 0 0 ${vm.size}px`,
          rightHalf: `0 ${vm.size}px ${vm.size}px 0`,
        }
      }
    };

    // On init
    setRange(vm.value);

    ///////////////////

    function setRange(value) {
      value = (360 * value) / vm.maxValue;
      value = parseInt('-' + value);

      _setLeftRange(value);
      _setRightRange(value);
      _setDotRange(value);
    }

    function get(element) {
      return vm.styles[element];
    }

    function setSupportClient(prop) {
      let style = document.body.style;
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

    function _setLeftRange(value) {
      if(value < -360) {
        vm.styles.stroke.value.leftHalf = -360 + 'deg';
        return
      }

      vm.styles.stroke.value.leftHalf = value > -180 ? -180 + 'deg' : -360 - value + 'deg';
    }

    function _setRightRange(value) {
      vm.styles.stroke.value.rightHalf = value < -180 ? 0 + 'deg' : -180 - value + 'deg';
    }

    function _setDotRange(value) {
      if(value < -360) {
        vm.styles.dot.value = -360 + 'deg';
        return
      }

      value = Math.abs(value);
      vm.styles.dot.value = value + 'deg';
    }

    function _formatColor(color, type) {
      if(color) {
        return _isRgb(color) ? JSON.parse(color) : _hexToRgb(color);
      } else {
        return type === 'circle' ? [0, 0, 0] : [255, 255, 255];
      }

      function _isRgb(color) {
        try {
          return JSON.parse(color);
        } catch(e) {
          return false;
        }
      }

      function _hexToRgb(hex) {
        var rgb = {};

        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result
        ? rgb = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : rgb = [0, 0, 0];
      }
    }

  }
}

angular
.module('ngCircle', [])
.directive('ngCircle', ngCircle);
