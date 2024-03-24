export function createCollisionObjects(scene, map) {
    const collisionObjects = [];

    const objectLayer = map.getObjectLayer('Object Layer 1');

    objectLayer.objects.forEach(object => {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        let collisionObject;

        if (object.type === 'rectangle') {
            collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
        } else if (object.type === 'ellipse') {
            collisionObject = scene.matter.add.circle(centerX, centerY, Math.max(object.width, object.height) / 2, { isStatic: true });
        } else if (object.type === 'polygon') {
            const vertices = object.polygon.map(point => ({ x: point.x, y: point.y }));
            collisionObject = scene.matter.add.polygon(centerX, centerY, vertices, { isStatic: true });
        }

        collisionObjects.push(collisionObject);
    });

    return collisionObjects;
}

export function handleBarrierCollision(player, barrier) {
    if (Phaser.Geom.Rectangle.Contains(barrier.getBounds(), player.x, player.y)) {
        // Handle collision with a rectangle barrier
        // Adjust player's position or velocity accordingly

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
    } else if (Phaser.Geom.Circle.Contains(barrier, player.x, player.y)) {
    // Handle collision with a circle barrier
    // Adjust player's position or velocity accordingly
    // Example:
    const overlapX = player.x - barrier.x;
    const overlapY = player.y - barrier.y;

    // Adjust player's position based on the overlap and direction of movement
    // Example: 
    if (player.body.velocity.x > 0 && overlapX < 0) {
        // Player is moving right and collides with the left side of the circle
        player.body.velocity.x = 0;
        player.x = barrier.x - barrier.radius - player.width / 2;
    } else if (player.body.velocity.x < 0 && overlapX > 0) {
        // Player is moving left and collides with the right side of the circle
        player.body.velocity.x = 0;
        player.x = barrier.x + barrier.radius + player.width / 2;
    }

    if (player.body.velocity.y > 0 && overlapY < 0) {
        // Player is moving down and collides with the top side of the circle
        player.body.velocity.y = 0;
        player.y = barrier.y - barrier.radius - player.height / 2;
    } else if (player.body.velocity.y < 0 && overlapY > 0) {
        // Player is moving up and collides with the bottom side of the circle
        player.body.velocity.y = 0;
        player.y = barrier.y + barrier.radius + player.height / 2;
    }
} else if (Phaser.Geom.Polygon.Contains(barrier, player.x, player.y)) {
    // Handle collision with a polygon barrier
    // Adjust player's position or velocity accordingly
    // Example:
    const collisionInfo = Matter.SAT.collides(player.body, barrier.body);

    if (collisionInfo.collided) {
        // Collision detected
        const overlapX = collisionInfo.overlap.x;
        const overlapY = collisionInfo.overlap.y;

        // Adjust player's position based on the overlap and direction of movement
        // Example: 
        if (player.body.velocity.x > 0 && overlapX < 0) {
            // Player is moving right and collides with the left side of the polygon
            player.body.velocity.x = 0;
            player.x = barrier.body.x - barrier.body.width / 2 - player.width / 2;
        } else if (player.body.velocity.x < 0 && overlapX > 0) {
            // Player is moving left and collides with the right side of the polygon
            player.body.velocity.x = 0;
            player.x = barrier.body.x + barrier.body.width / 2 + player.width / 2;
        }

        if (player.body.velocity.y > 0 && overlapY < 0) {
            // Player is moving down and collides with the top side of the polygon
            player.body.velocity.y = 0;
            player.y = barrier.body.y - barrier.body.height / 2 - player.height / 2;
        } else if (player.body.velocity.y < 0 && overlapY > 0) {
            // Player is moving up and collides with the bottom side of the polygon
            player.body.velocity.y = 0;
            player.y = barrier.body.y + barrier.body.height / 2 + player.height / 2;
        }
    }
}
}
