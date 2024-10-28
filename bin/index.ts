#!/usr/bin/env node
import '../libs/registers';
import '../libs/handlers';

import { App } from '../src/app';

export const bootstrap = async () => {
	const app = new App();
	await app.init();
};

bootstrap();
