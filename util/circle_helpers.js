import * as THREE from 'three';
export default class CircleService {

    static  greatCircleFunction(P, Q)
    {
        var angle = P.angleTo(Q);
        return function(t)
        {
            var X = new THREE.Vector3().addVectors(
                P.clone().multiplyScalar(Math.sin( (1 - t) * angle )), 
                Q.clone().multiplyScalar(Math.sin(t  * angle )))
                .divideScalar(Math.sin(angle));
            return X;
        };
    }
    static createCurve(curve, color)
    {
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = curve.getPoints(100); 
              
        const lineMaterial = new THREE.LineBasicMaterial();
        lineMaterial.color = (typeof(color) === "undefined") ? new THREE.Color(0xFF0000) : new THREE.Color(color);
        const line = new THREE.Line( lineGeometry, lineMaterial );
        
        return line;
         
    }
   
}
export function createSphereArc(P,Q)
{
	var sphereArc = new THREE.Curve();
	sphereArc.getPoint = CircleService.greatCircleFunction(P,Q);
	return sphereArc;
}

export function lerp(a,b,t){
    return [
        a.x*(1-t) + b.x*t,
        a.y*(1-t) + b.y*t,
        a.z*(1-t)+ b.z*t    
    ]
}