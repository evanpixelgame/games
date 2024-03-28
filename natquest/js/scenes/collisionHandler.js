const sensorID = new Map();
 const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);
          
        const key = object.name; // Assuming a 'name' property exists
          // Add the object to the Map with the extracted key
        sensorID.set(key, object);
        
    });
//I want it so the key is the customID (aka, transitionsensor to be renamed openworldtoInsideRoom) and the value to be the matter.js body that the sensor is associated with.
        
export function createCollisionObjects(scene, map) {
    const collisionObjects = [];

    const objectLayer = map.getObjectLayer('Object Layer 1');

    objectLayer.objects.forEach(object => {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        if (object.polygon) {
            // Handle polygons
            const polygonVertices = object.polygon.map(vertex => {
                return { x: object.x + vertex.x, y: object.y + vertex.y };
            });

            // Adjust the centroid of the polygon
            const centroid = calculateCentroid(polygonVertices);
            const adjustedVertices = polygonVertices.map(vertex => {
                return {
                    x: vertex.x - centroid.x + centerX,
                    y: vertex.y - centroid.y + centerY
                };
            });

            const collisionObject = scene.matter.add.fromVertices(centerX, centerY, adjustedVertices, { isStatic: true });
            collisionObjects.push(collisionObject);
        } else if (object.ellipse) {
            // Handle circles
            const radiusX = object.width / 2;
            const radiusY = object.height / 2;
            const collisionObject = scene.matter.add.circle(centerX, centerY, Math.max(radiusX, radiusY), { isStatic: true });
            collisionObjects.push(collisionObject);
        } else {
            // Handle rectangles
            const collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
            collisionObjects.push(collisionObject);
        }
    });

    return collisionObjects;
}


// Function to calculate centroid of a polygon
function calculateCentroid(vertices) {
    let centroidX = 0;
    let centroidY = 0;
    const vertexCount = vertices.length;

    for (let i = 0; i < vertexCount; i++) {
        const vertex = vertices[i];
        centroidX += vertex.x;
        centroidY += vertex.y;
    }

    centroidX /= vertexCount;
    centroidY /= vertexCount;

    return { x: centroidX, y: centroidY };
}




export function createTransitionSensors(scene, map) {
    const transitionSensors = {};

    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    //const sensorIDs = sensorID;

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
      
        
        const key = object.name; // Assuming a 'name' property exists
          // Add the object to the Map with the extracted key
        sensorID.set(key, object);
        
       
        
        console.log('Object Custom ID:', customID);

        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        // Calculate sensor dimensions
        const width = object.width;
        const height = object.height;

        // Create the rectangle sensor body
        const sensor = scene.matter.add.rectangle(centerX, centerY, width, height, {
            isSensor: true, // Set to true to make it a sensor
            render: {
                fillStyle: 'transparent', // Optional: make the sensor invisible
                strokeStyle: 'red' // Optional: set a stroke color for debugging
            }
        });

        // Add the sensor to the transitionSensors object with the customID as the key
        if (customID) {
            transitionSensors[customID] = sensor;
        }

        // Log sensor properties
        console.log('Sensor:', sensor);
    });

    // Log all transition sensors
    console.log('Transition Sensors:', transitionSensors);
    Object.entries(transitionSensors).forEach(([key, value]) => {
    console.log(`Key: ${key}, Value:`, value);
});
    return transitionSensors;
}



export function TransitionSensorHandler(scene, map, player, transitionSensors, sensorIDs) {
    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);
                                 
                                 
    // Listen for collisionstart event on the world property of the scene where the player is created
    player.scene.matter.world.on('collisionstart', (eventData) => {
        // Loop through pairs of colliding bodies
        eventData.pairs.forEach(pair => {
            // Check if the player is one of the bodies involved in the collision
            if (pair.bodyA === player.body || pair.bodyB === player.body) {
                // Get the other body involved in the collision
                const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
                // Log the ID of the other object
                console.log('Collision detected with object ID:', otherBody.id);
                 console.log(customID);
                
                // Check if the other body has a customID property
               if (customID) {

                    switch (customID) {
                        case 'transitionSensor':
                            console.log('You hit a transition sensor!');
                            // Perform actions specific to this customID
                            console.log('youve hit the sensor by the door');
                            scene.scene.remove('ComputerControls');
                            scene.scene.start('InsideRoom', {
                                player: scene.player,
                                speed: scene.speed,
                                camera: scene.cameras.main,
                                controls: scene.controls, // Passing the controls object here
                                engine: scene.matter.world,
                                world: scene.world,
                            });
                            break;
                        // Add more cases for other customIDs as needed
                        default:
                            // Handle other customIDs
                            break;
                    }
                }
            }
        });
    });
         
    }); 
}




/*
export function TransitionSensorHandler(scene, map, player, transitionSensors) {
    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);
    });                               

                                 
    // Listen for collisionstart event on the world property of the scene where the player is created
    player.scene.matter.world.on('collisionstart', (eventData) => {
        // Loop through pairs of colliding bodies
        eventData.pairs.forEach(pair => {
            // Check if the player is one of the bodies involved in the collision
            if (pair.bodyA === player.body || pair.bodyB === player.body) {
                // Get the other body involved in the collision
                const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
                // Log the ID of the other object
                console.log('Collision detected with object ID:', otherBody.id);
                
                   if (customID) {
                        // Perform actions based on the customID
                        switch (customID) {
                            case 'transitionSensor':
                                console.log('You hit a transition sensor!');
                                // Perform actions specific to this customID
                                   console.log('youve hit the sensor by the door');
 this.scene.remove('ComputerControls');
  this.scene.start('InsideRoom', {
  player: this.player,
  speed: this.speed,
  camera: this.cameras.main,
  controls: this.controls, // Passing the controls object here
  engine: this.matter.world,
   world: this.world,
      });
                                break;
                            // Add more cases for other customIDs as needed
                            default:
                                // Handle other customIDs
                                break;
                        }
                    }
                }
            }
        });
    });
}
*/


export function handleBarrierCollision(player, barrier) {
    const overlapX = player.x - barrier.x;
    const overlapY = player.y - barrier.y;

    if (player.body.velocity.x > 0 && overlapX < 0) {
        player.body.velocity.x = 0;
        player.x = barrier.x - player.width / 2;
    } else if (player.body.velocity.x < 0 && overlapX > 0) {
        player.body.velocity.x = 0;
        player.x = barrier.x + barrier.width + player.width / 2;
    }

    if (player.body.velocity.y > 0 && overlapY < 0) {
        player.body.velocity.y = 0;
        player.y = barrier.y - player.height / 2;
    } else if (player.body.velocity.y < 0 && overlapY > 0) {
        player.body.velocity.y = 0;
        player.y = barrier.y + barrier.height + player.height / 2;
    }
}
