import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/mongoose';
import User from '@/models/User';
import Role from '@/models/Role';
import SiteSetting from '@/models/SiteSetting';

export async function seedInitialData() {
  const initialAdminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const initialAdminPassword = process.env.INITIAL_ADMIN_PASSWORD;
  if (!initialAdminEmail || !initialAdminPassword || initialAdminPassword.length < 12) {
    throw new Error('INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD (12+ characters) are required to seed data.');
  }

  await dbConnect();

  const passwordHash = await bcrypt.hash(initialAdminPassword, 12);

  const roles = [
    {
      key: 'super_admin',
      name: 'Super Admin',
      description: 'Platform owner with full access to configuration, users, content, and audit logs.',
      permissions: ['*'],
      builtIn: true
    },
    {
      key: 'admin',
      name: 'Admin',
      description: 'Chiefdom administration manager with broad content and campaign access.',
      permissions: ['content.create', 'content.edit', 'content.publish', 'events.manage', 'projects.manage', 'media.manage', 'contacts.manage'],
      builtIn: true
    },
    {
      key: 'editor',
      name: 'Editor',
      description: 'Content creator who can draft and submit material for review.',
      permissions: ['content.create', 'content.edit.draft', 'media.upload'],
      builtIn: true
    }
  ];

  for (const roleData of roles) {
    await Role.updateOne({ key: roleData.key }, { $set: roleData }, { upsert: true });
  }

  const adminResult = await User.updateOne(
    { email: initialAdminEmail.trim().toLowerCase() },
    {
      $setOnInsert: {
        name: 'Super Admin Anghal',
        role: 'super_admin',
        passwordHash,
        disabled: false,
        archived: false
      }
    },
    { upsert: true }
  );

  const settings = [
    { key: 'site.title', label: 'Site title', value: 'Chefferie des Anghal', group: 'branding' },
    { key: 'site.tagline', label: 'Hero tagline', value: 'Heritage • Unity • Development', group: 'branding' },
    { key: 'site.description', label: 'Site description', value: 'Plateforme officielle de la Chefferie des Anghal.', group: 'branding' },
    { key: 'site.contactEmail', label: 'Contact email', value: 'contact@anghal.example', group: 'contact' },
    { key: 'site.logo', label: 'Logo asset', value: '', group: 'branding', editable: true }
  ];

  for (const setting of settings) {
    await SiteSetting.updateOne({ key: setting.key }, { $set: setting }, { upsert: true });
  }

  return {
    adminCreated: adminResult.upsertedCount > 0,
    email: initialAdminEmail.trim().toLowerCase()
  };
}
