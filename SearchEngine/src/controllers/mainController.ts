import {Request, Response} from 'express'
import News from '../models/News';

export const home = (req: Request, res:Response) =>{
    res.render('pages/home');
}

export const search = async (req:Request, res:Response)=>{

    let query: string = req.query.q as string;
    let kwords: string[] = query.split(' ') as string[];
    let newsList;

    if(query){

        kwords = clearWords(kwords);
        newsList = await News.find({
            keywords: { $all: kwords}
        }).skip(0).limit(10);
    }

    res.render('pages/result', {query, newsList});
}


function clearWords(words : string[]){
    let newWords: string[] = [];

    for(let i = 0; i < words.length; i++){

        let newWord : string = '';
        let invalidChar = new Set([',', ':', '.', ';', "!", "?", "@", "#", "$", "%", "¨", "&", "*", "(", ")", "-", "_", "+", "=", "/", "'", "|", "<", ">"]);

        for(let j = 0; j < words[i].length; j++){
            if(invalidChar.has(words[i][j]) == false){
                newWord += words[i][j]
            }
        }
        newWords.push(newWord);
    }

    return newWords;
}