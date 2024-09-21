const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BcLXE-Gg.js","app":"_app/immutable/entry/app.CFM_bqCF.js","imports":["_app/immutable/entry/start.BcLXE-Gg.js","_app/immutable/chunks/entry.D6cYmGy0.js","_app/immutable/chunks/8.4XKJvd4g.js","_app/immutable/entry/app.CFM_bqCF.js","_app/immutable/chunks/8.4XKJvd4g.js","_app/immutable/chunks/index.BrjDpy8l.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DZLf5UoZ.js')),
			__memo(() => import('./chunks/1-1569oasf.js')),
			__memo(() => import('./chunks/2-Dl0V8bDz.js')),
			__memo(() => import('./chunks/3-DTrxg6_u.js')),
			__memo(() => import('./chunks/4-BSNpsa7P.js')),
			__memo(() => import('./chunks/5-B7LqpvLV.js')),
			__memo(() => import('./chunks/6-BZZaldI1.js')),
			__memo(() => import('./chunks/7-2_wQUJgf.js')),
			__memo(() => import('./chunks/8-BKFtByrg.js')),
			__memo(() => import('./chunks/9-DEWq35_W.js')),
			__memo(() => import('./chunks/10-BXKVNuFO.js')),
			__memo(() => import('./chunks/11-tbUBBlQX.js')),
			__memo(() => import('./chunks/12-CG4ko7I5.js')),
			__memo(() => import('./chunks/13-DFJ0PlKs.js')),
			__memo(() => import('./chunks/14-C_V0PU75.js')),
			__memo(() => import('./chunks/15-Ddlnz35a.js')),
			__memo(() => import('./chunks/16-DsTbWd4M.js')),
			__memo(() => import('./chunks/17-C9DYNHqS.js')),
			__memo(() => import('./chunks/18-B7gNFOFL.js')),
			__memo(() => import('./chunks/19-7rU-EC7S.js')),
			__memo(() => import('./chunks/20-DmB_2Q7M.js')),
			__memo(() => import('./chunks/21-BC3GzX9_.js'))
		],
		routes: [
			{
				id: "/(homepage)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(dashboard)/auth/forgot-password",
				pattern: /^\/auth\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(dashboard)/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(dashboard)/auth/login/google",
				pattern: /^\/auth\/login\/google\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(dashboard)/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(dashboard)/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/comission",
				pattern: /^\/dashboard\/comission\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/history",
				pattern: /^\/dashboard\/history\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/report",
				pattern: /^\/dashboard\/report\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/store",
				pattern: /^\/dashboard\/store\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(dashboard)/onboarding",
				pattern: /^\/onboarding\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(homepage)/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(homepage)/terms-condition",
				pattern: /^\/terms-condition\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(homepage)/[gameId]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"gameId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,], errors: [1,,], leaf: 19 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
