import express from 'express'
import {router as CreateUserRouter} from './domain/user-management';
import { router as UserStatsRouter } from './domain/user-stats';

/**
 * Settings
 */
export const app = express()

// prep json
app.use(express.json())
app.use('/pessoas', CreateUserRouter)
app.use('/contagem-pessoas', UserStatsRouter)