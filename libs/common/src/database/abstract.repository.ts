import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true);
        if(!document){
            this.logger.warn('The document is not found with this filter query');
            throw new NotFoundException('document is not found with this filter query');
        }
        return document;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update).lean<TDocument>(true);
        if(!document){
            this.logger.warn('The document is not found with this filter query');
            throw new NotFoundException('document is not found with this filter query');
        }
        return document;
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
        if(!document){
            this.logger.warn('The document is not found with this filter query');
            throw new NotFoundException('document is not found with this filter query');
        }
        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return await this.model.find(filterQuery).lean<TDocument>(true);
    }
}