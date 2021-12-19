import { getColumns } from "./columns";
import { buildFeed } from "./feedcontroller";
import { CryptoFeed, CryptoFeedDelta } from "../../../interface";
import { Feed } from "../../Ladder/interface";

const mockDataSet: CryptoFeed       = {"numLevels":25,"feed":"book_ui_1_snapshot","bids":[[47172.0,12500.0],[47167.5,20400.0],[47167.0,12500.0],[47164.5,5535.0],[47164.0,7501.0],[47163.0,5403.0],[47159.5,10000.0],[47158.5,15000.0],[47154.0,10099.0],[47153.5,13888.0],[47153.0,3600.0],[47148.0,3057.0],[47147.0,9429.0],[47142.5,2279.0],[47141.5,10000.0],[47140.5,29996.0],[47140.0,45000.0],[47139.5,40000.0],[47138.0,30016.0],[47137.5,20000.0],[47136.0,20009.0],[47135.5,84636.0],[47135.0,20000.0],[47131.0,112340.0],[47130.0,27230.0]],"asks":[[47186.0,3600.0],[47186.5,8636.0],[47189.0,1512.0],[47192.0,5000.0],[47193.0,7508.0],[47195.5,45000.0],[47198.0,29124.0],[47198.5,110751.0],[47199.5,70404.0],[47205.0,1.0],[47209.5,35210.0],[47210.0,19915.0],[47215.0,12500.0],[47216.5,15000.0],[47218.0,20000.0],[47218.5,14163.0],[47220.0,5434.0],[47220.5,150059.0],[47225.0,10000.0],[47226.5,13888.0],[47227.5,2490.0],[47239.0,60729.0],[47239.5,399999.0],[47240.0,150000.0],[47242.0,150000.0]],"product_id":"PI_XBTUSD"};
const mockDelta: CryptoFeedDelta    = {"feed":"book_ui_1","product_id":"PI_XBTUSD","bids":[[45300.0,630500.0],[45302.5,0.0],[46007.5,300000.0],[46010.0,0.0],[46621.0,150000.0],[46623.5,0.0],[46857.0,40000.0],[46859.5,0.0],[46940.0,0.0],[46951.5,40000.0],[46954.0,0.0],[46954.5,113943.0],[46987.0,9493.0],[47025.5,9493.0],[47063.5,3000.0],[47064.0,22375.0],[47068.5,0.0],[47080.5,0.0],[47098.0,150000.0],[47104.0,0.0],[47117.0,34078.0],[47121.5,150000.0],[47138.0,30016.0],[47140.0,45000.0],[47141.0,9429.0],[47142.5,0.0],[47145.5,10000.0],[47147.0,0.0],[47147.5,2194.0],[47148.0,3057.0],[47154.0,10099.0],[47159.0,0.0],[47164.5,5535.0],[47167.5,20400.0]],"asks":[[47189.0,1577.0],[47192.0,0.0],[47194.0,5000.0],[47226.5,23888.0],[47238.0,0.0],[47239.0,60729.0],[47246.0,1.0],[47259.5,141678.0],[47261.0,3000.0],[47286.5,7373.0],[47295.0,25279.0],[47341.5,0.0],[47424.0,40000.0],[47429.5,0.0],[47518.5,40000.0],[47524.0,0.0],[47754.5,300000.0],[47760.0,20000.0],[48368.0,700000.0],[48373.5,0.0],[49075.5,1500000.0],[49081.0,0.0]]};

describe("Testing Column creation", () => { 
    it("should return bids column", () => { 
        //setup
        //execute
        const results = getColumns("bids");

        //verify
        expect(results[0].field === "size").toBe(true);
    });

    it("Should return asks column", () => { 
        //setup
        //execute
        const results = getColumns("asks");
        
        //verify
        expect(results[0].field === "price").toBe(true);
    })
});

describe("Testing feed controller edge cases", () => { 
  
    it("Should not throw if dataset is empty ", () => {
        
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids", dataset = undefined, delta = {};

        //verify
        expect(() => buildFeed(tickSize, feedType, feed, dataset, delta)).not.toThrow();
    });

    it("Should return an empty array", () => {
        
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids", dataset = undefined, delta = {};

        //verify
        expect(buildFeed(tickSize, feedType, feed, dataset, delta)).toEqual([]);
    });   
});

describe( "Returning datasets", () => { 
    it("should return the initial dataset if there is no delta yet", () => { 
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids", delta = undefined;

        //verify - Expecte 25 items in the array
        expect(buildFeed(tickSize, feedType, feed, mockDataSet, delta).length).toBe(25);  
    });
    
    it("Should add a price if it does not exist", () => { 
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids";

        //One new update to bids
        const delta: CryptoFeedDelta = {"feed":"book_ui_1","product_id":"PI_XBTUSD","bids":[[80000.0,1231]],"asks":[]};
        const results = buildFeed(tickSize, feedType, feed, mockDataSet, delta);
        
        //execute
        //verify
        expect(results.length).toBe(26);  
    });

    it("Should update an existing price if the size is greater then 1", () => { 
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids";

        //One new update to bids
        const delta: CryptoFeedDelta = {"feed":"book_ui_1","product_id":"PI_XBTUSD","bids":[[47172.0,1231]],"asks":[]};
        const results = buildFeed(tickSize, feedType, feed, mockDataSet, delta);
        
        //execute
        //verify
        expect(results.length).toBe(25);  
    });

  it("Should remove an existing price if the size is 0", () => { 
        //setup
        const feed: Array<Feed> = [];
        const tickSize = 0.5, feedType = "bids";

        //One new update to bids
        const delta: CryptoFeedDelta = {"feed":"book_ui_1","product_id":"PI_XBTUSD","bids":[[47172.0,0]],"asks":[]};
        const results = buildFeed(tickSize, feedType, feed, mockDataSet, delta);
        
        //execute
        //verify
        expect(results.length).toBe(24);
    });
    
    
});