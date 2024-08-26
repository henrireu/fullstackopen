import express from 'express';
import diagnosyService from '../services/diagnosyService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosyService.getEntries());
});

export default router;