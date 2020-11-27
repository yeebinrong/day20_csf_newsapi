import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { countryList } from './model';

@Injectable()
export class StorageDataBase extends Dexie {
    private db: Dexie.Table<Object[] , string>;
    private api: Dexie.Table<string, string>
    constructor () {
        // database name
        super('news');

        // setup schema for v1
        this.version(1).stores({
            // index id and q
            db: '++id, country',
            api: 'id, api'
        });

        // get a reference to the db collection
        this.db = this.table("db");

        
    }
        async addAPI (api:string):Promise<any> {
            return this.api.add(api);
        }

        async getAPI ():Promise<string> {
            return ('api');
        }

        async addList (d):Promise<any> {
            console.info("list >> " , d as countryList[]);
            return await this.db.put(d as countryList[]);
        }

    // async addSearch(d: string):Promise<any> {
    //     const gen = d.genre 
    //     d.q = normalizeQ(d.q);
    //     // select count(*) from db where q like 'q' and genre == 'genre'
    //     const resultsCount = await this.db
    //         .where('q').equals(d.q)
    //         .and(doc => doc.genre == gen)
    //         .count()
    //     if (resultsCount > 0) {
    //         // dont add if entry already exists
    //         return
    //     }
        // return this.db.add(d);

    // getSearch():Promise<SearchForm[]> {
    //     return this.db.toArray()
    // }
}