import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:npg_Ndw1iQ9BKxTE@ep-nameless-hill-a5gy1ixy-pooler.us-east-2.aws.neon.tech/Expense%20Tracker?sslmode=require');
const db = drizzle(sql,{schema});

