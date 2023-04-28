import { Client, Room } from "colyseus.js";
import { Singleton } from "../tools/ExtendTypeTool";
import { Player } from "../classes/Player";
import { Character } from "../classes/Charater";


export class CreateLink {
    static client: Client;
    static room: Room;
    static createLink() {
        this.client = new Client('ws://localhost:2567');  
    }

    static async joinRoom() {
        this.room = await this.client.joinOrCreate('four_player_room');
        this.room.send(`sync_player`);
        this.room.onMessage(`sync_player`,(playerids:string[])=>{
            playerids.forEach((playerid)=>{
                if(playerid == this.room.sessionId){
                    return;
                }
                PlayerManager.getInstance().addPlayer(playerid);
            })
        })
        this.room.onMessage(`player_join`,(playerid:string)=>{         
            if(playerid == this.room.sessionId){
                PlayerManager.getInstance().addPlayer(playerid,true);
                return;
            }
            PlayerManager.getInstance().addPlayer(playerid);
        })
        this.room.onMessage(`player_leave`,(playerid:string)=>{
            PlayerManager.getInstance().removePlayer(playerid);
        })
        this.room.onMessage(`player_position`,(data:{ id: string, x: number, y: number , scale:number}) => {
            PlayerManager.getInstance().syncPlayerPosition(data.id,data.x,data.y,data.scale);
        })


        this.room.onMessage('Server_listener', (message) => {

        });
    }
}

export class PlayerManager extends Singleton{
    private curScene: Phaser.Scene;
    private curPlayer: Player;
    private AllPlayerMap:Map<string,Character> = new Map<string,Character>();
    private physicsGroup:Phaser.Physics.Arcade.Group;
    public init(scene:Phaser.Scene){
        this.curScene = scene;
        this.physicsGroup = this.curScene.physics.add.group();
    }

    public addPlayer(playerid:string,isOwn:boolean = false){
        if(this.AllPlayerMap.has(playerid)){
            return;
        }else{
            let player:Character= null;
            if(isOwn){
                this.curPlayer = new Player(this.curScene,0,0,'ownPlayer');
                player = this.curPlayer.character;
            }else{
                player = new Character(this.curScene,0,0,'otherPlayer');
            }
            this.physicsGroup.add(player);
            this.AllPlayerMap.set(playerid,player);
        }
    }
    
    public removePlayer(playerid:string){
        if(this.AllPlayerMap.has(playerid)){
            let player = this.AllPlayerMap.get(playerid)!;
            player.destroy();
            this.AllPlayerMap.delete(playerid);
        }
    }

    public getPlayer(playerid:string){

    }

    public getAllPlayer(){

    }

    public syncPlayerPosition(playerid:string,x:number,y:number,scale:number){
        if(this.AllPlayerMap.has(playerid)){
            let player:Character = this.AllPlayerMap.get(playerid)!;
            player.x = x;
            player.y = y;
            player.scaleX = scale;
        }
    }

    public update(){
        if(this.curPlayer){
            this.curPlayer.update();
        }     
    }
}