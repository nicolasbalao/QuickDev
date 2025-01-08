import { exec } from 'child_process'
import { GitCommit } from '#interfaces/git_commit_interface'

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

/**
 * Take 5 latest commits
 * @param projectPath
 * @returns
 */
export async function getLatestGitCommits(projectPath: string): Promise<GitCommit[]> {
  try {
    let commitStringJson = await executeShellCommand(
      `git log -n 5 --pretty=format:'{"hash":"%H","author":"%an","email":"%ae","date":"%ad","message":"%s"},' --date=iso`,
      projectPath
    )

    commitStringJson = `[${(commitStringJson as string).slice(0, -1)}]`
    const commitsRaw = JSON.parse(commitStringJson as string)

    if (commitsRaw.length === 0) {
      return []
    }

    const commits: GitCommit[] = commitsRaw.map((c: any) => ({
      hash: c.hash,
      author: c.author,
      message: c.message,
      date: c.date,
    }))

    return commits
  } catch (error) {
    const noCommitsYetRegex = /fatal: your current branch '.*' does not have any commits yet/
    console.error(error)
    if (noCommitsYetRegex.test(error)) {
      console.warn('No commits on the current branch. Returning an empty commit list.')
      return []
    }
    throw new Error(error)
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

// TODO make unit tests on this one
export function prepareTemplateCommand(command: string, data: Record<string, string>): string {
  return command.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
    if (key in data) {
      return data[key]
    }
    throw new Error(`La variable "${key}" n'a pas été trouvée dans les données fournies`)
  })
}
