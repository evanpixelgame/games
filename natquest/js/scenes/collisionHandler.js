//Creates collision objects, sensor objects, and covers handling of the sensor object interactions with player
//Import as needed into scenes that have 2.5D maps that require collision/sensor object creation and handling
//Make sure that all imported maps have their Object layer that deals with collisions is named "Collision Layer 1"
//Also ensure their Object layer that deals with sensors is named "Sensor Layer 1" and when adding custom properties in Tiled editor, do "customID" for property and then give it a value of whatever label will coorelate with its caused effect 


// TRY TO ADD A IF LOGIC TO IT SO THAT IT CAN USE OBJECT PROPERTIES TO DETERMINE WHETHER TO HANDLE THE SENSOR AS ON COLLISION OR OVERLAP
//expirment with different ways to initiate the callback other than collisionStart and overlap, learn how to use overlap better
//maybe split up the sensor handling if the switch cases start to get excessive, maybe each scene can get their own sensorhandler if it starts getting excession
//^^and then this file could just for senor and collision object creation, and then each scene would get its own collision handler function.
//^^maybe keep the main logic for the sensor handling here and then have the individual sensorhandler file for each scene just handle the different switch cases
export function sensorMapSet(scene, map) {
    const sensorLayer1 = map.getObjectLayer('Sensor Layer 1');

    sensorLayer1.objects.forEach(object => {
        // Log object properties to check if it has the customID property
        const customIDProperty = object.properties.find(prop => prop.name === 'customID');
        const customID = customIDProperty ? customIDProperty.value : null;
        console.log('Object Custom IDfromhandler:', customID);
        
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;
        const width = object.width;
        const height = object.height;

        // Create the rectangle sensor body
        const sensor = scene.matter.add.rectangle(centerX, centerY, width, height, {
            isSensor: true, // Set to true to make it a sensor
            customID: customID,
            render: {
                fillStyle: 'transparent', // Optional: make the sensor invisible
                strokeStyle: 'red' // Optional: set a stroke color for debugging
            }
        });   
    });

}

export function sensorHandler(scene, map, player, transitionSensors) {
    
    player.scene.matter.world.on('collisionstart', (eventData) => {
        // Loop through pairs of colliding bodies
        eventData.pairs.forEach(pair => {
            // Check if the player is one of the bodies involved in the collision
            if (pair.bodyA === player.body || pair.bodyB === player.body) {
                // Get the other body involved in the collision
                const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
              // const isCustom = otherBody.properties.find(prop => prop.name === 'customID') !== undefined;
               const isCustom = otherBody.isSensor == true;
          
                if (isCustom) {            
    switch (otherBody.customID) {
            
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
            
            case 'fastZone':
                console.log('cue sirens, double speed');
            break;

              case 'BackToOpenWorld':
            console.log('take me back home daddy');
            const newPosition = { x: 560, y: 715 };
             scene.scene.start('OpenWorld', {
                player: scene.player,
                speed: scene.speed,
                camera: scene.cameras.main,
                controls: scene.controls, // Passing the controls object here
                engine: scene.matter.world,
                world: scene.world,
                newPosition: newPosition,
            });
            break;

            
              case 'InsideRoomToNextRoom':
            console.log('take me back home again daddy');
         //   const newPosition = { x: 560, y: 715 };
              scene.scene.remove('ComputerControls');
             scene.scene.start('NextRoom', {
                player: scene.player,
                speed: scene.speed,
                camera: scene.cameras.main,
                controls: scene.controls, // Passing the controls object here
                engine: scene.matter.world,
                world: scene.world,
                //newPosition: newPosition,
            });
            break;
            
        // Add more cases for other sensor names as needed
        default:
            console.log(otherBody.customID);
            // Handle other sensor names
            break;
    }
} else {
    console.log('Collision detected with non-sensor object ID:', otherBody.id);
}
            }
        });
    });
}

export function createCollisionObjects(scene, map) {
    const collisionObjects = [];

    const objectLayer = map.getObjectLayer('Collision Layer 1');

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
