import dotenv from 'dotenv';
import z from 'zod';

dotenv.config({ path: '../../.env' });

const envSchema = z.object({
    API_PORT: z
        .string()
        .default('8080')
        .transform((val) => parseInt(val, 10)),
    API_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    API_JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
    API_EMAIL_HOST: z.string().min(1, 'EMAIL_HOST is required'),
    API_EMAIL_PORT: z.coerce.number().min(1, 'EMAIL_PORT is required'),
    API_EMAIL_USER: z.string().min(1, 'EMAIL_USER is required'),
    API_EMAIL_PASS: z.string().min(1, 'EMAIL_PASS is required'),
    API_REDIS_URL: z.url('Invalid Redis URL'),
    API_WEB_URL: z.string().min(1),
});

function parseEnv() {
    try {
        return envSchema.parse(process.env);
    } catch {
        console.error('Environment validation failed:');
        process.exit(1);
    }
}

export const env = parseEnv();
export const isDevelopment = env.API_NODE_ENV === 'development';
export const isProduction = env.API_NODE_ENV === 'production';
