import { createRouter, createWebHistory } from '@ionic/vue-router'

import TabsPage from '@/views/TabsPage.vue'
import DashboardView from '@/views/DashboardView.vue'
import AssignedReportsView from '@/views/AssignedReportsView.vue'
import CompletedReportsView from '@/views/CompletedReportsView.vue'
import KnowledgeBaseView from '@/views/KnowledgeBaseView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SearchView from '@/views/SearchView.vue'
import InfoView from '@/views/InfoView.vue'
import AssignedReportDetailView from '@/views/AssignedReportDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import VerifyView from '@/views/VerifyView.vue'

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: LoginView },
  { path: '/verify', component: VerifyView },

  {
    path: '/tabs',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/dashboard' },

      // Tab routes
      { path: 'dashboard', component: DashboardView },
      { path: 'search', component: SearchView },
      { path: 'info', component: InfoView },

      // Overige pagina's
      { path: 'assigned', component: AssignedReportsView },
      { path: 'completed', component: CompletedReportsView },
      { path: 'knowledge', component: KnowledgeBaseView },
      { path: 'settings', component: SettingsView },

      // Detailpagina
      { path: 'assigned/:type', component: AssignedReportDetailView },
    ],
  },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router