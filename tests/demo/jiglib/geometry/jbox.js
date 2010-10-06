(function(d){var i=d.Vector3DUtil;var f=d.JMatrix3D;var a=d.JNumber3D;var g=d.ISkin3D;var b=d.PhysicsState;var j=d.RigidBody;var e=d.EdgeData;var h=d.SpanData;var c=function(m,l,n,k){d.RigidBody.call(this);this._edges=[new e(0,1),new e(3,1),new e(2,3),new e(2,0),new e(4,5),new e(5,7),new e(6,7),new e(4,6),new e(7,1),new e(5,3),new e(4,2),new e(6,0)];this._face=[[6,7,1,0],[5,4,2,3],[3,1,7,5],[4,6,0,2],[1,3,2,0],[7,6,4,5]];this._type="BOX";this._sideLengths=i.create(l,k,n,0);this._boundingSphere=0.5*i.get_length(this._sideLengths);this.initPoint();this.set_mass(1);this.updateBoundingBox();};d.extend(c,d.RigidBody);c.prototype._sideLengths=null;c.prototype._points=null;c.prototype._edges=null;c.prototype._face=null;c.prototype.initPoint=function(){var k=this.getHalfSideLengths();this._points=[];this._points[0]=i.create(k[0],-k[1],k[2],0);this._points[1]=i.create(k[0],k[1],k[2],0);this._points[2]=i.create(-k[0],-k[1],k[2],0);this._points[3]=i.create(-k[0],k[1],k[2],0);this._points[4]=i.create(-k[0],-k[1],-k[2],0);this._points[5]=i.create(-k[0],k[1],-k[2],0);this._points[6]=i.create(k[0],-k[1],-k[2],0);this._points[7]=i.create(k[0],k[1],-k[2],0);};c.prototype.set_sideLengths=function(k){this._sideLengths=k.slice(0);this._boundingSphere=0.5*this._sideLengths.length;this.initPoint();this.setInertia(this.getInertiaProperties(this.get_mass()));this.setActive();this.updateBoundingBox();};c.prototype.get_sideLengths=function(){return this._sideLengths;};c.prototype.get_edges=function(){return this._edges;};c.prototype.getVolume=function(){return(this._sideLengths[0]*this._sideLengths[1]*this._sideLengths[2]);};c.prototype.getSurfaceArea=function(){return 2*(this._sideLengths[0]*this._sideLengths[1]+this._sideLengths[0]*this._sideLengths[2]+this._sideLengths[1]*this._sideLengths[2]);};c.prototype.getHalfSideLengths=function(){return a.getScaleVector(this._sideLengths,0.5);};c.prototype.getSpan=function(m){var t=this.get_currentState().getOrientationCols();var q=new h();var l=Math.abs(i.dotProduct(m,t[0]))*(0.5*this._sideLengths[0]);var k=Math.abs(i.dotProduct(m,t[1]))*(0.5*this._sideLengths[1]);var v=Math.abs(i.dotProduct(m,t[2]))*(0.5*this._sideLengths[2]);var n=l+k+v;var o=i.dotProduct(this.get_currentState().position,m);q.min=o-n;q.max=o+n;return q;};c.prototype.getCornerPoints=function(q){var p;var k=[];var l=f.getTranslationMatrix(q.position[0],q.position[1],q.position[2]);l=f.getAppendMatrix3D(q.get_orientation(),l);for(var m=0,n=this._points.length;m<n;m++){var o=this._points[m];p=i.create(o[0],o[1],o[2],0);f.multiplyVector(l,p);k.push(p);}return k;};c.prototype.getCornerPointsInBoxSpace=function(m,q){var l=f.getTransposeMatrix(q.get_orientation());var r=i.subtract(m.position,q.position);f.multiplyVector(l,r);var o=f.getAppendMatrix3D(m.get_orientation(),l);var k=[];var n=f.getTranslationMatrix(r[0],r[1],r[2]);n=f.getAppendMatrix3D(o,n);for(var p=0;p<this._points.length;p++){_point=this._points[p].slice(0);f.multiplyVector(n,_point);k[p]=_point;}return k;};c.prototype.getSqDistanceToPoint=function(o,m,l){m.pos=i.subtract(l,o.position);f.multiplyVector(f.getTransposeMatrix(o.get_orientation()),m.pos);var p=0;var n=0;var k=this.getHalfSideLengths();if(m.pos[0]<-k[0]){p=m.pos[0]+k[0];n+=(p*p);m.pos[0]=-k[0];}else{if(m.pos[0]>k[0]){p=m.pos[0]-k[0];n+=(p*p);m.pos[0]=k[0];}}if(m.pos[1]<-k[1]){p=m.pos[1]+k[1];n+=(p*p);m.pos[1]=-k[1];}else{if(m.pos[1]>k[1]){p=m.pos[1]-k[1];n+=(p*p);m.pos[1]=k[1];}}if(m.pos[2]<-k[2]){p=m.pos[2]+k[2];n+=(p*p);m.pos[2]=-k[2];}else{if(m.pos[2]>k[2]){p=(m.pos[2]-k[2]);n+=(p*p);m.pos[2]=k[2];}}f.multiplyVector(o.get_orientation(),m.pos);m.pos=i.add(o.position,m.pos);return n;};c.prototype.getDistanceToPoint=function(m,l,k){return Math.sqrt(this.getSqDistanceToPoint(m,l,k));};c.prototype.pointIntersect=function(q){var o=i.subtract(q,this.get_currentState().position);var m=a.getScaleVector(this._sideLengths,0.5);var l;var n=this.get_currentState().getOrientationCols();for(var k;k<3;k++){l=n[k].slice(0);i.normalize(l);if(Math.abs(i.dotProduct(l,o))>a.toArray(m)[k]+a.NUM_TINY){return false;}}return true;};c.prototype.getSupportVertices=function(p){var v=[];var w=[1,1,1];var x;var y=this.get_currentState().getOrientationCols();i.normalize(y[0]);i.normalize(y[1]);i.normalize(y[2]);for(var s=0;s<3;s++){w[s]=i.dotProduct(p,y[s]);if(Math.abs(w[s])>1-0.001){var u=(w[s]<0)?(s*2):(s*2)+1;for(var r=0;r<4;r++){x=this._points[this._face[u][r]];var z=v[r]=this.get_currentState().position.slice(0);z=i.add(z,a.getScaleVector(y[0],x[0]));z=i.add(z,a.getScaleVector(y[1],x[1]));z=i.add(z,a.getScaleVector(y[2],x[2]));}return v;}}for(s=0;s<3;s++){if(Math.abs(w[s])<0.005){var q;var o=(s+1)%3;var l=(s+2)%3;x=this.get_currentState().position.slice(0);q=(w[o]>0)?-1:1;x=i.add(x,a.getScaleVector(y[o],q*a.toArray(this._sideLengths)[o]/2));q=(w[l]>0)?-1:1;x=i.add(x,a.getScaleVector(y[l],q*a.toArray(this._sideLengths)[l]/2));v[0]=i.add(x,a.getScaleVector(y[s],a.toArray(this._sideLengths)[s]/2));v[1]=i.add(x,a.getScaleVector(y[s],-a.toArray(this._sideLengths)[s]/2));return v;}}var t=v[0]=this.get_currentState().position.slice(0);q=(w[0]>0)?-1:1;v[0]=i.add(t,a.getScaleVector(y[0],q*this._sideLengths[0]/2));q=(w[1]>0)?-1:1;v[0]=i.add(t,a.getScaleVector(y[1],q*this._sideLengths[1]/2));q=(w[2]>0)?-1:1;v[0]=i.add(t,a.getScaleVector(y[2],q*this._sideLengths[2]/2));return v;};c.prototype.segmentIntersect=function(z,B,m){z.fracOut=0;z.posOut=[0,0,0,0];z.normalOut=[0,0,0,0];var l=a.NUM_HUGE;var x=-a.NUM_HUGE;var y=a.NUM_HUGE;var E=0;var k=0;var w=0;var v=i.subtract(m.position,B.origin);var A=a.getScaleVector(this._sideLengths,0.5);var D;var C;var s;var q;var o;var r=m.getOrientationCols();var u=a.toArray(A);var n;for(w=0;w<3;w++){n=u[w];D=i.dotProduct(r[w],v);C=i.dotProduct(r[w],B.delta);if(Math.abs(C)>a.NUM_TINY){q=(D+n)/C;o=(D-n)/C;if(q>o){s=q;q=o;o=s;}if(q>x){x=q;E=w;}if(o<y){y=o;k=w;}if(x>y){return false;}if(y<0){return false;}}else{if(-D-n>0||-D+n<0){return false;}}}if(x>0){w=E;l=x;}else{w=k;l=y;}if(l<0){l=0;}if(l>1-a.NUM_TINY){return false;}z.fracOut=l;z.posOut=B.getPoint(l);if(i.dotProduct(r[w],B.delta)<0){z.normalOut=a.getScaleVector(r[w],-1);}else{z.normalOut=r[w];}return true;};c.prototype.getInertiaProperties=function(k){return f.getScaleMatrix((k/12)*(this._sideLengths[1]*this._sideLengths[1]+this._sideLengths[2]*this._sideLengths[2]),(k/12)*(this._sideLengths[0]*this._sideLengths[0]+this._sideLengths[2]*this._sideLengths[2]),(k/12)*(this._sideLengths[0]*this._sideLengths[0]+this._sideLengths[1]*this._sideLengths[1]));};c.prototype.updateBoundingBox=function(){this._boundingBox.clear();this._boundingBox.addBox(this);};d.JBox=c;})(jigLib);