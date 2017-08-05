

var Scene = function(gl) {
  this.gameObjects = [];
  this.timeAtLastFrame = new Date().getTime();

  var scene = this;

  this.fsBack = new Shader(gl, gl.FRAGMENT_SHADER, "background_fs.essl"); 
  this.vsBack = new Shader(gl, gl.VERTEX_SHADER, "background_vs.essl");
  this.backProgram = new Program(gl, this.vsBack, this.fsBack);


  this.camera = new PerspectiveCamera();

  this.quadGeom = new QuadGeometry(gl);


  this.lightSources = [];
  this.lightSources.push(new LightSource(new Vec4(0, 1, 2, 1),new Vec4(0, 0, 0, 0) ));
  this.lightSources.push(new LightSource(new Vec4(-2, 2, 1, 0),new Vec4(.5, .5, .5, 0) ));


  this.skyCubeTexture = new
   TextureCube(gl, [
      "envmap/hw_red/red_ft.jpg",
      "envmap/hw_red/red_bk.jpg",
      "envmap/hw_red/red_up.jpg",
      "envmap/hw_red/red_dn.jpg",
      "envmap/hw_red/red_rt.jpg",
      "envmap/hw_red/red_lf.jpg",]
      );
  //background
  this.backMat = new Material(gl, this.backProgram);
  

this.backMat.envmapTexture.set(this.skyCubeTexture);
 this.dune= new ClippedQuadric(
   new Mat4(),
   new Mat4() 
 );

this.dune.setUnitSphere();
this.dune.transform(new Mat4().scale(30, 10, 30).translate(0, -2, 4.5));


 this.sphere= new ClippedQuadric(
   new Mat4(),
   new Mat4() 
 );

this.sphere.setUnitSphere();
this.sphere.transform(
  new Mat4(
   [2, 0, 0, 0,
    0, 2, 0, 0, 
    0, 0, 2, 0, 
    0, 3, 4.5, 1 ]));

this.ocean = new ClippedQuadric(new Mat4(
    [0, 0, 0,0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1]),
  new Mat4(
    [0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1])
  );

this.ocean.transform(new Mat4().translate(0, 1, 0));
this.sphere2 = new ClippedQuadric(
  new Mat4(
    [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -9]),
  new Mat4(
    [1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1]) 
);
//degrees * Math.pi/180
this.sphere2.transform(
  new Mat4(
   [Math.cos(90 * Math.PI / 180), 0, Math.sin(90 * Math.PI / 180), 0,
    0, 1, 0, 0, 
    -Math.sin(90 * Math.PI / 180), 0,Math.cos(90 * Math.PI / 180), 0, 
    -15, 0, 0, 1 ]));

this.beachBall = new ClippedQuadric(
  new Mat4(),
  new Mat4() 
);

this.beachBall.setUnitSphere();
this.beachBall.transform(new Mat4().scale(2).translate(-9, 6, 25));

this.parasolTop = new ClippedQuadric(new Mat4(), new Mat4());
this.parasolTop.setUnitSphere();

this.parasolTop.setClipper(new Mat4(
    [0, 0, 0, .2,
    0, 0, 0, -1.5,
    0, 0, 0, 0,
    0, 0, 0, 0]));
this.parasolTop.transform(new Mat4().scale(4, 2, 4).translate(9, 12, 10));


this.parasolBottom = new ClippedQuadric(new Mat4(), new Mat4());
this.parasolBottom.setUnitCylinder();
this.parasolBottom.setClipper( new Mat4(
    [0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1]));
this.parasolBottom.transform(new Mat4().scale(.2, 5, .2).translate(8.9, 9, 10));

this.wall = new ClippedQuadric(
 
  new Mat4(
    [0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -4]) ,
   new Mat4(
    [1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -4])
);

this.wall.transform(new Mat4().translate(0, 8, 0));

this.wall2 =  new ClippedQuadric(
  new Mat4(
    [0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -4]),
  new Mat4(
    [1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -4]) 
);

this.castleSides = new ClippedQuadric(new Mat4(), new Mat4());
this.castleSides.setUnitCylinder();
this.castleSides.transform(new Mat4().scale(5, 1, 1).translate(0, 13, 10));

this.trunk = new ClippedQuadric(new Mat4(), new Mat4());
this.trunk.setUnitCone();
this.trunk.transform(new Mat4().translate(0, 7, 0) );
this.trunk.transformClipper(new Mat4().translate(0, -1, 0));
this.trunk.transform(new Mat4().scale(.5).translate(-20, 0, 0));

this.box = new CubeClippedQuadric(new Mat4(), new Mat4());
this.box.setUnitCube();
this.box.transform(new Mat4().scale(2).translate(-30, 3, 20));

this.sandCastle = new CubeClippedQuadric(new Mat4(), new Mat4());
this.sandCastle.setUnitCube();
this.sandCastle.transform(new Mat4().scale(5, 4, 4).translate(-12, 10, 0));

this.sandTower1 = new ClippedQuadric(new Mat4(), new Mat4());
this.sandTower1.setUnitCylinder();
this.sandTower1.transform(new Mat4().scale(4, 7, 4).translate(-8, 10, 0))

this.topCastle1 = new ClippedQuadric(new Mat4(), new Mat4());

this.topCastle1.setUnitCone();
this.topCastle1.transform(new Mat4().scale(2).translate(-8, 21, 0));

this.sandTower2 = new ClippedQuadric(new Mat4(), new Mat4());
this.sandTower2.setUnitCylinder();
this.sandTower2.transform(new Mat4().scale(2, 8, 2).translate(-15, 10, 0))

this.topCastle2 = new ClippedQuadric(new Mat4(), new Mat4());

this.topCastle2.setUnitCone();
this.topCastle2.transform(new Mat4().scale(1).translate(-15, 20, 0));

this.trunk1 = new ClippedQuadric(new Mat4(), new Mat4());
this.trunk1.setUnitCone();
this.trunk1.transform(new Mat4().scale(.3, 2, .3).translate(0, 20, 15));

this.trunk2 = new ClippedQuadric(new Mat4(), new Mat4());
this.trunk2.setUnitCone();
this.trunk2.transform(new Mat4().scale(.5, 2, .5).translate(0, 17.5, 15));

this.trunk3 = new ClippedQuadric(new Mat4(), new Mat4());
this.trunk3.setUnitCone();
this.trunk3.transform(new Mat4().scale(.5, 2, .5).translate(0, 14.5, 15));

this.trunk4 = new ClippedQuadric(new Mat4(), new Mat4());
this.trunk4.setUnitCone();
this.trunk4.transform(new Mat4().scale(.75, 2, .75).translate(0, 11.5, 15));

this.leaf1 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf1.setUnitSphere();
this.leaf1.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf1.transform(new Mat4().scale(1, 1, 7).translate(0, 20, 21));

this.leaf2 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf2.setUnitSphere();
this.leaf2.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf2.transform(new Mat4().scale(1, 1, 7).translate(0, 20, 9));

this.leaf3 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf3.setUnitSphere();
this.leaf3.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf3.transform(new Mat4().scale(1, 1, 6).rotate(90 * Math.PI/180, new Vec3(0, 1, 0)).translate(6.3, 20, 15));

this.leaf4 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf4.setUnitSphere();
this.leaf4.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf4.transform(new Mat4().scale(1, 1, 7).rotate(90 * Math.PI/180, new Vec3(0, 1, 0)).translate(-6.3, 20, 15));

this.leaf5 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf5.setUnitSphere();
this.leaf5.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf5.transform(new Mat4().scale(1, 1, 7).rotate(45 * Math.PI/180, new Vec3(0, 1, 0)).translate(0, 20, 15));

this.leaf6 = new ClippedQuadric(new Mat4(), new Mat4());
this.leaf6.setUnitSphere();
this.leaf6.setClipper(new Mat4([0, 0, 0, 0,
    0, 0, 0, -1,
    0, 0, 0, 0,
    0, 0, 0, 0]));

this.leaf6.transform(new Mat4().scale(1, 1, 7).rotate(-45 * Math.PI/180, new Vec3(0, 1, 0)).translate(1, 20, 14));

this.beachColor = new Vec4(.8, .4, .4, 4);
this.castleColor = new Vec4(.8, .4, .4, 3.0);

this.backMat.quadrics[0].set(this.dune.surfaceCoeffMatrix);
this.backMat.quadrics[1].set(this.dune.clipperCoeffMatrix);
this.backMat.brdfs[0].set(this.beachColor); 

this.backMat.quadrics[2].set(this.parasolTop.surfaceCoeffMatrix);
this.backMat.quadrics[3].set(this.parasolTop.clipperCoeffMatrix);
this.backMat.brdfs[1].set(.6, .1, .4, 0); 

this.backMat.quadrics[4].set(this.beachBall.surfaceCoeffMatrix);
this.backMat.quadrics[5].set(this.beachBall.clipperCoeffMatrix);
this.backMat.brdfs[2].set(0, 1, 0, .1); 

this.backMat.quadrics[6].set(this.parasolBottom.surfaceCoeffMatrix);
this.backMat.quadrics[7].set(this.parasolBottom.clipperCoeffMatrix);
this.backMat.brdfs[3].set(0, .4, 1, 0); 

this.backMat.quadrics[8].set(this.ocean.surfaceCoeffMatrix);
this.backMat.quadrics[9].set(this.ocean.clipperCoeffMatrix);
this.backMat.brdfs[4].set(.5, .5, .5, 201); 

this.boxColor = new Vec4(.9, .2, .2, .5);

this.backMat.quadrics[10].set(this.box.surfaceCoeffMatrix1);
this.backMat.quadrics[11].set(this.box.clipperCoeffMatrix1);
this.backMat.brdfs[5].set(this.boxColor); 
this.backMat.clippers[10].set(this.box.clipperCoeffMatrix2);


this.backMat.quadrics[12].set(this.box.surfaceCoeffMatrix2);
this.backMat.quadrics[13].set(this.box.clipperCoeffMatrix3);
this.backMat.brdfs[6].set(this.boxColor); 
this.backMat.clippers[12].set(this.box.clipperCoeffMatrix4);

this.backMat.quadrics[16].set(this.box.surfaceCoeffMatrix3);
this.backMat.quadrics[17].set(this.box.clipperCoeffMatrix5);
this.backMat.brdfs[8].set(this.boxColor); 
this.backMat.clippers[16].set(this.box.clipperCoeffMatrix6);

this.castleTopColor = new Vec4(1, 0, .2, 3.0);

this.backMat.quadrics[14].set(this.topCastle1.surfaceCoeffMatrix);
this.backMat.quadrics[15].set(this.topCastle1.clipperCoeffMatrix);
this.backMat.brdfs[7].set(this.castleTopColor); 


this.backMat.quadrics[18].set(this.sandCastle.surfaceCoeffMatrix1);
this.backMat.quadrics[19].set(this.sandCastle.clipperCoeffMatrix1);
this.backMat.brdfs[9].set(this.castleColor); 
this.backMat.clippers[18].set(this.sandCastle.clipperCoeffMatrix2);


this.backMat.quadrics[20].set(this.sandCastle.surfaceCoeffMatrix2);
this.backMat.quadrics[21].set(this.sandCastle.clipperCoeffMatrix3);
this.backMat.brdfs[10].set(this.castleColor); 
this.backMat.clippers[20].set(this.sandCastle.clipperCoeffMatrix4);

this.backMat.quadrics[22].set(this.sandCastle.surfaceCoeffMatrix3);
this.backMat.quadrics[23].set(this.sandCastle.clipperCoeffMatrix5);
this.backMat.brdfs[11].set(this.castleColor); 
this.backMat.clippers[22].set(this.sandCastle.clipperCoeffMatrix6);

this.backMat.quadrics[24].set(this.sandTower1.surfaceCoeffMatrix);
this.backMat.quadrics[25].set(this.sandTower1.clipperCoeffMatrix);
this.backMat.brdfs[12].set(this.castleColor); 

this.backMat.quadrics[26].set(this.sandTower2.surfaceCoeffMatrix);
this.backMat.quadrics[27].set(this.sandTower2.clipperCoeffMatrix);
this.backMat.brdfs[13].set(this.castleColor); 

this.backMat.quadrics[28].set(this.topCastle2.surfaceCoeffMatrix);
this.backMat.quadrics[29].set(this.topCastle2.clipperCoeffMatrix);
this.backMat.brdfs[14].set(this.castleTopColor); 

this.trunkColor = new Vec4(.5, .3, .2, 10.0);

this.backMat.quadrics[30].set(this.trunk1.surfaceCoeffMatrix);
this.backMat.quadrics[31].set(this.trunk1.clipperCoeffMatrix);
this.backMat.brdfs[15].set(this.trunkColor); 

this.backMat.quadrics[32].set(this.trunk2.surfaceCoeffMatrix);
this.backMat.quadrics[33].set(this.trunk2.clipperCoeffMatrix);
this.backMat.brdfs[16].set(this.trunkColor); 

this.backMat.quadrics[34].set(this.trunk3.surfaceCoeffMatrix);
this.backMat.quadrics[35].set(this.trunk3.clipperCoeffMatrix);
this.backMat.brdfs[17].set(this.trunkColor); 


this.backMat.quadrics[36].set(this.trunk4.surfaceCoeffMatrix);
this.backMat.quadrics[37].set(this.trunk4.clipperCoeffMatrix);
this.backMat.brdfs[18].set(this.trunkColor); 

this.leafColor = new Vec4(.7, 0, .2, 11.0);

this.backMat.quadrics[38].set(this.leaf1.surfaceCoeffMatrix);
this.backMat.quadrics[39].set(this.leaf1.clipperCoeffMatrix);
this.backMat.brdfs[19].set(this.leafColor); 

this.backMat.quadrics[40].set(this.leaf2.surfaceCoeffMatrix);
this.backMat.quadrics[41].set(this.leaf2.clipperCoeffMatrix);
this.backMat.brdfs[20].set(this.leafColor); 

this.backMat.quadrics[42].set(this.leaf3.surfaceCoeffMatrix);
this.backMat.quadrics[43].set(this.leaf3.clipperCoeffMatrix);
this.backMat.brdfs[21].set(this.leafColor); 

this.backMat.quadrics[44].set(this.leaf4.surfaceCoeffMatrix);
this.backMat.quadrics[45].set(this.leaf4.clipperCoeffMatrix);
this.backMat.brdfs[22].set(this.leafColor); 

this.backMat.quadrics[46].set(this.leaf5.surfaceCoeffMatrix);
this.backMat.quadrics[47].set(this.leaf5.clipperCoeffMatrix);
this.backMat.brdfs[23].set(this.leafColor); 

this.backMat.quadrics[48].set(this.leaf6.surfaceCoeffMatrix);
this.backMat.quadrics[49].set(this.leaf6.clipperCoeffMatrix);
this.backMat.brdfs[24].set(this.leafColor); 

  this.backMesh = new Mesh(this.quadGeom, this.backMat);
  this.back = new GameObject2D(this.backMesh);
  this.gameObjects.push(this.back);

  this.total = 0;


}

