module.exports = {
    HomeAction: function(req, res) {
        var browserify = require('browserify');
        var literalify = require('literalify');
        var React = require('react');
        var ReactDOMServer = require('react-dom/server');
        var DOM = React.DOM,
            body = DOM.body,
            div = DOM.div,
            script = DOM.script;
        var App = React.createFactory(require('../../views/ReactDOMServer/app'));

        function safeStringify(obj) {
            return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
        }
        res.setHeader('Content-Type', 'text/html');
        var props = {
            items: [
                'Item 0',
                'Item 1',
                'Item </script>',
                'Item   <!--inject!-->'
            ]
        };
        var html = ReactDOMServer.renderToStaticMarkup(body(null,
            div({
                id: 'content',
                dangerouslySetInnerHTML: {
                    __html: ReactDOMServer.renderToString(App(props))
                }
            }),
            script({
                dangerouslySetInnerHTML: {
                    __html: 'var    APP_PROPS = ' + safeStringify(props) + ';'
                }
            }),
            script({
                src: '//fb.me/react-0.14.7.min.js'
            }),
            script({
                src: '//fb.me/react-dom-0.14.7.min.js'
            }),
            script({ src: '/bundle.js' })
        ))
        res.send(html);
    },
    RenderAction: function(req, res) {
        var browserify = require('browserify');
        var literalify = require('literalify');
        var React = require('react');
        var ReactDOMServer = require('react-dom/server');
        var DOM = React.DOM,
            body = DOM.body,
            div = DOM.div,
            script = DOM.script;
        var App = React.createFactory(require('../../views/ReactDOMServer/app'));
        res.setHeader('Content-Type', 'text/javascript');
        browserify()
            .add('./views/ReactDOMServer/browser.js')
            .transform(literalify.configure({
                'react': 'window.React',
                'react-dom': 'window.ReactDOM',
            }))
            .bundle()
            .pipe(res)
    },
};
