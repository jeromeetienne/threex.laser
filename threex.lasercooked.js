var THREEx = THREEx || {}

THREEx.LaserCooked	= function(laserBeam){
	// for update loop
	var updateFcts	= []
	this.update	= function(){
		updateFcts.forEach(function(updateFct){
			updateFct()	
		})
	}
	
	var object3d	= laserBeam.object3d

	// build THREE.Sprite for impact
	var textureUrl	= THREEx.LaserCooked.baseURL+'images/blue_particle.jpg';
	var texture	= new THREE.TextureLoader().load(textureUrl)	
	var material	= new THREE.SpriteMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
	})
	var sprite	= new THREE.Sprite(material)
	sprite.scale.x = 0.5
	sprite.scale.y = 2;

	sprite.position.x	= 1-0.01
	object3d.add(sprite)

	// add a point light
	var light	= new THREE.PointLight( 0x4444ff);
	light.intensity	= 0.5
	light.distance	= 4
	light.position.x= -0.05
	this.light	= light
	sprite.add(light)

	// to exports last intersects
	this.lastIntersects	= []

	var raycaster	= new THREE.Raycaster()
	// TODO assume object3d.position are worldPosition. works IFF attached to scene
	raycaster.ray.origin.copy(object3d.position)

	updateFcts.push(function(){
		// get laserBeam matrixWorld
		object3d.updateMatrixWorld();
		var matrixWorld	= object3d.matrixWorld.clone()
		// set the origin
		raycaster.ray.origin.setFromMatrixPosition(matrixWorld)
		// keep only the roation
		matrixWorld.setPosition(new THREE.Vector3(0,0,0))		
		// set the direction
		raycaster.ray.direction.set(1,0,0)
			.applyMatrix4( matrixWorld )
			.normalize()

		var intersects		= raycaster.intersectObjects( scene.children );
		if( intersects.length > 0 ){
			var position	= intersects[0].point
			var distance	= position.distanceTo(raycaster.ray.origin)
			object3d.scale.x	= distance
		}else{
			object3d.scale.x	= 10			
		}
		// backup last intersects
		this.lastIntersects	= intersects
	}.bind(this));
}

THREEx.LaserCooked.baseURL	= '../'
