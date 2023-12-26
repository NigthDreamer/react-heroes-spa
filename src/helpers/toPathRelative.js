export const toPathRelative = (routePath = '', url='') => {
  const regex = /\/+/g;
  const childs = routePath.match(regex).length - 1;

  // Bugfix del problema de GitHub Pages
  // url = 'react-heroes-spa/'+url

  for (let i = 0; i < childs; i++) {
    url=`../${url}`
  }

  return url;
};
