var THREEx = THREEx || {}

THREEx.LaserBeam	= function(color){
	if (color === undefined) {
		color = {
			r: 255,
			g: 255,
			b: 255
		};
	}
	color.r = Math.floor(color.r);
	color.g = Math.floor(color.g);
	color.b = Math.floor(color.b);
	var object3d	= new THREE.Object3D()
	this.object3d	= object3d
	// generate the texture
	var canvas	= generateLaserBodyCanvas(color.r,color.g,color.b)
	var texture	= new THREE.Texture( canvas )
	texture.needsUpdate	= true;
	// do the material	
	var material	= new THREE.MeshBasicMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
		color		: 0x4444aa,
		side		: THREE.DoubleSide,
		depthWrite	: false,
		transparent	: true
	})
	var geometry	= new THREE.PlaneGeometry(1, 0.1)
	var nPlanes	= 16;
	for(var i = 0; i < nPlanes; i++){
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.x	= 1/2
		mesh.rotation.x	= i/nPlanes * Math.PI
		object3d.add(mesh)
	}
	return
	
	function generateLaserBodyCanvas(r,g,b){
		var partialColor = {
			r: Math.floor(r*160.0/255.0),
			g: Math.floor(g*160.0/255.0),
			b: Math.floor(b*160.0/255.0)
		}

		// init canvas
		var canvas	= document.createElement( 'canvas' );
		var context	= canvas.getContext( '2d' );
		canvas.width	= 1;
		canvas.height	= 64;
		// set gradient
		var gradient	= context.createLinearGradient(0, 0, canvas.width, canvas.height);		
		gradient.addColorStop( 0  , 'rgba(  0,  0,  0,0.1)' );
		gradient.addColorStop( 0.1, 'rgba('+partialColor.r+','+partialColor.g+','+partialColor.b+',0.3)' );
		gradient.addColorStop( 0.5, 'rgba('+r+','+g+','+b+',0.5)' );
		gradient.addColorStop( 0.9, 'rgba('+partialColor.r+','+partialColor.g+','+partialColor.b+',0.3)' );
		gradient.addColorStop( 1.0, 'rgba(  0,  0,  0,0.1)' );
		// fill the rectangle
		context.fillStyle	= gradient;
		context.fillRect(0,0, canvas.width, canvas.height);
		// return the just built canvas 
		return canvas;	
	}
}
