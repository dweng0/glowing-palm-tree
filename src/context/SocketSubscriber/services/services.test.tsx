import {messageFilter} from "./messagefilter";
import {getSocket} from "./socketfetcher";
import { bufferWriter } from "./buffer";

describe("buffer",()=> {
    const mockString = JSON.stringify({test:true, best: true});

    it("Should add data to the buffer", async () => { 
         //setup
         const filteredFlush = jest.fn();
         const { add } = bufferWriter(filteredFlush, 700);
         add(mockString);
         add(mockString);
         
         await new Promise((r) => setTimeout(r, 2000));
 
         //verify
         expect(filteredFlush).toHaveBeenCalled();
    });

    it("should throw if message can't be parsed", () => { 
           //setup
           //execute
           const { add } = bufferWriter(() =>{}, 700);
           const unparseable = "{isTest:...}";
           const malformed = () => add(unparseable);

           //verify
            expect(malformed).toThrowError("Failed to parse the last message, was it a string?");
    });

    it("should throw if message is empty", () => { 
        //setup
        //execute
        const { add } = bufferWriter(() =>{}, 700);
        
        //verify
        expect(add).toThrowError("socket message was empty!");
    });

    it("should allow caller to clear", async () => {
        //setup
        let data = [];
        const flushing = (bufferData) => data = bufferData;
        const { add, clear } = bufferWriter(flushing, 700);
        add(mockString);
        add(mockString);
        
        await new Promise((r) => setTimeout(r, 2000));

        //execute
        clear();

        //verify
        expect(data.length).toBe(0);
    });

    it("should allow user to flush", async () => { 
          //setup
          const flushing = jest.fn(); 

          //execute
          const { add, flush} = bufferWriter(flushing, 3000);
          add(mockString);
          add(mockString);
          expect(flushing).not.toHaveBeenCalled();          
          flush();
  
          //verify
          expect(flushing).toHaveBeenCalled();

    });
});

describe("buffermessagefilter tests", () => { 

    it("should not call any filters if there is no buffer data", () => {
        //setup
        const initial = jest.fn();
        const delta = jest.fn();
        const {filter} = messageFilter(initial, delta);
        
        //execute
        filter();

        //verify
        expect(initial).not.toHaveBeenCalled();
        expect(delta).not.toHaveBeenCalled()
    });

    it("should not filter the data on if the provided data is empty", () => {
        //setup
        const initial = jest.fn();
        const delta = jest.fn();
        const {filter} = messageFilter(initial, delta);
        
        //execute
        filter([]);

        //verify
        expect(initial).not.toHaveBeenCalled();
        expect(delta).not.toHaveBeenCalled();
    });

    it("should call the initialData writer if the provided data matches an initial state", () => {
         //setup
         const initial = jest.fn();
         const delta = jest.fn();
         const {filter} = messageFilter(initial, delta);
         
         //execute
         filter([{numLevels: 25}]);
 
         //verify
         expect(initial).toHaveBeenCalled();
         expect(delta).not.toHaveBeenCalled();
    });

    it("should call the delta writer if the data matches a delta message and there are bids and asks", () => {
        //setup
        const initial = jest.fn();
        const delta = jest.fn();
        const {filter} = messageFilter(initial, delta);
        const mockData = [{bids:[1,2,3], asks:[1,2,3]}];
        //execute
        filter(mockData);

        //verify
        expect(initial).not.toHaveBeenCalled();
        expect(delta).toHaveBeenCalled();
    });

    it("should call the delta writer if the data matches a delta message and there are onlyi bids", () => {
        //setup
        const initial = jest.fn();
        const delta = jest.fn();
        const {filter} = messageFilter(initial, delta);
        const mockData = [{bids:[1,2,3]}];
        //execute
        filter(mockData);

        //verify
        expect(initial).not.toHaveBeenCalled();
        expect(delta).toHaveBeenCalled();
    });

    it("should call the delta writer if the data matches a delta message and there are onlyi asks", () => {
        //setup
        const initial = jest.fn();
        const delta = jest.fn();
        const {filter} = messageFilter(initial, delta);
        const mockData = [{asks:[1,2,3]}];
        //execute
        filter(mockData);

        //verify
        expect(initial).not.toHaveBeenCalled();
        expect(delta).toHaveBeenCalled();
    });
});

describe("Socket Fetcher", () => { 
    jest.setTimeout(15000);

    it("should return the socket if there is one", () => { 
        //setup
        const socket = "thing";
        //execute
        getSocket(socket, 1).then((response) => expect(response).toEqual(socket));
        //verify
    });

    it("should make 2 attempt to get the socket", async () => { 
        
        const socket = undefined;
        let message
        try {
            await getSocket(socket, 2);
        } catch (e) {
            message = e;
        } finally {
            expect(message).toEqual("Failed to get websocket. Timeout Reached after 3 attempts");
        }
    });
});