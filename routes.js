routes = [
  {
    name: 'home',
    path: '/',
    url: './page_home.html',
  },
  {
		name: 'edit',
		path: '/edit/:id/:type',
		url: './page_edit.html'
	},
{
		name: 'view',
		path: '/view/:id/:type',
		url: './page_view.html'
	},
{
		name: 'about',
		path: '/about/',
		url: './page_about.html'
	},
{
		name: 'categories',
		path: '/categories/',
		url: './page_categories.html'
	},
{
		name: 'catedit',
		path: '/catedit/:id',
		url: './page_catedit.html'
	},
{
		name: 'settings',
		path: '/settings/',
		url: './page_settings.html'
	},
{
		name: 'backup',
		path: '/backup/',
		url: './page_backup.html'
	},
{
		name: 'privacy',
		path: '/privacy/',
		url: './page_privacy.html'
	},
// Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];