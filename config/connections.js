
import { MongoClient as mongoClient } from 'mongodb'

const state = {
    db:null

}

export function connect(done){
     const url ="mongodb://localhost:27017/"
     const dbName="dbname"
     mongoClient.connect(url,(err,data)=>{
        if(err){
            return done(err);
        } 
        state.db=data.db(dbName)
        done()
     })
}

export function get(){
    return state.db
}