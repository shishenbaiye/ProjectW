import { Room } from 'colyseus';

export class FourPlayerRoom extends Room {
  onCreate(options: any) {
    // Set the maximum number of clients for this room
    this.maxClients = 4;
  }

  onJoin(client: any, options: any) {
    console.log(client.sessionId, 'joined the room',client.id);
  }

  onLeave(client: any, consented: boolean) {
    console.log(client.sessionId, 'left the room',client.id);
  }

  onDispose() {
    console.log('Room is disposed');
  }
}
