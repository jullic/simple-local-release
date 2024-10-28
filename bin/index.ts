#!/usr/bin/env node
import { App } from '../lib/app';

export const bootstrap = async () => {
	const app = new App();
	await app.init();
};

bootstrap();
