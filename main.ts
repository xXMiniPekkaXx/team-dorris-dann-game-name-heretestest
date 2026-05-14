
// =====================
// GLOBALS
// =====================
let hero: Sprite = null
let keyFound = false
let keyVase: Sprite = null

// =====================
// LOAD MAP (F1)
// =====================
tiles.setTilemap(tilemap`F1`)

// =====================
// CREATE HERO
// =====================
hero = sprites.create(assets.image`hero`, SpriteKind.Player)

// place hero in center
let tilesList = tiles.getTilesByType(assets.tile`transparency16`)
let centerTile = tilesList[Math.floor(tilesList.length / 2)]
tiles.placeOnTile(hero, centerTile)

// movement + camera
controller.moveSprite(hero)
scene.cameraFollowSprite(hero)

// =====================
// SPAWN VASES
// =====================
function spawnVases() {

    let locations = tiles.getTilesByType(assets.tile`transparency16`)

    // create 3 vases
    let vase1 = sprites.create(assets.image`vpot`, SpriteKind.Food)
    let vase2 = sprites.create(assets.image`vpot`, SpriteKind.Food)
    let vase3 = sprites.create(assets.image`vpot`, SpriteKind.Food)

    // place them in different tiles
    tiles.placeOnTile(vase1, locations[1])
    tiles.placeOnTile(vase2, locations[5])
    tiles.placeOnTile(vase3, locations[9])

    // randomly choose which vase has key
    let choice = randint(1, 3)

    if (choice == 1) keyVase = vase1
    if (choice == 2) keyVase = vase2
    if (choice == 3) keyVase = vase3
}

// =====================
// BREAK VASE
// =====================
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player, vase) {

    // check if this is the key vase
    if (vase == keyVase) {
        keyFound = true
        game.showLongText("You found the key!", DialogLayout.Center)
        spawnChest()
    } else {
        game.showLongText("Nothing useful...", DialogLayout.Bottom)
    }

    vase.destroy()
})

// =====================
// SPAWN CHEST
// =====================
function spawnChest() {

    let chest = sprites.create(assets.image`chest`, SpriteKind.Projectile)

    let locations = tiles.getTilesByType(assets.tile`transparency16`)
    tiles.placeOnTile(chest, locations[locations.length - 1])
}

// =====================
// CHEST → WIN
// =====================
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (player, chest) {

    if (keyFound) {
        game.showLongText("Level Complete!", DialogLayout.Center)
        game.over(true)
    }
})

// =====================
// START GAME
// =====================
spawnVases()
