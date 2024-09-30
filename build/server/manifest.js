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
		client: {"start":"_app/immutable/entry/start.CikVQEqP.js","app":"_app/immutable/entry/app.DpS9xn6n.js","imports":["_app/immutable/entry/start.CikVQEqP.js","_app/immutable/chunks/entry.0SKrRbJw.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/entry/app.DpS9xn6n.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-sar8-gHT.js')),
			__memo(() => import('./chunks/1-blIiJcDd.js')),
			__memo(() => import('./chunks/2-DV377nII.js')),
			__memo(() => import('./chunks/3-DU1hXFFS.js')),
			__memo(() => import('./chunks/4-DMICtK3J.js')),
			__memo(() => import('./chunks/5-BnNWR2B5.js')),
			__memo(() => import('./chunks/6-CbBpujjO.js')),
			__memo(() => import('./chunks/7-RXWIIgMf.js')),
			__memo(() => import('./chunks/8-Coxa00js.js')),
			__memo(() => import('./chunks/9-llVxSJg7.js')),
			__memo(() => import('./chunks/10-COjl5YD6.js')),
			__memo(() => import('./chunks/11-Dg0Vvxb8.js')),
			__memo(() => import('./chunks/12-EAgbTmCu.js')),
			__memo(() => import('./chunks/13-CKDI-hqN.js')),
			__memo(() => import('./chunks/14-DSuYBKcr.js')),
			__memo(() => import('./chunks/15-DPNcqOAQ.js')),
			__memo(() => import('./chunks/16-BUwhOYpw.js')),
			__memo(() => import('./chunks/17-BFyUUB0o.js')),
			__memo(() => import('./chunks/18-YxszhmV3.js')),
			__memo(() => import('./chunks/19-CnXTW1jz.js')),
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
