<script>
	import { Coins, Gamepad2, TrendingUp, Users } from 'lucide-svelte';
</script>

<div class="flex flex-col min-h-screen">
	<header class="px-4 lg:px-6 h-14 flex items-center">
		<a class="flex items-center justify-center" href="#">
			<Gamepad2 class="h-6 w-6" />
			<span class="ml-2 text-2xl font-bold">GameTopUp</span>
		</a>
		<nav class="ml-auto flex gap-4 sm:gap-6">
			<a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Features </a>
			<a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Pricing </a>
			<a class="text-sm font-medium hover:underline underline-offset-4" href="#"> About </a>
			<a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Contact </a>
		</nav>
	</header>
	<main class="flex-1">
		<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center space-y-4 text-center">
					<div class="space-y-2">
						<h1
							class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
						>
							Become a Gaming Top-Up Reseller
						</h1>
						<p class="mx-auto max-w-[700px] text-gray-400 md:text-xl">
							Join our platform and start earning by selling game credits, skins, and more to
							millions of gamers worldwide.
						</p>
					</div>
					<div class="space-x-4">
						<button>Get Started</button>
						<button variant="outline">Learn More</button>
					</div>
				</div>
			</div>
		</section>
		<section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
			<div class="container px-4 md:px-6">
				<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
					Why Choose Us?
				</h2>
				<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
					<div class="flex items-start space-x-4">
						<Coins class="mt-1 h-6 w-6 text-blue-500" />
						<div>
							<h3 class="text-xl font-bold">Competitive Rates</h3>
							<p class="text-gray-600 mt-2">
								Enjoy some of the best rates in the industry, maximizing your profit margins.
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-4">
						<Users class="mt-1 h-6 w-6 text-blue-500" />
						<div>
							<h3 class="text-xl font-bold">Large Customer Base</h3>
							<p class="text-gray-600 mt-2">
								Access millions of gamers looking for convenient top-up solutions.
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-4">
						<TrendingUp class="mt-1 h-6 w-6 text-blue-500" />
						<div>
							<h3 class="text-xl font-bold">Growing Market</h3>
							<p class="text-gray-600 mt-2">
								Tap into the rapidly expanding gaming industry and grow your business.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="w-full py-12 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<img
						alt="Gaming Top-up Platform"
						class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
						height="310"
						src="/placeholder.svg?height=310&width=550"
						width="550"
					/>
					<div class="flex flex-col justify-center space-y-4">
						<div class="space-y-2">
							<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Become a Member Today</h2>
							<p
								class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
							>
								Join our platform and start your journey as a gaming top-up reseller. Enjoy benefits
								such as:
							</p>
						</div>
						<ul class="grid gap-2 py-4">
							<li class="flex items-center gap-2">
								<svg
									class=" text-green-500"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
								<span>Access to a wide range of gaming products</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class=" text-green-500"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
								<span>Real-time inventory management</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class=" text-green-500"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
								<span>24/7 customer support</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class=" text-green-500"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
								<span>Secure payment processing</span>
							</li>
						</ul>
						<div class="flex flex-col gap-2 min-[400px]:flex-row">
							<button>Sign Up Now</button>
							<button>Learn More</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
						<p
							class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							Join our community of resellers and start growing your business today. Sign up now and
							receive a special welcome bonus!
						</p>
					</div>
					<div class="w-full max-w-sm space-y-2">
						<form class="flex space-x-2">
							<input class="max-w-lg flex-1" placeholder="Enter your email" type="email" />
							<button type="submit">Sign Up</button>
						</form>
						<p class="text-xs text-gray-500">
							By signing up, you agree to our{' '}
							<a class="underline underline-offset-2" href="#"> Terms & Conditions </a>
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>
	<footer
		class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
	>
		<p class="text-xs text-gray-500">© 2024 GameTopUp Inc. All rights reserved.</p>
		<nav class="sm:ml-auto flex gap-4 sm:gap-6">
			<a class="text-xs hover:underline underline-offset-4" href="#"> Terms of Service </a>
			<a class="text-xs hover:underline underline-offset-4" href="#"> Privacy </a>
		</nav>
	</footer>
</div>
