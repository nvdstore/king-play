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
		client: {"start":"_app/immutable/entry/start.D5cj8Do7.js","app":"_app/immutable/entry/app.DpVV4SqB.js","imports":["_app/immutable/entry/start.D5cj8Do7.js","_app/immutable/chunks/entry.Dr0Jcpdl.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.BSQMf5lU.js","_app/immutable/entry/app.DpVV4SqB.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D5JvDO0S.js')),
			__memo(() => import('./chunks/1-BS7BC1a-.js')),
			__memo(() => import('./chunks/2-84CiM9Bp.js')),
			__memo(() => import('./chunks/3-ShMZc7p-.js')),
			__memo(() => import('./chunks/4-CCS2k-g6.js')),
			__memo(() => import('./chunks/5-B3aP10Yd.js')),
			__memo(() => import('./chunks/6-BFR4z_Yo.js')),
			__memo(() => import('./chunks/7-D-GjRnfg.js')),
			__memo(() => import('./chunks/8-DUmJ1Md0.js')),
			__memo(() => import('./chunks/9-fyMfhV1k.js')),
			__memo(() => import('./chunks/10-Cp5OEns5.js')),
			__memo(() => import('./chunks/11-fBvbJzCj.js')),
			__memo(() => import('./chunks/12-Du8Z38km.js')),
			__memo(() => import('./chunks/13-DbT1KRGD.js')),
			__memo(() => import('./chunks/14-CqFha_vv.js')),
			__memo(() => import('./chunks/15-ClNqnG6e.js')),
			__memo(() => import('./chunks/16-DddeqDSq.js')),
			__memo(() => import('./chunks/17-BFuCQzPo.js')),
			__memo(() => import('./chunks/18-DSmyYi0w.js')),
			__memo(() => import('./chunks/19-DMGs224l.js')),
			__memo(() => import('./chunks/20-CarNV62T.js')),
			__memo(() => import('./chunks/21-19BFDRCz.js'))
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
