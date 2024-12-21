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

router.get('/health', [HealthChecksController])

router.group(() => {
  router.get('/projects/templates', [ProjectTemplatesController, 'findAll'])
  router.post('/projects', [ProjectsController, 'create'])
  router.get('/projects', [ProjectsController, 'findAll'])
  router.post('/projects/github/clone', [ProjectsController, 'clone'])
  // IMPORTANT KEEP it last because :slug will overwrite /projects/templates etc...
  router.get('/projects/:slug', [ProjectsController, 'findBySlug'])
})
