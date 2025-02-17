import type { MCPServer } from '../types/server';
import fs from 'fs';
import path from 'path';

export async function fetchMCPServers(): Promise<MCPServer[]> {
  try {
    // Load servers.json from static directory
    const serversPath = path.join(process.cwd(), 'static', 'servers.json');
    const data = JSON.parse(fs.readFileSync(serversPath, 'utf8'));
    return data;
  } catch (error) {
    console.error("Error fetching MCP servers:", error);
    throw error;
  }
}