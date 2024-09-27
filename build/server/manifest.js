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
		client: {"start":"_app/immutable/entry/start.iTXGnFrj.js","app":"_app/immutable/entry/app.DmcWkNTX.js","imports":["_app/immutable/entry/start.iTXGnFrj.js","_app/immutable/chunks/entry.Db1Qa4kA.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/entry/app.DmcWkNTX.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-GBjlRaUs.js')),
			__memo(() => import('./chunks/1-BxRjLd6T.js')),
			__memo(() => import('./chunks/2-CXwnMptb.js')),
			__memo(() => import('./chunks/3-D0MRkrzd.js')),
			__memo(() => import('./chunks/4-GbQQRQ1M.js')),
			__memo(() => import('./chunks/5-DSr6SAIx.js')),
			__memo(() => import('./chunks/6-DnSX_Ouz.js')),
			__memo(() => import('./chunks/7-ep-cYJur.js')),
			__memo(() => import('./chunks/8-DU7RN1x8.js')),
			__memo(() => import('./chunks/9-D8zVTxw7.js')),
			__memo(() => import('./chunks/10-C3mbln12.js')),
			__memo(() => import('./chunks/11-CWf-FNO0.js')),
			__memo(() => import('./chunks/12-CfTreIKG.js')),
			__memo(() => import('./chunks/13-C4yJxj31.js')),
			__memo(() => import('./chunks/14-MuP_jtGq.js')),
			__memo(() => import('./chunks/15-CWoMk6Uz.js')),
			__memo(() => import('./chunks/16-CLmJWXNC.js')),
			__memo(() => import('./chunks/17-B-zDN3Vt.js')),
			__memo(() => import('./chunks/18-B8hdZM6_.js')),
			__memo(() => import('./chunks/19-BOE5Pkhz.js')),
			__memo(() => import('./chunks/20-B8GyYF1Q.js')),
			__memo(() => import('./chunks/21-ms_qlj1x.js')),
			__memo(() => import('./chunks/22-xT0wZ7y0.js'))
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
