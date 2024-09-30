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
		client: {"start":"_app/immutable/entry/start.8tpX4Ip1.js","app":"_app/immutable/entry/app.Cs2gv8LK.js","imports":["_app/immutable/entry/start.8tpX4Ip1.js","_app/immutable/chunks/entry.CAuGH5yM.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/entry/app.Cs2gv8LK.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-bqoix9xX.js')),
			__memo(() => import('./chunks/1-6pCLwqQc.js')),
			__memo(() => import('./chunks/2-CH1XaSTt.js')),
			__memo(() => import('./chunks/3-Dbaf3gbN.js')),
			__memo(() => import('./chunks/4-XKLhTQWd.js')),
			__memo(() => import('./chunks/5-BvlvyaXG.js')),
			__memo(() => import('./chunks/6-B_eq-6h1.js')),
			__memo(() => import('./chunks/7-BZoRfOpo.js')),
			__memo(() => import('./chunks/8-DS-NQlx1.js')),
			__memo(() => import('./chunks/9-Nc2ux2jN.js')),
			__memo(() => import('./chunks/10-Cd930IRm.js')),
			__memo(() => import('./chunks/11-D8_E6kkV.js')),
			__memo(() => import('./chunks/12-D701NdNh.js')),
			__memo(() => import('./chunks/13-CsQSyv0t.js')),
			__memo(() => import('./chunks/14-B5j-Sd5n.js')),
			__memo(() => import('./chunks/15-D7phHZ8h.js')),
			__memo(() => import('./chunks/16-DoNsAhyG.js')),
			__memo(() => import('./chunks/17-C4xBUili.js')),
			__memo(() => import('./chunks/18-CurMJ8yI.js')),
			__memo(() => import('./chunks/19-B9bXT9ou.js')),
			__memo(() => import('./chunks/20-C5ZG_Ibh.js')),
			__memo(() => import('./chunks/21-Bg6gtD96.js')),
			__memo(() => import('./chunks/22-NNFaYEN5.js')),
			__memo(() => import('./chunks/23-BUijWvaA.js'))
		],
		routes: [
			{
				id: "/(homepage)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(member)/auth/forgot-password",
				pattern: /^\/auth\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,3,6,], errors: [1,,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(member)/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,3,6,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(member)/auth/login/google",
				pattern: /^\/auth\/login\/google\/?$/,
				params: [],
				page: { layouts: [0,3,6,], errors: [1,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(member)/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,3,6,], errors: [1,,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(member)/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,3,6,], errors: [1,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard/comission",
				pattern: /^\/dashboard\/comission\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard/history",
				pattern: /^\/dashboard\/history\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard/report",
				pattern: /^\/dashboard\/report\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/dashboard/store",
				pattern: /^\/dashboard\/store\/?$/,
				params: [],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(member)/(dashboard)/onboarding",
				pattern: /^\/onboarding\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(homepage)/payment",
				pattern: /^\/payment\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(homepage)/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(homepage)/terms-condition",
				pattern: /^\/terms-condition\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(homepage)/[game]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"game","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
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
