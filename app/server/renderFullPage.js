export default (html, helmet, styles, serializedState) => {
    return `
        <!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${styles}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(serializedState).replace(/</g, "\\u003c")}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;
};
