declare module 'react' {
  const React: any;
  export default React;
  export function createElement(...args: any[]): any;
}

declare module 'react-dom/server' {
  const ReactDOMServer: {
    renderToString: (element: any) => string;
    renderToStaticMarkup: (element: any) => string;
  };
  export default ReactDOMServer;
}
