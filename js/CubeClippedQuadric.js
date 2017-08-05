var CubeClippedQuadric = function(surfaceCoeffMatrix, clipperCoeffMatrix) {
  this.surfaceCoeffMatrix1 = surfaceCoeffMatrix;
  this.surfaceCoeffMatrix2 = new Mat4();
  this.surfaceCoeffMatrix3 = new Mat4();


  this.clipperCoeffMatrix1 = clipperCoeffMatrix;
  this.clipperCoeffMatrix2 = new Mat4();
  this.clipperCoeffMatrix3 = new Mat4();
  this.clipperCoeffMatrix4 = new Mat4();
  this.clipperCoeffMatrix5 = new Mat4();
  this.clipperCoeffMatrix6 = new Mat4();
};

CubeClippedQuadric.prototype.setUnitCube = function(){
  this.surfaceCoeffMatrix1.set(
                  1, 0, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, -1);
  // this.surfaceCoeffMatrix.setDiagonal(new Vector4(1, 1, 1, -1));
  this.clipperCoeffMatrix1.set(
                  0, 0, 0, 0,
  							  0, 1, 0, 0,
  							  0, 0, 0, 0,
  							  0, 0, 0, -1);
  this.clipperCoeffMatrix2.set(
                  0, 0, 0, 0,
                  0, 0, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, -1)

  this.surfaceCoeffMatrix2.set(this.clipperCoeffMatrix1);
  this.clipperCoeffMatrix3.set(this.clipperCoeffMatrix2);
  this.clipperCoeffMatrix4.set(this.surfaceCoeffMatrix1);


  this.surfaceCoeffMatrix3.set(this.clipperCoeffMatrix2);
  this.clipperCoeffMatrix5.set(this.surfaceCoeffMatrix1);
  this.clipperCoeffMatrix6.set(this.clipperCoeffMatrix1);


};





CubeClippedQuadric.prototype.transform = function(transformatiomMat) {

	surfInverse = transformatiomMat.clone().invert();
	surfTransposeInv = transformatiomMat.clone().invert().transpose();

	clipInverse = transformatiomMat.clone().invert();
	clipTransposeInv = transformatiomMat.clone().invert().transpose();

  inverse = transformatiomMat.clone().invert();
  transposeInv = transformatiomMat.clone().invert().transpose();


	this.surfaceCoeffMatrix1  = surfInverse.clone().mul(this.surfaceCoeffMatrix1).mul(surfTransposeInv.clone());
 this.surfaceCoeffMatrix2  = surfInverse.clone().mul(this.surfaceCoeffMatrix2).mul(surfTransposeInv.clone());
  this.surfaceCoeffMatrix3  = surfInverse.clone().mul(this.surfaceCoeffMatrix3).mul(surfTransposeInv.clone());

  this.clipperCoeffMatrix1 = clipInverse.clone().mul(this.clipperCoeffMatrix1).mul(clipTransposeInv.clone());
  this.clipperCoeffMatrix2 = clipInverse.clone().mul(this.clipperCoeffMatrix2).mul(clipTransposeInv.clone());
  this.clipperCoeffMatrix3 = clipInverse.clone().mul(this.clipperCoeffMatrix3).mul(clipTransposeInv.clone());
  this.clipperCoeffMatrix4 = clipInverse.clone().mul(this.clipperCoeffMatrix4).mul(clipTransposeInv.clone());
  this.clipperCoeffMatrix5 = clipInverse.clone().mul(this.clipperCoeffMatrix5).mul(clipTransposeInv.clone());
  this.clipperCoeffMatrix6 = clipInverse.clone().mul(this.clipperCoeffMatrix6).mul(clipTransposeInv.clone());


};

CubeClippedQuadric.prototype.transformClipper = function(transformatiomMat) {


	clipInverse = transformatiomMat.clone().invert();
	clipTransposeInv = transformatiomMat.clone().invert().transpose();

	this.clipperCoeffMatrix = clipInverse.mul(this.clipperCoeffMatrix).mul(clipTransposeInv);

};
CubeClippedQuadric.prototype.setClipper = function(clipperMat) {


	this.clipperCoeffMatrix = clipperMat;

};




