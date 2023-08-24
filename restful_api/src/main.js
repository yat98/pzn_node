import { logger } from './applications/logging.js';
import { web } from './applications/web.js'

const port = process.env.PORT;
web.listen(port, () => {
  logger.info(`App start port ${port}`);
})