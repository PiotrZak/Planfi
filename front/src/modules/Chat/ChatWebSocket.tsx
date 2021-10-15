import { HubConnection, TransportType, ConsoleLogger, LogLevel } from '@aspnet/signalr-client';

class ChatWebsocketService {
    private _connection: HubConnection;

    constructor() {
        var transport = TransportType.WebSockets;
        let logger = new ConsoleLogger(LogLevel.Information);

        // create Connection
        this._connection = new HubConnection(`http://${document.location.host}/chat`,
            { transport: transport, logging: logger });
        
        // start connection
        this._connection.start().catch((err: any) => console.error(err, 'red'));
    }

    // more methods here ...
   
}

const WebsocketService = new ChatWebsocketService();

export default WebsocketService;
