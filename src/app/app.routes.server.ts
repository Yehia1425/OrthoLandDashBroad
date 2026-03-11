import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  // auth
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },

  // dashboard pages
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'updateProduct',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'deleteProduct',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'createcategories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sreach',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'updatecategories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'deletecategories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'categories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'createoffer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'updateoffer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'deleteoffer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'vieworder',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admincreate',
    renderMode: RenderMode.Prerender
  },

  // dynamic route
  {
    path: 'product/:id',
    renderMode: RenderMode.Server
  },

  // fallback
  {
    path: '**',
    renderMode: RenderMode.Server
  }

];