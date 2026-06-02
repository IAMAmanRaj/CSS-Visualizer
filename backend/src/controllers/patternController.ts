import { Request, Response } from 'express';
import Pattern from '../models/Pattern';

// Get all patterns
export const getAllPatterns = async (req: Request, res: Response): Promise<void> => {
  try {
    const patterns = await Pattern.find().sort({ createdAt: -1 });
    res.status(200).json(patterns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patterns', error });
  }
};

// Get patterns by type
export const getPatternsByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.params.type as string;
    if (!['flexbox', 'grid', 'custom'].includes(type)) {
      res.status(400).json({ message: 'Invalid pattern type' });
      return;
    }
    const patterns = await Pattern.find({ type }).sort({ createdAt: -1 });
    res.status(200).json(patterns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patterns', error });
  }
};

// Get single pattern by ID
export const getPatternById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const pattern = await Pattern.findById(id);
    if (!pattern) {
      res.status(404).json({ message: 'Pattern not found' });
      return;
    }
    res.status(200).json(pattern);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pattern', error });
  }
};

// Create new pattern
export const createPattern = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, css, html, description } = req.body;
    
    if (!name || !type || !css || !html) {
      res.status(400).json({ message: 'Name, type, CSS, and HTML are required' });
      return;
    }

    const pattern = new Pattern({
      name,
      type,
      css,
      html,
      description,
    });

    const savedPattern = await pattern.save();
    res.status(201).json(savedPattern);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pattern', error });
  }
};

// Update pattern
export const updatePattern = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { name, type, css, html, description } = req.body;

    const pattern = await Pattern.findByIdAndUpdate(
      id,
      { name, type, css, html, description },
      { new: true, runValidators: true }
    );

    if (!pattern) {
      res.status(404).json({ message: 'Pattern not found' });
      return;
    }

    res.status(200).json(pattern);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pattern', error });
  }
};

// Delete pattern
export const deletePattern = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const pattern = await Pattern.findByIdAndDelete(id);

    if (!pattern) {
      res.status(404).json({ message: 'Pattern not found' });
      return;
    }

    res.status(200).json({ message: 'Pattern deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pattern', error });
  }
};
