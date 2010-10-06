(function(c){var e=c.Vector3DUtil;var b=c.JMatrix3D;var d=c.JNumber3D;var g=c.JConstraint;var f=c.RigidBody;var a=function(k,m,i,j,l,h){if(!l){l=1;}if(!h){h=1;}this.Super();this._body0=k;this._body0Pos=m;this._body1=i;this._body1Pos=j;this._allowedDistance=l;this._timescale=h;if(this._timescale<d.NUM_TINY){this._timescale=d.NUM_TINY;}k.addConstraint(this);i.addConstraint(this);};c.extend(a,c.JConstraint);a.prototype._maxVelMag=20;a.prototype._minVelForProcessing=0.01;a.prototype._body0=null;a.prototype._body1=null;a.prototype._body0Pos=null;a.prototype._body1Pos=null;a.prototype._timescale=null;a.prototype._allowedDistance=null;a.prototype.r0=null;a.prototype.r1=null;a.prototype._worldPos=null;a.prototype._vrExtra=null;a.prototype.preApply=function(l){this.set_satisfied(false);this.r0=this._body0Pos.slice(0);b.multiplyVector(this._body0.get_currentState().get_orientation(),this.r0);this.r1=this._body1Pos.slice(0);b.multiplyVector(this._body1.get_currentState().get_orientation(),this.r1);var i=e.add(this._body0.get_currentState().position,this.r0);var h=e.add(this._body1.get_currentState().position,this.r1);this._worldPos=d.getScaleVector(e.add(i,h),0.5);var k=e.subtract(i,h);var j=e.get_length(k);if(j>this._allowedDistance){this._vrExtra=d.getScaleVector(k,(j-this._allowedDistance)/(j*Math.max(this._timescale,l)));}else{this._vrExtra=[0,0,0,0];}};a.prototype.apply=function(i){this.set_satisfied(true);if(!this._body0.isActive&&!this._body1.isActive){return false;}var n=this._body0.getVelocity(this.r0);var m=this._body1.getVelocity(this.r1);var h=e.add(this._vrExtra,e.subtract(n,m));var l=e.get_length(h);if(l<this._minVelForProcessing){return false;}if(l>this._maxVelMag){h=d.getScaleVector(h,this._maxVelMag/l);l=this._maxVelMag;}var o=d.getDivideVector(h,l);var q=e.crossProduct(this.r0,o);b.multiplyVector(this._body0.get_worldInvInertia(),q);var p=e.crossProduct(this.r1,o);b.multiplyVector(this._body1.get_worldInvInertia(),p);var k=this._body0.get_invMass()+this._body1.get_invMass()+e.dotProduct(o,e.crossProduct(q,this.r0))+e.dotProduct(o,e.crossProduct(p,this.r1));if(k<d.NUM_TINY){return false;}var j=d.getScaleVector(o,-l/k);this._body0.applyWorldImpulse(j,this._worldPos);this._body1.applyWorldImpulse(d.getScaleVector(j,-1),this._worldPos);this._body0.setConstraintsAndCollisionsUnsatisfied();this._body1.setConstraintsAndCollisionsUnsatisfied();this.set_satisfied(true);return true;};c.JConstraintPoint=a;})(jigLib);