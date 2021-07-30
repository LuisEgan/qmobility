import * as FileType from 'file-type';
import { GraphQLError, GraphQLScalarType } from 'graphql';
import { FileUpload } from 'graphql-upload';

export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  async parseValue(value: Promise<FileUpload>): Promise<FileUpload> {
    const upload = await value;
    const stream = upload.createReadStream();
    const fileType = await FileType.fromStream(stream);

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError('Mime type does not match file content.');

    return upload;
  },
  parseLiteral(ast): void {
    throw new GraphQLError('Upload literal unsupported.', ast);
  },
  serialize(): void {
    throw new GraphQLError('Upload serialization unsupported.');
  },
});
