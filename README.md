threex.laser
============

threex.laser is a [threex](http://www.threejsgames.com/extensions/) game extension for three.js. It provides a laser beam effect. Excellent to add in your space game!
The laser itself is fully procedural with generated texture.
The bleeding effect is obtained with additive blending.
threex.laser contains a more elaborate laser which dynamically collides with your scene. It is all done for you and it looks great! On impact, there is a point light and an particle sprite for cooler effects :)

Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.laser/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/demo.html)\] :
It shows a demo with cooked laser impacting a moving torus.
* [examples/laserbeam.html](http://jeromeetienne.github.io/threex.laser/examples/laserbeam.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/laserbeam.html)\] :
It shows a usage of threex.laserbeam.js, it could be the basis for a light sword for example.
* [examples/lasercooked.html](http://jeromeetienne.github.io/threex.laser/examples/lasercooked.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/lasercooked.html)\] :
It shows a usage of threex.lasercooked.js. The laser is inside a cube, the cube is
filled with toruses positioned at random, and the laser is colliding with other objects.

A Screenshot
============
[![screenshot](https://raw.githubusercontent.com/jeromeetienne/threex.laser/master/examples/images/screenshot-threex-laser-512x512.jpg)](http://jeromeetienne.github.io/threex.laser/examples/demo.html)

How To Install It
=================

You can install it via script tag

```html
<script src='threex.laserbeam.js'></script>
<script src='threex.lasercooked.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.laser
```



How To Use It
=============

## threex.laserbeam.js
It is a raw laser beam using dynamic textures.
Here is to create the laser beam and add it to the scene.

```javascript
var laserBeam	= new THREEx.LaserBeam()
scene.add(laserBeam)
```

## threex.lasercooked.js
It is a laser beam with dynamic collision. 
On impacts, to increase realism, there is sprite and point light.
It depends on ```THREEx.LaserBeam``` so first create it and add it to the scene

```javascript
var laserBeam	= new THREEx.LaserBeam()
scene.add(laserBeam)
```

Then you create the laserCooked based on it. Don't forget to update it in your render loop.

```javascript
var laserCooked	= new THREEx.LaserCooked(laserBeam)
onRenderFcts.push(function(delta, now){
	// every time you render the scene, update laserCooked
	laserCooked.update(delta, now)
})
```

Possible Improvements
=====================
* change in API
  * laserBeam is an actual class which export .object3d
  * .setSource(vector3)
  * .setTarget(vector3)
* rename laser cooked in THREEx.CollidingLaser
* make light vary random for realism
* leave a mark on the wall
  * multimaterialobject
  * each object for a texture in a empty canvas
  * draw in this canvas and update the texture
* laser with pointing leap 
