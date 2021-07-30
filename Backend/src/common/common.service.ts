import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import {
  StorageSharedKeyCredential,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  BlobUploadCommonResponse,
} from '@azure/storage-blob';

import * as config from 'config';
const sendGridConfig = config.get('sendgrid');
const storageConfig = config.get('storage');
const account = process.env.AZURE_STORAGE_ACCOUNT || storageConfig.account;
const accountKey = process.env.AZURE_STORAGE_KEY || storageConfig.accountKey;
const containerName =
  process.env.AZURE_CONTAINER_NAME || storageConfig.containerName;

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail({
    from,
    to,
    subject,
    text,
    html,
    templateId,
    dynamic_template_data,
    categories,
    cb,
  }: SendEmailDto): Promise<any> {
    try {
      const content = [];

      if (html) {
        content.push({
          type: 'text/html',
          value: html || '!',
        });
      }

      if (text) {
        content.push({
          type: 'text/plain',
          value: text || '!',
        });
      }

      let sendGridObject = {
        personalizations: [
          {
            to,
            subject: subject || '!',
            dynamic_template_data,
          },
        ],
        from: {
          email: from || sendGridConfig.defaultSender,
        },
        categories,
        template_id: templateId,
      };

      if (content.length) {
        sendGridObject['content'] = content;
      }

      return this.httpService
        .post(
          process.env.SENDMAIL_URL || sendGridConfig.sendGridUrl,
          JSON.stringify(sendGridObject),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.SENDGRID_APIKEY ||
                sendGridConfig.apiKey}`,
            },
          },
        )
        .toPromise()
        .then(response => {
          return response;
        });
    } catch (error) {
      console.error('CommonService -> constructor -> error', error);
      return error;
    } finally {
      cb && cb();
    }
  }

  async uploadFromB64(
    data: string,
    filename: string,
    path: string,
  ): Promise<string> {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey,
    );

    const blobServiceClient: BlobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );

    const containerClient: ContainerClient = blobServiceClient.getContainerClient(
      containerName,
    );

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(
      `${path}/${filename}`,
    );

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches) throw new BadRequestException(`sdasdadasdsadasdas`);

    const buffer = Buffer.from(matches[2], 'base64');

    const uploadBlobResponse: BlobUploadCommonResponse = await blockBlobClient.upload(
      buffer,
      buffer.byteLength,
    );

    if (uploadBlobResponse.requestId)
      return decodeURIComponent(blockBlobClient.url);
  }
}
