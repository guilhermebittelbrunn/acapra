import {
  S3Client,
  S3ClientConfig,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3StorageService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(S3StorageService.name);

  private client: S3Client;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const config = {
      region: this.config.getOrThrow('s3.region'),
      credentials: {
        accessKeyId: this.config.getOrThrow('s3.accessKeyId'),
        secretAccessKey: this.config.getOrThrow('s3.secretAccessKey'),
      },
    } satisfies S3ClientConfig;

    // if (!this.config.get('isTest')) {
    //   this.logger.log(
    //     `Connecting to S3 Storage with config ${JSON.stringify(config)}`,
    //   );
    // }

    this.client = new S3Client(config);

    this.logger.log('S3 Storage initialized!');
  }

  onModuleDestroy() {
    if (!this.config.get('isTest')) {
      this.logger.log(`Disconnecting from S3 Storage`);
    }

    this.client?.destroy();
  }

  async upload(input: PutObjectCommandInput) {
    const upload = new Upload({
      client: this.client,
      params: input,
    });

    const result = await upload.done();

    return result.Location;
  }

  async delete(input: DeleteObjectCommandInput) {
    const command = new DeleteObjectCommand(input);

    await this.client.send(command);
  }
}
