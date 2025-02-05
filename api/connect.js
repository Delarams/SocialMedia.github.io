import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7507",
    database: "social"
});

// Test the connection
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Database connected successfully!");
    }
});
