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

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
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

export function TransitionSensorHandler(player, transitionSensors) {
    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        console.log('Object ID:', object.id);
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);
    });                               
  //  console.log('TESTING123plzdisplayvalue' + transitionSensors[transitionSensor]); 
                                 
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
                if (otherBody.name) {
                console.log('Collision detected with object ID:', otherBody.name);
                }
                 if (otherBody.customID) {
                  console.log('Collision detected with object ID:', otherBody.customID);
                }
        
                // Check if the other body has a customID property
                if (otherBody.customID) {
                    // Retrieve the sensor associated with the customID
                    const sensor = transitionSensors[otherBody.customID];
                    // Check if the sensor exists
                    if (sensor) {
                        // Perform actions based on the customID
                        switch (otherBody.customID) {
                            case 'transitionSensor':
                                console.log('You hit a transition sensor!');
                                // Perform actions specific to this customID
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
