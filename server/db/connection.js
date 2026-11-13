const fs = require('fs');
const path = require('path');

const dbPath = process.env.VERCEL
  ? path.join('/tmp', 'clinic.db')
  : path.join(__dirname, 'clinic.db');
let dbInstance = null;
let dbType = 'none';

function initDatabase() {
  if (dbInstance) return dbInstance;

  // Attempt 1: Node.js built-in node:sqlite (Node 22+)
  try {
    const { DatabaseSync } = require('node:sqlite');
    const db = new DatabaseSync(dbPath);
    dbType = 'node:sqlite';
    console.log('✅ SQLite database connected via native node:sqlite');

    dbInstance = {
      type: dbType,
      exec: (sql) => db.exec(sql),
      queryAll: (sql, params = []) => {
        const stmt = db.prepare(sql);
        return stmt.all(...params);
      },
      queryOne: (sql, params = []) => {
        const stmt = db.prepare(sql);
        const results = stmt.all(...params);
        return results[0] || null;
      },
      run: (sql, params = []) => {
        const stmt = db.prepare(sql);
        const result = stmt.run(...params);
        return {
          lastInsertRowid: result?.lastInsertRowid || null,
          changes: result?.changes || 0,
        };
      },
    };
  } catch (err1) {
    // Attempt 2: better-sqlite3
    try {
      const Database = require('better-sqlite3');
      const db = new Database(dbPath);
      dbType = 'better-sqlite3';
      console.log('✅ SQLite database connected via better-sqlite3');

      dbInstance = {
        type: dbType,
        exec: (sql) => db.exec(sql),
        queryAll: (sql, params = []) => db.prepare(sql).all(params),
        queryOne: (sql, params = []) => db.prepare(sql).get(params) || null,
        run: (sql, params = []) => db.prepare(sql).run(params),
      };
    } catch (err2) {
      console.error('Failed to initialize SQLite driver:', err1, err2);
      throw new Error('No compatible SQLite driver found.');
    }
  }

  // Auto-run schema and seed if tables do not exist
  ensureTablesAndSeed(dbInstance);

  return dbInstance;
}

function ensureTablesAndSeed(db) {
  try {
    const checkTable = db.queryOne(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='doctors'"
    );

    if (!checkTable) {
      console.log('📦 Initializing database tables and seed data...');
      const schemaPath = path.join(__dirname, '..', 'schema.sql');
      const seedPath = path.join(__dirname, '..', 'seed.sql');

      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schemaSql);
        console.log('✅ Schema executed successfully.');
      }

      if (fs.existsSync(seedPath)) {
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        db.exec(seedSql);
        console.log('✅ Seed data inserted successfully.');
      }
    } else {
      console.log('ℹ️ Database tables already exist. Skipping initial seed.');
    }
  } catch (err) {
    console.error('Error ensuring schema/seed:', err);
  }
}

module.exports = {
  getDb: initDatabase,
};
