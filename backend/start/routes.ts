/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const HealthChecksController = () => import('#controllers/health_checks_controller')
const ProjectsController = () => import('#controllers/projects_controller')

router.get('/health', [HealthChecksController])

router.group(() => {
  router.post('/projects', [ProjectsController, 'create'])
  router.get('/projects', [ProjectsController, 'findAll'])
})
