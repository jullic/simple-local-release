"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_local_release_error_1 = require("../src/common/errors/simple-local-release-error");
process.on('uncaughtException', (err) => {
    if (err instanceof simple_local_release_error_1.SimpleLocalReleaseError) {
        logger.error(err.message);
    }
    else {
        logger.error(`Unknown error \n\n${err.name}: ${err.message}\n\n${err.stack}`);
    }
    process.exit(1);
});
