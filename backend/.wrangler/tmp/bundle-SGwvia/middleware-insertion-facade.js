				import worker, * as OTHER_EXPORTS from "D:\\100x_coHort\\Medium\\src\\index.ts";
				import * as __MIDDLEWARE_0__ from "D:\\100x_coHort\\Medium\\node_modules\\wrangler\\templates\\middleware\\middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "D:\\100x_coHort\\Medium\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";

				export * from "D:\\100x_coHort\\Medium\\src\\index.ts";

				export const __INTERNAL_WRANGLER_MIDDLEWARE__ = [
					...(OTHER_EXPORTS.__INJECT_FOR_TESTING_WRANGLER_MIDDLEWARE__ ?? []),
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default
				]
				export default worker;