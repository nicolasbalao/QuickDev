import { exec } from 'child_process'

export async function executeGitInit(path: string) {
  try {
    await executeShellCommand('git init', path)
  } catch (error) {
    console.error('Erreur', error)
    throw new Error(`Erreur: ${error.message}`)
  }
}

export async function gitClone(url: string, path: string) {
  try {
    await executeShellCommand(`git clone ${url}`, path, true)
  } catch (error) {
    console.log(error)
    throw new Error(`Erreur: ${error.message}`)
  }
}

export function executeShellCommand(command: string, path: string, disableStderr = false) {
  return new Promise((resolve, rejects) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        rejects(`Error: ${error.message}`)
        return
      }

      if (stderr && !disableStderr) {
        rejects(`Stderr: ${stderr}`)
        return
      }

      resolve(stdout.trim())
    })
  })
}