Scene.prototype.update = function(gl, keysPressed) {

  gl.clearColor(.2, .1, .3, 1); // affects background color
  gl.clearDepth(1.0);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.enable(gl.BLEND);
  gl.blendFunc(
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA);

  var timeAtThisFrame = new Date().getTime();
  var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;

  this.timeAtLastFrame = timeAtThisFrame;

  if(this.total < 36) {
    this.total += dt;

  }

  if(this.total > 10 && this.total < 35) {
   this.parasolTop.transform(new Mat4().rotate(-dt * 5 * Math.PI/180, new Vec3(1, 0, 0)).translate(0, dt, -dt));

  }

  this.box.transform(new Mat4().translate(-dt, .01 * Math.sin(new Date().getTime()/20000 * 30), 0));

  this.backMat.quadrics[2].set(this.parasolTop.surfaceCoeffMatrix);
  this.backMat.quadrics[3].set(this.parasolTop.clipperCoeffMatrix);

  this.backMat.quadrics[10].set(this.box.surfaceCoeffMatrix1);
  this.backMat.quadrics[11].set(this.box.clipperCoeffMatrix1);
  this.backMat.clippers[10].set(this.box.clipperCoeffMatrix2);


  this.backMat.quadrics[12].set(this.box.surfaceCoeffMatrix2);
  this.backMat.quadrics[13].set(this.box.clipperCoeffMatrix3);
  this.backMat.clippers[12].set(this.box.clipperCoeffMatrix4);

  this.backMat.quadrics[16].set(this.box.surfaceCoeffMatrix3);
  this.backMat.quadrics[17].set(this.box.clipperCoeffMatrix5);
  this.backMat.clippers[16].set(this.box.clipperCoeffMatrix6);

 this.camera.updateProjMatrix();

 this.camera.move(dt,keysPressed);

 this.back.draw(this.camera, this.lightSources);

}

