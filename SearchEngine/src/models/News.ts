import {Schema, Model, model, connection} from 'mongoose'

type NewsType = {
    link: string,
    description: string,
    keywords: [string],
    title: string
};

const schema = new Schema<NewsType>({
    link: {type: String},
    description: {type: String},
    keywords:[String],
    title: {type: String}
});

const modelName :string = 'News';

const newsModel = connection && connection.models[modelName]?(connection.models[modelName] as Model<NewsType>): model<NewsType>(modelName, schema);

export default newsModel;
