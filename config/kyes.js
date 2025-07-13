const { PORT,
    CONNECTION_URL,
    JWT_SECRET_KEY,
    EMAIL_USER,
    EMAIL_PASS,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET } = process.env;
module.exports = {
    port: PORT,
    connectionUrl: CONNECTION_URL,
    jwtSecretKey: JWT_SECRET_KEY,
    emailUser: EMAIL_USER,
    emailPassword: EMAIL_PASS,
    cloudinaryName: CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: CLOUDINARY_API_KEY,
    cloudinaryApiSecret: CLOUDINARY_API_SECRET
}