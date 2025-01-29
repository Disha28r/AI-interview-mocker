/** @type (import("drizzle-kit").Config) */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:OXErMR65jsaJ@ep-soft-lake-a80c2a1u.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require'
    },
}