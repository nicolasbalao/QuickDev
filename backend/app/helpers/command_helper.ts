import { exec } from 'child_process'

export async function executeGitInit(path: string) {
  try {
    await executeShellCommand('git init', path)
  } catch (error) {
    console.error('Erreur', error)
    throw new Error(`Erreur: ${error.message}`)
  }
}

export function executeShellCommand(command: string, path: string) {
  return new Promise((resolve, rejects) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        rejects(`Error: ${error.message}`)
        return
      }

      if (stderr) {
        rejects(`Stderr: ${stderr}`)
        return
      }

      resolve(stdout.trim())
    })
  })
}
