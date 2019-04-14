var canvas = document.getElementById("renderCanvas"); // Get the canvas element 


var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {
	
	// Create the scene space
	var scene = new BABYLON.Scene(engine);
	
	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,10,10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
	
	// Add lights to the scene
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
	var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
	
	var ground = BABYLON.Mesh.CreateGround("ground1", 24, 24, 2, scene);
  	
	// Add and manipulate meshes in the scene
	//var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1, updatable: true}, scene);
	//var sphere = BABYLON.MeshBuilder.CreateIcoSphere("sphere", {diameter:1, subdivisions:1}, scene);
	//sphere.rotation.x = 90;
	//sphere.position.y = 2;
	var die = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 1, size: 1}, scene);
	die.position.y = 2;
	
	scene.enablePhysics();
	//sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
	die.physicsImpostor = new BABYLON.PhysicsImpostor(die, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0.9 }, scene);
	ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.9 }, scene);

	var quat = BABYLON.Quaternion.FromEulerAngles(Math.random()*0.5, Math.random()*0.5, Math.random()*0.5);
    var force = BABYLON.Vector3.Up();
    //force = force.add(BABYLON.Vector3.Forward());
	force.rotateByQuaternionToRef(quat, force);
    //force = force.scale(10);
    die.getPhysicsImpostor().applyImpulse(force, die.getAbsolutePosition());

	return scene;
};
/******* End of the create scene function ******/    

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
	engine.resize();
});
