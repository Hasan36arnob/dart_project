const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

console.log('🔍 Checking SQLite database at:', dbPath);

// Check if database file exists
const fs = require('fs');
if (!fs.existsSync(dbPath)) {
    console.log('❌ Database file does not exist yet');
    process.exit(0);
}

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database');
    
    // Check if todos table exists
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error('❌ Error checking tables:', err.message);
            return;
        }
        
        console.log('\n📋 Tables in database:');
        tables.forEach(table => {
            console.log(`  - ${table.name}`);
        });
        
        // Check if todos table exists
        const todosTable = tables.find(t => t.name === 'todo');
        if (todosTable) {
            // Get all data from todos table
            db.all("SELECT * FROM todo", (err, rows) => {
                if (err) {
                    console.error('❌ Error reading todos:', err.message);
                    return;
                }
                
                console.log('\n📊 Data in todo table:');
                if (rows.length === 0) {
                    console.log('  No data yet - the table is empty');
                } else {
                    rows.forEach(row => {
                        console.log(`  - ID: ${row.id}, Title: '${row.title}', Completed: ${row.completed}, Created: ${row.createdAt}`);
                    });
                    console.log(`\n📈 Total records: ${rows.length}`);
                }
                
                // Close the database
                db.close((err) => {
                    if (err) {
                        console.error('❌ Error closing database:', err.message);
                    } else {
                        console.log('✅ Database connection closed');
                    }
                });
            });
        } else {
            console.log('\n❌ Todo table does not exist yet');
            db.close();
        }
    });
});