#!/usr/bin/env node
// portzap.js
import inquirer from 'inquirer';
import { exec } from 'child_process';
import util from 'util';
import Table from 'cli-table3';

const execPromise = util.promisify(exec);

const getProcessesUsingPort = async (port) => {
  try {
    const { stdout } = await execPromise(`netstat -ano | findstr :${port}`);
    const lines = stdout.trim().split('\n');
    const pids = [...new Set(lines.map(line => line.trim().split(/\s+/).pop()))];
    return await Promise.all(pids.map(async pid => {
      try {
        const { stdout: tasklistOut } = await execPromise(`tasklist /FI "PID eq ${pid}" /FO LIST`);
        const details = tasklistOut.split('\n').reduce((acc, line) => {
          const [key, val] = line.split(':');
          if (key && val) acc[key.trim()] = val.trim();
          return acc;
        }, {});
        return {
          pid,
          name: details['Image Name'] || 'Unknown',
          session: details['Session Name'] || '-',
          memUsage: details['Mem Usage'] || '-',
        };
      } catch {
        return { pid, name: 'Unknown', session: '-', memUsage: '-' };
      }
    }));
  } catch {
    return [];
  }
};

const killProcess = async (pid) => {
  try {
    await execPromise(`taskkill /PID ${pid} /F`);
    console.log(`✅ Process ${pid} killed.`);
  } catch (error) {
    console.error(`❌ Failed to kill process ${pid}.`, error.message);
  }
};

const main = async () => {
  console.log('⚡ Welcome to PortZap! Let\'s reclaim your port. ⚡\n');
  const { port } = await inquirer.prompt([
    {
      type: 'input',
      name: 'port',
      message: 'Enter the port number to scan:',
      validate: val => /^\d+$/.test(val) || 'Please enter a valid port number.'
    }
  ]);

  const processes = await getProcessesUsingPort(port);

  if (processes.length === 0) {
    console.log(`✅ No processes found using port ${port}.`);
    return;
  }

  const table = new Table({ head: ['PID', 'Name', 'Session', 'Memory Usage'] });
  processes.forEach(p => table.push([p.pid, p.name, p.session, p.memUsage]));
  console.log('\nProcesses using port ' + port + ':\n');
  console.log(table.toString());

  const { toKill } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'toKill',
      message: 'Select processes to terminate:',
      choices: processes.map(p => ({ name: `${p.name} (PID ${p.pid})`, value: p.pid }))
    }
  ]);

  for (const pid of toKill) {
    await killProcess(pid);
  }

  console.log('\n✨ Done. Port should be free now.');
};

main();
