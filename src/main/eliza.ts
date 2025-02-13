import { app, BrowserWindow } from 'electron'
import { spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { join } from 'path'
import { readdirSync, lstatSync } from 'fs'

function getExistingAgents(): string[] {
  const appPath = app.getAppPath()
  const backendPath = join(appPath, 'src-eliza', 'agent', 'data', 'characters')
  const jsonFiles: string[] = []

  try {
    const files = readdirSync(backendPath) // Read all files and directories in the path

    files.forEach((file) => {
      const filePath = join(backendPath, file)
      const stats = lstatSync(filePath) // Get file stats

      if (stats.isFile() && file.endsWith('.json')) {
        // Check if it's a file and ends with .json
        jsonFiles.push(file) // Or filePath if you need the full path
      }
    })

    return jsonFiles.map((filename) => '--character=' + join(backendPath, filename))
  } catch (error) {
    console.error('Error reading directory:', error)
    return [] // Return an empty array if there's an error
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function initEliza(_mainWindow: BrowserWindow): ChildProcessWithoutNullStreams {
  const appPath = app.getAppPath()
  const backendPath = join(appPath, 'src-eliza')
  console.log('we could enable these guys?', getExistingAgents())
  const backendProcess = spawn('pnpm', ['run', 'start'].concat(getExistingAgents()), {
    cwd: backendPath
  })

  //   const sendDataToRenderer = (data: unknown): void => {
  //     mainWindow.webContents.send('backend-channel', data) // Send data to the renderer
  //   }

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`)
    // sendDataToRenderer(data)
  })

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`)
  })
  return backendProcess
}
