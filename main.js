class Game {

    constructor() {
        this.entities = {};
        this.systems = {};
    }

    addSystem( system ) {
        this.systems[system.id] = system;
    }

    removeSystem( system ) {
        delete this.systems[system.id];
    }

    addEntitiy( entity ) {
        this.entities[entity.id] = entity;
    }

    removeEntity( entity ) {
        delete this.entities[entity.id];
    }

    updateEntities() {
        for( const entity of Object.values(this.entities) ) {
            entity.update();
        }
    }

    updateSystems() {
        for( const system of Object.values(this.systems) ) {
            system.update();
        }
    }

    loop() {
        requestAnimationFrame( this.loop.bind(this) );
    }

    start() {
        this.loop();
    }
}





new Game().start();


class RenderSystem {
    constructor() {
        this.requiredComponents = ['position', 'color', 'shape'];
        this.entities = {};
    }

    add( entity ) {
        this.entities[entity.id] = entity;
    }

    remove( entity ) {
        delete this.entities[entity.id];
    }

    update() {
        for( const entity of Object.values(this.entities) ) { 
            
        }
    }
}

class KeyboardSystem {
    constructor() {
        this.requiredComponents = ['keyboard'];
        this.entities = {};
        this.keys = {};

        addEventListener('keydown', function(e) {
            this.keys[e.key] = true;
        }.bind(this)) 

        addEventListener('keyup', function(e) {
            this.keys[e.key] = false;
        }.bind(this))
    }

    add( entity ) {
        this.entities[entity.id] = entity;
    }

    remove( entity ) {}

    update() {
        for( const entity of Object.values(this.entities) ) {

            const x = this.keys['d'] - this.keys['a'];
            const y = this.keys['s'] - this.keys['w'];

            entity.direction = { x, y };
        }
    }
}