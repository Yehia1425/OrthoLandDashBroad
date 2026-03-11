import { Routes } from '@angular/router';
import { BlankLayout } from './Layouts/blank-layout/blank-layout';
import { DashboardLayout } from './Layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // // ⭐ خلي login الأول
  {
    path: '',
    component: BlankLayout,

    children: [
      {
        path: 'login',
        loadComponent: () => import('./Pages/login/login').then(m => m.Login),
        title: 'Login Page'
      }
    ]
  },

  // ⭐ بعده dashboard
  {
    path: "",
    component: DashboardLayout, 
    children: [
      {
        path: 'home',
        loadComponent: () => import('./Pages/home/home').then(m => m.Home),
        title: 'Home Page'
      },
      {
        path: 'product',
        loadComponent: () => import('./Pages/product/product').then(m => m.Product),
        title: 'Create Product Page'
      },
      {
        path: 'updateProduct',
        loadComponent: () => import('./Pages/update-product/update-product').then(m => m.UpdateProduct),
        title: 'Update Product Page'
      },
      {
        path: 'deleteProduct',
        loadComponent: () => import('./Pages/deleteproduct/deleteproduct').then(m => m.Deleteproduct),
        title: 'Delete Product Page'
      },
      {
        path: 'createcategories',
        loadComponent: () => import('./Pages/create-categories/create-categories').then(m => m.CreateCategories),
        title: 'Create Categories Page'
      },
      {
        path: 'sreach',
        loadComponent: () => import('./Pages/Search/search/search').then(m => m.Search),
        title: 'Search Page'
      },
      {
        path: 'updatecategories',
        loadComponent: () => import('./Pages/update-categories/update-categories').then(m => m.UpdateCategories),
        title: 'Update Categories Page'
      },
      {
        path: 'deletecategories',
        loadComponent: () => import('./Pages/delete-categories/delete-categories').then(m => m.DeleteCategories),
        title: 'Delete Categories Page'
      },
      {
        path: 'categories',
        loadComponent: () => import('./Pages/categories-sp/categories-sp').then(m => m.CategoriesSp),
        title: 'Categories Page'
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./Pages/product-sp/product-sp').then(m => m.ProductSp),
        title: 'Product Page'
      },
      {
        path: 'createoffer',
        loadComponent: () => import('./Pages/create-offer/create-offer').then(m => m.CreateOffer),
        title: 'Create Offer Page'
      },
      {
        path: 'updateoffer',
        loadComponent: () => import('./Pages/update-offer/update-offer').then(m => m.UpdateOffer),
        title: 'Update Offer Page'
      },
      {
        path: 'deleteoffer',
        loadComponent: () => import('./Pages/delete-offer/delete-offer').then(m => m.DeleteOffer),
        title: 'Delete Offer Page'
      },
      {
        path: 'vieworder',
        loadComponent: () => import('./Pages/view-order/view-order').then(m => m.ViewOrder),
        title: 'View Order Page'
      },
      {
        path: 'admincreate',
        loadComponent: () => import('./Pages/register/register').then(m => m.Register),
        title: 'Admin Create Page'
      }
    ]
  },

    {
    path: '**',
    redirectTo: 'login'
  }

];