'use strict';

function ngCircle(){
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
    template: `
    <div class="ng-circle" ng-style="vm.style('circle')">
      <div class="half">
        <div class="half-progress is-left" style="
          background: {{vm.style('progress').color}};
					border-radius: {{vm.style('progress').radius.isLeft}};
          {{vm.setSupportClient('transform')}}: rotate({{vm.getLeftRange()}}deg)">
        </div>
      </div>

      <div class="half">
        <div class="half-progress is-right" style="
          background: {{vm.style('progress').color}};
					border-radius: {{vm.style('progress').radius.isRight}};
          {{vm.setSupportClient('transform')}}: rotate({{vm.getRightRange()}}deg)">
        </div>
      </div>

      <div ng-if="!vm.pie" class="dot" style="
        width: {{vm.style('dot').width}};
        height: {{vm.style('dot').height}};
        background: {{vm.style('dot').color}};
        {{vm.setSupportClient('transform')}}: rotate({{vm.getDotRange()}}deg) translate(-50%, 0);
        {{vm.setSupportClient('transform-origin')}}: 0 {{vm.style('dot').origin}};">
      </div>
      <div ng-if="!vm.pie" class="dot" style="
        width: {{vm.style('dot').width}};
        height: {{vm.style('dot').height}};
        background: {{vm.style('dot').color}};">
      </div>
      <div ng-if="!vm.pie" class="mask" ng-style="vm.style('mask')"></div>
    </div>
    `
  };

  function CircleLink(scope, elem, attr, ctrl) {
  	scope.$watch(function(){
    		return parseInt(ctrl.range);
    }, function(newVal, oldVal){
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
		vm.setSupportClient = setSupportClient;

    vm.styles = {
    	circle: {
        width: vm.size + 'px',
        height: vm.size + 'px'
      },
      mask: {
        width: vm.size - (vm.size/10 * 2) + 'px',
        height: vm.size - (vm.size/10 * 2) + 'px',
        background: vm.colorMask
      },
      dot: {
        width: vm.size/10 + 'px',
        height: vm.size/10 + 'px',
        color: vm.color,
        origin: vm.size/2 + 'px'
      },
      progress: {
      	color: vm.color,
        radius: {
        	isLeft: vm.size + 'px  0 0 ' + vm.size + 'px',
          isRight: '0 ' + vm.size + 'px ' + vm.size + 'px 0',
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
    	range = (360 * range) / 100;
      range = parseInt('-' + range);

      setLeftRange(range);
      setRightRange(range);
      setDotRange(range);
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

  }
}

angular.module('ngCircle', [])
.directive('ngCircle', ngCircle);
