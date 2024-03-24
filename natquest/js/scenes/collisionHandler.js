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

            const collisionObject = Matter.Bodies.fromVertices(centerX, centerY, adjustedVertices, { isStatic: true });
            Matter.World.add(scene.matter.world, collisionObject);
            collisionObjects.push(collisionObject);
        } else if (object.polyline) {
            // Handle polylines
            const polylineVertices = object.polyline.map(vertex => {
                return { x: object.x + vertex.x, y: object.y + vertex.y };
            });

            for (let i = 0; i < polylineVertices.length - 1; i++) {
                const segment = [
                    { x: polylineVertices[i].x, y: polylineVertices[i].y },
                    { x: polylineVertices[i + 1].x, y: polylineVertices[i + 1].y }
                ];
                const collisionObject = Matter.Bodies.rectangle((segment[0].x + segment[1].x) / 2, (segment[0].y + segment[1].y) / 2, Matter.Vector.magnitude(Matter.Vector.sub(segment[1], segment[0])), 1, { angle: Math.atan2(segment[1].y - segment[0].y, segment[1].x - segment[0].x), isStatic: true });
                Matter.World.add(scene.matter.world, collisionObject);
                collisionObjects.push(collisionObject);
            }
        } else {
            // Handle rectangles
            const collisionObject = Matter.Bodies.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
            Matter.World.add(scene.matter.world, collisionObject);
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
