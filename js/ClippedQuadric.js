var ClippedQuadric = function(surfaceCoeffMatrix, clipperCoeffMatrix) {
  this.surfaceCoeffMatrix = surfaceCoeffMatrix;
  this.clipperCoeffMatrix = clipperCoeffMatrix;
};

ClippedQuadric.prototype.setUnitSphere = function(){
  this.surfaceCoeffMatrix.set(1, 0, 0, 0,
  							  0, 1, 0, 0,
  							  0, 0, 1, 0,
  							  0, 0, 0, -1);
  // this.surfaceCoeffMatrix.setDiagonal(new Vector4(1, 1, 1, -1));
  this.clipperCoeffMatrix.set(0, 0, 0, 0,
  							  0, 1, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, -1);
};

ClippedQuadric.prototype.setUnitCylinder = function() {

	this.surfaceCoeffMatrix.set(1, 0, 0, 0,
  							    0, 0, 0, 0,
  							    0, 0, 1, 0,
  							    0, 0, 0, -1);

   this.clipperCoeffMatrix.set(0, 0, 0, 0,
  							  0, 1, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, -1);

};

ClippedQuadric.prototype.setUnitCone = function() {

	this.surfaceCoeffMatrix.set(1, 0, 0, 0,
  							    0, -1, 0, 0,
  							    0, 0, 1, 0,
  							    0, 0, 0, 0); //xsquared - ysquard + z

   this.clipperCoeffMatrix.set(0, 0, 0, 0,
  							  0, 1, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, -1);
   this.transformClipper(new Mat4().translate(0, -1, 0));

};



// ClippedQuadric.prototype.setUnitCone = function() {

// 	this.surfaceCoeffMatrix.set(1, 0, 0, 0,
//   							    0, 1, 0, 0,
//   							    0, 0, -1, 0,
//   							    0, 0, 0, 0);

//    this.clipperCoeffMatrix.set(0, 0, 0, 0,
//   							  0, 1, 0, 0,
//   							  0, 0, 0, 0,
//   							  0, 0, 0, -1);

// };



ClippedQuadric.prototype.transform = function(transformatiomMat) {

	surfInverse = transformatiomMat.clone().invert();
	surfTransposeInv = transformatiomMat.clone().invert().transpose();

	clipInverse = transformatiomMat.clone().invert();
	clipTransposeInv = transformatiomMat.clone().invert().transpose();

	this.surfaceCoeffMatrix  = surfInverse.mul(this.surfaceCoeffMatrix).mul(surfTransposeInv);
	this.clipperCoeffMatrix = clipInverse.mul(this.clipperCoeffMatrix).mul(clipTransposeInv);

};

ClippedQuadric.prototype.transformClipper = function(transformatiomMat) {


	clipInverse = transformatiomMat.clone().invert();
	clipTransposeInv = transformatiomMat.clone().invert().transpose();

	this.clipperCoeffMatrix = clipInverse.mul(this.clipperCoeffMatrix).mul(clipTransposeInv);

};
ClippedQuadric.prototype.setClipper = function(clipperMat) {


	this.clipperCoeffMatrix = clipperMat;

};




