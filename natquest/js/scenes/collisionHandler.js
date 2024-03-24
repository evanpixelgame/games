export function createCollisionObjects(scene, map) {
    const collisionObjects = [];

    const objectLayer = map.getObjectLayer('Object Layer 1');

    objectLayer.objects.forEach(object => {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        if (object.polygon) {
            // Handle polygons
            const polygonVertices = object.polygon.map(vertex => {
                return { x: vertex.x + object.x, y: vertex.y + object.y };
            });
            const collisionObject = scene.matter.add.polygon(centerX, centerY, polygonVertices, { isStatic: true });
            collisionObjects.push(collisionObject);
        } else {
            // Handle rectangles
            const collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
            collisionObjects.push(collisionObject);
        }
    });

    return collisionObjects;
}

export function handleBarrierCollision(player, barrier) {
    let overlapX, overlapY;
    if (barrier.type === 'rectangle') {
        overlapX = player.body.position.x - barrier.bounds.min.x;
        overlapY = player.body.position.y - barrier.bounds.min.y;
    } else if (barrier.type === 'polygon') {
        // For polygons, barrier.bounds is not available
        overlapX = player.body.position.x - barrier.position.x;
        overlapY = player.body.position.y - barrier.position.y;
    }

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
