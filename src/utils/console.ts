type LogLevel = 'info' | 'warn' | 'error' | 'success';

interface TrackPayload {
  [key: string]: any;
}

class Logger {
  private static colors: Record<LogLevel, string> = {
    info: 'color: #3498db', // 蓝色
    warn: 'color: #f39c12', // 橙色
    error: 'color: #e74c3c', // 红色
    success: 'color: #2ecc71', // 绿色
  };

  private static print(level: LogLevel, message: string, ...args: any[]) {
    if (typeof window !== 'undefined' && window.console) {
      console.log(`%c[${level.toUpperCase()}] ${message}`, Logger.colors[level], ...args);
    } else {
      // Node fallback
      const prefix = `[${level.toUpperCase()}]`;
      console.log(`${prefix} ${message}`, ...args);
    }
  }

  static info(message: string, ...args: any[]) {
    Logger.print('info', message, ...args);
  }

  static warn(message: string, ...args: any[]) {
    Logger.print('warn', message, ...args);
  }

  static error(message: string, ...args: any[]) {
    Logger.print('error', message, ...args);
  }

  static success(message: string, ...args: any[]) {
    Logger.print('success', message, ...args);
  }

  /**
   * Track an event, optionally calling window.umami.track
   */
  static track(eventName: string, payload?: TrackPayload, module: string = 'default') {
    const message = `[${module}] ${eventName}`;
    Logger.info(`Track event: ${message}`, payload || {});

    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track(`${module}:${eventName}`, payload);
    } else {
      Logger.warn('umami.track not available');
    }
  }
}

export default Logger;
