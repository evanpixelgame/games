export function createCollisionObjects(scene, map) {
    const collisionObjects = [];

    const objectLayer = map.getObjectLayer('Object Layer 1');

    objectLayer.objects.forEach(object => {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;

        const collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
        collisionObjects.push(collisionObject);
    });
    
    if (object.polygon) {
      const polygonVertices = object.polygon.map(vertex => {
        return { x: vertex.x + object.x, y: vertex.y + object.y };
  });
        
  const collisionObject = scene.matter.add.polygon(centerX, centerY, polygonVertices, { isStatic: true });
  collisionObjects.push(collisionObject);
}

    return collisionObjects;
}

export function handleBarrierCollision(player, barrier) {
  let overlapX, overlapY;

  // Use Matter.Query for collision detection with any shape
  const collisionPairs = Matter.Query.overlaps(player.body, barrier);
  if (collisionPairs.length > 0) {
    const collisionPair = collisionPairs[0];
    overlapX = collisionPair.overlap.x;
    overlapY = collisionPair.overlap.y;

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
