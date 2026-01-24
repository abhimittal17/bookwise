import dotenv from 'dotenv';
import z from 'zod';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

const envSchema = z.object({
    API_PORT: z
        .string()
        .default('8080')
        .transform((val) => parseInt(val, 10)),
    API_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    API_JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
    API_REDIS_URL: z.url('Invalid Redis URL'),
    API_WEB_URL: z.string().min(1),
});

function parseEnv() {
    try {
        return envSchema.parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error(err.flatten().fieldErrors);
        }
        process.exit(1);
    }
}

export const env = parseEnv();
export const isDevelopment = () => env.API_NODE_ENV === 'development';
export const isProduction = () => env.API_NODE_ENV === 'production';
