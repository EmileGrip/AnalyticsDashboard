import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from '@/layout/Layout';
import { sidebarNavItems } from '@/routes/nav-items';

export const AppRoutes = () => (
  <Router>
    <Layout>
      <Routes>
        {sidebarNavItems.map(
          (item, index) =>
            // Check if item.element is defined
            item.component && (
              // If it's defined, render the Route with element
              <Route key={index} path={item.href} element={React.createElement(item.component)} />
            ),
        )}
      </Routes>
    </Layout>
  </Router>
);
