import axios from 'axios';
import type { Pattern } from '../types';

const API_URL = '/api/patterns';

export const patternsApi = {
  // Get all patterns
  getAll: async (): Promise<Pattern[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get patterns by type
  getByType: async (type: string): Promise<Pattern[]> => {
    const response = await axios.get(`${API_URL}/type/${type}`);
    return response.data;
  },

  // Get a single pattern by ID
  getById: async (id: string): Promise<Pattern> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create a new pattern
  create: async (pattern: Omit<Pattern, '_id'>): Promise<Pattern> => {
    const response = await axios.post(API_URL, pattern);
    return response.data;
  },

  // Update a pattern
  update: async (id: string, pattern: Partial<Pattern>): Promise<Pattern> => {
    const response = await axios.put(`${API_URL}/${id}`, pattern);
    return response.data;
  },

  // Delete a pattern
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
