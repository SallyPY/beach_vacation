var GameObject2D = function(mesh) { 
  this.mesh = mesh;
  
  this.texTranslate = new Vec2(0, 0);
  this.modelMatrix = new Mat4(); 
  this.rayDirMatrix = new Mat4();
  this.shadowMatrix = undefined;

  this.updateModelTransformation();

  
};

GameObject2D.prototype.updateModelTransformation =
                              function(){ 
  this.modelMatrix.set(). 
    scale(this.scale). 
    rotate(this.orientation, this.axis). 
    translate(this.position);

  if(this.parent) {
    this.modelMatrix.mul(this.parent.modelMatrix);
  }

  if(this.shadowMatrix != undefined) {
    this.modelMatrix.mul(this.shadowMatrix);
  }




};

GameObject2D.prototype.draw = function(camera, lightSources){ 

  this.invVP = camera.viewProjMatrix.clone().invert().translate(new Vec3(-camera.position.x, -camera.position.y, -camera.position.z));

  Material.shared.rayDirMatrix.set(this.invVP);

  Material.shared.modelViewProjMatrix.set(). 
    mul(this.modelMatrix).mul(camera.viewProjMatrix); //is this right?
  


  Material.shared.modelMatrix.set().mul(this.modelMatrix);
  Material.shared.modelMatrixInverse.set().mul(this.modelMatrix.clone()).invert();

  for(var i = 0; i < 2; i++) {
     Material.shared.lightPos[i].set(lightSources[i].direction);
     Material.shared.lightPowerDensity[i].set(lightSources[i].powerDensity);
  }
 
  Material.shared.texTranslate.set(this.texTranslate);
  // Material.shared.opacity.set(this.opacity);

  Material.shared.eye.set(camera.position);

  this.mesh.draw(); 
  
};
