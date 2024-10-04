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
		client: {"start":"_app/immutable/entry/start.CjT2SLZ4.js","app":"_app/immutable/entry/app.COa-7d3S.js","imports":["_app/immutable/entry/start.CjT2SLZ4.js","_app/immutable/chunks/entry.BEL7CgLR.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/entry/app.COa-7d3S.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-C44KJAWg.js')),
			__memo(() => import('./chunks/1-CIAsfxnZ.js')),
			__memo(() => import('./chunks/2-BiblKplW.js')),
			__memo(() => import('./chunks/3-Bgi8zX_5.js')),
			__memo(() => import('./chunks/4-B3yJqw1H.js')),
			__memo(() => import('./chunks/5-gs-DywUL.js')),
			__memo(() => import('./chunks/6-CL8jRJxK.js')),
			__memo(() => import('./chunks/7-BfEMcJYG.js')),
			__memo(() => import('./chunks/8-DzRzZRri.js')),
			__memo(() => import('./chunks/9-BK58xc2h.js')),
			__memo(() => import('./chunks/10-DUli1f-A.js')),
			__memo(() => import('./chunks/11-D24o7rEd.js')),
			__memo(() => import('./chunks/12-BoY-Psq0.js')),
			__memo(() => import('./chunks/13-DoDSz-6V.js')),
			__memo(() => import('./chunks/14-DrlJszOf.js')),
			__memo(() => import('./chunks/15-BaywvX1d.js')),
			__memo(() => import('./chunks/16-BCQwxCo0.js')),
			__memo(() => import('./chunks/17-CLMgXXO-.js')),
			__memo(() => import('./chunks/18-Bmu3a8zY.js')),
			__memo(() => import('./chunks/19-DkA9jevc.js')),
			__memo(() => import('./chunks/20-B6RZu5i3.js')),
			__memo(() => import('./chunks/21-D79Q53Lc.js')),
			__memo(() => import('./chunks/22-kJZf16Ej.js')),
			__memo(() => import('./chunks/23-BXr50O-e.js'))
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
