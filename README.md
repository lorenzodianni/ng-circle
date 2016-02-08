# ngCircle

Create circle rating as fast as you can! <a href="http://codepen.io/lorenzodianni/full/ZQmKQb/" target="_blank">Demo Page</a>

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
  ng-circle-size="120px"
  ng-circle-value="90%"
  ng-circle-color="[0,0,0]"
  ng-circle-stroke="4px"
  ng-circle-fill="#FFF"
  ng-circle-max-value="100%"
  ng-circle-pie="false">
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

# License
The MIT License (MIT)

Copyright (c) 2016 Lorenzo D'Ianni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
