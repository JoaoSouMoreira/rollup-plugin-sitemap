const fs = require('fs');
const path = require('path');

export default function generateSitemap(config = {}) {
  return {
    name: 'plugin-sitemap',
    buildEnd() {
      const dir = `${process.cwd()}/${config.contentBase || 'public'}`;
      const routes = getRoutesList(config);
      const routesXML = getRoutesXML(routes);

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

      fs.writeFile(`${dir}/sitemap.xml`, routesXML, (error) => {
        if (error) {
          return console.log(error);
        }
      });
    }
  };

  function getRoutesList(config) {
    const { routes, baseUrl } = config;

    return routes.reduce((array, route) => {
      const path = `${baseUrl}${route.path}`;

      if (route.path !== '*' && route.name) {
        array.push(path);
      }

      if (route.children) {
        array.push(...getRoutesList(route.children, `${path}/`));
      }

      return array;
    }, []);
  }

  function getRoutesXML(routes) {
    const list = routes
      .map(route => `<url><loc>${route}</loc></url>`)
      .join('\r\n');
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${list}
    </urlset>`;
  }
}
