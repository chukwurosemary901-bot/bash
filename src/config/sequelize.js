import { Sequelize } from 'sequelize';
import { config } from './env.js';

export const sequelize = new Sequelize('node', 'postgres', '669900', {
  host: 'localhost',
  dialect: 'postgres' 
});