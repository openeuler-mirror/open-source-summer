module.exports = {
    home: false,
    title: '',
    description: '',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }],
        ['meta', {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1,user-scalable=no'
        }],
        ['script', {
            src: '/js/analytics-ru.js'
        }],
        ['meta', { name: 'keywords', content: 'openEuler, 操作系统, 开放, 生态, 开源, Linux 开源, OS, open, ecosystem, open source, Linux open source'}],
        ['meta', { name: 'baidu-site-verification', content: 'code-EWzbQRssNU'}]
    ],
    markdown: {
        lineNumbers: false,
        extendMarkdown: md => {
            md.disable('emoji');
        }
    },
    plugins: [
        ['@vuepress/search', false],
        ['@vuepress/active-header-links', false],
        ['vuepress-plugin-code-copy', true],
        ['sitemap', {
            hostname: "https://ru.openeuler.org/"
          }
      ]
    ],
    shouldPrefetch: () => {
        return false;
    },
    locales: {
        '/': {
            lang: 'ru',
            title: '',
            description: ''
        },
        '/ru/': {
            lang: 'ru',
            title: '',
            description: 'openEuler is an open source, free Linux distribution platform. The platform provides an open community for global developers to build an open, diversified, and architecture-inclusive software ecosystem. openEuler is also an innovative platform that encourages everyone to propose new ideas, explore new approaches, and practice new solutions.'
        },
    },
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        locales: {
            'ru': {
                lang: require('./lang/ru.js')
            }
        },
        smoothScroll: true,
        docsUrl: 'https://docs.ru.openeuler.org'

    },
    devServer: {
        proxy: {
            '/api-sig/': {
                target: 'https://api.openeuler.org/meetings/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-sig/': ''
                }
            },
            '/api-cve/': {
                target: 'https://www.openeuler.org/api-cve/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-cve/': ''
                }
            },
            '/api-mirror': {
                target: 'https://api.openeuler.org/mirrors',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-mirror': ''
                }
            },
            '/api-rank': {
                target: 'https://api.openeuler.org/osi-task-manager/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api-rank': ''
                }
            },
            '/api/': {
                target: 'https://www.openeuler.org/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            },
            '/api-approve/': {
                target: 'https://cvesa.test.osinfra.cn',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-approve/': ''
                }
            },
        }

    }
}