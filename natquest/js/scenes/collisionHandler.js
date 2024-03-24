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
                const segmentStart = polylineVertices[i];
                const segmentEnd = polylineVertices[i + 1];
                
                const segmentLength = Phaser.Math.Distance.Between(segmentStart.x, segmentStart.y, segmentEnd.x, segmentEnd.y);
                const segmentAngle = Phaser.Math.Angle.Between(segmentStart.x, segmentStart.y, segmentEnd.x, segmentEnd.y);

                const rectangleWidth = 1;
                const rectangleHeight = segmentLength;
                const rectangleX = (segmentStart.x + segmentEnd.x) / 2;
                const rectangleY = (segmentStart.y + segmentEnd.y) / 2;

                const collisionObject = Matter.Bodies.rectangle(rectangleX, rectangleY, rectangleWidth, rectangleHeight, {
                    angle: segmentAngle,
                    isStatic: true
                });
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
