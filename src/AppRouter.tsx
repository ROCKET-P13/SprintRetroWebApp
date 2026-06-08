import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { AppBar, AppBarLeft, AppBarRight } from '@ui/AppBar';
import { ThemeToggle } from '@ui/ThemeToggle';

import { Routes } from '@/Common/Routes';
import { JoinRoomPage } from '@/Components/Pages/JoinRoomPage';
import { LandingPage } from '@/Components/Pages/LandingPage';
import { RoomPage } from '@/Components/Pages/RoomPage';
import { StartRoomPage } from '@/Components/Pages/StartRoomPage';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
	component: () => {
		return (
			<div className="flex min-h-dvh flex-col">
				<AppBar>
					<AppBarLeft>
						<h1 className="text-md font-semibold tracking-tight text-foreground mr-10">Sprint Retro</h1>
					</AppBarLeft>
					<AppBarRight>
						<ThemeToggle />
					</AppBarRight>

				</AppBar>

				<main className="flex min-h-0 flex-1 flex-col">
					<Outlet />
				</main>
			</div>
		);
	},
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.HOME,
	component: LandingPage,
});

const joinRoomRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.JOIN_ROOM,
	component: JoinRoomPage,
});

const startRoomRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.START_ROOM,
	component: StartRoomPage,
});

const roomRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.ROOM,
	component: RoomPage,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	joinRoomRoute,
	startRoomRoute,
	roomRoute,
]);

const routerBasepath = import.meta.env.BASE_URL === '/'
	? undefined
	: import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createRouter({
	history: createBrowserHistory(),
	routeTree,
	basepath: routerBasepath,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: {
		queryClient,
	},
});

export const AppRouter = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				context={{ queryClient }}
			/>
		</QueryClientProvider>
	);
};