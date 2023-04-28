import { Room } from 'colyseus';

class Player {
    id: string;
    x: number;
    y: number;
    scale: number;
    constructor(id: string) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
    }
}

export class FourPlayerRoom extends Room {

    private players: Map<string, Player> = new Map();
    onCreate(options: any) {
        // Set the maximum number of clients for this room
        this.maxClients = 4;
        // Listen for player movement events
        this.onMessage('player_movement', (client, message:{x:number,y:number,scale:number}) => {
            let player = this.players.get(client.sessionId);
            if(!player) return;
            player.x = message.x;
            player.y = message.y;
            player.scale = message.scale;
            // Broadcast the updated player position to all clients except the sender
            this.broadcast('player_position', { id: player.id, x: player.x, y: player.y , scale: player.scale}, { except: client });
        });

        this.onMessage(`sync_player`, (client) => {
            this.send(client, 'sync_player', Array.from(this.players.keys()))
        });
    }

    onJoin(client: any, options: any) {
        console.log(client.sessionId, 'joined the room', client.id);
        if (!this.players.has(client.sessionId)) {
            const player = new Player(client.sessionId);
            this.players.set(client.sessionId, player);
            this.broadcast('player_join', client.sessionId );
        }
    }

    onLeave(client: any, consented: boolean) {
        console.log(client.sessionId, 'left the room', client.id);
        this.players.delete(client.sessionId);
        this.broadcast('player_leave', client.sessionId );
    }

    onDispose() {
        console.log('Room is disposed');
    }
}
