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
		client: {"start":"_app/immutable/entry/start.D2hnpms0.js","app":"_app/immutable/entry/app.CZpqOoFf.js","imports":["_app/immutable/entry/start.D2hnpms0.js","_app/immutable/chunks/entry.CwivGntT.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/entry/app.CZpqOoFf.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-jjFf-vpk.js')),
			__memo(() => import('./chunks/1-CTFefWP7.js')),
			__memo(() => import('./chunks/2-6aumhgJK.js')),
			__memo(() => import('./chunks/3-DU1hXFFS.js')),
			__memo(() => import('./chunks/4-BdsVq5AT.js')),
			__memo(() => import('./chunks/5-Dd7nuL-T.js')),
			__memo(() => import('./chunks/6-ChiPPFQt.js')),
			__memo(() => import('./chunks/7-CU_f0zW8.js')),
			__memo(() => import('./chunks/8-Coxa00js.js')),
			__memo(() => import('./chunks/9-DxrjsnIJ.js')),
			__memo(() => import('./chunks/10-DxH_Y9Bs.js')),
			__memo(() => import('./chunks/11-DMcxVKVd.js')),
			__memo(() => import('./chunks/12-EAgbTmCu.js')),
			__memo(() => import('./chunks/13--oDSssoU.js')),
			__memo(() => import('./chunks/14-DSuYBKcr.js')),
			__memo(() => import('./chunks/15-DPNcqOAQ.js')),
			__memo(() => import('./chunks/16-BUwhOYpw.js')),
			__memo(() => import('./chunks/17-DDqpK_om.js')),
			__memo(() => import('./chunks/18-YxszhmV3.js')),
			__memo(() => import('./chunks/19-BlepEtOx.js')),
			__memo(() => import('./chunks/20-BVWtoKr0.js')),
			__memo(() => import('./chunks/21-BreY8QsS.js')),
			__memo(() => import('./chunks/22-BWs-BrWU.js'))
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
				id: "/(homepage)/payment",
				pattern: /^\/payment\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(homepage)/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(homepage)/terms-condition",
				pattern: /^\/terms-condition\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(homepage)/[game]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"game","optional":false,"rest":false,"chained":false}],
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
