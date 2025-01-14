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
const ProjectTemplatesController = () => import('#controllers/project_templates_controller')
const WorkSessionsController = () => import('#controllers/work_sessions_controller')

router.get('/health', [HealthChecksController])

router.group(() => {
  router.get('/projects/templates', [ProjectTemplatesController, 'findAll'])
  router.post('/projects', [ProjectsController, 'create'])
  router.get('/projects', [ProjectsController, 'findAll'])
  router.post('/projects/github/clone', [ProjectsController, 'clone'])
  // IMPORTANT KEEP it last because :slug will overwrite /projects/templates etc...
  router.get('/projects/:id', [ProjectsController, 'findById'])
  // Remove it if is unused
  router.get('/projects/slug/:slug', [ProjectsController, 'findBySlug'])
  router.get('/projects/:slug/details', [ProjectsController, 'getDetails'])
  router.get('/projects/:projectId/work-sessions', [WorkSessionsController, 'findByProject'])
})

router.group(() => {
  router.get('/work-sessions', [WorkSessionsController, 'findAll'])
  router.get('/work-sessions/active', [WorkSessionsController, 'findActiveWorkSession'])
  router.post('/work-sessions/start', [WorkSessionsController, 'startSession'])
  router.post('/work-sessions/stop', [WorkSessionsController, 'stopSessions'])
})
