import { Router } from 'express';
import {
  getAllPatterns,
  getPatternsByType,
  getPatternById,
  createPattern,
  updatePattern,
  deletePattern,
} from '../controllers/patternController';

const router = Router();

// GET all patterns
router.get('/', getAllPatterns);

// GET patterns by type
router.get('/type/:type', getPatternsByType);

// GET single pattern by ID
router.get('/:id', getPatternById);

// POST create new pattern
router.post('/', createPattern);

// PUT update pattern
router.put('/:id', updatePattern);

// DELETE pattern
router.delete('/:id', deletePattern);

export default router;
