import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://budgets_owner:npg_vWDCsozm09qe@ep-solitary-paper-a5rhtkic-pooler.us-east-2.aws.neon.tech/budgets?sslmode=require')
const db = drizzle(sql,{schema});