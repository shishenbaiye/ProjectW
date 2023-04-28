import { Client } from "colyseus.js";

export class CreateLink {
    static client: Client;
    static room: any;
    static createLink() {
        this.client = new Client('ws://localhost:2567');  
    }

    static async joinRoom() {
        this.room = await this.client.joinOrCreate('four_player_room');
    }
}