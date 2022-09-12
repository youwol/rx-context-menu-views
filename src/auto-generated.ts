const runTimeDependencies = {
    load: {
        rxjs: '^6.5.5',
        '@youwol/flux-view': '^1.0.0',
    },
    differed: {},
    includedInBundle: [],
}
const externals = {
    rxjs: 'rxjs_APIv6',
    '@youwol/flux-view': '@youwol/flux-view_APIv1',
    'rxjs/operators': {
        commonjs: 'rxjs/operators',
        commonjs2: 'rxjs/operators',
        root: ['rxjs_APIv6', 'operators'],
    },
}
export const setup = {
    name: '@youwol/fv-context-menu',
    assetId: 'QHlvdXdvbC9mdi1jb250ZXh0LW1lbnU=',
    version: '0.1.0',
    shortDescription: 'Context-menu using flux-view.',
    developerDocumentation:
        'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/fv-context-menu',
    npmPackage: 'https://www.npmjs.com/package/@youwol/fv-context-menu',
    sourceGithub: 'https://github.com/youwol/fv-context-menu',
    userGuide: 'https://l.youwol.com/doc/@youwol/fv-context-menu',
    apiVersion: '01',
    runTimeDependencies,
    externals,
}
