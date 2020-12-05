// eslint-disable-next-line import/prefer-default-export

const accountRoutes = {
  register: '/register',
  forgotPassword: '/forgot',
  activate: '/account/activate:verificationToken',
  resetPassword: '/account/reset:resetToken',
  login: '/login',
  confirmation: '/confirmation'
}

const categoriesRoutes = {
  categories: '/categories',
  category: '/category/:id',
}

const plansRoutes = {
  plans: '/plans',
  plan: '/plan/:id',
}

export const routes = {
  register: accountRoutes.register,
  forgotPassword: accountRoutes.forgotPassword,
  activate: accountRoutes.activate,
  resetPassword: accountRoutes.resetPassword,
  login: accountRoutes.login,
  confirmation: accountRoutes.confirmation,

  //todo expired
  linkExpired: '/expired',

  //currently
  categories: categoriesRoutes.categories,
  category: categoriesRoutes.category,
  addExcersise: '/add-exercise',
  editExcersise: '/edit-exercise',
  exercise: '/exercise',


  //plans
  plans: plansRoutes.plans,
  plan: plansRoutes.plan,

  // organizations
  organizations: '/organizations',
  organizationUsers: '/organizationusers',
  organizationTrainer: '/organizationclients',
  organizationClients: '/organizationclients',

  //users
  myProfile: '/myprofile',
  users: '/users',
  user: '/user',

  trainers: '/trainers',
  clients: '/clients',

  privacy: '/privacy',
};
