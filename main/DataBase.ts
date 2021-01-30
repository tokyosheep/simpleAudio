const electron = require("electron");
const { ipcMain } = require("electron");
const { dialog } = require("electron");
const app = electron.app;

import { PlayListType , Albumtype } from "../src/js/redux/reducer/musics";

const DataStore = require("nedb");

export type RecordType = {
    albums:Albumtype[],
    playList:PlayListType[]
}

export const initDataBaseEvent = () =>{
    const strage = (()=>{
        try{
            return `${app.getPath("appData")}/database`;
        }catch(e){
            console.log(e);
        }
    })();
    const db = new DataStore({
        filename:`${strage}/data.db`,
        autoload:true
    });
    console.log(strage);
    ipcMain.handle("loadAllData",(event:Event|undefined)=>{
        return new Promise((resolve,reject)=>{
            db.find({},(err:Error,data:RecordType)=>{
                if(err)reject(err);
                resolve(data);
            });
        });
    });

    ipcMain.handle("recoredAll",(event:Event|undefined,docs:Object)=>{
        return new Promise((resolve,reject)=>{
            db.remove({},{ multi: true },(err:Error)=>{
                if(err)reject(err);
                db.insert(docs,(err:Error,newDocs:RecordType)=>{
                    if(err)reject(err);
                    console.log(newDocs);
                    resolve(true);
                });
            });
        });
    });
}

/*
    {
        albums:[
            {
                musics:musicData[],
                name:string,
                path:string
            }
        ],
        playList:PlayListClass[
            currentMusicIndex:number,
            index:number,
            musics:music[],
            name:string,
            selected:boolean
        ]
    }
*/