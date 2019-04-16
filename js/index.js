var canvas = document.getElementById("renderCanvas"); // Get the canvas element 


var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene;
createScene = function () {

	// Create the scene space
	var scene = new BABYLON.Scene(engine);
	scene.enablePhysics();

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 12, -16), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);

	// Add lights to the scene
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
	var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

	var ground = BABYLON.Mesh.CreateGround("ground1", 12, 24, 2, scene);
	var groundMat = new BABYLON.StandardMaterial("ground", scene);
	groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.8, 0.2);
	groundMat.specularColor = new BABYLON.Color3(0.2, 0.8, 0.2);
	ground.material = groundMat;
	ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

	var wallMat = new BABYLON.StandardMaterial("wall", scene);
	wallMat.diffuseColor = new BABYLON.Color3(0.6, 0.3, 0.1);
	wallMat.specularColor = new BABYLON.Color3(0.6, 0.3, 0.1);
	var wall_l = BABYLON.MeshBuilder.CreateBox("wall_l", {width: 0.1, height: 3, depth: 24}, scene);
	wall_l.position.x = 6;
	wall_l.material = wallMat;
	wall_l.physicsImpostor = new BABYLON.PhysicsImpostor(wall_l, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	var wall_r = BABYLON.MeshBuilder.CreateBox("wall_r", {width: 0.1, height: 3, depth: 24}, scene);
	wall_r.position.x = -6;
	wall_r.material = wallMat;
	wall_r.physicsImpostor = new BABYLON.PhysicsImpostor(wall_r, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	var wall_b = BABYLON.MeshBuilder.CreateBox("wall_b", {depth: 0.1, height: 3, width: 12}, scene);
	wall_b.position.z = -12;
	wall_b.material = wallMat;
	wall_b.physicsImpostor = new BABYLON.PhysicsImpostor(wall_b, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	var wall_f = BABYLON.MeshBuilder.CreateBox("wall_f", {depth: 0.1, height: 3, width: 12}, scene);
	wall_f.position.z = 12;
	wall_f.material = wallMat;
	wall_f.physicsImpostor = new BABYLON.PhysicsImpostor(wall_f, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

	var whiteMat = new BABYLON.StandardMaterial("white", scene);
	var white = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, updatable: false}, scene);
	whiteMat.diffuseColor = BABYLON.Color3.Gray();
	whiteMat.specularColor = BABYLON.Color3.Gray();
	whiteMat.emissiveColor = BABYLON.Color3.Gray();
	white.material = whiteMat;
	white.position.z = -4;
	white.position.y = 0.5;
	white.physicsImpostor = new BABYLON.PhysicsImpostor(white, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
	white.actionManager = new BABYLON.ActionManager(scene);
	white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, white.material, "emissiveColor", white.material.emissiveColor));
	white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, white.material, "emissiveColor", BABYLON.Color3.White()));
	white.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function () {
				var force = BABYLON.Vector3.Forward().scale(20);
				white.getPhysicsImpostor().applyImpulse(force, white.getAbsolutePosition());
			}
		)
	);

	var ballMat = new BABYLON.StandardMaterial("ball", scene);
	ballMat.diffuseColor = BABYLON.Color3.Red();
	ballMat.specularColor = BABYLON.Color3.Red();
	ballMat.emissiveColor = BABYLON.Color3.Red();
	for(var i=0; i<4; i++)
		for(var j=0; j<i; j++)
		{
			var ball = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, updatable: false}, scene);
			ball.material = ballMat;
			ball.position.y = 0.25;
			ball.position.z = 4+i*.5;
			ball.position.x = 0-(i/4.0)+j*0.5;
			ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
		}


	// Add and manipulate meshes in the scene
	//var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1, updatable: true}, scene);
	//var sphere = BABYLON.MeshBuilder.CreateIcoSphere("sphere", {diameter:1, subdivisions:1}, scene);
	//sphere.rotation.x = 90;
	//sphere.position.y = 2;
	/*
	var die = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 1, size: 1}, scene);
	die.position.y = 2;

	scene.enablePhysics();
	//sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
	die.physicsImpostor = new BABYLON.PhysicsImpostor(die, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0.9 }, scene);


	var quat = BABYLON.Quaternion.FromEulerAngles(Math.random()*0.5, Math.random()*0.5, Math.random()*0.5);
    var force = BABYLON.Vector3.Up();
    //force = force.add(BABYLON.Vector3.Forward());
	force.rotateByQuaternionToRef(quat, force);
    //force = force.scale(10);
    die.getPhysicsImpostor().applyImpulse(force, die.getAbsolutePosition());
	*/

	// scene.gravity = new BABYLON.Vector3(0,0,0);
	//
	// // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.9 }, scene);
	//
	// star.physicsImpostor = new BABYLON.PhysicsImpostor(star, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0, restitution: 0 }, scene);
	//
	// var planets = [];
	//
	// // Listen for physics ticks
	// scene.registerBeforeRender(function(){
	// 	var force = planet.position.negate().normalize();
	// 	// Set magnitude to 10
	// 	force.scale(10);
	// 	planet.getPhysicsImpostor().applyImpulse(force, planet.getAbsolutePosition());
	// });

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
