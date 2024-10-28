import { SimpleLocalReleaseError } from '../src/common/errors/simple-local-release-error';

process.on('uncaughtException', (err) => {
	if (err instanceof SimpleLocalReleaseError) {
		logger.error(err.message);
	} else {
		logger.error(`Unknown error \n\n${err.name}: ${err.message}\n\n${err.stack}`);
	}
	process.exit(1);
});
