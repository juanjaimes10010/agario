class Game {

    constructor() {
        this.systemID = 0;
        this.entityID = 0;
        this.entities = {};
        this.systems = {};

        this.addSystem( new CollisionSystem() );
        this.addSystem( new RenderSystem() );
        this.addSystem( new KeyboardSystem() );
    }

    addSystem( system ) {
        this.systemID++;
        this.systems[this.systemID] = Object.assign({id: this.systemID}, system);
    }

    removeSystem( system ) {
        delete this.systems[system.id];
    }

    addEntitiy( entity ) {
        this.entityID++;
        this.entities[this.entityID] = Object.assign({id: this.entityID}, entity);
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

class RenderSystem {

    constructor() {
        this.requiredComponents = ['position', 'color', 'shape'];
        this.entities = {};
        this.width = innerWidth;
        this.height = innerHeight;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.orderedEntities = {};
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

    orderEntitiesBySize() {

    }

    draw( entity ) {
        switch ( entity.shape ) {
            case 'circle':
                return this.drawCircle( entity );
            case 'rectangle':
                return this.drawRectangle( entity );
            case 'polygon':
                return this.drawPolygon( entity );
            default:
                return false;
        }
    }

    drawCircle( entity ) {
        this.ctx.fillStyle = entity.color;
        this.ctx.beginPath();
        this.ctx.arc(entity.position.x, entity.position.y, entity.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawRectangle( entity ) {
        this.ctx.fillStyle = entity.color;
        this.ctx.fillRect( entity.position.x - entity.width /2, entity.position.y - entity.height / 2, entity.width / 2, entity.height / 2 );
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

class CollisionSystem {
    constructor() {
        this.requiredComponents = [];
        this.entities = {};
    }

    add( entity ) {
        this.entities[entity.id] = entity;
    }

    remove( entity ) {}

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



const player = {
    position: { x: 0, y: 0 },
    color: 'blue',
    keyboard: true,
    shape: 'circle'
}

const GAME = new Game();

GAME.addEntitiy( player );

GAME.start();