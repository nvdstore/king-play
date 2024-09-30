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
		client: {"start":"_app/immutable/entry/start.Ck9sRrpF.js","app":"_app/immutable/entry/app.UK75GDWf.js","imports":["_app/immutable/entry/start.Ck9sRrpF.js","_app/immutable/chunks/entry.Ck7nOtBn.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.CKUPByak.js","_app/immutable/entry/app.UK75GDWf.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DqJ6yVgN.js')),
			__memo(() => import('./chunks/1-DRl6y0Qa.js')),
			__memo(() => import('./chunks/2-_B4at9Lr.js')),
			__memo(() => import('./chunks/3-CmLR1JN8.js')),
			__memo(() => import('./chunks/4-B4QzvMnz.js')),
			__memo(() => import('./chunks/5-BxwFDZiA.js')),
			__memo(() => import('./chunks/6-Bt45wF8A.js')),
			__memo(() => import('./chunks/7-DlnFEzzF.js')),
			__memo(() => import('./chunks/8-DzQdlTHM.js')),
			__memo(() => import('./chunks/9-8r1xh9CK.js')),
			__memo(() => import('./chunks/10-FsGEVlY1.js')),
			__memo(() => import('./chunks/11-HSOAZxK0.js')),
			__memo(() => import('./chunks/12-o6802wRw.js')),
			__memo(() => import('./chunks/13-DqDLNGvt.js')),
			__memo(() => import('./chunks/14-rreM0qDD.js')),
			__memo(() => import('./chunks/15-X4Mu6Y-X.js')),
			__memo(() => import('./chunks/16-Dmvhy4a3.js')),
			__memo(() => import('./chunks/17-DELRH2Ia.js')),
			__memo(() => import('./chunks/18-C2LlSPVl.js')),
			__memo(() => import('./chunks/19-BUqN9v6S.js')),
			__memo(() => import('./chunks/20-YhLdiDGp.js')),
			__memo(() => import('./chunks/21-Bg6gtD96.js')),
			__memo(() => import('./chunks/22-BBhhVpzS.js')),
			__memo(() => import('./chunks/23-_IofnbV9.js'))
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
