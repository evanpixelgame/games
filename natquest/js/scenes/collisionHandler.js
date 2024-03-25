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
    const transitionSensors = [];

    const objectLayer2 = map.getObjectLayer('Object Layer 2');

    objectLayer2.objects.forEach(object => {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        if (object.polygon) {
            const polygonVertices = object.polygon.map(vertex => {
                return { x: object.x + vertex.x, y: object.y + vertex.y };
            });

            const centroid = calculateCentroid(polygonVertices);
            const adjustedVertices = polygonVertices.map(vertex => {
                return {
                    x: vertex.x - centroid.x + centerX,
                    y: vertex.y - centroid.y + centerY
                };
            });

            const transitionSensor = scene.matter.add.fromVertices(centerX, centerY, adjustedVertices, { isSensor: true });
            transitionSensors.push(transitionSensor);
        } else if (object.ellipse) {
            const radiusX = object.width / 2;
            const radiusY = object.height / 2;
            const transitionSensor = scene.matter.add.circle(centerX, centerY, Math.max(radiusX, radiusY), { isSensor: true });
            transitionSensors.push(transitionSensor);
        } else {
            const transitionSensor = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isSensor: true });
            transitionSensors.push(transitionSensor);
        }
    });

    return transitionSensors;
}

export function TransitionSensorHandler(scene, player, transitionSensors) {
    // Check for collisions between the player and transition sensors
    transitionSensors.forEach(sensor => {
        Matter.Events.on(scene.matter.world, 'collisionStart', (event) => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i];
                if ((pair.bodyA === player.body && pair.bodyB === sensor) || (pair.bodyB === player.body && pair.bodyA === sensor)) {
                    // Debug statement to check if the collision callback is triggered
                    console.log('Collision detected with transition sensor');

                    // Optionally, perform any actions or scene transitions upon collision
                    // For example, transition to a new scene upon collision
                    scene.scene.start('InsideRoom');
                    break; // Exit loop after the first collision detection
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
