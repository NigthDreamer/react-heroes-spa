export const toPathRelative = (routePath = '', url='') => {
  const regex = /\/+/g;
  console.log(routePath)
  const childs = routePath.match(regex).length - 1;

  for (let i = 0; i < childs; i++) {
    url=`../react-heroes-spa/${url}`
  }

  return url;
};
