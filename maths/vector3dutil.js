(function(jigLib){
	/**
	* @author Paul Brunt
	* 
	* In an attempt to reduce the overhead of millions of Vector3D objects, I have
	* pulled all of the methods and constants out into this utility class as static
	* members. This class should never be instantiated (hence the constructor error).
	* Note also that all instances of Vector3D have been replaced with simple arrays (e.g. [x,y,z,w])
	* Jim Sangwine
	*/
	var Vector3DUtil=function(){ throw new Error('Vector3DUtil is a utility class and should not be instantiated'); };
	
	Vector3DUtil.X_AXIS=[1,0,0,0];
	Vector3DUtil.Y_AXIS=[0,1,0,0];
	Vector3DUtil.Z_AXIS=[0,0,1,0];
	
	Vector3DUtil.add=function(v1,v2){
		return [v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2],v1[3]+v2[3]];
	};
	
	Vector3DUtil.subtract=function(v1,v2){
		return [v1[0]-v2[0],v1[1]-v2[1],v1[2]-v2[2],v1[3]-v2[3]];
	};
	
	Vector3DUtil.decrementBy=function(v1,v2){
		v1[0]-=v2[0];
		v1[1]-=v2[1];
		v1[2]-=v2[2];
		v1[3]-=v2[3];
	};
	
	Vector3DUtil.IncrementBy=function(v1,v2){
		v1[0]+=v2[0];
		v1[1]+=v2[1];
		v1[2]+=v2[2];
		v1[3]+=v2[3];
	};
	
	Vector3DUtil.dotProduct=function(v1,v2){
		return v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
	};
	
	Vector3DUtil.crossProduct=function(v1,v2){
		return [v1[1]*v2[2]-v1[2]*v2[1],v1[2]*v2[0]-v1[0]*v2[2],v1[0]*v2[1]-v1[1]*v2[0],0];
	};
	
	Vector3DUtil.get_length=function(v){
		var a=[v[0],v[1],v[2]];
		var sq=a[0]*a[0]+a[1]*a[1]+a[2]*a[2];
		var f=0.0;
		if (sq>0) f=Math.pow(sq,0.5);

		return f;
	};
	
		var a=[v[0],v[1],v[2]];
		var sq=a[0]*a[0]+a[1]*a[1]+a[2]*a[2];
		return sq;
	};
	
	Vector3DUtil.normalize=function(v){
		f=Vector3DUtil.get_length(v);
		v[0]/=f;
		v[1]/=f;
		v[2]/=f;
		return f;
	};
	
	Vector3DUtil.negate=function(v){
		v[0]*=-1;
		v[1]*=-1;
		v[2]*=-1;
		return;
	};
	
	Vector3DUtil.scaleBy=function(v,s){
		v[0]*=s;
		v[1]*=s;
		v[2]*=s;
		return;
	};
	
	Vector3DUtil.project=function(v){
		v[0]/=v[3];
		v[1]/=v[3];
		v[2]/=v[3];
		v[3]=1;
		return;
	};
	
	Vector3DUtil.angleBetween=function(v1,v2){
		v1=Vector3DUtil.normalize(v1.slice(0));
		v2=Vector3DUtil.normalize(v2.slice(0));
		d=Vector3DUtil.dotProduct(v1, v2);
		if (d<-1) d=-1;
		else if (d>1) d=1;

		return Math.acos(d);
	};
	
	Vector3DUtil.equals=function(v1, v2, allFour){
		if(!allFour)
			return (v1[0]==v2[0] && v1[1]==v2[1]  && v1[2]==v2[2]); 
		else
			return (v1[0]==v2[0] && v1[1]==v2[1]  && v1[2]==v2[2] && v1[3]==v2[3]); 
	};
	
	/**
	 * replacement for the Vector3D constructor - avoids NaN assignments
	 * 
	 * @param x Number
	 * @param y Number
	 * @param z Number
	 * @param w Number
	 * @returns Array
	 */
	Vector3DUtil.create=function(x,y,z,w){
		var v3d=[];
		v3d[0] = (x) ? x : 0;
		v3d[1] = (y) ? y : 0;
		v3d[2] = (z) ? z : 0;
		v3d[3] = (w) ? w : 0;
		return v3d;
	};
	
	jigLib.Vector3DUtil=Vector3DUtil;
	
})(jigLib);