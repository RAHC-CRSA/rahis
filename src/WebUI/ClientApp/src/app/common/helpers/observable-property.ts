import { Observable, ReplaySubject } from "rxjs";

const cacheMap = Symbol("Cached values");

function getWithCreateMap<T extends Object>(obj: T): Map<any, any> {
  return (obj[cacheMap] = obj[cacheMap] ?? new Map<any, any>());
}

function getObservableMap<T extends Object, K extends keyof T>(
  obj: T
): Map<K, Observable<T[K]>> {
  return getWithCreateMap(obj) as Map<K, Observable<T[K]>>;
}

function isUsingAccessor<T extends Object, K extends keyof T>(
  obj: T,
  variable: K
): boolean {
  // the prototype of the object (and not the own property) is holding information about the object getters at the time of the construction
  const prototypeOfObject = Object.getPrototypeOf(obj);
  const descriptorOfPrototype = Object.getOwnPropertyDescriptor(
    prototypeOfObject,
    variable
  );
  return (
    !!descriptorOfPrototype &&
    ("get" in descriptorOfPrototype || "set" in descriptorOfPrototype)
  );
}

function checkIsNotAccessor<T extends Object, K extends keyof T>(
  obj: T,
  variable: K
): void {
  if (isUsingAccessor(obj, variable)) {
    throw new Error("Listening value accessors is not supported");
  }
}

function createPropertyObserver$<T extends Object, K extends keyof T>(
  obj: T,
  variable: K
): Observable<T[K]> {
  const defaultDescriptor: PropertyDescriptor =
    Object.getOwnPropertyDescriptor(obj, variable) ??
    defaultPropertyDescriptor();
  const replaySubject$: ReplaySubject<T[K]> = new ReplaySubject<T[K]>(1);

  checkIsNotAccessor(obj, variable);

  const { enumerable, configurable } = defaultDescriptor;
  const descriptor: PropertyDescriptor = {
    configurable,
    enumerable,
    get: () => defaultDescriptor.value,
    set: (nextValue) => {
      defaultDescriptor.value = nextValue;
      replaySubject$.next(nextValue);
    }
  };

  const isValueAlreadyDeclared = "value" in defaultDescriptor;
  if (isValueAlreadyDeclared) {
    replaySubject$.next(defaultDescriptor.value);
  }

  Object.defineProperty(obj, variable, descriptor);

  return replaySubject$;
}

function defaultPropertyDescriptor(): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: true,
    writable: true
  };
}

/**
 * Convert any property into an observable one
 *
 * example:
 *
 * class {
 *   private toto;
 *   private toto$ = observeProperty$(this, 'toto');
 * }
 */
export function observeProperty$<T extends Object, K extends keyof T>(
  obj: T,
  variable: K
): Observable<T[K]> {
  const map = getObservableMap(obj);

  if (!map.has(variable)) {
    map.set(variable, createPropertyObserver$(obj, variable));
  }

  return map.get(variable) as Observable<T[K]>;
}
