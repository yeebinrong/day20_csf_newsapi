import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Article, ArticleArray, countryArray } from './model';

@Injectable()
export class StorageDataBase extends Dexie {
    private db: Dexie.Table<countryArray , string>;
    private api: Dexie.Table<string, string>
    private article: Dexie.Table<ArticleArray, string>
    constructor () {
        // database name
        super('news');

        // setup schema for v1
        this.version(1).stores({
            // index id and q
            db: 'id',
            api: 'id',
            article: 'code'
        });

        // get a reference to the db collection
        this.db = this.table("db");        
    }
        addAPI (api:string):Promise<any> {
            return this.api.put(api);
        }

        getAPI ():Promise<string> {
            return this.api.get('apikey')
        }

        async addList (d:countryArray):Promise<any> {
            console.info("list >> " , d);
            const results = await this.db.get("1");
            if (results) {
                if (results.data.length > 0) {  
                    return Promise.resolve()
                }
            }
            console.info("putting", d)
            return await this.db.put(d);
        }

        async getList ():Promise<countryArray> {
            const results = await this.db.get("1");
            if (results) {
                if (results.data.length <= 0) {
                    console.info(results)
                    return Promise.reject()
                }
            }
            return await this.db.get('1')
        }

        async addArticle (d:Article[], code:string):Promise<any> {
            const results = await this.db.where('code').equals(code)

            // if (results) {
            //     if (results.data.length <= 0) {
            //         console.info(results)
            //         return Promise.reject()
            //     }
            // }
            let articleArray:ArticleArray = {
                code: code,
                articles: d
            }
            this.article.put(articleArray);
        }

        async getArticle (code:string):Promise<ArticleArray> {
            return await this.article.get(code);
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