var world    = tQuery.createWorld().boilerplate({cameraControls: false}).start();
world.tCamera().position.set( 70, 40, 70 );
world.tCamera().lookAt( world.tScene().position );

world.tRenderer().shadowMapEnabled   = true;
world.tRenderer().shadowMapSoft       = true;
world.tRenderer().setClearColorHex( 0xffffff, 1 );

world.enablePhysics();

tQuery.createDirectionalLight().addTo(world)
  .position(20, 40, -15).color(0xffffff)
  .castShadow(true).shadowMap(512*2,512*2)
  .shadowCamera(60, -60, 60, -60, 20, 200)
  .shadowDarkness(0.7).shadowBias(.002)

var texture  = THREE.ImageUtils.loadTexture( "images/rocks.jpg" );
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 3, 3 );

var ground   = tQuery.createCube(100, 1, 100).addTo(world)
  .position(0, -10, 0)
  .setLambertMaterial().map(texture).back()
  .receiveShadow(true)

ground.enablePhysics({
  mass    : 0
});

var cTexture = THREE.ImageUtils.loadTexture( "images/plywood.jpg" );

var spawnObject  = function(){
  var object  = tQuery.createCube(4,4,4).addTo(world)
      .rotation(Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2)
      .position(Math.random()*15-7.5, 25, Math.random()*15-7.5)
      .setLambertMaterial().map(cTexture).back()
      .castShadow(true)

object.enablePhysics({
      friction    : 0.4,
      restitution : 0.6
  });

 var nCollisions = 0;
  object.physics().addEventListener('collision', function(){
      var colliColors = [0xcc8855, 0xbb9955, 0xaaaa55, 0x99bb55, 0x88cc55, 0x77dd55];
      if( ++nCollisions < colliColors.length ){
          var color   = colliColors[nCollisions];
          object.get(0).material.color.setHex( color );
      }
  })
}

setInterval(spawnObject, 1000);


