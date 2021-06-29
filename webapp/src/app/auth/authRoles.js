export const authRoles = {
  supermarket: ['supermarket'],
  producer: ['supermarket', 'producer'],
  consumer: ['supermarket', 'producer', 'consumer'],
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];