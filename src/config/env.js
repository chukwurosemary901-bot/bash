import dotenv from 'dotenv';
dotenv.config();

export const config={
    port: process.env.PORT,
    name: process.env.name,
    access: process.env.ACCESS_SECRET,
    refresh:process.env.REFRESH_SECRET
}