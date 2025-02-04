import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const SERVERS = {
  hyderabad: 'node1.sear.host',
  singapore: 'node5.sear.host',
  pennsylvania: 'node6.sear.host'
};

export async function GET() {
  try {
    const results: Record<string, number> = {};
    
    for (const [location, host] of Object.entries(SERVERS)) {
      try {
        // Use different ping command based on platform
        const cmd = process.platform === 'win32' 
          ? `ping -n 1 ${host}`
          : `ping -c 1 ${host}`;
          
        const { stdout } = await execAsync(cmd);
        
        // Extract time from ping output
        const match = stdout.match(/time[=<]([\d.]+)/i);
        if (match) {
          results[location] = Math.round(parseFloat(match[1]));
        } else {
          results[location] = -1; // Error value
        }
      } catch {
        results[location] = -1; // Error value
      }
    }

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: 'Failed to ping servers' },
      { status: 500 }
    );
  }
}