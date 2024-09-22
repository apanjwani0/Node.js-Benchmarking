const { performance } = require('perf_hooks');
const os = require('os');

const benchmarkWrapper = (fn) => {
  return async (req, res, next) => {
    const startTime = performance.now();
    const startUsage = process.cpuUsage();
    const startMemoryUsage = process.memoryUsage();

    try {
      // Call the wrapped function
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass error to the next middleware
    } finally {
      // Performance time calculation
      const duration = performance.now() - startTime;

      // CPU usage calculation
      const endUsage = process.cpuUsage(startUsage);
      const cpuUsagePercent = ((endUsage.user + endUsage.system) / 1000) / duration;

      // Memory usage calculation
      const endMemoryUsage = process.memoryUsage();
      const memoryConsumed = endMemoryUsage.heapUsed - startMemoryUsage.heapUsed;

      // Collect system info (optional)
      const systemInfo = {
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        cpuLoadAvg: os.loadavg(), // 1, 5, and 15 minute CPU load averages
      };

      // Log the metrics
      console.log({
        route: req.originalUrl,
        method: req.method,
        duration: `${duration.toFixed(2)} ms`,
        cpuUsagePercent: `${(cpuUsagePercent * 100).toFixed(2)}%`,
        memoryConsumed: `${(memoryConsumed / 1024 / 1024).toFixed(2)} MB`,
        systemInfo
      });
    }
  };
};

module.exports = benchmarkWrapper;
