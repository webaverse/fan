import * as THREE from 'three';
import metaversefile from 'metaversefile';


const {useApp, useFrame, useLoaders, usePhysics, useCleanup, useLocalPlayer, useActivate} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1'); 


export default () => {  

    const app = useApp();
    let fan = null;
    let prop = null;
    const physics = usePhysics();
    const physicsIds = [];
    (async () => {
        const u = `${baseUrl}/fan2.glb`;
        fan = await new Promise((accept, reject) => {
            const {gltfLoader} = useLoaders();
            gltfLoader.load(u, accept, function onprogress() {}, reject);
            
        });
        fan.scene.traverse(o => {
          // if (o.isMesh) {
          //   console.log(o);
          // }
          if(o.name === 'Plane001') {  prop = o; }
        });
        //fan.scene.position.y=1;
        fan.scene.scale.set(0.7,0.7,0.7);
        //fan.scene.rotation.x = Math.PI/2;
        // group.add(fan.scene);
        app.add(fan.scene);
        let physicsId;
        physicsId = physics.addGeometry(fan.scene);
        physicsIds.push(physicsId)
        // const geometry = new THREE.CircleGeometry( 1, 32 );
        // const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent:true, opacity:0.5, side: THREE.DoubleSide } );
        // const circle = new THREE.Mesh( geometry, material );
        // circle.rotation.x = Math.PI / 2;
        // circle.position.y = 0.1;
        // app.add( circle );
        app.updateMatrixWorld();


    })();

    
    

    useFrame(( { timeStamp } ) => {
      if(prop){
        prop.rotation.x = -1.570799097288404; 
        prop.rotation.y += -1.4884504324181542; 
        prop.rotation.z = -3.141592653589793; 
      }
      app.updateMatrixWorld();
    });

    
    useCleanup(() => {
      for (const physicsId of physicsIds) {
        physics.removeGeometry(physicsId);
      }
    });

    return app;
}
