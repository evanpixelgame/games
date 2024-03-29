import { gameManager } from '../gameState.js';

export function sensorMapSet(scene, map) {
    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);

        // Assign value to gameManager.sensorID using customID as the key
        gameManager.sensorID[customID] = object; // Assuming you want to store the entire object here

        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;
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
    });

    console.log(`NATALY IS THE MOST BEAUTIFUL POPULATE OBJECT`, gameManager.sensorID);
}

//I want it so the key is the customID (aka, transitionsensor to be renamed openworldtoInsideRoom) and the value to be the matter.js body that the sensor is associated with.



export function sensorHandler(scene, map, player, transitionSensors) {
        const objectLayer2 = map.getObjectLayer('Object Layer 2');
        player.scene.matter.world.on('collisionstart', (eventData) => {
            // Loop through pairs of colliding bodies
            eventData.pairs.forEach(pair => {
                // Check if the player is one of the bodies involved in the collision
                if (pair.bodyA === player.body || pair.bodyB === player.body) {
                    // Get the other body involved in the collision
                    const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
                    // Check if otherBody has a customID property
                    if (otherBody.properties[0].name === 'customID') {
                        let customID;
                        otherBody.properties.forEach(property => {
                            if (property.name === 'customID') {
                                customID = otherBody.properties[0].values;
                            }
                            if (customID) {
                                // Retrieve the sensor name associated with the customID
                                switch (customID) {
                                    case 'OpenWorldToInsideRoom':
                                        console.log('You hit a transition sensor!');
                                        // Perform actions specific to this sensor
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
                                    // Add more cases for other sensor names as needed
                                    default:
                                        console.log(sensorName);
                                        // Handle other sensor names
                                        break;
                                }
                            } else {
                                console.log('Collision detected with sensor object ID:', otherBody.id);
                            }
                        });
                    } else {console.log('Collision detected with non-sensor object, ID:', otherBody.id);}
                }
            });
        });
}





/*
export function sensorHandler(scene, map, player, transitionSensors) {
        const objectLayer2 = map.getObjectLayer('Object Layer 2');
        player.scene.matter.world.on('collisionstart', (eventData) => {
            // Loop through pairs of colliding bodies
            eventData.pairs.forEach(pair => {
                // Check if the player is one of the bodies involved in the collision
                if (pair.bodyA === player.body || pair.bodyB === player.body) {
                    // Get the other body involved in the collision
                    const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
                    // Check if otherBody has a customID property
                    if (otherBody.hasOwnProperty('customID')) {
                        let customID;
                        otherBody.properties.forEach(property => {
                            if (property.name === 'customID') {
                                customID = otherBody.properties.values;
                            }
                            if (customID) {
                                // Retrieve the sensor name associated with the customID
                                switch (customID) {
                                    case 'OpenWorldToInsideRoom':
                                        console.log('You hit a transition sensor!');
                                        // Perform actions specific to this sensor
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
                                    // Add more cases for other sensor names as needed
                                    default:
                                        console.log(sensorName);
                                        // Handle other sensor names
                                        break;
                                }
                            } else {
                                console.log('Collision detected with sensor object ID:', otherBody.id);
                            }
                        });
                    } else {console.log('Collision detected with non-sensor object, ID:', otherBody.id);}
                }
            });
        });
}

*/


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
