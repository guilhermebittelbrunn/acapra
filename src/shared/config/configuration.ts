export default () => ({
  isTest: process.env.NODE_ENV === 'test',
  isProduction: process.env.NODE_ENV === 'production',
  isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    databaseName: process.env.POSTGRES_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  s3: {
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
    assetsBucket: process.env.AWS_S3_ASSETS_BUCKET,
  },
  crypto: {
    key: process.env.CRYPTO_KEY,
  },
  zoop: {
    apiKey: process.env.ZOOP_API_KEY,
    marketplaceId: process.env.ZOOP_MARKETPLACE_ID,
    baseUrl: process.env.ZOOP_BASE_URL,
    sellerId: process.env.ZOOP_SELLER_ID,
    webhookSecret: process.env.ZOOP_WEBHOOK_URL,
  },
});
