import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  Optional,
  Pipe,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-NLUMCQWJ.js";
import {
  Subject,
  empty,
  expand,
  filter,
  of,
  skip,
  timer
} from "./chunk-ZPEIAAMA.js";

// node_modules/ngx-timeago/fesm2022/ngx-timeago.mjs
function isDefined(value) {
  return typeof value !== "undefined" && value !== null;
}
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}
function dateParser(date) {
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.valueOf())) {
    return parsed;
  }
  const parts = String(date).match(/\d+/g);
  if (parts === null || parts.length <= 2) {
    return parsed;
  } else {
    const [firstP, secondP, ...restPs] = parts.map((x) => parseInt(x, 10));
    return new Date(Date.UTC(firstP, secondP - 1, ...restPs));
  }
}
var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365;
var TimeagoIntl = class _TimeagoIntl {
  constructor() {
    this.changes = new Subject();
  }
  static {
    this.ɵfac = function TimeagoIntl_Factory(t) {
      return new (t || _TimeagoIntl)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimeagoIntl,
      factory: _TimeagoIntl.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoIntl, [{
    type: Injectable
  }], null, null);
})();
var defaultFormattter = function(then) {
  const now = Date.now();
  const seconds = Math.round(Math.abs(now - then) / 1e3);
  const suffix = then < now ? "ago" : "from now";
  const [value, unit] = seconds < MINUTE ? [Math.round(seconds), "second"] : seconds < HOUR ? [Math.round(seconds / MINUTE), "minute"] : seconds < DAY ? [Math.round(seconds / HOUR), "hour"] : seconds < WEEK ? [Math.round(seconds / DAY), "day"] : seconds < MONTH ? [Math.round(seconds / WEEK), "week"] : seconds < YEAR ? [Math.round(seconds / MONTH), "month"] : [Math.round(seconds / YEAR), "year"];
  return {
    value,
    unit,
    suffix
  };
};
var TimeagoFormatter = class {
};
var TimeagoDefaultFormatter = class _TimeagoDefaultFormatter extends TimeagoFormatter {
  format(then) {
    const {
      suffix,
      value,
      unit
    } = defaultFormattter(then);
    return this.parse(value, unit, suffix);
  }
  parse(value, unit, suffix) {
    if (value !== 1) {
      unit += "s";
    }
    return value + " " + unit + " " + suffix;
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTimeagoDefaultFormatter_BaseFactory;
      return function TimeagoDefaultFormatter_Factory(t) {
        return (ɵTimeagoDefaultFormatter_BaseFactory || (ɵTimeagoDefaultFormatter_BaseFactory = ɵɵgetInheritedFactory(_TimeagoDefaultFormatter)))(t || _TimeagoDefaultFormatter);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimeagoDefaultFormatter,
      factory: _TimeagoDefaultFormatter.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoDefaultFormatter, [{
    type: Injectable
  }], null, null);
})();
var TimeagoCustomFormatter = class _TimeagoCustomFormatter extends TimeagoFormatter {
  constructor(intl) {
    super();
    this.intl = intl;
  }
  format(then) {
    const {
      suffix,
      value,
      unit
    } = defaultFormattter(then);
    return this.parse(value, unit, suffix, Date.now(), then);
  }
  parse(value, unit, suffix, now, then) {
    if (unit === "week" && !this.intl.strings.week && !this.intl.strings.weeks) {
      const days = Math.round(Math.abs(now - then) / (1e3 * 60 * 60 * 24));
      value = days;
      unit = "day";
    }
    const normalize = this.normalizeFn(value, now - then, this.intl.strings.numbers);
    const dateString = [];
    if (suffix === "ago" && this.intl.strings.prefixAgo) {
      dateString.push(normalize(this.intl.strings.prefixAgo));
    }
    if (suffix === "from now" && this.intl.strings.prefixFromNow) {
      dateString.push(normalize(this.intl.strings.prefixFromNow));
    }
    const isPlural = value > 1;
    if (isPlural) {
      const stringFn = this.intl.strings[unit + "s"] || this.intl.strings[unit] || "%d " + unit;
      dateString.push(normalize(stringFn));
    } else {
      const stringFn = this.intl.strings[unit] || this.intl.strings[unit + "s"] || "%d " + unit;
      dateString.push(normalize(stringFn));
    }
    if (suffix === "ago" && this.intl.strings.suffixAgo) {
      dateString.push(normalize(this.intl.strings.suffixAgo));
    }
    if (suffix === "from now" && this.intl.strings.suffixFromNow) {
      dateString.push(normalize(this.intl.strings.suffixFromNow));
    }
    const wordSeparator = typeof this.intl.strings.wordSeparator === "string" ? this.intl.strings.wordSeparator : " ";
    return dateString.join(wordSeparator);
  }
  /**
   * If the numbers array is present, format numbers with it,
   * otherwise just cast the number to a string and return it
  */
  normalizeNumber(numbers, value) {
    return numbers && numbers.length === 10 ? String(value).split("").map((digit) => digit.match(/^[0-9]$/) ? numbers[parseInt(digit, 10)] : digit).join("") : String(value);
  }
  /**
   * Take a string or a function that takes number of days and returns a string
   * and provide a uniform API to create string parts
  */
  normalizeFn(value, millisDelta, numbers) {
    return (stringOrFn) => typeof stringOrFn === "function" ? stringOrFn(value, millisDelta).replace(/%d/g, this.normalizeNumber(numbers, value)) : stringOrFn.replace(/%d/g, this.normalizeNumber(numbers, value));
  }
  static {
    this.ɵfac = function TimeagoCustomFormatter_Factory(t) {
      return new (t || _TimeagoCustomFormatter)(ɵɵinject(TimeagoIntl));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimeagoCustomFormatter,
      factory: _TimeagoCustomFormatter.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoCustomFormatter, [{
    type: Injectable
  }], function() {
    return [{
      type: TimeagoIntl
    }];
  }, null);
})();
var TimeagoClock = class {
};
var TimeagoDefaultClock = class _TimeagoDefaultClock extends TimeagoClock {
  tick(then) {
    return of(0).pipe(expand(() => {
      const now = Date.now();
      const seconds = Math.round(Math.abs(now - then) / 1e3);
      const period = seconds < MINUTE ? 1e3 : seconds < HOUR ? 1e3 * MINUTE : seconds < DAY ? 1e3 * HOUR : 0;
      return period ? timer(period) : empty();
    }), skip(1));
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTimeagoDefaultClock_BaseFactory;
      return function TimeagoDefaultClock_Factory(t) {
        return (ɵTimeagoDefaultClock_BaseFactory || (ɵTimeagoDefaultClock_BaseFactory = ɵɵgetInheritedFactory(_TimeagoDefaultClock)))(t || _TimeagoDefaultClock);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimeagoDefaultClock,
      factory: _TimeagoDefaultClock.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoDefaultClock, [{
    type: Injectable
  }], null, null);
})();
var TimeagoDirective = class _TimeagoDirective {
  /** The Date to display. An actual Date object or something that can be fed to new Date. */
  get date() {
    return this._date;
  }
  set date(date) {
    this._date = dateParser(date).valueOf();
    if (this._date) {
      if (this.clockSubscription) {
        this.clockSubscription.unsubscribe();
        this.clockSubscription = void 0;
      }
      this.clockSubscription = this.clock.tick(this.date).pipe(filter(() => this.live, this)).subscribe(() => this.stateChanges.next());
    } else {
      throw new SyntaxError(`Wrong parameter in TimeagoDirective. Expected a valid date, received: ${date}`);
    }
  }
  /** If the directive should update itself over time */
  get live() {
    return this._live;
  }
  set live(live) {
    this._live = coerceBooleanProperty(live);
  }
  constructor(intl, cd, formatter, element, clock) {
    this.cd = cd;
    this.clock = clock;
    this.stateChanges = new Subject();
    this._live = true;
    if (intl) {
      this.intlSubscription = intl.changes.subscribe(() => this.stateChanges.next());
    }
    this.stateChanges.subscribe(() => {
      this.setContent(element.nativeElement, formatter.format(this.date));
      this.cd.markForCheck();
    });
  }
  ngOnChanges() {
    this.stateChanges.next();
  }
  setContent(node, content) {
    if (isDefined(node.textContent)) {
      node.textContent = content;
    } else {
      node.data = content;
    }
  }
  ngOnDestroy() {
    if (this.intlSubscription) {
      this.intlSubscription.unsubscribe();
      this.intlSubscription = void 0;
    }
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
      this.clockSubscription = void 0;
    }
    this.stateChanges.complete();
  }
  static {
    this.ɵfac = function TimeagoDirective_Factory(t) {
      return new (t || _TimeagoDirective)(ɵɵdirectiveInject(TimeagoIntl, 8), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(TimeagoFormatter), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(TimeagoClock));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TimeagoDirective,
      selectors: [["", "timeago", ""]],
      inputs: {
        date: "date",
        live: "live"
      },
      exportAs: ["timeago"],
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoDirective, [{
    type: Directive,
    args: [{
      selector: "[timeago]",
      exportAs: "timeago"
    }]
  }], function() {
    return [{
      type: TimeagoIntl,
      decorators: [{
        type: Optional
      }]
    }, {
      type: ChangeDetectorRef
    }, {
      type: TimeagoFormatter
    }, {
      type: ElementRef
    }, {
      type: TimeagoClock
    }];
  }, {
    date: [{
      type: Input
    }],
    live: [{
      type: Input
    }]
  });
})();
var TimeagoPipe = class _TimeagoPipe {
  constructor(intl, cd, formatter, clock) {
    this.clock = clock;
    this.live = true;
    this.stateChanges = new Subject();
    if (intl) {
      this.intlSubscription = intl.changes.subscribe(() => this.stateChanges.next());
    }
    this.stateChanges.subscribe(() => {
      this.value = formatter.format(this.date);
      cd.markForCheck();
    });
  }
  transform(date, ...args) {
    const _date = dateParser(date).valueOf();
    let _live;
    _live = isDefined(args[0]) ? coerceBooleanProperty(args[0]) : this.live;
    if (this.date === _date && this.live === _live) {
      return this.value;
    }
    this.date = _date;
    this.live = _live;
    if (this.date) {
      if (this.clockSubscription) {
        this.clockSubscription.unsubscribe();
        this.clockSubscription = void 0;
      }
      this.clockSubscription = this.clock.tick(this.date).pipe(filter(() => this.live, this)).subscribe(() => this.stateChanges.next());
      this.stateChanges.next();
    } else {
      throw new SyntaxError(`Wrong parameter in TimeagoPipe. Expected a valid date, received: ${date}`);
    }
    return this.value;
  }
  ngOnDestroy() {
    if (this.intlSubscription) {
      this.intlSubscription.unsubscribe();
      this.intlSubscription = void 0;
    }
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
      this.clockSubscription = void 0;
    }
    this.stateChanges.complete();
  }
  static {
    this.ɵfac = function TimeagoPipe_Factory(t) {
      return new (t || _TimeagoPipe)(ɵɵdirectiveInject(TimeagoIntl, 24), ɵɵdirectiveInject(ChangeDetectorRef, 16), ɵɵdirectiveInject(TimeagoFormatter, 16), ɵɵdirectiveInject(TimeagoClock, 16));
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "timeago",
      type: _TimeagoPipe,
      pure: false
    });
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimeagoPipe,
      factory: _TimeagoPipe.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoPipe, [{
    type: Injectable
  }, {
    type: Pipe,
    args: [{
      name: "timeago",
      pure: false
      // required to update the value when stateChanges emits
    }]
  }], function() {
    return [{
      type: TimeagoIntl,
      decorators: [{
        type: Optional
      }]
    }, {
      type: ChangeDetectorRef
    }, {
      type: TimeagoFormatter
    }, {
      type: TimeagoClock
    }];
  }, null);
})();
var TimeagoModule = class _TimeagoModule {
  /**
   * Use this method in your root module to provide the TimeagoModule
   */
  static forRoot(config = {}) {
    return {
      ngModule: _TimeagoModule,
      providers: [config.clock || {
        provide: TimeagoClock,
        useClass: TimeagoDefaultClock
      }, config.intl || [], config.formatter || {
        provide: TimeagoFormatter,
        useClass: TimeagoDefaultFormatter
      }]
    };
  }
  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(config = {}) {
    return {
      ngModule: _TimeagoModule,
      providers: [config.clock || {
        provide: TimeagoClock,
        useClass: TimeagoDefaultClock
      }, config.intl || [], config.formatter || {
        provide: TimeagoFormatter,
        useClass: TimeagoDefaultFormatter
      }]
    };
  }
  static {
    this.ɵfac = function TimeagoModule_Factory(t) {
      return new (t || _TimeagoModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _TimeagoModule,
      declarations: [TimeagoDirective, TimeagoPipe],
      exports: [TimeagoDirective, TimeagoPipe]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeagoModule, [{
    type: NgModule,
    args: [{
      declarations: [TimeagoDirective, TimeagoPipe],
      exports: [TimeagoDirective, TimeagoPipe]
    }]
  }], null, null);
})();
export {
  TimeagoClock,
  TimeagoCustomFormatter,
  TimeagoDefaultClock,
  TimeagoDefaultFormatter,
  TimeagoDirective,
  TimeagoFormatter,
  TimeagoIntl,
  TimeagoModule,
  TimeagoPipe
};
//# sourceMappingURL=ngx-timeago.js.map
