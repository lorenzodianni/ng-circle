# ngCircle

Create circle rating as fast as you can! <a href="" target="_blank">Demo Page</a>
```sh
$ npm install ng-circle --save
```

# Usage
Load *ng-circle.js* library in your index.html file and inject **ngCircle** module inside your angular module
```javascript
angular.module('MyApp', ['ngCircle'])
```

Insert inside your .html file:
```html
<ng-circle
  ng-circle-size="120px"          <!--  Circle size    |   Pixel       -->
  ng-circle-value="90%"           <!--  Value to show  |   Int/string  -->
  ng-circle-color="[0,0,0]"       <!--  Circle color   |   HEX or RGB  -->
  ng-circle-stroke="4px"          <!--  Stroke size    |   Pixel       -->
  ng-circle-fill="#FFF"           <!--  Fill color     |   HEX or RGB  -->
  ng-circle-max-value="100%"      <!--  Max value      |   Int/string  -->
  ng-circle-pie="false">          <!--  Pie mode       |   Int/string  -->
</ng-circle>
```

# Style
Insert *ng-circle.css* in the &lt;header&gt; of your .html file
```html
<header>
  <title>Your Title</title>
  ...

  <link rel="stylesheet" href="ng-circle.css">

  ...
</header>
```
