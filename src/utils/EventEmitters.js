export class EventEmitter {
  /**
   * @type {Map<string, Function[]>}
   */
  #events;

  constructor() {
    this.#events = new Map();
  }

  on(eventName, callback) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }
    this.#events.get(eventName).push(callback);
  }

  off(eventName, callback) {
    if (!this.#events.has(eventName)) return;

    this.#events.set(
      eventName,
      this.#events.get(eventName).filter((cb) => cb !== callback),
    );
  }

  emit(eventName, data) {
    if (!this.#events.has(eventName)) return;

    this.#events.get(eventName).forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Erreur dans le callback de ${eventName}:`, error);
      }
    });
  }

  once(eventName, callback) {
    const onceCallback = (data) => {
      callback(data);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.#events.delete(eventName);
    } else {
      this.#events.clear();
    }
  }

  listenerCount(eventName) {
    return this.#events.has(eventName) ? this.#events.get(eventName).length : 0;
  }
}
