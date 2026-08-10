import { randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const configuredEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.INITIAL_ADMIN_PASSWORD;
  const generatedPassword = configuredPassword ?? randomBytes(18).toString('base64url');

  process.env.INITIAL_ADMIN_EMAIL = configuredEmail || 'admin@anghal.local';
  process.env.INITIAL_ADMIN_PASSWORD = generatedPassword;

  try {
    const { seedInitialData } = await import('./seed');
    const result = await seedInitialData();

    if (result.adminCreated) {
      console.log('Initial administrator created successfully.');
      console.log(`Email: ${result.email}`);
      console.log(`Password: ${generatedPassword}`);
      console.log('Store this password securely; it will not be shown again.');
    } else {
      console.log(`Administrator ${result.email} already exists; its password was not changed.`);
    }
  } catch (error) {
    console.error('Unable to seed the initial administrator.', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void main();
