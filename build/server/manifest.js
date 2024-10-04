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
		client: {"start":"_app/immutable/entry/start.QO-haFqt.js","app":"_app/immutable/entry/app.rLNCl80P.js","imports":["_app/immutable/entry/start.QO-haFqt.js","_app/immutable/chunks/entry.eGK5Mmx5.js","_app/immutable/chunks/scheduler.DDK_FMqP.js","_app/immutable/chunks/index.zbdKov3I.js","_app/immutable/entry/app.rLNCl80P.js","_app/immutable/chunks/scheduler.DDK_FMqP.js","_app/immutable/chunks/index.CLy-O5qq.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BFBYkKHs.js')),
			__memo(() => import('./chunks/1-BMStKbAZ.js')),
			__memo(() => import('./chunks/2-DeCJHYkA.js')),
			__memo(() => import('./chunks/3-hfg0jMmu.js')),
			__memo(() => import('./chunks/4-nB-Yd6Lo.js')),
			__memo(() => import('./chunks/5-BnLAAU6h.js')),
			__memo(() => import('./chunks/6-DsOP9EWK.js')),
			__memo(() => import('./chunks/7-D1rTZB7O.js')),
			__memo(() => import('./chunks/8-CjLD7y48.js')),
			__memo(() => import('./chunks/9-DS1Ln0ar.js')),
			__memo(() => import('./chunks/10-DM22hkSh.js')),
			__memo(() => import('./chunks/11-N9ZNzm77.js')),
			__memo(() => import('./chunks/12-DNPbcy6w.js')),
			__memo(() => import('./chunks/13-CoW30kaw.js')),
			__memo(() => import('./chunks/14-BQBtf_b2.js')),
			__memo(() => import('./chunks/15-B5natjwA.js')),
			__memo(() => import('./chunks/16-mkp2iIqW.js')),
			__memo(() => import('./chunks/17-5X7Bs4vg.js')),
			__memo(() => import('./chunks/18-C4OTw8M7.js')),
			__memo(() => import('./chunks/19-BKqxTyZJ.js')),
			__memo(() => import('./chunks/20-BdWtxvP8.js')),
			__memo(() => import('./chunks/21-D79Q53Lc.js')),
			__memo(() => import('./chunks/22-DcS3TMqD.js')),
			__memo(() => import('./chunks/23-pkHa1jir.js'))
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
				id: "/(homepage)/terms",
				pattern: /^\/terms\/?$/,
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
