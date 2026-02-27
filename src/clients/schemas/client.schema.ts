import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  document: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

import { Types } from 'mongoose';

ClientSchema.set('toJSON', {
  transform: (
    _: unknown,
    ret: { _id: Types.ObjectId } & Record<string, any>,
  ) => {
    const { _id, ...rest } = ret;

    return {
      id: _id.toString(),
      ...rest,
    };
  },
});
