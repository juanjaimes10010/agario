class Game {

    constructor() {
        this.entities = {};
        this.systems = {};


        this.addSystem( new RenderSystem() );
        this.addSystem( new KeyboardSystem() );
        // this.addSystem( new )
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
        this.width = innerWidth;
        this.height = innerHeight;
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

    isWithinBounds( entity ) {
        switch ( entity.shape ) {
            case 'circle':
                return this.isCircleWithinBounds( entity );
            case 'rectangle':
                return this.isRectWithinBounds( entity );
            case 'polygon':
                return this.isPolygonWithinBounds( entity );
            default:
                return false;
        }
    } 

    isCircleWithinBounds( entity ) {
        if( entity.position.x + entity.radius < 0 ) return;
        if( entity.position.x - entity.radius > this.width ) return;
        if( entity.position.y + entity.radius > this.height ) return;
        if( entity.position.y - entity.radius < 0) return;
    }
    isRectWithinBounds( entity ) {}
    isPolygonWithinBounds( entity ) {}

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

