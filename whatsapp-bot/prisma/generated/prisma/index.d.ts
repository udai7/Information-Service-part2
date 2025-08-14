
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model SchemeService
 * 
 */
export type SchemeService = $Result.DefaultSelection<Prisma.$SchemeServicePayload>
/**
 * Model CertificateService
 * 
 */
export type CertificateService = $Result.DefaultSelection<Prisma.$CertificateServicePayload>
/**
 * Model ContactService
 * 
 */
export type ContactService = $Result.DefaultSelection<Prisma.$ContactServicePayload>
/**
 * Model ContactServiceContact
 * 
 */
export type ContactServiceContact = $Result.DefaultSelection<Prisma.$ContactServiceContactPayload>
/**
 * Model Grievance
 * 
 */
export type Grievance = $Result.DefaultSelection<Prisma.$GrievancePayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model ContactPerson
 * 
 */
export type ContactPerson = $Result.DefaultSelection<Prisma.$ContactPersonPayload>
/**
 * Model SupportiveDocument
 * 
 */
export type SupportiveDocument = $Result.DefaultSelection<Prisma.$SupportiveDocumentPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs>;

  /**
   * `prisma.schemeService`: Exposes CRUD operations for the **SchemeService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchemeServices
    * const schemeServices = await prisma.schemeService.findMany()
    * ```
    */
  get schemeService(): Prisma.SchemeServiceDelegate<ExtArgs>;

  /**
   * `prisma.certificateService`: Exposes CRUD operations for the **CertificateService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CertificateServices
    * const certificateServices = await prisma.certificateService.findMany()
    * ```
    */
  get certificateService(): Prisma.CertificateServiceDelegate<ExtArgs>;

  /**
   * `prisma.contactService`: Exposes CRUD operations for the **ContactService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactServices
    * const contactServices = await prisma.contactService.findMany()
    * ```
    */
  get contactService(): Prisma.ContactServiceDelegate<ExtArgs>;

  /**
   * `prisma.contactServiceContact`: Exposes CRUD operations for the **ContactServiceContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactServiceContacts
    * const contactServiceContacts = await prisma.contactServiceContact.findMany()
    * ```
    */
  get contactServiceContact(): Prisma.ContactServiceContactDelegate<ExtArgs>;

  /**
   * `prisma.grievance`: Exposes CRUD operations for the **Grievance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Grievances
    * const grievances = await prisma.grievance.findMany()
    * ```
    */
  get grievance(): Prisma.GrievanceDelegate<ExtArgs>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs>;

  /**
   * `prisma.contactPerson`: Exposes CRUD operations for the **ContactPerson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactPeople
    * const contactPeople = await prisma.contactPerson.findMany()
    * ```
    */
  get contactPerson(): Prisma.ContactPersonDelegate<ExtArgs>;

  /**
   * `prisma.supportiveDocument`: Exposes CRUD operations for the **SupportiveDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportiveDocuments
    * const supportiveDocuments = await prisma.supportiveDocument.findMany()
    * ```
    */
  get supportiveDocument(): Prisma.SupportiveDocumentDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Admin: 'Admin',
    SchemeService: 'SchemeService',
    CertificateService: 'CertificateService',
    ContactService: 'ContactService',
    ContactServiceContact: 'ContactServiceContact',
    Grievance: 'Grievance',
    Feedback: 'Feedback',
    ContactPerson: 'ContactPerson',
    SupportiveDocument: 'SupportiveDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "admin" | "schemeService" | "certificateService" | "contactService" | "contactServiceContact" | "grievance" | "feedback" | "contactPerson" | "supportiveDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      SchemeService: {
        payload: Prisma.$SchemeServicePayload<ExtArgs>
        fields: Prisma.SchemeServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchemeServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchemeServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          findFirst: {
            args: Prisma.SchemeServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchemeServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          findMany: {
            args: Prisma.SchemeServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>[]
          }
          create: {
            args: Prisma.SchemeServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          createMany: {
            args: Prisma.SchemeServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchemeServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>[]
          }
          delete: {
            args: Prisma.SchemeServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          update: {
            args: Prisma.SchemeServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          deleteMany: {
            args: Prisma.SchemeServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchemeServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SchemeServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchemeServicePayload>
          }
          aggregate: {
            args: Prisma.SchemeServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchemeService>
          }
          groupBy: {
            args: Prisma.SchemeServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchemeServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchemeServiceCountArgs<ExtArgs>
            result: $Utils.Optional<SchemeServiceCountAggregateOutputType> | number
          }
        }
      }
      CertificateService: {
        payload: Prisma.$CertificateServicePayload<ExtArgs>
        fields: Prisma.CertificateServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          findFirst: {
            args: Prisma.CertificateServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          findMany: {
            args: Prisma.CertificateServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>[]
          }
          create: {
            args: Prisma.CertificateServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          createMany: {
            args: Prisma.CertificateServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>[]
          }
          delete: {
            args: Prisma.CertificateServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          update: {
            args: Prisma.CertificateServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          deleteMany: {
            args: Prisma.CertificateServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificateServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateServicePayload>
          }
          aggregate: {
            args: Prisma.CertificateServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificateService>
          }
          groupBy: {
            args: Prisma.CertificateServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateServiceCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateServiceCountAggregateOutputType> | number
          }
        }
      }
      ContactService: {
        payload: Prisma.$ContactServicePayload<ExtArgs>
        fields: Prisma.ContactServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          findFirst: {
            args: Prisma.ContactServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          findMany: {
            args: Prisma.ContactServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>[]
          }
          create: {
            args: Prisma.ContactServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          createMany: {
            args: Prisma.ContactServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>[]
          }
          delete: {
            args: Prisma.ContactServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          update: {
            args: Prisma.ContactServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          deleteMany: {
            args: Prisma.ContactServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServicePayload>
          }
          aggregate: {
            args: Prisma.ContactServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactService>
          }
          groupBy: {
            args: Prisma.ContactServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ContactServiceCountAggregateOutputType> | number
          }
        }
      }
      ContactServiceContact: {
        payload: Prisma.$ContactServiceContactPayload<ExtArgs>
        fields: Prisma.ContactServiceContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactServiceContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactServiceContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          findFirst: {
            args: Prisma.ContactServiceContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactServiceContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          findMany: {
            args: Prisma.ContactServiceContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>[]
          }
          create: {
            args: Prisma.ContactServiceContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          createMany: {
            args: Prisma.ContactServiceContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactServiceContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>[]
          }
          delete: {
            args: Prisma.ContactServiceContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          update: {
            args: Prisma.ContactServiceContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactServiceContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactServiceContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactServiceContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactServiceContactPayload>
          }
          aggregate: {
            args: Prisma.ContactServiceContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactServiceContact>
          }
          groupBy: {
            args: Prisma.ContactServiceContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactServiceContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactServiceContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactServiceContactCountAggregateOutputType> | number
          }
        }
      }
      Grievance: {
        payload: Prisma.$GrievancePayload<ExtArgs>
        fields: Prisma.GrievanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrievanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrievanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          findFirst: {
            args: Prisma.GrievanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrievanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          findMany: {
            args: Prisma.GrievanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>[]
          }
          create: {
            args: Prisma.GrievanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          createMany: {
            args: Prisma.GrievanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrievanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>[]
          }
          delete: {
            args: Prisma.GrievanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          update: {
            args: Prisma.GrievanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          deleteMany: {
            args: Prisma.GrievanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrievanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GrievanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrievancePayload>
          }
          aggregate: {
            args: Prisma.GrievanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrievance>
          }
          groupBy: {
            args: Prisma.GrievanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrievanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrievanceCountArgs<ExtArgs>
            result: $Utils.Optional<GrievanceCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      ContactPerson: {
        payload: Prisma.$ContactPersonPayload<ExtArgs>
        fields: Prisma.ContactPersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactPersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactPersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          findFirst: {
            args: Prisma.ContactPersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactPersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          findMany: {
            args: Prisma.ContactPersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>[]
          }
          create: {
            args: Prisma.ContactPersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          createMany: {
            args: Prisma.ContactPersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactPersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>[]
          }
          delete: {
            args: Prisma.ContactPersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          update: {
            args: Prisma.ContactPersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          deleteMany: {
            args: Prisma.ContactPersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactPersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactPersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          aggregate: {
            args: Prisma.ContactPersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactPerson>
          }
          groupBy: {
            args: Prisma.ContactPersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactPersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactPersonCountArgs<ExtArgs>
            result: $Utils.Optional<ContactPersonCountAggregateOutputType> | number
          }
        }
      }
      SupportiveDocument: {
        payload: Prisma.$SupportiveDocumentPayload<ExtArgs>
        fields: Prisma.SupportiveDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportiveDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportiveDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          findFirst: {
            args: Prisma.SupportiveDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportiveDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          findMany: {
            args: Prisma.SupportiveDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>[]
          }
          create: {
            args: Prisma.SupportiveDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          createMany: {
            args: Prisma.SupportiveDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportiveDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>[]
          }
          delete: {
            args: Prisma.SupportiveDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          update: {
            args: Prisma.SupportiveDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          deleteMany: {
            args: Prisma.SupportiveDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportiveDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupportiveDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportiveDocumentPayload>
          }
          aggregate: {
            args: Prisma.SupportiveDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportiveDocument>
          }
          groupBy: {
            args: Prisma.SupportiveDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportiveDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportiveDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<SupportiveDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    schemeServices: number
    certificateServices: number
    contactServices: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeServices?: boolean | AdminCountOutputTypeCountSchemeServicesArgs
    certificateServices?: boolean | AdminCountOutputTypeCountCertificateServicesArgs
    contactServices?: boolean | AdminCountOutputTypeCountContactServicesArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountSchemeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchemeServiceWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountCertificateServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateServiceWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountContactServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactServiceWhereInput
  }


  /**
   * Count Type SchemeServiceCountOutputType
   */

  export type SchemeServiceCountOutputType = {
    contacts: number
    documents: number
  }

  export type SchemeServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | SchemeServiceCountOutputTypeCountContactsArgs
    documents?: boolean | SchemeServiceCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * SchemeServiceCountOutputType without action
   */
  export type SchemeServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeServiceCountOutputType
     */
    select?: SchemeServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchemeServiceCountOutputType without action
   */
  export type SchemeServiceCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactPersonWhereInput
  }

  /**
   * SchemeServiceCountOutputType without action
   */
  export type SchemeServiceCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportiveDocumentWhereInput
  }


  /**
   * Count Type ContactServiceCountOutputType
   */

  export type ContactServiceCountOutputType = {
    contacts: number
  }

  export type ContactServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | ContactServiceCountOutputTypeCountContactsArgs
  }

  // Custom InputTypes
  /**
   * ContactServiceCountOutputType without action
   */
  export type ContactServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceCountOutputType
     */
    select?: ContactServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactServiceCountOutputType without action
   */
  export type ContactServiceCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactServiceContactWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    email: string
    name: string
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schemeServices?: boolean | Admin$schemeServicesArgs<ExtArgs>
    certificateServices?: boolean | Admin$certificateServicesArgs<ExtArgs>
    contactServices?: boolean | Admin$contactServicesArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeServices?: boolean | Admin$schemeServicesArgs<ExtArgs>
    certificateServices?: boolean | Admin$certificateServicesArgs<ExtArgs>
    contactServices?: boolean | Admin$contactServicesArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      schemeServices: Prisma.$SchemeServicePayload<ExtArgs>[]
      certificateServices: Prisma.$CertificateServicePayload<ExtArgs>[]
      contactServices: Prisma.$ContactServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string
      password: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schemeServices<T extends Admin$schemeServicesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$schemeServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findMany"> | Null>
    certificateServices<T extends Admin$certificateServicesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$certificateServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findMany"> | Null>
    contactServices<T extends Admin$contactServicesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$contactServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */ 
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
  }

  /**
   * Admin.schemeServices
   */
  export type Admin$schemeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    where?: SchemeServiceWhereInput
    orderBy?: SchemeServiceOrderByWithRelationInput | SchemeServiceOrderByWithRelationInput[]
    cursor?: SchemeServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchemeServiceScalarFieldEnum | SchemeServiceScalarFieldEnum[]
  }

  /**
   * Admin.certificateServices
   */
  export type Admin$certificateServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    where?: CertificateServiceWhereInput
    orderBy?: CertificateServiceOrderByWithRelationInput | CertificateServiceOrderByWithRelationInput[]
    cursor?: CertificateServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificateServiceScalarFieldEnum | CertificateServiceScalarFieldEnum[]
  }

  /**
   * Admin.contactServices
   */
  export type Admin$contactServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    where?: ContactServiceWhereInput
    orderBy?: ContactServiceOrderByWithRelationInput | ContactServiceOrderByWithRelationInput[]
    cursor?: ContactServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactServiceScalarFieldEnum | ContactServiceScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model SchemeService
   */

  export type AggregateSchemeService = {
    _count: SchemeServiceCountAggregateOutputType | null
    _avg: SchemeServiceAvgAggregateOutputType | null
    _sum: SchemeServiceSumAggregateOutputType | null
    _min: SchemeServiceMinAggregateOutputType | null
    _max: SchemeServiceMaxAggregateOutputType | null
  }

  export type SchemeServiceAvgAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type SchemeServiceSumAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type SchemeServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    summary: string | null
    type: string | null
    applicationMode: string | null
    onlineUrl: string | null
    offlineAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type SchemeServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    summary: string | null
    type: string | null
    applicationMode: string | null
    onlineUrl: string | null
    offlineAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type SchemeServiceCountAggregateOutputType = {
    id: number
    name: number
    summary: number
    type: number
    targetAudience: number
    applicationMode: number
    onlineUrl: number
    offlineAddress: number
    status: number
    isActive: number
    eligibilityDetails: number
    benefitDetails: number
    applicationProcess: number
    requiredDocuments: number
    createdAt: number
    updatedAt: number
    adminId: number
    _all: number
  }


  export type SchemeServiceAvgAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type SchemeServiceSumAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type SchemeServiceMinAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type SchemeServiceMaxAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type SchemeServiceCountAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    targetAudience?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    eligibilityDetails?: true
    benefitDetails?: true
    applicationProcess?: true
    requiredDocuments?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
    _all?: true
  }

  export type SchemeServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchemeService to aggregate.
     */
    where?: SchemeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchemeServices to fetch.
     */
    orderBy?: SchemeServiceOrderByWithRelationInput | SchemeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchemeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchemeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchemeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchemeServices
    **/
    _count?: true | SchemeServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchemeServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchemeServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchemeServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchemeServiceMaxAggregateInputType
  }

  export type GetSchemeServiceAggregateType<T extends SchemeServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateSchemeService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchemeService[P]>
      : GetScalarType<T[P], AggregateSchemeService[P]>
  }




  export type SchemeServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchemeServiceWhereInput
    orderBy?: SchemeServiceOrderByWithAggregationInput | SchemeServiceOrderByWithAggregationInput[]
    by: SchemeServiceScalarFieldEnum[] | SchemeServiceScalarFieldEnum
    having?: SchemeServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchemeServiceCountAggregateInputType | true
    _avg?: SchemeServiceAvgAggregateInputType
    _sum?: SchemeServiceSumAggregateInputType
    _min?: SchemeServiceMinAggregateInputType
    _max?: SchemeServiceMaxAggregateInputType
  }

  export type SchemeServiceGroupByOutputType = {
    id: number
    name: string
    summary: string
    type: string | null
    targetAudience: string[]
    applicationMode: string
    onlineUrl: string | null
    offlineAddress: string | null
    status: string
    isActive: boolean
    eligibilityDetails: string[]
    benefitDetails: string[]
    applicationProcess: string[]
    requiredDocuments: string[]
    createdAt: Date
    updatedAt: Date
    adminId: number
    _count: SchemeServiceCountAggregateOutputType | null
    _avg: SchemeServiceAvgAggregateOutputType | null
    _sum: SchemeServiceSumAggregateOutputType | null
    _min: SchemeServiceMinAggregateOutputType | null
    _max: SchemeServiceMaxAggregateOutputType | null
  }

  type GetSchemeServiceGroupByPayload<T extends SchemeServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchemeServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchemeServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchemeServiceGroupByOutputType[P]>
            : GetScalarType<T[P], SchemeServiceGroupByOutputType[P]>
        }
      >
    >


  export type SchemeServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    eligibilityDetails?: boolean
    benefitDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    contacts?: boolean | SchemeService$contactsArgs<ExtArgs>
    documents?: boolean | SchemeService$documentsArgs<ExtArgs>
    _count?: boolean | SchemeServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schemeService"]>

  export type SchemeServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    eligibilityDetails?: boolean
    benefitDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schemeService"]>

  export type SchemeServiceSelectScalar = {
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    eligibilityDetails?: boolean
    benefitDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
  }

  export type SchemeServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    contacts?: boolean | SchemeService$contactsArgs<ExtArgs>
    documents?: boolean | SchemeService$documentsArgs<ExtArgs>
    _count?: boolean | SchemeServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchemeServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $SchemeServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchemeService"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
      contacts: Prisma.$ContactPersonPayload<ExtArgs>[]
      documents: Prisma.$SupportiveDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      summary: string
      type: string | null
      targetAudience: string[]
      applicationMode: string
      onlineUrl: string | null
      offlineAddress: string | null
      status: string
      isActive: boolean
      eligibilityDetails: string[]
      benefitDetails: string[]
      applicationProcess: string[]
      requiredDocuments: string[]
      createdAt: Date
      updatedAt: Date
      adminId: number
    }, ExtArgs["result"]["schemeService"]>
    composites: {}
  }

  type SchemeServiceGetPayload<S extends boolean | null | undefined | SchemeServiceDefaultArgs> = $Result.GetResult<Prisma.$SchemeServicePayload, S>

  type SchemeServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SchemeServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchemeServiceCountAggregateInputType | true
    }

  export interface SchemeServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchemeService'], meta: { name: 'SchemeService' } }
    /**
     * Find zero or one SchemeService that matches the filter.
     * @param {SchemeServiceFindUniqueArgs} args - Arguments to find a SchemeService
     * @example
     * // Get one SchemeService
     * const schemeService = await prisma.schemeService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchemeServiceFindUniqueArgs>(args: SelectSubset<T, SchemeServiceFindUniqueArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SchemeService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SchemeServiceFindUniqueOrThrowArgs} args - Arguments to find a SchemeService
     * @example
     * // Get one SchemeService
     * const schemeService = await prisma.schemeService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchemeServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, SchemeServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SchemeService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceFindFirstArgs} args - Arguments to find a SchemeService
     * @example
     * // Get one SchemeService
     * const schemeService = await prisma.schemeService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchemeServiceFindFirstArgs>(args?: SelectSubset<T, SchemeServiceFindFirstArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SchemeService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceFindFirstOrThrowArgs} args - Arguments to find a SchemeService
     * @example
     * // Get one SchemeService
     * const schemeService = await prisma.schemeService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchemeServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, SchemeServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SchemeServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchemeServices
     * const schemeServices = await prisma.schemeService.findMany()
     * 
     * // Get first 10 SchemeServices
     * const schemeServices = await prisma.schemeService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schemeServiceWithIdOnly = await prisma.schemeService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchemeServiceFindManyArgs>(args?: SelectSubset<T, SchemeServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SchemeService.
     * @param {SchemeServiceCreateArgs} args - Arguments to create a SchemeService.
     * @example
     * // Create one SchemeService
     * const SchemeService = await prisma.schemeService.create({
     *   data: {
     *     // ... data to create a SchemeService
     *   }
     * })
     * 
     */
    create<T extends SchemeServiceCreateArgs>(args: SelectSubset<T, SchemeServiceCreateArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SchemeServices.
     * @param {SchemeServiceCreateManyArgs} args - Arguments to create many SchemeServices.
     * @example
     * // Create many SchemeServices
     * const schemeService = await prisma.schemeService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchemeServiceCreateManyArgs>(args?: SelectSubset<T, SchemeServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SchemeServices and returns the data saved in the database.
     * @param {SchemeServiceCreateManyAndReturnArgs} args - Arguments to create many SchemeServices.
     * @example
     * // Create many SchemeServices
     * const schemeService = await prisma.schemeService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SchemeServices and only return the `id`
     * const schemeServiceWithIdOnly = await prisma.schemeService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchemeServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, SchemeServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SchemeService.
     * @param {SchemeServiceDeleteArgs} args - Arguments to delete one SchemeService.
     * @example
     * // Delete one SchemeService
     * const SchemeService = await prisma.schemeService.delete({
     *   where: {
     *     // ... filter to delete one SchemeService
     *   }
     * })
     * 
     */
    delete<T extends SchemeServiceDeleteArgs>(args: SelectSubset<T, SchemeServiceDeleteArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SchemeService.
     * @param {SchemeServiceUpdateArgs} args - Arguments to update one SchemeService.
     * @example
     * // Update one SchemeService
     * const schemeService = await prisma.schemeService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchemeServiceUpdateArgs>(args: SelectSubset<T, SchemeServiceUpdateArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SchemeServices.
     * @param {SchemeServiceDeleteManyArgs} args - Arguments to filter SchemeServices to delete.
     * @example
     * // Delete a few SchemeServices
     * const { count } = await prisma.schemeService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchemeServiceDeleteManyArgs>(args?: SelectSubset<T, SchemeServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchemeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchemeServices
     * const schemeService = await prisma.schemeService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchemeServiceUpdateManyArgs>(args: SelectSubset<T, SchemeServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SchemeService.
     * @param {SchemeServiceUpsertArgs} args - Arguments to update or create a SchemeService.
     * @example
     * // Update or create a SchemeService
     * const schemeService = await prisma.schemeService.upsert({
     *   create: {
     *     // ... data to create a SchemeService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchemeService we want to update
     *   }
     * })
     */
    upsert<T extends SchemeServiceUpsertArgs>(args: SelectSubset<T, SchemeServiceUpsertArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SchemeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceCountArgs} args - Arguments to filter SchemeServices to count.
     * @example
     * // Count the number of SchemeServices
     * const count = await prisma.schemeService.count({
     *   where: {
     *     // ... the filter for the SchemeServices we want to count
     *   }
     * })
    **/
    count<T extends SchemeServiceCountArgs>(
      args?: Subset<T, SchemeServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchemeServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchemeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchemeServiceAggregateArgs>(args: Subset<T, SchemeServiceAggregateArgs>): Prisma.PrismaPromise<GetSchemeServiceAggregateType<T>>

    /**
     * Group by SchemeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemeServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchemeServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchemeServiceGroupByArgs['orderBy'] }
        : { orderBy?: SchemeServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchemeServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchemeServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchemeService model
   */
  readonly fields: SchemeServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchemeService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchemeServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    contacts<T extends SchemeService$contactsArgs<ExtArgs> = {}>(args?: Subset<T, SchemeService$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends SchemeService$documentsArgs<ExtArgs> = {}>(args?: Subset<T, SchemeService$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SchemeService model
   */ 
  interface SchemeServiceFieldRefs {
    readonly id: FieldRef<"SchemeService", 'Int'>
    readonly name: FieldRef<"SchemeService", 'String'>
    readonly summary: FieldRef<"SchemeService", 'String'>
    readonly type: FieldRef<"SchemeService", 'String'>
    readonly targetAudience: FieldRef<"SchemeService", 'String[]'>
    readonly applicationMode: FieldRef<"SchemeService", 'String'>
    readonly onlineUrl: FieldRef<"SchemeService", 'String'>
    readonly offlineAddress: FieldRef<"SchemeService", 'String'>
    readonly status: FieldRef<"SchemeService", 'String'>
    readonly isActive: FieldRef<"SchemeService", 'Boolean'>
    readonly eligibilityDetails: FieldRef<"SchemeService", 'String[]'>
    readonly benefitDetails: FieldRef<"SchemeService", 'String[]'>
    readonly applicationProcess: FieldRef<"SchemeService", 'String[]'>
    readonly requiredDocuments: FieldRef<"SchemeService", 'String[]'>
    readonly createdAt: FieldRef<"SchemeService", 'DateTime'>
    readonly updatedAt: FieldRef<"SchemeService", 'DateTime'>
    readonly adminId: FieldRef<"SchemeService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SchemeService findUnique
   */
  export type SchemeServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter, which SchemeService to fetch.
     */
    where: SchemeServiceWhereUniqueInput
  }

  /**
   * SchemeService findUniqueOrThrow
   */
  export type SchemeServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter, which SchemeService to fetch.
     */
    where: SchemeServiceWhereUniqueInput
  }

  /**
   * SchemeService findFirst
   */
  export type SchemeServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter, which SchemeService to fetch.
     */
    where?: SchemeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchemeServices to fetch.
     */
    orderBy?: SchemeServiceOrderByWithRelationInput | SchemeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchemeServices.
     */
    cursor?: SchemeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchemeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchemeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchemeServices.
     */
    distinct?: SchemeServiceScalarFieldEnum | SchemeServiceScalarFieldEnum[]
  }

  /**
   * SchemeService findFirstOrThrow
   */
  export type SchemeServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter, which SchemeService to fetch.
     */
    where?: SchemeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchemeServices to fetch.
     */
    orderBy?: SchemeServiceOrderByWithRelationInput | SchemeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchemeServices.
     */
    cursor?: SchemeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchemeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchemeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchemeServices.
     */
    distinct?: SchemeServiceScalarFieldEnum | SchemeServiceScalarFieldEnum[]
  }

  /**
   * SchemeService findMany
   */
  export type SchemeServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter, which SchemeServices to fetch.
     */
    where?: SchemeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchemeServices to fetch.
     */
    orderBy?: SchemeServiceOrderByWithRelationInput | SchemeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchemeServices.
     */
    cursor?: SchemeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchemeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchemeServices.
     */
    skip?: number
    distinct?: SchemeServiceScalarFieldEnum | SchemeServiceScalarFieldEnum[]
  }

  /**
   * SchemeService create
   */
  export type SchemeServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a SchemeService.
     */
    data: XOR<SchemeServiceCreateInput, SchemeServiceUncheckedCreateInput>
  }

  /**
   * SchemeService createMany
   */
  export type SchemeServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchemeServices.
     */
    data: SchemeServiceCreateManyInput | SchemeServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchemeService createManyAndReturn
   */
  export type SchemeServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SchemeServices.
     */
    data: SchemeServiceCreateManyInput | SchemeServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SchemeService update
   */
  export type SchemeServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a SchemeService.
     */
    data: XOR<SchemeServiceUpdateInput, SchemeServiceUncheckedUpdateInput>
    /**
     * Choose, which SchemeService to update.
     */
    where: SchemeServiceWhereUniqueInput
  }

  /**
   * SchemeService updateMany
   */
  export type SchemeServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchemeServices.
     */
    data: XOR<SchemeServiceUpdateManyMutationInput, SchemeServiceUncheckedUpdateManyInput>
    /**
     * Filter which SchemeServices to update
     */
    where?: SchemeServiceWhereInput
  }

  /**
   * SchemeService upsert
   */
  export type SchemeServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the SchemeService to update in case it exists.
     */
    where: SchemeServiceWhereUniqueInput
    /**
     * In case the SchemeService found by the `where` argument doesn't exist, create a new SchemeService with this data.
     */
    create: XOR<SchemeServiceCreateInput, SchemeServiceUncheckedCreateInput>
    /**
     * In case the SchemeService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchemeServiceUpdateInput, SchemeServiceUncheckedUpdateInput>
  }

  /**
   * SchemeService delete
   */
  export type SchemeServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
    /**
     * Filter which SchemeService to delete.
     */
    where: SchemeServiceWhereUniqueInput
  }

  /**
   * SchemeService deleteMany
   */
  export type SchemeServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchemeServices to delete
     */
    where?: SchemeServiceWhereInput
  }

  /**
   * SchemeService.contacts
   */
  export type SchemeService$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    where?: ContactPersonWhereInput
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    cursor?: ContactPersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * SchemeService.documents
   */
  export type SchemeService$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    where?: SupportiveDocumentWhereInput
    orderBy?: SupportiveDocumentOrderByWithRelationInput | SupportiveDocumentOrderByWithRelationInput[]
    cursor?: SupportiveDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportiveDocumentScalarFieldEnum | SupportiveDocumentScalarFieldEnum[]
  }

  /**
   * SchemeService without action
   */
  export type SchemeServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemeService
     */
    select?: SchemeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchemeServiceInclude<ExtArgs> | null
  }


  /**
   * Model CertificateService
   */

  export type AggregateCertificateService = {
    _count: CertificateServiceCountAggregateOutputType | null
    _avg: CertificateServiceAvgAggregateOutputType | null
    _sum: CertificateServiceSumAggregateOutputType | null
    _min: CertificateServiceMinAggregateOutputType | null
    _max: CertificateServiceMaxAggregateOutputType | null
  }

  export type CertificateServiceAvgAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type CertificateServiceSumAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type CertificateServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    summary: string | null
    type: string | null
    applicationMode: string | null
    onlineUrl: string | null
    offlineAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type CertificateServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    summary: string | null
    type: string | null
    applicationMode: string | null
    onlineUrl: string | null
    offlineAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type CertificateServiceCountAggregateOutputType = {
    id: number
    name: number
    summary: number
    type: number
    targetAudience: number
    eligibilityDetails: number
    certificateDetails: number
    applicationProcess: number
    requiredDocuments: number
    applicationMode: number
    onlineUrl: number
    offlineAddress: number
    status: number
    isActive: number
    createdAt: number
    updatedAt: number
    adminId: number
    _all: number
  }


  export type CertificateServiceAvgAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type CertificateServiceSumAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type CertificateServiceMinAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type CertificateServiceMaxAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type CertificateServiceCountAggregateInputType = {
    id?: true
    name?: true
    summary?: true
    type?: true
    targetAudience?: true
    eligibilityDetails?: true
    certificateDetails?: true
    applicationProcess?: true
    requiredDocuments?: true
    applicationMode?: true
    onlineUrl?: true
    offlineAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
    _all?: true
  }

  export type CertificateServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateService to aggregate.
     */
    where?: CertificateServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateServices to fetch.
     */
    orderBy?: CertificateServiceOrderByWithRelationInput | CertificateServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CertificateServices
    **/
    _count?: true | CertificateServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CertificateServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CertificateServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateServiceMaxAggregateInputType
  }

  export type GetCertificateServiceAggregateType<T extends CertificateServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificateService[P]>
      : GetScalarType<T[P], AggregateCertificateService[P]>
  }




  export type CertificateServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateServiceWhereInput
    orderBy?: CertificateServiceOrderByWithAggregationInput | CertificateServiceOrderByWithAggregationInput[]
    by: CertificateServiceScalarFieldEnum[] | CertificateServiceScalarFieldEnum
    having?: CertificateServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateServiceCountAggregateInputType | true
    _avg?: CertificateServiceAvgAggregateInputType
    _sum?: CertificateServiceSumAggregateInputType
    _min?: CertificateServiceMinAggregateInputType
    _max?: CertificateServiceMaxAggregateInputType
  }

  export type CertificateServiceGroupByOutputType = {
    id: number
    name: string
    summary: string
    type: string | null
    targetAudience: string[]
    eligibilityDetails: string[]
    certificateDetails: string[]
    applicationProcess: string[]
    requiredDocuments: string[]
    applicationMode: string
    onlineUrl: string | null
    offlineAddress: string | null
    status: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    adminId: number
    _count: CertificateServiceCountAggregateOutputType | null
    _avg: CertificateServiceAvgAggregateOutputType | null
    _sum: CertificateServiceSumAggregateOutputType | null
    _min: CertificateServiceMinAggregateOutputType | null
    _max: CertificateServiceMaxAggregateOutputType | null
  }

  type GetCertificateServiceGroupByPayload<T extends CertificateServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateServiceGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateServiceGroupByOutputType[P]>
        }
      >
    >


  export type CertificateServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    eligibilityDetails?: boolean
    certificateDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateService"]>

  export type CertificateServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    eligibilityDetails?: boolean
    certificateDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateService"]>

  export type CertificateServiceSelectScalar = {
    id?: boolean
    name?: boolean
    summary?: boolean
    type?: boolean
    targetAudience?: boolean
    eligibilityDetails?: boolean
    certificateDetails?: boolean
    applicationProcess?: boolean
    requiredDocuments?: boolean
    applicationMode?: boolean
    onlineUrl?: boolean
    offlineAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
  }

  export type CertificateServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type CertificateServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $CertificateServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CertificateService"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      summary: string
      type: string | null
      targetAudience: string[]
      eligibilityDetails: string[]
      certificateDetails: string[]
      applicationProcess: string[]
      requiredDocuments: string[]
      applicationMode: string
      onlineUrl: string | null
      offlineAddress: string | null
      status: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      adminId: number
    }, ExtArgs["result"]["certificateService"]>
    composites: {}
  }

  type CertificateServiceGetPayload<S extends boolean | null | undefined | CertificateServiceDefaultArgs> = $Result.GetResult<Prisma.$CertificateServicePayload, S>

  type CertificateServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CertificateServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CertificateServiceCountAggregateInputType | true
    }

  export interface CertificateServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CertificateService'], meta: { name: 'CertificateService' } }
    /**
     * Find zero or one CertificateService that matches the filter.
     * @param {CertificateServiceFindUniqueArgs} args - Arguments to find a CertificateService
     * @example
     * // Get one CertificateService
     * const certificateService = await prisma.certificateService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateServiceFindUniqueArgs>(args: SelectSubset<T, CertificateServiceFindUniqueArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CertificateService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CertificateServiceFindUniqueOrThrowArgs} args - Arguments to find a CertificateService
     * @example
     * // Get one CertificateService
     * const certificateService = await prisma.certificateService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CertificateService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceFindFirstArgs} args - Arguments to find a CertificateService
     * @example
     * // Get one CertificateService
     * const certificateService = await prisma.certificateService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateServiceFindFirstArgs>(args?: SelectSubset<T, CertificateServiceFindFirstArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CertificateService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceFindFirstOrThrowArgs} args - Arguments to find a CertificateService
     * @example
     * // Get one CertificateService
     * const certificateService = await prisma.certificateService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CertificateServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CertificateServices
     * const certificateServices = await prisma.certificateService.findMany()
     * 
     * // Get first 10 CertificateServices
     * const certificateServices = await prisma.certificateService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateServiceWithIdOnly = await prisma.certificateService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateServiceFindManyArgs>(args?: SelectSubset<T, CertificateServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CertificateService.
     * @param {CertificateServiceCreateArgs} args - Arguments to create a CertificateService.
     * @example
     * // Create one CertificateService
     * const CertificateService = await prisma.certificateService.create({
     *   data: {
     *     // ... data to create a CertificateService
     *   }
     * })
     * 
     */
    create<T extends CertificateServiceCreateArgs>(args: SelectSubset<T, CertificateServiceCreateArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CertificateServices.
     * @param {CertificateServiceCreateManyArgs} args - Arguments to create many CertificateServices.
     * @example
     * // Create many CertificateServices
     * const certificateService = await prisma.certificateService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateServiceCreateManyArgs>(args?: SelectSubset<T, CertificateServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CertificateServices and returns the data saved in the database.
     * @param {CertificateServiceCreateManyAndReturnArgs} args - Arguments to create many CertificateServices.
     * @example
     * // Create many CertificateServices
     * const certificateService = await prisma.certificateService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CertificateServices and only return the `id`
     * const certificateServiceWithIdOnly = await prisma.certificateService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CertificateService.
     * @param {CertificateServiceDeleteArgs} args - Arguments to delete one CertificateService.
     * @example
     * // Delete one CertificateService
     * const CertificateService = await prisma.certificateService.delete({
     *   where: {
     *     // ... filter to delete one CertificateService
     *   }
     * })
     * 
     */
    delete<T extends CertificateServiceDeleteArgs>(args: SelectSubset<T, CertificateServiceDeleteArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CertificateService.
     * @param {CertificateServiceUpdateArgs} args - Arguments to update one CertificateService.
     * @example
     * // Update one CertificateService
     * const certificateService = await prisma.certificateService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateServiceUpdateArgs>(args: SelectSubset<T, CertificateServiceUpdateArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CertificateServices.
     * @param {CertificateServiceDeleteManyArgs} args - Arguments to filter CertificateServices to delete.
     * @example
     * // Delete a few CertificateServices
     * const { count } = await prisma.certificateService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateServiceDeleteManyArgs>(args?: SelectSubset<T, CertificateServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CertificateServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CertificateServices
     * const certificateService = await prisma.certificateService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateServiceUpdateManyArgs>(args: SelectSubset<T, CertificateServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CertificateService.
     * @param {CertificateServiceUpsertArgs} args - Arguments to update or create a CertificateService.
     * @example
     * // Update or create a CertificateService
     * const certificateService = await prisma.certificateService.upsert({
     *   create: {
     *     // ... data to create a CertificateService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CertificateService we want to update
     *   }
     * })
     */
    upsert<T extends CertificateServiceUpsertArgs>(args: SelectSubset<T, CertificateServiceUpsertArgs<ExtArgs>>): Prisma__CertificateServiceClient<$Result.GetResult<Prisma.$CertificateServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CertificateServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceCountArgs} args - Arguments to filter CertificateServices to count.
     * @example
     * // Count the number of CertificateServices
     * const count = await prisma.certificateService.count({
     *   where: {
     *     // ... the filter for the CertificateServices we want to count
     *   }
     * })
    **/
    count<T extends CertificateServiceCountArgs>(
      args?: Subset<T, CertificateServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CertificateService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificateServiceAggregateArgs>(args: Subset<T, CertificateServiceAggregateArgs>): Prisma.PrismaPromise<GetCertificateServiceAggregateType<T>>

    /**
     * Group by CertificateService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificateServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateServiceGroupByArgs['orderBy'] }
        : { orderBy?: CertificateServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificateServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CertificateService model
   */
  readonly fields: CertificateServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CertificateService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CertificateService model
   */ 
  interface CertificateServiceFieldRefs {
    readonly id: FieldRef<"CertificateService", 'Int'>
    readonly name: FieldRef<"CertificateService", 'String'>
    readonly summary: FieldRef<"CertificateService", 'String'>
    readonly type: FieldRef<"CertificateService", 'String'>
    readonly targetAudience: FieldRef<"CertificateService", 'String[]'>
    readonly eligibilityDetails: FieldRef<"CertificateService", 'String[]'>
    readonly certificateDetails: FieldRef<"CertificateService", 'String[]'>
    readonly applicationProcess: FieldRef<"CertificateService", 'String[]'>
    readonly requiredDocuments: FieldRef<"CertificateService", 'String[]'>
    readonly applicationMode: FieldRef<"CertificateService", 'String'>
    readonly onlineUrl: FieldRef<"CertificateService", 'String'>
    readonly offlineAddress: FieldRef<"CertificateService", 'String'>
    readonly status: FieldRef<"CertificateService", 'String'>
    readonly isActive: FieldRef<"CertificateService", 'Boolean'>
    readonly createdAt: FieldRef<"CertificateService", 'DateTime'>
    readonly updatedAt: FieldRef<"CertificateService", 'DateTime'>
    readonly adminId: FieldRef<"CertificateService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CertificateService findUnique
   */
  export type CertificateServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter, which CertificateService to fetch.
     */
    where: CertificateServiceWhereUniqueInput
  }

  /**
   * CertificateService findUniqueOrThrow
   */
  export type CertificateServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter, which CertificateService to fetch.
     */
    where: CertificateServiceWhereUniqueInput
  }

  /**
   * CertificateService findFirst
   */
  export type CertificateServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter, which CertificateService to fetch.
     */
    where?: CertificateServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateServices to fetch.
     */
    orderBy?: CertificateServiceOrderByWithRelationInput | CertificateServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateServices.
     */
    cursor?: CertificateServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateServices.
     */
    distinct?: CertificateServiceScalarFieldEnum | CertificateServiceScalarFieldEnum[]
  }

  /**
   * CertificateService findFirstOrThrow
   */
  export type CertificateServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter, which CertificateService to fetch.
     */
    where?: CertificateServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateServices to fetch.
     */
    orderBy?: CertificateServiceOrderByWithRelationInput | CertificateServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateServices.
     */
    cursor?: CertificateServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateServices.
     */
    distinct?: CertificateServiceScalarFieldEnum | CertificateServiceScalarFieldEnum[]
  }

  /**
   * CertificateService findMany
   */
  export type CertificateServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter, which CertificateServices to fetch.
     */
    where?: CertificateServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateServices to fetch.
     */
    orderBy?: CertificateServiceOrderByWithRelationInput | CertificateServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CertificateServices.
     */
    cursor?: CertificateServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateServices.
     */
    skip?: number
    distinct?: CertificateServiceScalarFieldEnum | CertificateServiceScalarFieldEnum[]
  }

  /**
   * CertificateService create
   */
  export type CertificateServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a CertificateService.
     */
    data: XOR<CertificateServiceCreateInput, CertificateServiceUncheckedCreateInput>
  }

  /**
   * CertificateService createMany
   */
  export type CertificateServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CertificateServices.
     */
    data: CertificateServiceCreateManyInput | CertificateServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CertificateService createManyAndReturn
   */
  export type CertificateServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CertificateServices.
     */
    data: CertificateServiceCreateManyInput | CertificateServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CertificateService update
   */
  export type CertificateServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a CertificateService.
     */
    data: XOR<CertificateServiceUpdateInput, CertificateServiceUncheckedUpdateInput>
    /**
     * Choose, which CertificateService to update.
     */
    where: CertificateServiceWhereUniqueInput
  }

  /**
   * CertificateService updateMany
   */
  export type CertificateServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CertificateServices.
     */
    data: XOR<CertificateServiceUpdateManyMutationInput, CertificateServiceUncheckedUpdateManyInput>
    /**
     * Filter which CertificateServices to update
     */
    where?: CertificateServiceWhereInput
  }

  /**
   * CertificateService upsert
   */
  export type CertificateServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the CertificateService to update in case it exists.
     */
    where: CertificateServiceWhereUniqueInput
    /**
     * In case the CertificateService found by the `where` argument doesn't exist, create a new CertificateService with this data.
     */
    create: XOR<CertificateServiceCreateInput, CertificateServiceUncheckedCreateInput>
    /**
     * In case the CertificateService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateServiceUpdateInput, CertificateServiceUncheckedUpdateInput>
  }

  /**
   * CertificateService delete
   */
  export type CertificateServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
    /**
     * Filter which CertificateService to delete.
     */
    where: CertificateServiceWhereUniqueInput
  }

  /**
   * CertificateService deleteMany
   */
  export type CertificateServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateServices to delete
     */
    where?: CertificateServiceWhereInput
  }

  /**
   * CertificateService without action
   */
  export type CertificateServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateService
     */
    select?: CertificateServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateServiceInclude<ExtArgs> | null
  }


  /**
   * Model ContactService
   */

  export type AggregateContactService = {
    _count: ContactServiceCountAggregateOutputType | null
    _avg: ContactServiceAvgAggregateOutputType | null
    _sum: ContactServiceSumAggregateOutputType | null
    _min: ContactServiceMinAggregateOutputType | null
    _max: ContactServiceMaxAggregateOutputType | null
  }

  export type ContactServiceAvgAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type ContactServiceSumAggregateOutputType = {
    id: number | null
    adminId: number | null
  }

  export type ContactServiceMinAggregateOutputType = {
    id: number | null
    serviceName: string | null
    district: string | null
    subDistrict: string | null
    block: string | null
    officeAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type ContactServiceMaxAggregateOutputType = {
    id: number | null
    serviceName: string | null
    district: string | null
    subDistrict: string | null
    block: string | null
    officeAddress: string | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: number | null
  }

  export type ContactServiceCountAggregateOutputType = {
    id: number
    serviceName: number
    district: number
    subDistrict: number
    block: number
    officeAddress: number
    status: number
    isActive: number
    createdAt: number
    updatedAt: number
    adminId: number
    _all: number
  }


  export type ContactServiceAvgAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type ContactServiceSumAggregateInputType = {
    id?: true
    adminId?: true
  }

  export type ContactServiceMinAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    officeAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type ContactServiceMaxAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    officeAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type ContactServiceCountAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    officeAddress?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
    _all?: true
  }

  export type ContactServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactService to aggregate.
     */
    where?: ContactServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServices to fetch.
     */
    orderBy?: ContactServiceOrderByWithRelationInput | ContactServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactServices
    **/
    _count?: true | ContactServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactServiceMaxAggregateInputType
  }

  export type GetContactServiceAggregateType<T extends ContactServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateContactService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactService[P]>
      : GetScalarType<T[P], AggregateContactService[P]>
  }




  export type ContactServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactServiceWhereInput
    orderBy?: ContactServiceOrderByWithAggregationInput | ContactServiceOrderByWithAggregationInput[]
    by: ContactServiceScalarFieldEnum[] | ContactServiceScalarFieldEnum
    having?: ContactServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactServiceCountAggregateInputType | true
    _avg?: ContactServiceAvgAggregateInputType
    _sum?: ContactServiceSumAggregateInputType
    _min?: ContactServiceMinAggregateInputType
    _max?: ContactServiceMaxAggregateInputType
  }

  export type ContactServiceGroupByOutputType = {
    id: number
    serviceName: string
    district: string
    subDistrict: string | null
    block: string
    officeAddress: string | null
    status: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    adminId: number
    _count: ContactServiceCountAggregateOutputType | null
    _avg: ContactServiceAvgAggregateOutputType | null
    _sum: ContactServiceSumAggregateOutputType | null
    _min: ContactServiceMinAggregateOutputType | null
    _max: ContactServiceMaxAggregateOutputType | null
  }

  type GetContactServiceGroupByPayload<T extends ContactServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ContactServiceGroupByOutputType[P]>
        }
      >
    >


  export type ContactServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    officeAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    contacts?: boolean | ContactService$contactsArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    _count?: boolean | ContactServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactService"]>

  export type ContactServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    officeAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactService"]>

  export type ContactServiceSelectScalar = {
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    officeAddress?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
  }

  export type ContactServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | ContactService$contactsArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    _count?: boolean | ContactServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $ContactServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactService"
    objects: {
      contacts: Prisma.$ContactServiceContactPayload<ExtArgs>[]
      admin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serviceName: string
      district: string
      subDistrict: string | null
      block: string
      officeAddress: string | null
      status: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      adminId: number
    }, ExtArgs["result"]["contactService"]>
    composites: {}
  }

  type ContactServiceGetPayload<S extends boolean | null | undefined | ContactServiceDefaultArgs> = $Result.GetResult<Prisma.$ContactServicePayload, S>

  type ContactServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContactServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContactServiceCountAggregateInputType | true
    }

  export interface ContactServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactService'], meta: { name: 'ContactService' } }
    /**
     * Find zero or one ContactService that matches the filter.
     * @param {ContactServiceFindUniqueArgs} args - Arguments to find a ContactService
     * @example
     * // Get one ContactService
     * const contactService = await prisma.contactService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactServiceFindUniqueArgs>(args: SelectSubset<T, ContactServiceFindUniqueArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContactService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContactServiceFindUniqueOrThrowArgs} args - Arguments to find a ContactService
     * @example
     * // Get one ContactService
     * const contactService = await prisma.contactService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContactService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceFindFirstArgs} args - Arguments to find a ContactService
     * @example
     * // Get one ContactService
     * const contactService = await prisma.contactService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactServiceFindFirstArgs>(args?: SelectSubset<T, ContactServiceFindFirstArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContactService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceFindFirstOrThrowArgs} args - Arguments to find a ContactService
     * @example
     * // Get one ContactService
     * const contactService = await prisma.contactService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContactServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactServices
     * const contactServices = await prisma.contactService.findMany()
     * 
     * // Get first 10 ContactServices
     * const contactServices = await prisma.contactService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactServiceWithIdOnly = await prisma.contactService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactServiceFindManyArgs>(args?: SelectSubset<T, ContactServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContactService.
     * @param {ContactServiceCreateArgs} args - Arguments to create a ContactService.
     * @example
     * // Create one ContactService
     * const ContactService = await prisma.contactService.create({
     *   data: {
     *     // ... data to create a ContactService
     *   }
     * })
     * 
     */
    create<T extends ContactServiceCreateArgs>(args: SelectSubset<T, ContactServiceCreateArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContactServices.
     * @param {ContactServiceCreateManyArgs} args - Arguments to create many ContactServices.
     * @example
     * // Create many ContactServices
     * const contactService = await prisma.contactService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactServiceCreateManyArgs>(args?: SelectSubset<T, ContactServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactServices and returns the data saved in the database.
     * @param {ContactServiceCreateManyAndReturnArgs} args - Arguments to create many ContactServices.
     * @example
     * // Create many ContactServices
     * const contactService = await prisma.contactService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactServices and only return the `id`
     * const contactServiceWithIdOnly = await prisma.contactService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContactService.
     * @param {ContactServiceDeleteArgs} args - Arguments to delete one ContactService.
     * @example
     * // Delete one ContactService
     * const ContactService = await prisma.contactService.delete({
     *   where: {
     *     // ... filter to delete one ContactService
     *   }
     * })
     * 
     */
    delete<T extends ContactServiceDeleteArgs>(args: SelectSubset<T, ContactServiceDeleteArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContactService.
     * @param {ContactServiceUpdateArgs} args - Arguments to update one ContactService.
     * @example
     * // Update one ContactService
     * const contactService = await prisma.contactService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactServiceUpdateArgs>(args: SelectSubset<T, ContactServiceUpdateArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContactServices.
     * @param {ContactServiceDeleteManyArgs} args - Arguments to filter ContactServices to delete.
     * @example
     * // Delete a few ContactServices
     * const { count } = await prisma.contactService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactServiceDeleteManyArgs>(args?: SelectSubset<T, ContactServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactServices
     * const contactService = await prisma.contactService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactServiceUpdateManyArgs>(args: SelectSubset<T, ContactServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactService.
     * @param {ContactServiceUpsertArgs} args - Arguments to update or create a ContactService.
     * @example
     * // Update or create a ContactService
     * const contactService = await prisma.contactService.upsert({
     *   create: {
     *     // ... data to create a ContactService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactService we want to update
     *   }
     * })
     */
    upsert<T extends ContactServiceUpsertArgs>(args: SelectSubset<T, ContactServiceUpsertArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContactServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceCountArgs} args - Arguments to filter ContactServices to count.
     * @example
     * // Count the number of ContactServices
     * const count = await prisma.contactService.count({
     *   where: {
     *     // ... the filter for the ContactServices we want to count
     *   }
     * })
    **/
    count<T extends ContactServiceCountArgs>(
      args?: Subset<T, ContactServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactServiceAggregateArgs>(args: Subset<T, ContactServiceAggregateArgs>): Prisma.PrismaPromise<GetContactServiceAggregateType<T>>

    /**
     * Group by ContactService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactServiceGroupByArgs['orderBy'] }
        : { orderBy?: ContactServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactService model
   */
  readonly fields: ContactServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contacts<T extends ContactService$contactsArgs<ExtArgs> = {}>(args?: Subset<T, ContactService$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findMany"> | Null>
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactService model
   */ 
  interface ContactServiceFieldRefs {
    readonly id: FieldRef<"ContactService", 'Int'>
    readonly serviceName: FieldRef<"ContactService", 'String'>
    readonly district: FieldRef<"ContactService", 'String'>
    readonly subDistrict: FieldRef<"ContactService", 'String'>
    readonly block: FieldRef<"ContactService", 'String'>
    readonly officeAddress: FieldRef<"ContactService", 'String'>
    readonly status: FieldRef<"ContactService", 'String'>
    readonly isActive: FieldRef<"ContactService", 'Boolean'>
    readonly createdAt: FieldRef<"ContactService", 'DateTime'>
    readonly updatedAt: FieldRef<"ContactService", 'DateTime'>
    readonly adminId: FieldRef<"ContactService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ContactService findUnique
   */
  export type ContactServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter, which ContactService to fetch.
     */
    where: ContactServiceWhereUniqueInput
  }

  /**
   * ContactService findUniqueOrThrow
   */
  export type ContactServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter, which ContactService to fetch.
     */
    where: ContactServiceWhereUniqueInput
  }

  /**
   * ContactService findFirst
   */
  export type ContactServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter, which ContactService to fetch.
     */
    where?: ContactServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServices to fetch.
     */
    orderBy?: ContactServiceOrderByWithRelationInput | ContactServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactServices.
     */
    cursor?: ContactServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactServices.
     */
    distinct?: ContactServiceScalarFieldEnum | ContactServiceScalarFieldEnum[]
  }

  /**
   * ContactService findFirstOrThrow
   */
  export type ContactServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter, which ContactService to fetch.
     */
    where?: ContactServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServices to fetch.
     */
    orderBy?: ContactServiceOrderByWithRelationInput | ContactServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactServices.
     */
    cursor?: ContactServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactServices.
     */
    distinct?: ContactServiceScalarFieldEnum | ContactServiceScalarFieldEnum[]
  }

  /**
   * ContactService findMany
   */
  export type ContactServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter, which ContactServices to fetch.
     */
    where?: ContactServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServices to fetch.
     */
    orderBy?: ContactServiceOrderByWithRelationInput | ContactServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactServices.
     */
    cursor?: ContactServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServices.
     */
    skip?: number
    distinct?: ContactServiceScalarFieldEnum | ContactServiceScalarFieldEnum[]
  }

  /**
   * ContactService create
   */
  export type ContactServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactService.
     */
    data: XOR<ContactServiceCreateInput, ContactServiceUncheckedCreateInput>
  }

  /**
   * ContactService createMany
   */
  export type ContactServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactServices.
     */
    data: ContactServiceCreateManyInput | ContactServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactService createManyAndReturn
   */
  export type ContactServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContactServices.
     */
    data: ContactServiceCreateManyInput | ContactServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContactService update
   */
  export type ContactServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactService.
     */
    data: XOR<ContactServiceUpdateInput, ContactServiceUncheckedUpdateInput>
    /**
     * Choose, which ContactService to update.
     */
    where: ContactServiceWhereUniqueInput
  }

  /**
   * ContactService updateMany
   */
  export type ContactServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactServices.
     */
    data: XOR<ContactServiceUpdateManyMutationInput, ContactServiceUncheckedUpdateManyInput>
    /**
     * Filter which ContactServices to update
     */
    where?: ContactServiceWhereInput
  }

  /**
   * ContactService upsert
   */
  export type ContactServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactService to update in case it exists.
     */
    where: ContactServiceWhereUniqueInput
    /**
     * In case the ContactService found by the `where` argument doesn't exist, create a new ContactService with this data.
     */
    create: XOR<ContactServiceCreateInput, ContactServiceUncheckedCreateInput>
    /**
     * In case the ContactService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactServiceUpdateInput, ContactServiceUncheckedUpdateInput>
  }

  /**
   * ContactService delete
   */
  export type ContactServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
    /**
     * Filter which ContactService to delete.
     */
    where: ContactServiceWhereUniqueInput
  }

  /**
   * ContactService deleteMany
   */
  export type ContactServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactServices to delete
     */
    where?: ContactServiceWhereInput
  }

  /**
   * ContactService.contacts
   */
  export type ContactService$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    where?: ContactServiceContactWhereInput
    orderBy?: ContactServiceContactOrderByWithRelationInput | ContactServiceContactOrderByWithRelationInput[]
    cursor?: ContactServiceContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactServiceContactScalarFieldEnum | ContactServiceContactScalarFieldEnum[]
  }

  /**
   * ContactService without action
   */
  export type ContactServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactService
     */
    select?: ContactServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceInclude<ExtArgs> | null
  }


  /**
   * Model ContactServiceContact
   */

  export type AggregateContactServiceContact = {
    _count: ContactServiceContactCountAggregateOutputType | null
    _avg: ContactServiceContactAvgAggregateOutputType | null
    _sum: ContactServiceContactSumAggregateOutputType | null
    _min: ContactServiceContactMinAggregateOutputType | null
    _max: ContactServiceContactMaxAggregateOutputType | null
  }

  export type ContactServiceContactAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type ContactServiceContactSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type ContactServiceContactMinAggregateOutputType = {
    id: number | null
    name: string | null
    designation: string | null
    contact: string | null
    email: string | null
    serviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactServiceContactMaxAggregateOutputType = {
    id: number | null
    name: string | null
    designation: string | null
    contact: string | null
    email: string | null
    serviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactServiceContactCountAggregateOutputType = {
    id: number
    name: number
    designation: number
    contact: number
    email: number
    serviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactServiceContactAvgAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type ContactServiceContactSumAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type ContactServiceContactMinAggregateInputType = {
    id?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactServiceContactMaxAggregateInputType = {
    id?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactServiceContactCountAggregateInputType = {
    id?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactServiceContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactServiceContact to aggregate.
     */
    where?: ContactServiceContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServiceContacts to fetch.
     */
    orderBy?: ContactServiceContactOrderByWithRelationInput | ContactServiceContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactServiceContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServiceContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServiceContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactServiceContacts
    **/
    _count?: true | ContactServiceContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactServiceContactAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactServiceContactSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactServiceContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactServiceContactMaxAggregateInputType
  }

  export type GetContactServiceContactAggregateType<T extends ContactServiceContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContactServiceContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactServiceContact[P]>
      : GetScalarType<T[P], AggregateContactServiceContact[P]>
  }




  export type ContactServiceContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactServiceContactWhereInput
    orderBy?: ContactServiceContactOrderByWithAggregationInput | ContactServiceContactOrderByWithAggregationInput[]
    by: ContactServiceContactScalarFieldEnum[] | ContactServiceContactScalarFieldEnum
    having?: ContactServiceContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactServiceContactCountAggregateInputType | true
    _avg?: ContactServiceContactAvgAggregateInputType
    _sum?: ContactServiceContactSumAggregateInputType
    _min?: ContactServiceContactMinAggregateInputType
    _max?: ContactServiceContactMaxAggregateInputType
  }

  export type ContactServiceContactGroupByOutputType = {
    id: number
    name: string
    designation: string
    contact: string
    email: string | null
    serviceId: number
    createdAt: Date
    updatedAt: Date
    _count: ContactServiceContactCountAggregateOutputType | null
    _avg: ContactServiceContactAvgAggregateOutputType | null
    _sum: ContactServiceContactSumAggregateOutputType | null
    _min: ContactServiceContactMinAggregateOutputType | null
    _max: ContactServiceContactMaxAggregateOutputType | null
  }

  type GetContactServiceContactGroupByPayload<T extends ContactServiceContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactServiceContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactServiceContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactServiceContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactServiceContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactServiceContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ContactServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactServiceContact"]>

  export type ContactServiceContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ContactServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactServiceContact"]>

  export type ContactServiceContactSelectScalar = {
    id?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactServiceContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ContactServiceDefaultArgs<ExtArgs>
  }
  export type ContactServiceContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ContactServiceDefaultArgs<ExtArgs>
  }

  export type $ContactServiceContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactServiceContact"
    objects: {
      service: Prisma.$ContactServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      designation: string
      contact: string
      email: string | null
      serviceId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contactServiceContact"]>
    composites: {}
  }

  type ContactServiceContactGetPayload<S extends boolean | null | undefined | ContactServiceContactDefaultArgs> = $Result.GetResult<Prisma.$ContactServiceContactPayload, S>

  type ContactServiceContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContactServiceContactFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContactServiceContactCountAggregateInputType | true
    }

  export interface ContactServiceContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactServiceContact'], meta: { name: 'ContactServiceContact' } }
    /**
     * Find zero or one ContactServiceContact that matches the filter.
     * @param {ContactServiceContactFindUniqueArgs} args - Arguments to find a ContactServiceContact
     * @example
     * // Get one ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactServiceContactFindUniqueArgs>(args: SelectSubset<T, ContactServiceContactFindUniqueArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContactServiceContact that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContactServiceContactFindUniqueOrThrowArgs} args - Arguments to find a ContactServiceContact
     * @example
     * // Get one ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactServiceContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactServiceContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContactServiceContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactFindFirstArgs} args - Arguments to find a ContactServiceContact
     * @example
     * // Get one ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactServiceContactFindFirstArgs>(args?: SelectSubset<T, ContactServiceContactFindFirstArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContactServiceContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactFindFirstOrThrowArgs} args - Arguments to find a ContactServiceContact
     * @example
     * // Get one ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactServiceContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactServiceContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContactServiceContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactServiceContacts
     * const contactServiceContacts = await prisma.contactServiceContact.findMany()
     * 
     * // Get first 10 ContactServiceContacts
     * const contactServiceContacts = await prisma.contactServiceContact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactServiceContactWithIdOnly = await prisma.contactServiceContact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactServiceContactFindManyArgs>(args?: SelectSubset<T, ContactServiceContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContactServiceContact.
     * @param {ContactServiceContactCreateArgs} args - Arguments to create a ContactServiceContact.
     * @example
     * // Create one ContactServiceContact
     * const ContactServiceContact = await prisma.contactServiceContact.create({
     *   data: {
     *     // ... data to create a ContactServiceContact
     *   }
     * })
     * 
     */
    create<T extends ContactServiceContactCreateArgs>(args: SelectSubset<T, ContactServiceContactCreateArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContactServiceContacts.
     * @param {ContactServiceContactCreateManyArgs} args - Arguments to create many ContactServiceContacts.
     * @example
     * // Create many ContactServiceContacts
     * const contactServiceContact = await prisma.contactServiceContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactServiceContactCreateManyArgs>(args?: SelectSubset<T, ContactServiceContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactServiceContacts and returns the data saved in the database.
     * @param {ContactServiceContactCreateManyAndReturnArgs} args - Arguments to create many ContactServiceContacts.
     * @example
     * // Create many ContactServiceContacts
     * const contactServiceContact = await prisma.contactServiceContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactServiceContacts and only return the `id`
     * const contactServiceContactWithIdOnly = await prisma.contactServiceContact.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactServiceContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactServiceContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContactServiceContact.
     * @param {ContactServiceContactDeleteArgs} args - Arguments to delete one ContactServiceContact.
     * @example
     * // Delete one ContactServiceContact
     * const ContactServiceContact = await prisma.contactServiceContact.delete({
     *   where: {
     *     // ... filter to delete one ContactServiceContact
     *   }
     * })
     * 
     */
    delete<T extends ContactServiceContactDeleteArgs>(args: SelectSubset<T, ContactServiceContactDeleteArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContactServiceContact.
     * @param {ContactServiceContactUpdateArgs} args - Arguments to update one ContactServiceContact.
     * @example
     * // Update one ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactServiceContactUpdateArgs>(args: SelectSubset<T, ContactServiceContactUpdateArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContactServiceContacts.
     * @param {ContactServiceContactDeleteManyArgs} args - Arguments to filter ContactServiceContacts to delete.
     * @example
     * // Delete a few ContactServiceContacts
     * const { count } = await prisma.contactServiceContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactServiceContactDeleteManyArgs>(args?: SelectSubset<T, ContactServiceContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactServiceContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactServiceContacts
     * const contactServiceContact = await prisma.contactServiceContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactServiceContactUpdateManyArgs>(args: SelectSubset<T, ContactServiceContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactServiceContact.
     * @param {ContactServiceContactUpsertArgs} args - Arguments to update or create a ContactServiceContact.
     * @example
     * // Update or create a ContactServiceContact
     * const contactServiceContact = await prisma.contactServiceContact.upsert({
     *   create: {
     *     // ... data to create a ContactServiceContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactServiceContact we want to update
     *   }
     * })
     */
    upsert<T extends ContactServiceContactUpsertArgs>(args: SelectSubset<T, ContactServiceContactUpsertArgs<ExtArgs>>): Prisma__ContactServiceContactClient<$Result.GetResult<Prisma.$ContactServiceContactPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContactServiceContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactCountArgs} args - Arguments to filter ContactServiceContacts to count.
     * @example
     * // Count the number of ContactServiceContacts
     * const count = await prisma.contactServiceContact.count({
     *   where: {
     *     // ... the filter for the ContactServiceContacts we want to count
     *   }
     * })
    **/
    count<T extends ContactServiceContactCountArgs>(
      args?: Subset<T, ContactServiceContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactServiceContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactServiceContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactServiceContactAggregateArgs>(args: Subset<T, ContactServiceContactAggregateArgs>): Prisma.PrismaPromise<GetContactServiceContactAggregateType<T>>

    /**
     * Group by ContactServiceContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactServiceContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactServiceContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactServiceContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactServiceContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactServiceContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactServiceContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactServiceContact model
   */
  readonly fields: ContactServiceContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactServiceContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactServiceContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ContactServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContactServiceDefaultArgs<ExtArgs>>): Prisma__ContactServiceClient<$Result.GetResult<Prisma.$ContactServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactServiceContact model
   */ 
  interface ContactServiceContactFieldRefs {
    readonly id: FieldRef<"ContactServiceContact", 'Int'>
    readonly name: FieldRef<"ContactServiceContact", 'String'>
    readonly designation: FieldRef<"ContactServiceContact", 'String'>
    readonly contact: FieldRef<"ContactServiceContact", 'String'>
    readonly email: FieldRef<"ContactServiceContact", 'String'>
    readonly serviceId: FieldRef<"ContactServiceContact", 'Int'>
    readonly createdAt: FieldRef<"ContactServiceContact", 'DateTime'>
    readonly updatedAt: FieldRef<"ContactServiceContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactServiceContact findUnique
   */
  export type ContactServiceContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter, which ContactServiceContact to fetch.
     */
    where: ContactServiceContactWhereUniqueInput
  }

  /**
   * ContactServiceContact findUniqueOrThrow
   */
  export type ContactServiceContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter, which ContactServiceContact to fetch.
     */
    where: ContactServiceContactWhereUniqueInput
  }

  /**
   * ContactServiceContact findFirst
   */
  export type ContactServiceContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter, which ContactServiceContact to fetch.
     */
    where?: ContactServiceContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServiceContacts to fetch.
     */
    orderBy?: ContactServiceContactOrderByWithRelationInput | ContactServiceContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactServiceContacts.
     */
    cursor?: ContactServiceContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServiceContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServiceContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactServiceContacts.
     */
    distinct?: ContactServiceContactScalarFieldEnum | ContactServiceContactScalarFieldEnum[]
  }

  /**
   * ContactServiceContact findFirstOrThrow
   */
  export type ContactServiceContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter, which ContactServiceContact to fetch.
     */
    where?: ContactServiceContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServiceContacts to fetch.
     */
    orderBy?: ContactServiceContactOrderByWithRelationInput | ContactServiceContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactServiceContacts.
     */
    cursor?: ContactServiceContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServiceContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServiceContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactServiceContacts.
     */
    distinct?: ContactServiceContactScalarFieldEnum | ContactServiceContactScalarFieldEnum[]
  }

  /**
   * ContactServiceContact findMany
   */
  export type ContactServiceContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter, which ContactServiceContacts to fetch.
     */
    where?: ContactServiceContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactServiceContacts to fetch.
     */
    orderBy?: ContactServiceContactOrderByWithRelationInput | ContactServiceContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactServiceContacts.
     */
    cursor?: ContactServiceContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactServiceContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactServiceContacts.
     */
    skip?: number
    distinct?: ContactServiceContactScalarFieldEnum | ContactServiceContactScalarFieldEnum[]
  }

  /**
   * ContactServiceContact create
   */
  export type ContactServiceContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactServiceContact.
     */
    data: XOR<ContactServiceContactCreateInput, ContactServiceContactUncheckedCreateInput>
  }

  /**
   * ContactServiceContact createMany
   */
  export type ContactServiceContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactServiceContacts.
     */
    data: ContactServiceContactCreateManyInput | ContactServiceContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactServiceContact createManyAndReturn
   */
  export type ContactServiceContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContactServiceContacts.
     */
    data: ContactServiceContactCreateManyInput | ContactServiceContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContactServiceContact update
   */
  export type ContactServiceContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactServiceContact.
     */
    data: XOR<ContactServiceContactUpdateInput, ContactServiceContactUncheckedUpdateInput>
    /**
     * Choose, which ContactServiceContact to update.
     */
    where: ContactServiceContactWhereUniqueInput
  }

  /**
   * ContactServiceContact updateMany
   */
  export type ContactServiceContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactServiceContacts.
     */
    data: XOR<ContactServiceContactUpdateManyMutationInput, ContactServiceContactUncheckedUpdateManyInput>
    /**
     * Filter which ContactServiceContacts to update
     */
    where?: ContactServiceContactWhereInput
  }

  /**
   * ContactServiceContact upsert
   */
  export type ContactServiceContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactServiceContact to update in case it exists.
     */
    where: ContactServiceContactWhereUniqueInput
    /**
     * In case the ContactServiceContact found by the `where` argument doesn't exist, create a new ContactServiceContact with this data.
     */
    create: XOR<ContactServiceContactCreateInput, ContactServiceContactUncheckedCreateInput>
    /**
     * In case the ContactServiceContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactServiceContactUpdateInput, ContactServiceContactUncheckedUpdateInput>
  }

  /**
   * ContactServiceContact delete
   */
  export type ContactServiceContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
    /**
     * Filter which ContactServiceContact to delete.
     */
    where: ContactServiceContactWhereUniqueInput
  }

  /**
   * ContactServiceContact deleteMany
   */
  export type ContactServiceContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactServiceContacts to delete
     */
    where?: ContactServiceContactWhereInput
  }

  /**
   * ContactServiceContact without action
   */
  export type ContactServiceContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactServiceContact
     */
    select?: ContactServiceContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactServiceContactInclude<ExtArgs> | null
  }


  /**
   * Model Grievance
   */

  export type AggregateGrievance = {
    _count: GrievanceCountAggregateOutputType | null
    _avg: GrievanceAvgAggregateOutputType | null
    _sum: GrievanceSumAggregateOutputType | null
    _min: GrievanceMinAggregateOutputType | null
    _max: GrievanceMaxAggregateOutputType | null
  }

  export type GrievanceAvgAggregateOutputType = {
    id: number | null
  }

  export type GrievanceSumAggregateOutputType = {
    id: number | null
  }

  export type GrievanceMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    subject: string | null
    description: string | null
    department: string | null
    priority: string | null
    status: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GrievanceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    subject: string | null
    description: string | null
    department: string | null
    priority: string | null
    status: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GrievanceCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    subject: number
    description: number
    department: number
    priority: number
    status: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GrievanceAvgAggregateInputType = {
    id?: true
  }

  export type GrievanceSumAggregateInputType = {
    id?: true
  }

  export type GrievanceMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    subject?: true
    description?: true
    department?: true
    priority?: true
    status?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GrievanceMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    subject?: true
    description?: true
    department?: true
    priority?: true
    status?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GrievanceCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    subject?: true
    description?: true
    department?: true
    priority?: true
    status?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GrievanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grievance to aggregate.
     */
    where?: GrievanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grievances to fetch.
     */
    orderBy?: GrievanceOrderByWithRelationInput | GrievanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrievanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grievances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grievances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Grievances
    **/
    _count?: true | GrievanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrievanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrievanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrievanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrievanceMaxAggregateInputType
  }

  export type GetGrievanceAggregateType<T extends GrievanceAggregateArgs> = {
        [P in keyof T & keyof AggregateGrievance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrievance[P]>
      : GetScalarType<T[P], AggregateGrievance[P]>
  }




  export type GrievanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrievanceWhereInput
    orderBy?: GrievanceOrderByWithAggregationInput | GrievanceOrderByWithAggregationInput[]
    by: GrievanceScalarFieldEnum[] | GrievanceScalarFieldEnum
    having?: GrievanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrievanceCountAggregateInputType | true
    _avg?: GrievanceAvgAggregateInputType
    _sum?: GrievanceSumAggregateInputType
    _min?: GrievanceMinAggregateInputType
    _max?: GrievanceMaxAggregateInputType
  }

  export type GrievanceGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string
    subject: string
    description: string
    department: string
    priority: string
    status: string
    source: string
    createdAt: Date
    updatedAt: Date
    _count: GrievanceCountAggregateOutputType | null
    _avg: GrievanceAvgAggregateOutputType | null
    _sum: GrievanceSumAggregateOutputType | null
    _min: GrievanceMinAggregateOutputType | null
    _max: GrievanceMaxAggregateOutputType | null
  }

  type GetGrievanceGroupByPayload<T extends GrievanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrievanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrievanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrievanceGroupByOutputType[P]>
            : GetScalarType<T[P], GrievanceGroupByOutputType[P]>
        }
      >
    >


  export type GrievanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    subject?: boolean
    description?: boolean
    department?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["grievance"]>

  export type GrievanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    subject?: boolean
    description?: boolean
    department?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["grievance"]>

  export type GrievanceSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    subject?: boolean
    description?: boolean
    department?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $GrievancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Grievance"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string
      subject: string
      description: string
      department: string
      priority: string
      status: string
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["grievance"]>
    composites: {}
  }

  type GrievanceGetPayload<S extends boolean | null | undefined | GrievanceDefaultArgs> = $Result.GetResult<Prisma.$GrievancePayload, S>

  type GrievanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GrievanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GrievanceCountAggregateInputType | true
    }

  export interface GrievanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Grievance'], meta: { name: 'Grievance' } }
    /**
     * Find zero or one Grievance that matches the filter.
     * @param {GrievanceFindUniqueArgs} args - Arguments to find a Grievance
     * @example
     * // Get one Grievance
     * const grievance = await prisma.grievance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrievanceFindUniqueArgs>(args: SelectSubset<T, GrievanceFindUniqueArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Grievance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GrievanceFindUniqueOrThrowArgs} args - Arguments to find a Grievance
     * @example
     * // Get one Grievance
     * const grievance = await prisma.grievance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrievanceFindUniqueOrThrowArgs>(args: SelectSubset<T, GrievanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Grievance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceFindFirstArgs} args - Arguments to find a Grievance
     * @example
     * // Get one Grievance
     * const grievance = await prisma.grievance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrievanceFindFirstArgs>(args?: SelectSubset<T, GrievanceFindFirstArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Grievance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceFindFirstOrThrowArgs} args - Arguments to find a Grievance
     * @example
     * // Get one Grievance
     * const grievance = await prisma.grievance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrievanceFindFirstOrThrowArgs>(args?: SelectSubset<T, GrievanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Grievances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Grievances
     * const grievances = await prisma.grievance.findMany()
     * 
     * // Get first 10 Grievances
     * const grievances = await prisma.grievance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const grievanceWithIdOnly = await prisma.grievance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrievanceFindManyArgs>(args?: SelectSubset<T, GrievanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Grievance.
     * @param {GrievanceCreateArgs} args - Arguments to create a Grievance.
     * @example
     * // Create one Grievance
     * const Grievance = await prisma.grievance.create({
     *   data: {
     *     // ... data to create a Grievance
     *   }
     * })
     * 
     */
    create<T extends GrievanceCreateArgs>(args: SelectSubset<T, GrievanceCreateArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Grievances.
     * @param {GrievanceCreateManyArgs} args - Arguments to create many Grievances.
     * @example
     * // Create many Grievances
     * const grievance = await prisma.grievance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrievanceCreateManyArgs>(args?: SelectSubset<T, GrievanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Grievances and returns the data saved in the database.
     * @param {GrievanceCreateManyAndReturnArgs} args - Arguments to create many Grievances.
     * @example
     * // Create many Grievances
     * const grievance = await prisma.grievance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Grievances and only return the `id`
     * const grievanceWithIdOnly = await prisma.grievance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrievanceCreateManyAndReturnArgs>(args?: SelectSubset<T, GrievanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Grievance.
     * @param {GrievanceDeleteArgs} args - Arguments to delete one Grievance.
     * @example
     * // Delete one Grievance
     * const Grievance = await prisma.grievance.delete({
     *   where: {
     *     // ... filter to delete one Grievance
     *   }
     * })
     * 
     */
    delete<T extends GrievanceDeleteArgs>(args: SelectSubset<T, GrievanceDeleteArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Grievance.
     * @param {GrievanceUpdateArgs} args - Arguments to update one Grievance.
     * @example
     * // Update one Grievance
     * const grievance = await prisma.grievance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrievanceUpdateArgs>(args: SelectSubset<T, GrievanceUpdateArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Grievances.
     * @param {GrievanceDeleteManyArgs} args - Arguments to filter Grievances to delete.
     * @example
     * // Delete a few Grievances
     * const { count } = await prisma.grievance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrievanceDeleteManyArgs>(args?: SelectSubset<T, GrievanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grievances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Grievances
     * const grievance = await prisma.grievance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrievanceUpdateManyArgs>(args: SelectSubset<T, GrievanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Grievance.
     * @param {GrievanceUpsertArgs} args - Arguments to update or create a Grievance.
     * @example
     * // Update or create a Grievance
     * const grievance = await prisma.grievance.upsert({
     *   create: {
     *     // ... data to create a Grievance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Grievance we want to update
     *   }
     * })
     */
    upsert<T extends GrievanceUpsertArgs>(args: SelectSubset<T, GrievanceUpsertArgs<ExtArgs>>): Prisma__GrievanceClient<$Result.GetResult<Prisma.$GrievancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Grievances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceCountArgs} args - Arguments to filter Grievances to count.
     * @example
     * // Count the number of Grievances
     * const count = await prisma.grievance.count({
     *   where: {
     *     // ... the filter for the Grievances we want to count
     *   }
     * })
    **/
    count<T extends GrievanceCountArgs>(
      args?: Subset<T, GrievanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrievanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Grievance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrievanceAggregateArgs>(args: Subset<T, GrievanceAggregateArgs>): Prisma.PrismaPromise<GetGrievanceAggregateType<T>>

    /**
     * Group by Grievance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrievanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrievanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrievanceGroupByArgs['orderBy'] }
        : { orderBy?: GrievanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrievanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrievanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Grievance model
   */
  readonly fields: GrievanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Grievance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrievanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Grievance model
   */ 
  interface GrievanceFieldRefs {
    readonly id: FieldRef<"Grievance", 'Int'>
    readonly name: FieldRef<"Grievance", 'String'>
    readonly email: FieldRef<"Grievance", 'String'>
    readonly phone: FieldRef<"Grievance", 'String'>
    readonly subject: FieldRef<"Grievance", 'String'>
    readonly description: FieldRef<"Grievance", 'String'>
    readonly department: FieldRef<"Grievance", 'String'>
    readonly priority: FieldRef<"Grievance", 'String'>
    readonly status: FieldRef<"Grievance", 'String'>
    readonly source: FieldRef<"Grievance", 'String'>
    readonly createdAt: FieldRef<"Grievance", 'DateTime'>
    readonly updatedAt: FieldRef<"Grievance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Grievance findUnique
   */
  export type GrievanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter, which Grievance to fetch.
     */
    where: GrievanceWhereUniqueInput
  }

  /**
   * Grievance findUniqueOrThrow
   */
  export type GrievanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter, which Grievance to fetch.
     */
    where: GrievanceWhereUniqueInput
  }

  /**
   * Grievance findFirst
   */
  export type GrievanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter, which Grievance to fetch.
     */
    where?: GrievanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grievances to fetch.
     */
    orderBy?: GrievanceOrderByWithRelationInput | GrievanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grievances.
     */
    cursor?: GrievanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grievances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grievances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grievances.
     */
    distinct?: GrievanceScalarFieldEnum | GrievanceScalarFieldEnum[]
  }

  /**
   * Grievance findFirstOrThrow
   */
  export type GrievanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter, which Grievance to fetch.
     */
    where?: GrievanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grievances to fetch.
     */
    orderBy?: GrievanceOrderByWithRelationInput | GrievanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grievances.
     */
    cursor?: GrievanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grievances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grievances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grievances.
     */
    distinct?: GrievanceScalarFieldEnum | GrievanceScalarFieldEnum[]
  }

  /**
   * Grievance findMany
   */
  export type GrievanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter, which Grievances to fetch.
     */
    where?: GrievanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grievances to fetch.
     */
    orderBy?: GrievanceOrderByWithRelationInput | GrievanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Grievances.
     */
    cursor?: GrievanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grievances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grievances.
     */
    skip?: number
    distinct?: GrievanceScalarFieldEnum | GrievanceScalarFieldEnum[]
  }

  /**
   * Grievance create
   */
  export type GrievanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * The data needed to create a Grievance.
     */
    data: XOR<GrievanceCreateInput, GrievanceUncheckedCreateInput>
  }

  /**
   * Grievance createMany
   */
  export type GrievanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Grievances.
     */
    data: GrievanceCreateManyInput | GrievanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grievance createManyAndReturn
   */
  export type GrievanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Grievances.
     */
    data: GrievanceCreateManyInput | GrievanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grievance update
   */
  export type GrievanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * The data needed to update a Grievance.
     */
    data: XOR<GrievanceUpdateInput, GrievanceUncheckedUpdateInput>
    /**
     * Choose, which Grievance to update.
     */
    where: GrievanceWhereUniqueInput
  }

  /**
   * Grievance updateMany
   */
  export type GrievanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Grievances.
     */
    data: XOR<GrievanceUpdateManyMutationInput, GrievanceUncheckedUpdateManyInput>
    /**
     * Filter which Grievances to update
     */
    where?: GrievanceWhereInput
  }

  /**
   * Grievance upsert
   */
  export type GrievanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * The filter to search for the Grievance to update in case it exists.
     */
    where: GrievanceWhereUniqueInput
    /**
     * In case the Grievance found by the `where` argument doesn't exist, create a new Grievance with this data.
     */
    create: XOR<GrievanceCreateInput, GrievanceUncheckedCreateInput>
    /**
     * In case the Grievance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrievanceUpdateInput, GrievanceUncheckedUpdateInput>
  }

  /**
   * Grievance delete
   */
  export type GrievanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
    /**
     * Filter which Grievance to delete.
     */
    where: GrievanceWhereUniqueInput
  }

  /**
   * Grievance deleteMany
   */
  export type GrievanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grievances to delete
     */
    where?: GrievanceWhereInput
  }

  /**
   * Grievance without action
   */
  export type GrievanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grievance
     */
    select?: GrievanceSelect<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    id: number | null
    rating: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    id: number | null
    rating: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    rating: number | null
    comment: string | null
    serviceType: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    rating: number | null
    comment: string | null
    serviceType: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    rating: number
    comment: number
    serviceType: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    id?: true
    rating?: true
  }

  export type FeedbackSumAggregateInputType = {
    id?: true
    rating?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    rating?: true
    comment?: true
    serviceType?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    rating?: true
    comment?: true
    serviceType?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    rating?: true
    comment?: true
    serviceType?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: number
    name: string
    email: string | null
    phone: string | null
    rating: number
    comment: string
    serviceType: string
    source: string
    createdAt: Date
    updatedAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    rating?: boolean
    comment?: boolean
    serviceType?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    rating?: boolean
    comment?: boolean
    serviceType?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    rating?: boolean
    comment?: boolean
    serviceType?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string | null
      phone: string | null
      rating: number
      comment: string
      serviceType: string
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */ 
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'Int'>
    readonly name: FieldRef<"Feedback", 'String'>
    readonly email: FieldRef<"Feedback", 'String'>
    readonly phone: FieldRef<"Feedback", 'String'>
    readonly rating: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly serviceType: FieldRef<"Feedback", 'String'>
    readonly source: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
    readonly updatedAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
  }


  /**
   * Model ContactPerson
   */

  export type AggregateContactPerson = {
    _count: ContactPersonCountAggregateOutputType | null
    _avg: ContactPersonAvgAggregateOutputType | null
    _sum: ContactPersonSumAggregateOutputType | null
    _min: ContactPersonMinAggregateOutputType | null
    _max: ContactPersonMaxAggregateOutputType | null
  }

  export type ContactPersonAvgAggregateOutputType = {
    id: number | null
    schemeServiceId: number | null
  }

  export type ContactPersonSumAggregateOutputType = {
    id: number | null
    schemeServiceId: number | null
  }

  export type ContactPersonMinAggregateOutputType = {
    id: number | null
    serviceName: string | null
    district: string | null
    subDistrict: string | null
    block: string | null
    name: string | null
    designation: string | null
    contact: string | null
    email: string | null
    schemeServiceId: number | null
  }

  export type ContactPersonMaxAggregateOutputType = {
    id: number | null
    serviceName: string | null
    district: string | null
    subDistrict: string | null
    block: string | null
    name: string | null
    designation: string | null
    contact: string | null
    email: string | null
    schemeServiceId: number | null
  }

  export type ContactPersonCountAggregateOutputType = {
    id: number
    serviceName: number
    district: number
    subDistrict: number
    block: number
    name: number
    designation: number
    contact: number
    email: number
    schemeServiceId: number
    _all: number
  }


  export type ContactPersonAvgAggregateInputType = {
    id?: true
    schemeServiceId?: true
  }

  export type ContactPersonSumAggregateInputType = {
    id?: true
    schemeServiceId?: true
  }

  export type ContactPersonMinAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    schemeServiceId?: true
  }

  export type ContactPersonMaxAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    schemeServiceId?: true
  }

  export type ContactPersonCountAggregateInputType = {
    id?: true
    serviceName?: true
    district?: true
    subDistrict?: true
    block?: true
    name?: true
    designation?: true
    contact?: true
    email?: true
    schemeServiceId?: true
    _all?: true
  }

  export type ContactPersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPerson to aggregate.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactPeople
    **/
    _count?: true | ContactPersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactPersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactPersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactPersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactPersonMaxAggregateInputType
  }

  export type GetContactPersonAggregateType<T extends ContactPersonAggregateArgs> = {
        [P in keyof T & keyof AggregateContactPerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactPerson[P]>
      : GetScalarType<T[P], AggregateContactPerson[P]>
  }




  export type ContactPersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactPersonWhereInput
    orderBy?: ContactPersonOrderByWithAggregationInput | ContactPersonOrderByWithAggregationInput[]
    by: ContactPersonScalarFieldEnum[] | ContactPersonScalarFieldEnum
    having?: ContactPersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactPersonCountAggregateInputType | true
    _avg?: ContactPersonAvgAggregateInputType
    _sum?: ContactPersonSumAggregateInputType
    _min?: ContactPersonMinAggregateInputType
    _max?: ContactPersonMaxAggregateInputType
  }

  export type ContactPersonGroupByOutputType = {
    id: number
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
    schemeServiceId: number
    _count: ContactPersonCountAggregateOutputType | null
    _avg: ContactPersonAvgAggregateOutputType | null
    _sum: ContactPersonSumAggregateOutputType | null
    _min: ContactPersonMinAggregateOutputType | null
    _max: ContactPersonMaxAggregateOutputType | null
  }

  type GetContactPersonGroupByPayload<T extends ContactPersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactPersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactPersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactPersonGroupByOutputType[P]>
            : GetScalarType<T[P], ContactPersonGroupByOutputType[P]>
        }
      >
    >


  export type ContactPersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    schemeServiceId?: boolean
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactPerson"]>

  export type ContactPersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    schemeServiceId?: boolean
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactPerson"]>

  export type ContactPersonSelectScalar = {
    id?: boolean
    serviceName?: boolean
    district?: boolean
    subDistrict?: boolean
    block?: boolean
    name?: boolean
    designation?: boolean
    contact?: boolean
    email?: boolean
    schemeServiceId?: boolean
  }

  export type ContactPersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }
  export type ContactPersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }

  export type $ContactPersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactPerson"
    objects: {
      schemeService: Prisma.$SchemeServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serviceName: string
      district: string
      subDistrict: string
      block: string
      name: string
      designation: string
      contact: string
      email: string
      schemeServiceId: number
    }, ExtArgs["result"]["contactPerson"]>
    composites: {}
  }

  type ContactPersonGetPayload<S extends boolean | null | undefined | ContactPersonDefaultArgs> = $Result.GetResult<Prisma.$ContactPersonPayload, S>

  type ContactPersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContactPersonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContactPersonCountAggregateInputType | true
    }

  export interface ContactPersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactPerson'], meta: { name: 'ContactPerson' } }
    /**
     * Find zero or one ContactPerson that matches the filter.
     * @param {ContactPersonFindUniqueArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactPersonFindUniqueArgs>(args: SelectSubset<T, ContactPersonFindUniqueArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContactPerson that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContactPersonFindUniqueOrThrowArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactPersonFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactPersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContactPerson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindFirstArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactPersonFindFirstArgs>(args?: SelectSubset<T, ContactPersonFindFirstArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContactPerson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindFirstOrThrowArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactPersonFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactPersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContactPeople that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactPeople
     * const contactPeople = await prisma.contactPerson.findMany()
     * 
     * // Get first 10 ContactPeople
     * const contactPeople = await prisma.contactPerson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactPersonWithIdOnly = await prisma.contactPerson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactPersonFindManyArgs>(args?: SelectSubset<T, ContactPersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContactPerson.
     * @param {ContactPersonCreateArgs} args - Arguments to create a ContactPerson.
     * @example
     * // Create one ContactPerson
     * const ContactPerson = await prisma.contactPerson.create({
     *   data: {
     *     // ... data to create a ContactPerson
     *   }
     * })
     * 
     */
    create<T extends ContactPersonCreateArgs>(args: SelectSubset<T, ContactPersonCreateArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContactPeople.
     * @param {ContactPersonCreateManyArgs} args - Arguments to create many ContactPeople.
     * @example
     * // Create many ContactPeople
     * const contactPerson = await prisma.contactPerson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactPersonCreateManyArgs>(args?: SelectSubset<T, ContactPersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactPeople and returns the data saved in the database.
     * @param {ContactPersonCreateManyAndReturnArgs} args - Arguments to create many ContactPeople.
     * @example
     * // Create many ContactPeople
     * const contactPerson = await prisma.contactPerson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactPeople and only return the `id`
     * const contactPersonWithIdOnly = await prisma.contactPerson.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactPersonCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactPersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContactPerson.
     * @param {ContactPersonDeleteArgs} args - Arguments to delete one ContactPerson.
     * @example
     * // Delete one ContactPerson
     * const ContactPerson = await prisma.contactPerson.delete({
     *   where: {
     *     // ... filter to delete one ContactPerson
     *   }
     * })
     * 
     */
    delete<T extends ContactPersonDeleteArgs>(args: SelectSubset<T, ContactPersonDeleteArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContactPerson.
     * @param {ContactPersonUpdateArgs} args - Arguments to update one ContactPerson.
     * @example
     * // Update one ContactPerson
     * const contactPerson = await prisma.contactPerson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactPersonUpdateArgs>(args: SelectSubset<T, ContactPersonUpdateArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContactPeople.
     * @param {ContactPersonDeleteManyArgs} args - Arguments to filter ContactPeople to delete.
     * @example
     * // Delete a few ContactPeople
     * const { count } = await prisma.contactPerson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactPersonDeleteManyArgs>(args?: SelectSubset<T, ContactPersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactPeople
     * const contactPerson = await prisma.contactPerson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactPersonUpdateManyArgs>(args: SelectSubset<T, ContactPersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactPerson.
     * @param {ContactPersonUpsertArgs} args - Arguments to update or create a ContactPerson.
     * @example
     * // Update or create a ContactPerson
     * const contactPerson = await prisma.contactPerson.upsert({
     *   create: {
     *     // ... data to create a ContactPerson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactPerson we want to update
     *   }
     * })
     */
    upsert<T extends ContactPersonUpsertArgs>(args: SelectSubset<T, ContactPersonUpsertArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonCountArgs} args - Arguments to filter ContactPeople to count.
     * @example
     * // Count the number of ContactPeople
     * const count = await prisma.contactPerson.count({
     *   where: {
     *     // ... the filter for the ContactPeople we want to count
     *   }
     * })
    **/
    count<T extends ContactPersonCountArgs>(
      args?: Subset<T, ContactPersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactPersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactPersonAggregateArgs>(args: Subset<T, ContactPersonAggregateArgs>): Prisma.PrismaPromise<GetContactPersonAggregateType<T>>

    /**
     * Group by ContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactPersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactPersonGroupByArgs['orderBy'] }
        : { orderBy?: ContactPersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactPersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactPerson model
   */
  readonly fields: ContactPersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactPerson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactPersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schemeService<T extends SchemeServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchemeServiceDefaultArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactPerson model
   */ 
  interface ContactPersonFieldRefs {
    readonly id: FieldRef<"ContactPerson", 'Int'>
    readonly serviceName: FieldRef<"ContactPerson", 'String'>
    readonly district: FieldRef<"ContactPerson", 'String'>
    readonly subDistrict: FieldRef<"ContactPerson", 'String'>
    readonly block: FieldRef<"ContactPerson", 'String'>
    readonly name: FieldRef<"ContactPerson", 'String'>
    readonly designation: FieldRef<"ContactPerson", 'String'>
    readonly contact: FieldRef<"ContactPerson", 'String'>
    readonly email: FieldRef<"ContactPerson", 'String'>
    readonly schemeServiceId: FieldRef<"ContactPerson", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ContactPerson findUnique
   */
  export type ContactPersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson findUniqueOrThrow
   */
  export type ContactPersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson findFirst
   */
  export type ContactPersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPeople.
     */
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson findFirstOrThrow
   */
  export type ContactPersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPeople.
     */
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson findMany
   */
  export type ContactPersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPeople to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson create
   */
  export type ContactPersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactPerson.
     */
    data: XOR<ContactPersonCreateInput, ContactPersonUncheckedCreateInput>
  }

  /**
   * ContactPerson createMany
   */
  export type ContactPersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactPeople.
     */
    data: ContactPersonCreateManyInput | ContactPersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactPerson createManyAndReturn
   */
  export type ContactPersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContactPeople.
     */
    data: ContactPersonCreateManyInput | ContactPersonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContactPerson update
   */
  export type ContactPersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactPerson.
     */
    data: XOR<ContactPersonUpdateInput, ContactPersonUncheckedUpdateInput>
    /**
     * Choose, which ContactPerson to update.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson updateMany
   */
  export type ContactPersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactPeople.
     */
    data: XOR<ContactPersonUpdateManyMutationInput, ContactPersonUncheckedUpdateManyInput>
    /**
     * Filter which ContactPeople to update
     */
    where?: ContactPersonWhereInput
  }

  /**
   * ContactPerson upsert
   */
  export type ContactPersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactPerson to update in case it exists.
     */
    where: ContactPersonWhereUniqueInput
    /**
     * In case the ContactPerson found by the `where` argument doesn't exist, create a new ContactPerson with this data.
     */
    create: XOR<ContactPersonCreateInput, ContactPersonUncheckedCreateInput>
    /**
     * In case the ContactPerson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactPersonUpdateInput, ContactPersonUncheckedUpdateInput>
  }

  /**
   * ContactPerson delete
   */
  export type ContactPersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter which ContactPerson to delete.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson deleteMany
   */
  export type ContactPersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPeople to delete
     */
    where?: ContactPersonWhereInput
  }

  /**
   * ContactPerson without action
   */
  export type ContactPersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
  }


  /**
   * Model SupportiveDocument
   */

  export type AggregateSupportiveDocument = {
    _count: SupportiveDocumentCountAggregateOutputType | null
    _avg: SupportiveDocumentAvgAggregateOutputType | null
    _sum: SupportiveDocumentSumAggregateOutputType | null
    _min: SupportiveDocumentMinAggregateOutputType | null
    _max: SupportiveDocumentMaxAggregateOutputType | null
  }

  export type SupportiveDocumentAvgAggregateOutputType = {
    id: number | null
    slNo: number | null
    schemeServiceId: number | null
  }

  export type SupportiveDocumentSumAggregateOutputType = {
    id: number | null
    slNo: number | null
    schemeServiceId: number | null
  }

  export type SupportiveDocumentMinAggregateOutputType = {
    id: number | null
    slNo: number | null
    documentType: string | null
    validProof: string | null
    isRequired: boolean | null
    schemeServiceId: number | null
  }

  export type SupportiveDocumentMaxAggregateOutputType = {
    id: number | null
    slNo: number | null
    documentType: string | null
    validProof: string | null
    isRequired: boolean | null
    schemeServiceId: number | null
  }

  export type SupportiveDocumentCountAggregateOutputType = {
    id: number
    slNo: number
    documentType: number
    validProof: number
    isRequired: number
    schemeServiceId: number
    _all: number
  }


  export type SupportiveDocumentAvgAggregateInputType = {
    id?: true
    slNo?: true
    schemeServiceId?: true
  }

  export type SupportiveDocumentSumAggregateInputType = {
    id?: true
    slNo?: true
    schemeServiceId?: true
  }

  export type SupportiveDocumentMinAggregateInputType = {
    id?: true
    slNo?: true
    documentType?: true
    validProof?: true
    isRequired?: true
    schemeServiceId?: true
  }

  export type SupportiveDocumentMaxAggregateInputType = {
    id?: true
    slNo?: true
    documentType?: true
    validProof?: true
    isRequired?: true
    schemeServiceId?: true
  }

  export type SupportiveDocumentCountAggregateInputType = {
    id?: true
    slNo?: true
    documentType?: true
    validProof?: true
    isRequired?: true
    schemeServiceId?: true
    _all?: true
  }

  export type SupportiveDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportiveDocument to aggregate.
     */
    where?: SupportiveDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportiveDocuments to fetch.
     */
    orderBy?: SupportiveDocumentOrderByWithRelationInput | SupportiveDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportiveDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportiveDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportiveDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportiveDocuments
    **/
    _count?: true | SupportiveDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupportiveDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupportiveDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportiveDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportiveDocumentMaxAggregateInputType
  }

  export type GetSupportiveDocumentAggregateType<T extends SupportiveDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportiveDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportiveDocument[P]>
      : GetScalarType<T[P], AggregateSupportiveDocument[P]>
  }




  export type SupportiveDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportiveDocumentWhereInput
    orderBy?: SupportiveDocumentOrderByWithAggregationInput | SupportiveDocumentOrderByWithAggregationInput[]
    by: SupportiveDocumentScalarFieldEnum[] | SupportiveDocumentScalarFieldEnum
    having?: SupportiveDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportiveDocumentCountAggregateInputType | true
    _avg?: SupportiveDocumentAvgAggregateInputType
    _sum?: SupportiveDocumentSumAggregateInputType
    _min?: SupportiveDocumentMinAggregateInputType
    _max?: SupportiveDocumentMaxAggregateInputType
  }

  export type SupportiveDocumentGroupByOutputType = {
    id: number
    slNo: number
    documentType: string
    validProof: string
    isRequired: boolean
    schemeServiceId: number
    _count: SupportiveDocumentCountAggregateOutputType | null
    _avg: SupportiveDocumentAvgAggregateOutputType | null
    _sum: SupportiveDocumentSumAggregateOutputType | null
    _min: SupportiveDocumentMinAggregateOutputType | null
    _max: SupportiveDocumentMaxAggregateOutputType | null
  }

  type GetSupportiveDocumentGroupByPayload<T extends SupportiveDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportiveDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportiveDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportiveDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], SupportiveDocumentGroupByOutputType[P]>
        }
      >
    >


  export type SupportiveDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slNo?: boolean
    documentType?: boolean
    validProof?: boolean
    isRequired?: boolean
    schemeServiceId?: boolean
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportiveDocument"]>

  export type SupportiveDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slNo?: boolean
    documentType?: boolean
    validProof?: boolean
    isRequired?: boolean
    schemeServiceId?: boolean
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportiveDocument"]>

  export type SupportiveDocumentSelectScalar = {
    id?: boolean
    slNo?: boolean
    documentType?: boolean
    validProof?: boolean
    isRequired?: boolean
    schemeServiceId?: boolean
  }

  export type SupportiveDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }
  export type SupportiveDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schemeService?: boolean | SchemeServiceDefaultArgs<ExtArgs>
  }

  export type $SupportiveDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportiveDocument"
    objects: {
      schemeService: Prisma.$SchemeServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slNo: number
      documentType: string
      validProof: string
      isRequired: boolean
      schemeServiceId: number
    }, ExtArgs["result"]["supportiveDocument"]>
    composites: {}
  }

  type SupportiveDocumentGetPayload<S extends boolean | null | undefined | SupportiveDocumentDefaultArgs> = $Result.GetResult<Prisma.$SupportiveDocumentPayload, S>

  type SupportiveDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupportiveDocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupportiveDocumentCountAggregateInputType | true
    }

  export interface SupportiveDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportiveDocument'], meta: { name: 'SupportiveDocument' } }
    /**
     * Find zero or one SupportiveDocument that matches the filter.
     * @param {SupportiveDocumentFindUniqueArgs} args - Arguments to find a SupportiveDocument
     * @example
     * // Get one SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportiveDocumentFindUniqueArgs>(args: SelectSubset<T, SupportiveDocumentFindUniqueArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SupportiveDocument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupportiveDocumentFindUniqueOrThrowArgs} args - Arguments to find a SupportiveDocument
     * @example
     * // Get one SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportiveDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportiveDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SupportiveDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentFindFirstArgs} args - Arguments to find a SupportiveDocument
     * @example
     * // Get one SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportiveDocumentFindFirstArgs>(args?: SelectSubset<T, SupportiveDocumentFindFirstArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SupportiveDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentFindFirstOrThrowArgs} args - Arguments to find a SupportiveDocument
     * @example
     * // Get one SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportiveDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportiveDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SupportiveDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportiveDocuments
     * const supportiveDocuments = await prisma.supportiveDocument.findMany()
     * 
     * // Get first 10 SupportiveDocuments
     * const supportiveDocuments = await prisma.supportiveDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportiveDocumentWithIdOnly = await prisma.supportiveDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportiveDocumentFindManyArgs>(args?: SelectSubset<T, SupportiveDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SupportiveDocument.
     * @param {SupportiveDocumentCreateArgs} args - Arguments to create a SupportiveDocument.
     * @example
     * // Create one SupportiveDocument
     * const SupportiveDocument = await prisma.supportiveDocument.create({
     *   data: {
     *     // ... data to create a SupportiveDocument
     *   }
     * })
     * 
     */
    create<T extends SupportiveDocumentCreateArgs>(args: SelectSubset<T, SupportiveDocumentCreateArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SupportiveDocuments.
     * @param {SupportiveDocumentCreateManyArgs} args - Arguments to create many SupportiveDocuments.
     * @example
     * // Create many SupportiveDocuments
     * const supportiveDocument = await prisma.supportiveDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportiveDocumentCreateManyArgs>(args?: SelectSubset<T, SupportiveDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportiveDocuments and returns the data saved in the database.
     * @param {SupportiveDocumentCreateManyAndReturnArgs} args - Arguments to create many SupportiveDocuments.
     * @example
     * // Create many SupportiveDocuments
     * const supportiveDocument = await prisma.supportiveDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportiveDocuments and only return the `id`
     * const supportiveDocumentWithIdOnly = await prisma.supportiveDocument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportiveDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportiveDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SupportiveDocument.
     * @param {SupportiveDocumentDeleteArgs} args - Arguments to delete one SupportiveDocument.
     * @example
     * // Delete one SupportiveDocument
     * const SupportiveDocument = await prisma.supportiveDocument.delete({
     *   where: {
     *     // ... filter to delete one SupportiveDocument
     *   }
     * })
     * 
     */
    delete<T extends SupportiveDocumentDeleteArgs>(args: SelectSubset<T, SupportiveDocumentDeleteArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SupportiveDocument.
     * @param {SupportiveDocumentUpdateArgs} args - Arguments to update one SupportiveDocument.
     * @example
     * // Update one SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportiveDocumentUpdateArgs>(args: SelectSubset<T, SupportiveDocumentUpdateArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SupportiveDocuments.
     * @param {SupportiveDocumentDeleteManyArgs} args - Arguments to filter SupportiveDocuments to delete.
     * @example
     * // Delete a few SupportiveDocuments
     * const { count } = await prisma.supportiveDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportiveDocumentDeleteManyArgs>(args?: SelectSubset<T, SupportiveDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportiveDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportiveDocuments
     * const supportiveDocument = await prisma.supportiveDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportiveDocumentUpdateManyArgs>(args: SelectSubset<T, SupportiveDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupportiveDocument.
     * @param {SupportiveDocumentUpsertArgs} args - Arguments to update or create a SupportiveDocument.
     * @example
     * // Update or create a SupportiveDocument
     * const supportiveDocument = await prisma.supportiveDocument.upsert({
     *   create: {
     *     // ... data to create a SupportiveDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportiveDocument we want to update
     *   }
     * })
     */
    upsert<T extends SupportiveDocumentUpsertArgs>(args: SelectSubset<T, SupportiveDocumentUpsertArgs<ExtArgs>>): Prisma__SupportiveDocumentClient<$Result.GetResult<Prisma.$SupportiveDocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SupportiveDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentCountArgs} args - Arguments to filter SupportiveDocuments to count.
     * @example
     * // Count the number of SupportiveDocuments
     * const count = await prisma.supportiveDocument.count({
     *   where: {
     *     // ... the filter for the SupportiveDocuments we want to count
     *   }
     * })
    **/
    count<T extends SupportiveDocumentCountArgs>(
      args?: Subset<T, SupportiveDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportiveDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportiveDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportiveDocumentAggregateArgs>(args: Subset<T, SupportiveDocumentAggregateArgs>): Prisma.PrismaPromise<GetSupportiveDocumentAggregateType<T>>

    /**
     * Group by SupportiveDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportiveDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportiveDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportiveDocumentGroupByArgs['orderBy'] }
        : { orderBy?: SupportiveDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportiveDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportiveDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportiveDocument model
   */
  readonly fields: SupportiveDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportiveDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportiveDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schemeService<T extends SchemeServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchemeServiceDefaultArgs<ExtArgs>>): Prisma__SchemeServiceClient<$Result.GetResult<Prisma.$SchemeServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportiveDocument model
   */ 
  interface SupportiveDocumentFieldRefs {
    readonly id: FieldRef<"SupportiveDocument", 'Int'>
    readonly slNo: FieldRef<"SupportiveDocument", 'Int'>
    readonly documentType: FieldRef<"SupportiveDocument", 'String'>
    readonly validProof: FieldRef<"SupportiveDocument", 'String'>
    readonly isRequired: FieldRef<"SupportiveDocument", 'Boolean'>
    readonly schemeServiceId: FieldRef<"SupportiveDocument", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SupportiveDocument findUnique
   */
  export type SupportiveDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SupportiveDocument to fetch.
     */
    where: SupportiveDocumentWhereUniqueInput
  }

  /**
   * SupportiveDocument findUniqueOrThrow
   */
  export type SupportiveDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SupportiveDocument to fetch.
     */
    where: SupportiveDocumentWhereUniqueInput
  }

  /**
   * SupportiveDocument findFirst
   */
  export type SupportiveDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SupportiveDocument to fetch.
     */
    where?: SupportiveDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportiveDocuments to fetch.
     */
    orderBy?: SupportiveDocumentOrderByWithRelationInput | SupportiveDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportiveDocuments.
     */
    cursor?: SupportiveDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportiveDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportiveDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportiveDocuments.
     */
    distinct?: SupportiveDocumentScalarFieldEnum | SupportiveDocumentScalarFieldEnum[]
  }

  /**
   * SupportiveDocument findFirstOrThrow
   */
  export type SupportiveDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SupportiveDocument to fetch.
     */
    where?: SupportiveDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportiveDocuments to fetch.
     */
    orderBy?: SupportiveDocumentOrderByWithRelationInput | SupportiveDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportiveDocuments.
     */
    cursor?: SupportiveDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportiveDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportiveDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportiveDocuments.
     */
    distinct?: SupportiveDocumentScalarFieldEnum | SupportiveDocumentScalarFieldEnum[]
  }

  /**
   * SupportiveDocument findMany
   */
  export type SupportiveDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SupportiveDocuments to fetch.
     */
    where?: SupportiveDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportiveDocuments to fetch.
     */
    orderBy?: SupportiveDocumentOrderByWithRelationInput | SupportiveDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportiveDocuments.
     */
    cursor?: SupportiveDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportiveDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportiveDocuments.
     */
    skip?: number
    distinct?: SupportiveDocumentScalarFieldEnum | SupportiveDocumentScalarFieldEnum[]
  }

  /**
   * SupportiveDocument create
   */
  export type SupportiveDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportiveDocument.
     */
    data: XOR<SupportiveDocumentCreateInput, SupportiveDocumentUncheckedCreateInput>
  }

  /**
   * SupportiveDocument createMany
   */
  export type SupportiveDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportiveDocuments.
     */
    data: SupportiveDocumentCreateManyInput | SupportiveDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportiveDocument createManyAndReturn
   */
  export type SupportiveDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SupportiveDocuments.
     */
    data: SupportiveDocumentCreateManyInput | SupportiveDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportiveDocument update
   */
  export type SupportiveDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportiveDocument.
     */
    data: XOR<SupportiveDocumentUpdateInput, SupportiveDocumentUncheckedUpdateInput>
    /**
     * Choose, which SupportiveDocument to update.
     */
    where: SupportiveDocumentWhereUniqueInput
  }

  /**
   * SupportiveDocument updateMany
   */
  export type SupportiveDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportiveDocuments.
     */
    data: XOR<SupportiveDocumentUpdateManyMutationInput, SupportiveDocumentUncheckedUpdateManyInput>
    /**
     * Filter which SupportiveDocuments to update
     */
    where?: SupportiveDocumentWhereInput
  }

  /**
   * SupportiveDocument upsert
   */
  export type SupportiveDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportiveDocument to update in case it exists.
     */
    where: SupportiveDocumentWhereUniqueInput
    /**
     * In case the SupportiveDocument found by the `where` argument doesn't exist, create a new SupportiveDocument with this data.
     */
    create: XOR<SupportiveDocumentCreateInput, SupportiveDocumentUncheckedCreateInput>
    /**
     * In case the SupportiveDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportiveDocumentUpdateInput, SupportiveDocumentUncheckedUpdateInput>
  }

  /**
   * SupportiveDocument delete
   */
  export type SupportiveDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
    /**
     * Filter which SupportiveDocument to delete.
     */
    where: SupportiveDocumentWhereUniqueInput
  }

  /**
   * SupportiveDocument deleteMany
   */
  export type SupportiveDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportiveDocuments to delete
     */
    where?: SupportiveDocumentWhereInput
  }

  /**
   * SupportiveDocument without action
   */
  export type SupportiveDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportiveDocument
     */
    select?: SupportiveDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportiveDocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SchemeServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    summary: 'summary',
    type: 'type',
    targetAudience: 'targetAudience',
    applicationMode: 'applicationMode',
    onlineUrl: 'onlineUrl',
    offlineAddress: 'offlineAddress',
    status: 'status',
    isActive: 'isActive',
    eligibilityDetails: 'eligibilityDetails',
    benefitDetails: 'benefitDetails',
    applicationProcess: 'applicationProcess',
    requiredDocuments: 'requiredDocuments',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    adminId: 'adminId'
  };

  export type SchemeServiceScalarFieldEnum = (typeof SchemeServiceScalarFieldEnum)[keyof typeof SchemeServiceScalarFieldEnum]


  export const CertificateServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    summary: 'summary',
    type: 'type',
    targetAudience: 'targetAudience',
    eligibilityDetails: 'eligibilityDetails',
    certificateDetails: 'certificateDetails',
    applicationProcess: 'applicationProcess',
    requiredDocuments: 'requiredDocuments',
    applicationMode: 'applicationMode',
    onlineUrl: 'onlineUrl',
    offlineAddress: 'offlineAddress',
    status: 'status',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    adminId: 'adminId'
  };

  export type CertificateServiceScalarFieldEnum = (typeof CertificateServiceScalarFieldEnum)[keyof typeof CertificateServiceScalarFieldEnum]


  export const ContactServiceScalarFieldEnum: {
    id: 'id',
    serviceName: 'serviceName',
    district: 'district',
    subDistrict: 'subDistrict',
    block: 'block',
    officeAddress: 'officeAddress',
    status: 'status',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    adminId: 'adminId'
  };

  export type ContactServiceScalarFieldEnum = (typeof ContactServiceScalarFieldEnum)[keyof typeof ContactServiceScalarFieldEnum]


  export const ContactServiceContactScalarFieldEnum: {
    id: 'id',
    name: 'name',
    designation: 'designation',
    contact: 'contact',
    email: 'email',
    serviceId: 'serviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactServiceContactScalarFieldEnum = (typeof ContactServiceContactScalarFieldEnum)[keyof typeof ContactServiceContactScalarFieldEnum]


  export const GrievanceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    subject: 'subject',
    description: 'description',
    department: 'department',
    priority: 'priority',
    status: 'status',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GrievanceScalarFieldEnum = (typeof GrievanceScalarFieldEnum)[keyof typeof GrievanceScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    rating: 'rating',
    comment: 'comment',
    serviceType: 'serviceType',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const ContactPersonScalarFieldEnum: {
    id: 'id',
    serviceName: 'serviceName',
    district: 'district',
    subDistrict: 'subDistrict',
    block: 'block',
    name: 'name',
    designation: 'designation',
    contact: 'contact',
    email: 'email',
    schemeServiceId: 'schemeServiceId'
  };

  export type ContactPersonScalarFieldEnum = (typeof ContactPersonScalarFieldEnum)[keyof typeof ContactPersonScalarFieldEnum]


  export const SupportiveDocumentScalarFieldEnum: {
    id: 'id',
    slNo: 'slNo',
    documentType: 'documentType',
    validProof: 'validProof',
    isRequired: 'isRequired',
    schemeServiceId: 'schemeServiceId'
  };

  export type SupportiveDocumentScalarFieldEnum = (typeof SupportiveDocumentScalarFieldEnum)[keyof typeof SupportiveDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    email?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    schemeServices?: SchemeServiceListRelationFilter
    certificateServices?: CertificateServiceListRelationFilter
    contactServices?: ContactServiceListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schemeServices?: SchemeServiceOrderByRelationAggregateInput
    certificateServices?: CertificateServiceOrderByRelationAggregateInput
    contactServices?: ContactServiceOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    schemeServices?: SchemeServiceListRelationFilter
    certificateServices?: CertificateServiceListRelationFilter
    contactServices?: ContactServiceListRelationFilter
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    email?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    role?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type SchemeServiceWhereInput = {
    AND?: SchemeServiceWhereInput | SchemeServiceWhereInput[]
    OR?: SchemeServiceWhereInput[]
    NOT?: SchemeServiceWhereInput | SchemeServiceWhereInput[]
    id?: IntFilter<"SchemeService"> | number
    name?: StringFilter<"SchemeService"> | string
    summary?: StringFilter<"SchemeService"> | string
    type?: StringNullableFilter<"SchemeService"> | string | null
    targetAudience?: StringNullableListFilter<"SchemeService">
    applicationMode?: StringFilter<"SchemeService"> | string
    onlineUrl?: StringNullableFilter<"SchemeService"> | string | null
    offlineAddress?: StringNullableFilter<"SchemeService"> | string | null
    status?: StringFilter<"SchemeService"> | string
    isActive?: BoolFilter<"SchemeService"> | boolean
    eligibilityDetails?: StringNullableListFilter<"SchemeService">
    benefitDetails?: StringNullableListFilter<"SchemeService">
    applicationProcess?: StringNullableListFilter<"SchemeService">
    requiredDocuments?: StringNullableListFilter<"SchemeService">
    createdAt?: DateTimeFilter<"SchemeService"> | Date | string
    updatedAt?: DateTimeFilter<"SchemeService"> | Date | string
    adminId?: IntFilter<"SchemeService"> | number
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
    contacts?: ContactPersonListRelationFilter
    documents?: SupportiveDocumentListRelationFilter
  }

  export type SchemeServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrderInput | SortOrder
    targetAudience?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrderInput | SortOrder
    offlineAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    eligibilityDetails?: SortOrder
    benefitDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    admin?: AdminOrderByWithRelationInput
    contacts?: ContactPersonOrderByRelationAggregateInput
    documents?: SupportiveDocumentOrderByRelationAggregateInput
  }

  export type SchemeServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SchemeServiceWhereInput | SchemeServiceWhereInput[]
    OR?: SchemeServiceWhereInput[]
    NOT?: SchemeServiceWhereInput | SchemeServiceWhereInput[]
    name?: StringFilter<"SchemeService"> | string
    summary?: StringFilter<"SchemeService"> | string
    type?: StringNullableFilter<"SchemeService"> | string | null
    targetAudience?: StringNullableListFilter<"SchemeService">
    applicationMode?: StringFilter<"SchemeService"> | string
    onlineUrl?: StringNullableFilter<"SchemeService"> | string | null
    offlineAddress?: StringNullableFilter<"SchemeService"> | string | null
    status?: StringFilter<"SchemeService"> | string
    isActive?: BoolFilter<"SchemeService"> | boolean
    eligibilityDetails?: StringNullableListFilter<"SchemeService">
    benefitDetails?: StringNullableListFilter<"SchemeService">
    applicationProcess?: StringNullableListFilter<"SchemeService">
    requiredDocuments?: StringNullableListFilter<"SchemeService">
    createdAt?: DateTimeFilter<"SchemeService"> | Date | string
    updatedAt?: DateTimeFilter<"SchemeService"> | Date | string
    adminId?: IntFilter<"SchemeService"> | number
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
    contacts?: ContactPersonListRelationFilter
    documents?: SupportiveDocumentListRelationFilter
  }, "id">

  export type SchemeServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrderInput | SortOrder
    targetAudience?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrderInput | SortOrder
    offlineAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    eligibilityDetails?: SortOrder
    benefitDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    _count?: SchemeServiceCountOrderByAggregateInput
    _avg?: SchemeServiceAvgOrderByAggregateInput
    _max?: SchemeServiceMaxOrderByAggregateInput
    _min?: SchemeServiceMinOrderByAggregateInput
    _sum?: SchemeServiceSumOrderByAggregateInput
  }

  export type SchemeServiceScalarWhereWithAggregatesInput = {
    AND?: SchemeServiceScalarWhereWithAggregatesInput | SchemeServiceScalarWhereWithAggregatesInput[]
    OR?: SchemeServiceScalarWhereWithAggregatesInput[]
    NOT?: SchemeServiceScalarWhereWithAggregatesInput | SchemeServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SchemeService"> | number
    name?: StringWithAggregatesFilter<"SchemeService"> | string
    summary?: StringWithAggregatesFilter<"SchemeService"> | string
    type?: StringNullableWithAggregatesFilter<"SchemeService"> | string | null
    targetAudience?: StringNullableListFilter<"SchemeService">
    applicationMode?: StringWithAggregatesFilter<"SchemeService"> | string
    onlineUrl?: StringNullableWithAggregatesFilter<"SchemeService"> | string | null
    offlineAddress?: StringNullableWithAggregatesFilter<"SchemeService"> | string | null
    status?: StringWithAggregatesFilter<"SchemeService"> | string
    isActive?: BoolWithAggregatesFilter<"SchemeService"> | boolean
    eligibilityDetails?: StringNullableListFilter<"SchemeService">
    benefitDetails?: StringNullableListFilter<"SchemeService">
    applicationProcess?: StringNullableListFilter<"SchemeService">
    requiredDocuments?: StringNullableListFilter<"SchemeService">
    createdAt?: DateTimeWithAggregatesFilter<"SchemeService"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SchemeService"> | Date | string
    adminId?: IntWithAggregatesFilter<"SchemeService"> | number
  }

  export type CertificateServiceWhereInput = {
    AND?: CertificateServiceWhereInput | CertificateServiceWhereInput[]
    OR?: CertificateServiceWhereInput[]
    NOT?: CertificateServiceWhereInput | CertificateServiceWhereInput[]
    id?: IntFilter<"CertificateService"> | number
    name?: StringFilter<"CertificateService"> | string
    summary?: StringFilter<"CertificateService"> | string
    type?: StringNullableFilter<"CertificateService"> | string | null
    targetAudience?: StringNullableListFilter<"CertificateService">
    eligibilityDetails?: StringNullableListFilter<"CertificateService">
    certificateDetails?: StringNullableListFilter<"CertificateService">
    applicationProcess?: StringNullableListFilter<"CertificateService">
    requiredDocuments?: StringNullableListFilter<"CertificateService">
    applicationMode?: StringFilter<"CertificateService"> | string
    onlineUrl?: StringNullableFilter<"CertificateService"> | string | null
    offlineAddress?: StringNullableFilter<"CertificateService"> | string | null
    status?: StringFilter<"CertificateService"> | string
    isActive?: BoolFilter<"CertificateService"> | boolean
    createdAt?: DateTimeFilter<"CertificateService"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateService"> | Date | string
    adminId?: IntFilter<"CertificateService"> | number
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }

  export type CertificateServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrderInput | SortOrder
    targetAudience?: SortOrder
    eligibilityDetails?: SortOrder
    certificateDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrderInput | SortOrder
    offlineAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    admin?: AdminOrderByWithRelationInput
  }

  export type CertificateServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CertificateServiceWhereInput | CertificateServiceWhereInput[]
    OR?: CertificateServiceWhereInput[]
    NOT?: CertificateServiceWhereInput | CertificateServiceWhereInput[]
    name?: StringFilter<"CertificateService"> | string
    summary?: StringFilter<"CertificateService"> | string
    type?: StringNullableFilter<"CertificateService"> | string | null
    targetAudience?: StringNullableListFilter<"CertificateService">
    eligibilityDetails?: StringNullableListFilter<"CertificateService">
    certificateDetails?: StringNullableListFilter<"CertificateService">
    applicationProcess?: StringNullableListFilter<"CertificateService">
    requiredDocuments?: StringNullableListFilter<"CertificateService">
    applicationMode?: StringFilter<"CertificateService"> | string
    onlineUrl?: StringNullableFilter<"CertificateService"> | string | null
    offlineAddress?: StringNullableFilter<"CertificateService"> | string | null
    status?: StringFilter<"CertificateService"> | string
    isActive?: BoolFilter<"CertificateService"> | boolean
    createdAt?: DateTimeFilter<"CertificateService"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateService"> | Date | string
    adminId?: IntFilter<"CertificateService"> | number
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }, "id">

  export type CertificateServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrderInput | SortOrder
    targetAudience?: SortOrder
    eligibilityDetails?: SortOrder
    certificateDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrderInput | SortOrder
    offlineAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    _count?: CertificateServiceCountOrderByAggregateInput
    _avg?: CertificateServiceAvgOrderByAggregateInput
    _max?: CertificateServiceMaxOrderByAggregateInput
    _min?: CertificateServiceMinOrderByAggregateInput
    _sum?: CertificateServiceSumOrderByAggregateInput
  }

  export type CertificateServiceScalarWhereWithAggregatesInput = {
    AND?: CertificateServiceScalarWhereWithAggregatesInput | CertificateServiceScalarWhereWithAggregatesInput[]
    OR?: CertificateServiceScalarWhereWithAggregatesInput[]
    NOT?: CertificateServiceScalarWhereWithAggregatesInput | CertificateServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CertificateService"> | number
    name?: StringWithAggregatesFilter<"CertificateService"> | string
    summary?: StringWithAggregatesFilter<"CertificateService"> | string
    type?: StringNullableWithAggregatesFilter<"CertificateService"> | string | null
    targetAudience?: StringNullableListFilter<"CertificateService">
    eligibilityDetails?: StringNullableListFilter<"CertificateService">
    certificateDetails?: StringNullableListFilter<"CertificateService">
    applicationProcess?: StringNullableListFilter<"CertificateService">
    requiredDocuments?: StringNullableListFilter<"CertificateService">
    applicationMode?: StringWithAggregatesFilter<"CertificateService"> | string
    onlineUrl?: StringNullableWithAggregatesFilter<"CertificateService"> | string | null
    offlineAddress?: StringNullableWithAggregatesFilter<"CertificateService"> | string | null
    status?: StringWithAggregatesFilter<"CertificateService"> | string
    isActive?: BoolWithAggregatesFilter<"CertificateService"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CertificateService"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CertificateService"> | Date | string
    adminId?: IntWithAggregatesFilter<"CertificateService"> | number
  }

  export type ContactServiceWhereInput = {
    AND?: ContactServiceWhereInput | ContactServiceWhereInput[]
    OR?: ContactServiceWhereInput[]
    NOT?: ContactServiceWhereInput | ContactServiceWhereInput[]
    id?: IntFilter<"ContactService"> | number
    serviceName?: StringFilter<"ContactService"> | string
    district?: StringFilter<"ContactService"> | string
    subDistrict?: StringNullableFilter<"ContactService"> | string | null
    block?: StringFilter<"ContactService"> | string
    officeAddress?: StringNullableFilter<"ContactService"> | string | null
    status?: StringFilter<"ContactService"> | string
    isActive?: BoolFilter<"ContactService"> | boolean
    createdAt?: DateTimeFilter<"ContactService"> | Date | string
    updatedAt?: DateTimeFilter<"ContactService"> | Date | string
    adminId?: IntFilter<"ContactService"> | number
    contacts?: ContactServiceContactListRelationFilter
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }

  export type ContactServiceOrderByWithRelationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrderInput | SortOrder
    block?: SortOrder
    officeAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    contacts?: ContactServiceContactOrderByRelationAggregateInput
    admin?: AdminOrderByWithRelationInput
  }

  export type ContactServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactServiceWhereInput | ContactServiceWhereInput[]
    OR?: ContactServiceWhereInput[]
    NOT?: ContactServiceWhereInput | ContactServiceWhereInput[]
    serviceName?: StringFilter<"ContactService"> | string
    district?: StringFilter<"ContactService"> | string
    subDistrict?: StringNullableFilter<"ContactService"> | string | null
    block?: StringFilter<"ContactService"> | string
    officeAddress?: StringNullableFilter<"ContactService"> | string | null
    status?: StringFilter<"ContactService"> | string
    isActive?: BoolFilter<"ContactService"> | boolean
    createdAt?: DateTimeFilter<"ContactService"> | Date | string
    updatedAt?: DateTimeFilter<"ContactService"> | Date | string
    adminId?: IntFilter<"ContactService"> | number
    contacts?: ContactServiceContactListRelationFilter
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }, "id">

  export type ContactServiceOrderByWithAggregationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrderInput | SortOrder
    block?: SortOrder
    officeAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    _count?: ContactServiceCountOrderByAggregateInput
    _avg?: ContactServiceAvgOrderByAggregateInput
    _max?: ContactServiceMaxOrderByAggregateInput
    _min?: ContactServiceMinOrderByAggregateInput
    _sum?: ContactServiceSumOrderByAggregateInput
  }

  export type ContactServiceScalarWhereWithAggregatesInput = {
    AND?: ContactServiceScalarWhereWithAggregatesInput | ContactServiceScalarWhereWithAggregatesInput[]
    OR?: ContactServiceScalarWhereWithAggregatesInput[]
    NOT?: ContactServiceScalarWhereWithAggregatesInput | ContactServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactService"> | number
    serviceName?: StringWithAggregatesFilter<"ContactService"> | string
    district?: StringWithAggregatesFilter<"ContactService"> | string
    subDistrict?: StringNullableWithAggregatesFilter<"ContactService"> | string | null
    block?: StringWithAggregatesFilter<"ContactService"> | string
    officeAddress?: StringNullableWithAggregatesFilter<"ContactService"> | string | null
    status?: StringWithAggregatesFilter<"ContactService"> | string
    isActive?: BoolWithAggregatesFilter<"ContactService"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ContactService"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContactService"> | Date | string
    adminId?: IntWithAggregatesFilter<"ContactService"> | number
  }

  export type ContactServiceContactWhereInput = {
    AND?: ContactServiceContactWhereInput | ContactServiceContactWhereInput[]
    OR?: ContactServiceContactWhereInput[]
    NOT?: ContactServiceContactWhereInput | ContactServiceContactWhereInput[]
    id?: IntFilter<"ContactServiceContact"> | number
    name?: StringFilter<"ContactServiceContact"> | string
    designation?: StringFilter<"ContactServiceContact"> | string
    contact?: StringFilter<"ContactServiceContact"> | string
    email?: StringNullableFilter<"ContactServiceContact"> | string | null
    serviceId?: IntFilter<"ContactServiceContact"> | number
    createdAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
    updatedAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
    service?: XOR<ContactServiceRelationFilter, ContactServiceWhereInput>
  }

  export type ContactServiceContactOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    service?: ContactServiceOrderByWithRelationInput
  }

  export type ContactServiceContactWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactServiceContactWhereInput | ContactServiceContactWhereInput[]
    OR?: ContactServiceContactWhereInput[]
    NOT?: ContactServiceContactWhereInput | ContactServiceContactWhereInput[]
    name?: StringFilter<"ContactServiceContact"> | string
    designation?: StringFilter<"ContactServiceContact"> | string
    contact?: StringFilter<"ContactServiceContact"> | string
    email?: StringNullableFilter<"ContactServiceContact"> | string | null
    serviceId?: IntFilter<"ContactServiceContact"> | number
    createdAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
    updatedAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
    service?: XOR<ContactServiceRelationFilter, ContactServiceWhereInput>
  }, "id">

  export type ContactServiceContactOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactServiceContactCountOrderByAggregateInput
    _avg?: ContactServiceContactAvgOrderByAggregateInput
    _max?: ContactServiceContactMaxOrderByAggregateInput
    _min?: ContactServiceContactMinOrderByAggregateInput
    _sum?: ContactServiceContactSumOrderByAggregateInput
  }

  export type ContactServiceContactScalarWhereWithAggregatesInput = {
    AND?: ContactServiceContactScalarWhereWithAggregatesInput | ContactServiceContactScalarWhereWithAggregatesInput[]
    OR?: ContactServiceContactScalarWhereWithAggregatesInput[]
    NOT?: ContactServiceContactScalarWhereWithAggregatesInput | ContactServiceContactScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactServiceContact"> | number
    name?: StringWithAggregatesFilter<"ContactServiceContact"> | string
    designation?: StringWithAggregatesFilter<"ContactServiceContact"> | string
    contact?: StringWithAggregatesFilter<"ContactServiceContact"> | string
    email?: StringNullableWithAggregatesFilter<"ContactServiceContact"> | string | null
    serviceId?: IntWithAggregatesFilter<"ContactServiceContact"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ContactServiceContact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContactServiceContact"> | Date | string
  }

  export type GrievanceWhereInput = {
    AND?: GrievanceWhereInput | GrievanceWhereInput[]
    OR?: GrievanceWhereInput[]
    NOT?: GrievanceWhereInput | GrievanceWhereInput[]
    id?: IntFilter<"Grievance"> | number
    name?: StringFilter<"Grievance"> | string
    email?: StringFilter<"Grievance"> | string
    phone?: StringFilter<"Grievance"> | string
    subject?: StringFilter<"Grievance"> | string
    description?: StringFilter<"Grievance"> | string
    department?: StringFilter<"Grievance"> | string
    priority?: StringFilter<"Grievance"> | string
    status?: StringFilter<"Grievance"> | string
    source?: StringFilter<"Grievance"> | string
    createdAt?: DateTimeFilter<"Grievance"> | Date | string
    updatedAt?: DateTimeFilter<"Grievance"> | Date | string
  }

  export type GrievanceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    department?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrievanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GrievanceWhereInput | GrievanceWhereInput[]
    OR?: GrievanceWhereInput[]
    NOT?: GrievanceWhereInput | GrievanceWhereInput[]
    name?: StringFilter<"Grievance"> | string
    email?: StringFilter<"Grievance"> | string
    phone?: StringFilter<"Grievance"> | string
    subject?: StringFilter<"Grievance"> | string
    description?: StringFilter<"Grievance"> | string
    department?: StringFilter<"Grievance"> | string
    priority?: StringFilter<"Grievance"> | string
    status?: StringFilter<"Grievance"> | string
    source?: StringFilter<"Grievance"> | string
    createdAt?: DateTimeFilter<"Grievance"> | Date | string
    updatedAt?: DateTimeFilter<"Grievance"> | Date | string
  }, "id">

  export type GrievanceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    department?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GrievanceCountOrderByAggregateInput
    _avg?: GrievanceAvgOrderByAggregateInput
    _max?: GrievanceMaxOrderByAggregateInput
    _min?: GrievanceMinOrderByAggregateInput
    _sum?: GrievanceSumOrderByAggregateInput
  }

  export type GrievanceScalarWhereWithAggregatesInput = {
    AND?: GrievanceScalarWhereWithAggregatesInput | GrievanceScalarWhereWithAggregatesInput[]
    OR?: GrievanceScalarWhereWithAggregatesInput[]
    NOT?: GrievanceScalarWhereWithAggregatesInput | GrievanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Grievance"> | number
    name?: StringWithAggregatesFilter<"Grievance"> | string
    email?: StringWithAggregatesFilter<"Grievance"> | string
    phone?: StringWithAggregatesFilter<"Grievance"> | string
    subject?: StringWithAggregatesFilter<"Grievance"> | string
    description?: StringWithAggregatesFilter<"Grievance"> | string
    department?: StringWithAggregatesFilter<"Grievance"> | string
    priority?: StringWithAggregatesFilter<"Grievance"> | string
    status?: StringWithAggregatesFilter<"Grievance"> | string
    source?: StringWithAggregatesFilter<"Grievance"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Grievance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Grievance"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: IntFilter<"Feedback"> | number
    name?: StringFilter<"Feedback"> | string
    email?: StringNullableFilter<"Feedback"> | string | null
    phone?: StringNullableFilter<"Feedback"> | string | null
    rating?: IntFilter<"Feedback"> | number
    comment?: StringFilter<"Feedback"> | string
    serviceType?: StringFilter<"Feedback"> | string
    source?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    rating?: SortOrder
    comment?: SortOrder
    serviceType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    name?: StringFilter<"Feedback"> | string
    email?: StringNullableFilter<"Feedback"> | string | null
    phone?: StringNullableFilter<"Feedback"> | string | null
    rating?: IntFilter<"Feedback"> | number
    comment?: StringFilter<"Feedback"> | string
    serviceType?: StringFilter<"Feedback"> | string
    source?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    rating?: SortOrder
    comment?: SortOrder
    serviceType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Feedback"> | number
    name?: StringWithAggregatesFilter<"Feedback"> | string
    email?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    rating?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringWithAggregatesFilter<"Feedback"> | string
    serviceType?: StringWithAggregatesFilter<"Feedback"> | string
    source?: StringWithAggregatesFilter<"Feedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type ContactPersonWhereInput = {
    AND?: ContactPersonWhereInput | ContactPersonWhereInput[]
    OR?: ContactPersonWhereInput[]
    NOT?: ContactPersonWhereInput | ContactPersonWhereInput[]
    id?: IntFilter<"ContactPerson"> | number
    serviceName?: StringFilter<"ContactPerson"> | string
    district?: StringFilter<"ContactPerson"> | string
    subDistrict?: StringFilter<"ContactPerson"> | string
    block?: StringFilter<"ContactPerson"> | string
    name?: StringFilter<"ContactPerson"> | string
    designation?: StringFilter<"ContactPerson"> | string
    contact?: StringFilter<"ContactPerson"> | string
    email?: StringFilter<"ContactPerson"> | string
    schemeServiceId?: IntFilter<"ContactPerson"> | number
    schemeService?: XOR<SchemeServiceRelationFilter, SchemeServiceWhereInput>
  }

  export type ContactPersonOrderByWithRelationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    schemeServiceId?: SortOrder
    schemeService?: SchemeServiceOrderByWithRelationInput
  }

  export type ContactPersonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactPersonWhereInput | ContactPersonWhereInput[]
    OR?: ContactPersonWhereInput[]
    NOT?: ContactPersonWhereInput | ContactPersonWhereInput[]
    serviceName?: StringFilter<"ContactPerson"> | string
    district?: StringFilter<"ContactPerson"> | string
    subDistrict?: StringFilter<"ContactPerson"> | string
    block?: StringFilter<"ContactPerson"> | string
    name?: StringFilter<"ContactPerson"> | string
    designation?: StringFilter<"ContactPerson"> | string
    contact?: StringFilter<"ContactPerson"> | string
    email?: StringFilter<"ContactPerson"> | string
    schemeServiceId?: IntFilter<"ContactPerson"> | number
    schemeService?: XOR<SchemeServiceRelationFilter, SchemeServiceWhereInput>
  }, "id">

  export type ContactPersonOrderByWithAggregationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    schemeServiceId?: SortOrder
    _count?: ContactPersonCountOrderByAggregateInput
    _avg?: ContactPersonAvgOrderByAggregateInput
    _max?: ContactPersonMaxOrderByAggregateInput
    _min?: ContactPersonMinOrderByAggregateInput
    _sum?: ContactPersonSumOrderByAggregateInput
  }

  export type ContactPersonScalarWhereWithAggregatesInput = {
    AND?: ContactPersonScalarWhereWithAggregatesInput | ContactPersonScalarWhereWithAggregatesInput[]
    OR?: ContactPersonScalarWhereWithAggregatesInput[]
    NOT?: ContactPersonScalarWhereWithAggregatesInput | ContactPersonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactPerson"> | number
    serviceName?: StringWithAggregatesFilter<"ContactPerson"> | string
    district?: StringWithAggregatesFilter<"ContactPerson"> | string
    subDistrict?: StringWithAggregatesFilter<"ContactPerson"> | string
    block?: StringWithAggregatesFilter<"ContactPerson"> | string
    name?: StringWithAggregatesFilter<"ContactPerson"> | string
    designation?: StringWithAggregatesFilter<"ContactPerson"> | string
    contact?: StringWithAggregatesFilter<"ContactPerson"> | string
    email?: StringWithAggregatesFilter<"ContactPerson"> | string
    schemeServiceId?: IntWithAggregatesFilter<"ContactPerson"> | number
  }

  export type SupportiveDocumentWhereInput = {
    AND?: SupportiveDocumentWhereInput | SupportiveDocumentWhereInput[]
    OR?: SupportiveDocumentWhereInput[]
    NOT?: SupportiveDocumentWhereInput | SupportiveDocumentWhereInput[]
    id?: IntFilter<"SupportiveDocument"> | number
    slNo?: IntFilter<"SupportiveDocument"> | number
    documentType?: StringFilter<"SupportiveDocument"> | string
    validProof?: StringFilter<"SupportiveDocument"> | string
    isRequired?: BoolFilter<"SupportiveDocument"> | boolean
    schemeServiceId?: IntFilter<"SupportiveDocument"> | number
    schemeService?: XOR<SchemeServiceRelationFilter, SchemeServiceWhereInput>
  }

  export type SupportiveDocumentOrderByWithRelationInput = {
    id?: SortOrder
    slNo?: SortOrder
    documentType?: SortOrder
    validProof?: SortOrder
    isRequired?: SortOrder
    schemeServiceId?: SortOrder
    schemeService?: SchemeServiceOrderByWithRelationInput
  }

  export type SupportiveDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SupportiveDocumentWhereInput | SupportiveDocumentWhereInput[]
    OR?: SupportiveDocumentWhereInput[]
    NOT?: SupportiveDocumentWhereInput | SupportiveDocumentWhereInput[]
    slNo?: IntFilter<"SupportiveDocument"> | number
    documentType?: StringFilter<"SupportiveDocument"> | string
    validProof?: StringFilter<"SupportiveDocument"> | string
    isRequired?: BoolFilter<"SupportiveDocument"> | boolean
    schemeServiceId?: IntFilter<"SupportiveDocument"> | number
    schemeService?: XOR<SchemeServiceRelationFilter, SchemeServiceWhereInput>
  }, "id">

  export type SupportiveDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    slNo?: SortOrder
    documentType?: SortOrder
    validProof?: SortOrder
    isRequired?: SortOrder
    schemeServiceId?: SortOrder
    _count?: SupportiveDocumentCountOrderByAggregateInput
    _avg?: SupportiveDocumentAvgOrderByAggregateInput
    _max?: SupportiveDocumentMaxOrderByAggregateInput
    _min?: SupportiveDocumentMinOrderByAggregateInput
    _sum?: SupportiveDocumentSumOrderByAggregateInput
  }

  export type SupportiveDocumentScalarWhereWithAggregatesInput = {
    AND?: SupportiveDocumentScalarWhereWithAggregatesInput | SupportiveDocumentScalarWhereWithAggregatesInput[]
    OR?: SupportiveDocumentScalarWhereWithAggregatesInput[]
    NOT?: SupportiveDocumentScalarWhereWithAggregatesInput | SupportiveDocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SupportiveDocument"> | number
    slNo?: IntWithAggregatesFilter<"SupportiveDocument"> | number
    documentType?: StringWithAggregatesFilter<"SupportiveDocument"> | string
    validProof?: StringWithAggregatesFilter<"SupportiveDocument"> | string
    isRequired?: BoolWithAggregatesFilter<"SupportiveDocument"> | boolean
    schemeServiceId?: IntWithAggregatesFilter<"SupportiveDocument"> | number
  }

  export type AdminCreateInput = {
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceCreateNestedManyWithoutAdminInput
    certificateServices?: CertificateServiceCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceUncheckedCreateNestedManyWithoutAdminInput
    certificateServices?: CertificateServiceUncheckedCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUpdateManyWithoutAdminNestedInput
    certificateServices?: CertificateServiceUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUncheckedUpdateManyWithoutAdminNestedInput
    certificateServices?: CertificateServiceUncheckedUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminCreateManyInput = {
    id?: number
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchemeServiceCreateInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: AdminCreateNestedOneWithoutSchemeServicesInput
    contacts?: ContactPersonCreateNestedManyWithoutSchemeServiceInput
    documents?: SupportiveDocumentCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceUncheckedCreateInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
    contacts?: ContactPersonUncheckedCreateNestedManyWithoutSchemeServiceInput
    documents?: SupportiveDocumentUncheckedCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutSchemeServicesNestedInput
    contacts?: ContactPersonUpdateManyWithoutSchemeServiceNestedInput
    documents?: SupportiveDocumentUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
    contacts?: ContactPersonUncheckedUpdateManyWithoutSchemeServiceNestedInput
    documents?: SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceCreateManyInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
  }

  export type SchemeServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchemeServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
  }

  export type CertificateServiceCreateInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: AdminCreateNestedOneWithoutCertificateServicesInput
  }

  export type CertificateServiceUncheckedCreateInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
  }

  export type CertificateServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutCertificateServicesNestedInput
  }

  export type CertificateServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
  }

  export type CertificateServiceCreateManyInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
  }

  export type CertificateServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
  }

  export type ContactServiceCreateInput = {
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactServiceContactCreateNestedManyWithoutServiceInput
    admin?: AdminCreateNestedOneWithoutContactServicesInput
  }

  export type ContactServiceUncheckedCreateInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
    contacts?: ContactServiceContactUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ContactServiceUpdateInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactServiceContactUpdateManyWithoutServiceNestedInput
    admin?: AdminUpdateOneRequiredWithoutContactServicesNestedInput
  }

  export type ContactServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
    contacts?: ContactServiceContactUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ContactServiceCreateManyInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
  }

  export type ContactServiceUpdateManyMutationInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
  }

  export type ContactServiceContactCreateInput = {
    name: string
    designation: string
    contact: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ContactServiceCreateNestedOneWithoutContactsInput
  }

  export type ContactServiceContactUncheckedCreateInput = {
    id?: number
    name: string
    designation: string
    contact: string
    email?: string | null
    serviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceContactUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ContactServiceUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactServiceContactUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceContactCreateManyInput = {
    id?: number
    name: string
    designation: string
    contact: string
    email?: string | null
    serviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceContactUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceContactUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrievanceCreateInput = {
    name: string
    email: string
    phone: string
    subject: string
    description: string
    department: string
    priority?: string
    status?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrievanceUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone: string
    subject: string
    description: string
    department: string
    priority?: string
    status?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrievanceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrievanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrievanceCreateManyInput = {
    id?: number
    name: string
    email: string
    phone: string
    subject: string
    description: string
    department: string
    priority?: string
    status?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrievanceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrievanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    name: string
    email?: string | null
    phone?: string | null
    rating?: number
    comment: string
    serviceType: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUncheckedCreateInput = {
    id?: number
    name: string
    email?: string | null
    phone?: string | null
    rating?: number
    comment: string
    serviceType: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: number
    name: string
    email?: string | null
    phone?: string | null
    rating?: number
    comment: string
    serviceType: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPersonCreateInput = {
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
    schemeService: SchemeServiceCreateNestedOneWithoutContactsInput
  }

  export type ContactPersonUncheckedCreateInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
    schemeServiceId: number
  }

  export type ContactPersonUpdateInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    schemeService?: SchemeServiceUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactPersonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    schemeServiceId?: IntFieldUpdateOperationsInput | number
  }

  export type ContactPersonCreateManyInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
    schemeServiceId: number
  }

  export type ContactPersonUpdateManyMutationInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type ContactPersonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    schemeServiceId?: IntFieldUpdateOperationsInput | number
  }

  export type SupportiveDocumentCreateInput = {
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
    schemeService: SchemeServiceCreateNestedOneWithoutDocumentsInput
  }

  export type SupportiveDocumentUncheckedCreateInput = {
    id?: number
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
    schemeServiceId: number
  }

  export type SupportiveDocumentUpdateInput = {
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    schemeService?: SchemeServiceUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type SupportiveDocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    schemeServiceId?: IntFieldUpdateOperationsInput | number
  }

  export type SupportiveDocumentCreateManyInput = {
    id?: number
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
    schemeServiceId: number
  }

  export type SupportiveDocumentUpdateManyMutationInput = {
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportiveDocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    schemeServiceId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SchemeServiceListRelationFilter = {
    every?: SchemeServiceWhereInput
    some?: SchemeServiceWhereInput
    none?: SchemeServiceWhereInput
  }

  export type CertificateServiceListRelationFilter = {
    every?: CertificateServiceWhereInput
    some?: CertificateServiceWhereInput
    none?: CertificateServiceWhereInput
  }

  export type ContactServiceListRelationFilter = {
    every?: ContactServiceWhereInput
    some?: ContactServiceWhereInput
    none?: ContactServiceWhereInput
  }

  export type SchemeServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CertificateServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AdminRelationFilter = {
    is?: AdminWhereInput
    isNot?: AdminWhereInput
  }

  export type ContactPersonListRelationFilter = {
    every?: ContactPersonWhereInput
    some?: ContactPersonWhereInput
    none?: ContactPersonWhereInput
  }

  export type SupportiveDocumentListRelationFilter = {
    every?: SupportiveDocumentWhereInput
    some?: SupportiveDocumentWhereInput
    none?: SupportiveDocumentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContactPersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportiveDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchemeServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    eligibilityDetails?: SortOrder
    benefitDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type SchemeServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type SchemeServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type SchemeServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type SchemeServiceSumOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CertificateServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    eligibilityDetails?: SortOrder
    certificateDetails?: SortOrder
    applicationProcess?: SortOrder
    requiredDocuments?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type CertificateServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type CertificateServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type CertificateServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    type?: SortOrder
    applicationMode?: SortOrder
    onlineUrl?: SortOrder
    offlineAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type CertificateServiceSumOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceContactListRelationFilter = {
    every?: ContactServiceContactWhereInput
    some?: ContactServiceContactWhereInput
    none?: ContactServiceContactWhereInput
  }

  export type ContactServiceContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactServiceCountOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    officeAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    officeAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceMinOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    officeAddress?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceSumOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
  }

  export type ContactServiceRelationFilter = {
    is?: ContactServiceWhereInput
    isNot?: ContactServiceWhereInput
  }

  export type ContactServiceContactCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactServiceContactAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type ContactServiceContactMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactServiceContactMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactServiceContactSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type GrievanceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    department?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrievanceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GrievanceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    department?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrievanceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    department?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrievanceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    serviceType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    serviceType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    serviceType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
  }

  export type SchemeServiceRelationFilter = {
    is?: SchemeServiceWhereInput
    isNot?: SchemeServiceWhereInput
  }

  export type ContactPersonCountOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type ContactPersonAvgOrderByAggregateInput = {
    id?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type ContactPersonMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type ContactPersonMinOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    district?: SortOrder
    subDistrict?: SortOrder
    block?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type ContactPersonSumOrderByAggregateInput = {
    id?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SupportiveDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    slNo?: SortOrder
    documentType?: SortOrder
    validProof?: SortOrder
    isRequired?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SupportiveDocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    slNo?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SupportiveDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    slNo?: SortOrder
    documentType?: SortOrder
    validProof?: SortOrder
    isRequired?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SupportiveDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    slNo?: SortOrder
    documentType?: SortOrder
    validProof?: SortOrder
    isRequired?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SupportiveDocumentSumOrderByAggregateInput = {
    id?: SortOrder
    slNo?: SortOrder
    schemeServiceId?: SortOrder
  }

  export type SchemeServiceCreateNestedManyWithoutAdminInput = {
    create?: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput> | SchemeServiceCreateWithoutAdminInput[] | SchemeServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutAdminInput | SchemeServiceCreateOrConnectWithoutAdminInput[]
    createMany?: SchemeServiceCreateManyAdminInputEnvelope
    connect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
  }

  export type CertificateServiceCreateNestedManyWithoutAdminInput = {
    create?: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput> | CertificateServiceCreateWithoutAdminInput[] | CertificateServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CertificateServiceCreateOrConnectWithoutAdminInput | CertificateServiceCreateOrConnectWithoutAdminInput[]
    createMany?: CertificateServiceCreateManyAdminInputEnvelope
    connect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
  }

  export type ContactServiceCreateNestedManyWithoutAdminInput = {
    create?: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput> | ContactServiceCreateWithoutAdminInput[] | ContactServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ContactServiceCreateOrConnectWithoutAdminInput | ContactServiceCreateOrConnectWithoutAdminInput[]
    createMany?: ContactServiceCreateManyAdminInputEnvelope
    connect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
  }

  export type SchemeServiceUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput> | SchemeServiceCreateWithoutAdminInput[] | SchemeServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutAdminInput | SchemeServiceCreateOrConnectWithoutAdminInput[]
    createMany?: SchemeServiceCreateManyAdminInputEnvelope
    connect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
  }

  export type CertificateServiceUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput> | CertificateServiceCreateWithoutAdminInput[] | CertificateServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CertificateServiceCreateOrConnectWithoutAdminInput | CertificateServiceCreateOrConnectWithoutAdminInput[]
    createMany?: CertificateServiceCreateManyAdminInputEnvelope
    connect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
  }

  export type ContactServiceUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput> | ContactServiceCreateWithoutAdminInput[] | ContactServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ContactServiceCreateOrConnectWithoutAdminInput | ContactServiceCreateOrConnectWithoutAdminInput[]
    createMany?: ContactServiceCreateManyAdminInputEnvelope
    connect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SchemeServiceUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput> | SchemeServiceCreateWithoutAdminInput[] | SchemeServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutAdminInput | SchemeServiceCreateOrConnectWithoutAdminInput[]
    upsert?: SchemeServiceUpsertWithWhereUniqueWithoutAdminInput | SchemeServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SchemeServiceCreateManyAdminInputEnvelope
    set?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    disconnect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    delete?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    connect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    update?: SchemeServiceUpdateWithWhereUniqueWithoutAdminInput | SchemeServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SchemeServiceUpdateManyWithWhereWithoutAdminInput | SchemeServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SchemeServiceScalarWhereInput | SchemeServiceScalarWhereInput[]
  }

  export type CertificateServiceUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput> | CertificateServiceCreateWithoutAdminInput[] | CertificateServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CertificateServiceCreateOrConnectWithoutAdminInput | CertificateServiceCreateOrConnectWithoutAdminInput[]
    upsert?: CertificateServiceUpsertWithWhereUniqueWithoutAdminInput | CertificateServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CertificateServiceCreateManyAdminInputEnvelope
    set?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    disconnect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    delete?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    connect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    update?: CertificateServiceUpdateWithWhereUniqueWithoutAdminInput | CertificateServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CertificateServiceUpdateManyWithWhereWithoutAdminInput | CertificateServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CertificateServiceScalarWhereInput | CertificateServiceScalarWhereInput[]
  }

  export type ContactServiceUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput> | ContactServiceCreateWithoutAdminInput[] | ContactServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ContactServiceCreateOrConnectWithoutAdminInput | ContactServiceCreateOrConnectWithoutAdminInput[]
    upsert?: ContactServiceUpsertWithWhereUniqueWithoutAdminInput | ContactServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ContactServiceCreateManyAdminInputEnvelope
    set?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    disconnect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    delete?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    connect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    update?: ContactServiceUpdateWithWhereUniqueWithoutAdminInput | ContactServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ContactServiceUpdateManyWithWhereWithoutAdminInput | ContactServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ContactServiceScalarWhereInput | ContactServiceScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SchemeServiceUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput> | SchemeServiceCreateWithoutAdminInput[] | SchemeServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutAdminInput | SchemeServiceCreateOrConnectWithoutAdminInput[]
    upsert?: SchemeServiceUpsertWithWhereUniqueWithoutAdminInput | SchemeServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SchemeServiceCreateManyAdminInputEnvelope
    set?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    disconnect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    delete?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    connect?: SchemeServiceWhereUniqueInput | SchemeServiceWhereUniqueInput[]
    update?: SchemeServiceUpdateWithWhereUniqueWithoutAdminInput | SchemeServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SchemeServiceUpdateManyWithWhereWithoutAdminInput | SchemeServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SchemeServiceScalarWhereInput | SchemeServiceScalarWhereInput[]
  }

  export type CertificateServiceUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput> | CertificateServiceCreateWithoutAdminInput[] | CertificateServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CertificateServiceCreateOrConnectWithoutAdminInput | CertificateServiceCreateOrConnectWithoutAdminInput[]
    upsert?: CertificateServiceUpsertWithWhereUniqueWithoutAdminInput | CertificateServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CertificateServiceCreateManyAdminInputEnvelope
    set?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    disconnect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    delete?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    connect?: CertificateServiceWhereUniqueInput | CertificateServiceWhereUniqueInput[]
    update?: CertificateServiceUpdateWithWhereUniqueWithoutAdminInput | CertificateServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CertificateServiceUpdateManyWithWhereWithoutAdminInput | CertificateServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CertificateServiceScalarWhereInput | CertificateServiceScalarWhereInput[]
  }

  export type ContactServiceUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput> | ContactServiceCreateWithoutAdminInput[] | ContactServiceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ContactServiceCreateOrConnectWithoutAdminInput | ContactServiceCreateOrConnectWithoutAdminInput[]
    upsert?: ContactServiceUpsertWithWhereUniqueWithoutAdminInput | ContactServiceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ContactServiceCreateManyAdminInputEnvelope
    set?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    disconnect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    delete?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    connect?: ContactServiceWhereUniqueInput | ContactServiceWhereUniqueInput[]
    update?: ContactServiceUpdateWithWhereUniqueWithoutAdminInput | ContactServiceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ContactServiceUpdateManyWithWhereWithoutAdminInput | ContactServiceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ContactServiceScalarWhereInput | ContactServiceScalarWhereInput[]
  }

  export type SchemeServiceCreatetargetAudienceInput = {
    set: string[]
  }

  export type SchemeServiceCreateeligibilityDetailsInput = {
    set: string[]
  }

  export type SchemeServiceCreatebenefitDetailsInput = {
    set: string[]
  }

  export type SchemeServiceCreateapplicationProcessInput = {
    set: string[]
  }

  export type SchemeServiceCreaterequiredDocumentsInput = {
    set: string[]
  }

  export type AdminCreateNestedOneWithoutSchemeServicesInput = {
    create?: XOR<AdminCreateWithoutSchemeServicesInput, AdminUncheckedCreateWithoutSchemeServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSchemeServicesInput
    connect?: AdminWhereUniqueInput
  }

  export type ContactPersonCreateNestedManyWithoutSchemeServiceInput = {
    create?: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput> | ContactPersonCreateWithoutSchemeServiceInput[] | ContactPersonUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: ContactPersonCreateOrConnectWithoutSchemeServiceInput | ContactPersonCreateOrConnectWithoutSchemeServiceInput[]
    createMany?: ContactPersonCreateManySchemeServiceInputEnvelope
    connect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
  }

  export type SupportiveDocumentCreateNestedManyWithoutSchemeServiceInput = {
    create?: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput> | SupportiveDocumentCreateWithoutSchemeServiceInput[] | SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput | SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput[]
    createMany?: SupportiveDocumentCreateManySchemeServiceInputEnvelope
    connect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
  }

  export type ContactPersonUncheckedCreateNestedManyWithoutSchemeServiceInput = {
    create?: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput> | ContactPersonCreateWithoutSchemeServiceInput[] | ContactPersonUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: ContactPersonCreateOrConnectWithoutSchemeServiceInput | ContactPersonCreateOrConnectWithoutSchemeServiceInput[]
    createMany?: ContactPersonCreateManySchemeServiceInputEnvelope
    connect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
  }

  export type SupportiveDocumentUncheckedCreateNestedManyWithoutSchemeServiceInput = {
    create?: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput> | SupportiveDocumentCreateWithoutSchemeServiceInput[] | SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput | SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput[]
    createMany?: SupportiveDocumentCreateManySchemeServiceInputEnvelope
    connect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SchemeServiceUpdatetargetAudienceInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SchemeServiceUpdateeligibilityDetailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SchemeServiceUpdatebenefitDetailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SchemeServiceUpdateapplicationProcessInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SchemeServiceUpdaterequiredDocumentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AdminUpdateOneRequiredWithoutSchemeServicesNestedInput = {
    create?: XOR<AdminCreateWithoutSchemeServicesInput, AdminUncheckedCreateWithoutSchemeServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSchemeServicesInput
    upsert?: AdminUpsertWithoutSchemeServicesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutSchemeServicesInput, AdminUpdateWithoutSchemeServicesInput>, AdminUncheckedUpdateWithoutSchemeServicesInput>
  }

  export type ContactPersonUpdateManyWithoutSchemeServiceNestedInput = {
    create?: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput> | ContactPersonCreateWithoutSchemeServiceInput[] | ContactPersonUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: ContactPersonCreateOrConnectWithoutSchemeServiceInput | ContactPersonCreateOrConnectWithoutSchemeServiceInput[]
    upsert?: ContactPersonUpsertWithWhereUniqueWithoutSchemeServiceInput | ContactPersonUpsertWithWhereUniqueWithoutSchemeServiceInput[]
    createMany?: ContactPersonCreateManySchemeServiceInputEnvelope
    set?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    disconnect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    delete?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    connect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    update?: ContactPersonUpdateWithWhereUniqueWithoutSchemeServiceInput | ContactPersonUpdateWithWhereUniqueWithoutSchemeServiceInput[]
    updateMany?: ContactPersonUpdateManyWithWhereWithoutSchemeServiceInput | ContactPersonUpdateManyWithWhereWithoutSchemeServiceInput[]
    deleteMany?: ContactPersonScalarWhereInput | ContactPersonScalarWhereInput[]
  }

  export type SupportiveDocumentUpdateManyWithoutSchemeServiceNestedInput = {
    create?: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput> | SupportiveDocumentCreateWithoutSchemeServiceInput[] | SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput | SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput[]
    upsert?: SupportiveDocumentUpsertWithWhereUniqueWithoutSchemeServiceInput | SupportiveDocumentUpsertWithWhereUniqueWithoutSchemeServiceInput[]
    createMany?: SupportiveDocumentCreateManySchemeServiceInputEnvelope
    set?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    disconnect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    delete?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    connect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    update?: SupportiveDocumentUpdateWithWhereUniqueWithoutSchemeServiceInput | SupportiveDocumentUpdateWithWhereUniqueWithoutSchemeServiceInput[]
    updateMany?: SupportiveDocumentUpdateManyWithWhereWithoutSchemeServiceInput | SupportiveDocumentUpdateManyWithWhereWithoutSchemeServiceInput[]
    deleteMany?: SupportiveDocumentScalarWhereInput | SupportiveDocumentScalarWhereInput[]
  }

  export type ContactPersonUncheckedUpdateManyWithoutSchemeServiceNestedInput = {
    create?: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput> | ContactPersonCreateWithoutSchemeServiceInput[] | ContactPersonUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: ContactPersonCreateOrConnectWithoutSchemeServiceInput | ContactPersonCreateOrConnectWithoutSchemeServiceInput[]
    upsert?: ContactPersonUpsertWithWhereUniqueWithoutSchemeServiceInput | ContactPersonUpsertWithWhereUniqueWithoutSchemeServiceInput[]
    createMany?: ContactPersonCreateManySchemeServiceInputEnvelope
    set?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    disconnect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    delete?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    connect?: ContactPersonWhereUniqueInput | ContactPersonWhereUniqueInput[]
    update?: ContactPersonUpdateWithWhereUniqueWithoutSchemeServiceInput | ContactPersonUpdateWithWhereUniqueWithoutSchemeServiceInput[]
    updateMany?: ContactPersonUpdateManyWithWhereWithoutSchemeServiceInput | ContactPersonUpdateManyWithWhereWithoutSchemeServiceInput[]
    deleteMany?: ContactPersonScalarWhereInput | ContactPersonScalarWhereInput[]
  }

  export type SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceNestedInput = {
    create?: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput> | SupportiveDocumentCreateWithoutSchemeServiceInput[] | SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput[]
    connectOrCreate?: SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput | SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput[]
    upsert?: SupportiveDocumentUpsertWithWhereUniqueWithoutSchemeServiceInput | SupportiveDocumentUpsertWithWhereUniqueWithoutSchemeServiceInput[]
    createMany?: SupportiveDocumentCreateManySchemeServiceInputEnvelope
    set?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    disconnect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    delete?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    connect?: SupportiveDocumentWhereUniqueInput | SupportiveDocumentWhereUniqueInput[]
    update?: SupportiveDocumentUpdateWithWhereUniqueWithoutSchemeServiceInput | SupportiveDocumentUpdateWithWhereUniqueWithoutSchemeServiceInput[]
    updateMany?: SupportiveDocumentUpdateManyWithWhereWithoutSchemeServiceInput | SupportiveDocumentUpdateManyWithWhereWithoutSchemeServiceInput[]
    deleteMany?: SupportiveDocumentScalarWhereInput | SupportiveDocumentScalarWhereInput[]
  }

  export type CertificateServiceCreatetargetAudienceInput = {
    set: string[]
  }

  export type CertificateServiceCreateeligibilityDetailsInput = {
    set: string[]
  }

  export type CertificateServiceCreatecertificateDetailsInput = {
    set: string[]
  }

  export type CertificateServiceCreateapplicationProcessInput = {
    set: string[]
  }

  export type CertificateServiceCreaterequiredDocumentsInput = {
    set: string[]
  }

  export type AdminCreateNestedOneWithoutCertificateServicesInput = {
    create?: XOR<AdminCreateWithoutCertificateServicesInput, AdminUncheckedCreateWithoutCertificateServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutCertificateServicesInput
    connect?: AdminWhereUniqueInput
  }

  export type CertificateServiceUpdatetargetAudienceInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CertificateServiceUpdateeligibilityDetailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CertificateServiceUpdatecertificateDetailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CertificateServiceUpdateapplicationProcessInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CertificateServiceUpdaterequiredDocumentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AdminUpdateOneRequiredWithoutCertificateServicesNestedInput = {
    create?: XOR<AdminCreateWithoutCertificateServicesInput, AdminUncheckedCreateWithoutCertificateServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutCertificateServicesInput
    upsert?: AdminUpsertWithoutCertificateServicesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutCertificateServicesInput, AdminUpdateWithoutCertificateServicesInput>, AdminUncheckedUpdateWithoutCertificateServicesInput>
  }

  export type ContactServiceContactCreateNestedManyWithoutServiceInput = {
    create?: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput> | ContactServiceContactCreateWithoutServiceInput[] | ContactServiceContactUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ContactServiceContactCreateOrConnectWithoutServiceInput | ContactServiceContactCreateOrConnectWithoutServiceInput[]
    createMany?: ContactServiceContactCreateManyServiceInputEnvelope
    connect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
  }

  export type AdminCreateNestedOneWithoutContactServicesInput = {
    create?: XOR<AdminCreateWithoutContactServicesInput, AdminUncheckedCreateWithoutContactServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutContactServicesInput
    connect?: AdminWhereUniqueInput
  }

  export type ContactServiceContactUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput> | ContactServiceContactCreateWithoutServiceInput[] | ContactServiceContactUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ContactServiceContactCreateOrConnectWithoutServiceInput | ContactServiceContactCreateOrConnectWithoutServiceInput[]
    createMany?: ContactServiceContactCreateManyServiceInputEnvelope
    connect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
  }

  export type ContactServiceContactUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput> | ContactServiceContactCreateWithoutServiceInput[] | ContactServiceContactUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ContactServiceContactCreateOrConnectWithoutServiceInput | ContactServiceContactCreateOrConnectWithoutServiceInput[]
    upsert?: ContactServiceContactUpsertWithWhereUniqueWithoutServiceInput | ContactServiceContactUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ContactServiceContactCreateManyServiceInputEnvelope
    set?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    disconnect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    delete?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    connect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    update?: ContactServiceContactUpdateWithWhereUniqueWithoutServiceInput | ContactServiceContactUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ContactServiceContactUpdateManyWithWhereWithoutServiceInput | ContactServiceContactUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ContactServiceContactScalarWhereInput | ContactServiceContactScalarWhereInput[]
  }

  export type AdminUpdateOneRequiredWithoutContactServicesNestedInput = {
    create?: XOR<AdminCreateWithoutContactServicesInput, AdminUncheckedCreateWithoutContactServicesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutContactServicesInput
    upsert?: AdminUpsertWithoutContactServicesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutContactServicesInput, AdminUpdateWithoutContactServicesInput>, AdminUncheckedUpdateWithoutContactServicesInput>
  }

  export type ContactServiceContactUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput> | ContactServiceContactCreateWithoutServiceInput[] | ContactServiceContactUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ContactServiceContactCreateOrConnectWithoutServiceInput | ContactServiceContactCreateOrConnectWithoutServiceInput[]
    upsert?: ContactServiceContactUpsertWithWhereUniqueWithoutServiceInput | ContactServiceContactUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ContactServiceContactCreateManyServiceInputEnvelope
    set?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    disconnect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    delete?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    connect?: ContactServiceContactWhereUniqueInput | ContactServiceContactWhereUniqueInput[]
    update?: ContactServiceContactUpdateWithWhereUniqueWithoutServiceInput | ContactServiceContactUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ContactServiceContactUpdateManyWithWhereWithoutServiceInput | ContactServiceContactUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ContactServiceContactScalarWhereInput | ContactServiceContactScalarWhereInput[]
  }

  export type ContactServiceCreateNestedOneWithoutContactsInput = {
    create?: XOR<ContactServiceCreateWithoutContactsInput, ContactServiceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: ContactServiceCreateOrConnectWithoutContactsInput
    connect?: ContactServiceWhereUniqueInput
  }

  export type ContactServiceUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<ContactServiceCreateWithoutContactsInput, ContactServiceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: ContactServiceCreateOrConnectWithoutContactsInput
    upsert?: ContactServiceUpsertWithoutContactsInput
    connect?: ContactServiceWhereUniqueInput
    update?: XOR<XOR<ContactServiceUpdateToOneWithWhereWithoutContactsInput, ContactServiceUpdateWithoutContactsInput>, ContactServiceUncheckedUpdateWithoutContactsInput>
  }

  export type SchemeServiceCreateNestedOneWithoutContactsInput = {
    create?: XOR<SchemeServiceCreateWithoutContactsInput, SchemeServiceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutContactsInput
    connect?: SchemeServiceWhereUniqueInput
  }

  export type SchemeServiceUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<SchemeServiceCreateWithoutContactsInput, SchemeServiceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutContactsInput
    upsert?: SchemeServiceUpsertWithoutContactsInput
    connect?: SchemeServiceWhereUniqueInput
    update?: XOR<XOR<SchemeServiceUpdateToOneWithWhereWithoutContactsInput, SchemeServiceUpdateWithoutContactsInput>, SchemeServiceUncheckedUpdateWithoutContactsInput>
  }

  export type SchemeServiceCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<SchemeServiceCreateWithoutDocumentsInput, SchemeServiceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutDocumentsInput
    connect?: SchemeServiceWhereUniqueInput
  }

  export type SchemeServiceUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<SchemeServiceCreateWithoutDocumentsInput, SchemeServiceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: SchemeServiceCreateOrConnectWithoutDocumentsInput
    upsert?: SchemeServiceUpsertWithoutDocumentsInput
    connect?: SchemeServiceWhereUniqueInput
    update?: XOR<XOR<SchemeServiceUpdateToOneWithWhereWithoutDocumentsInput, SchemeServiceUpdateWithoutDocumentsInput>, SchemeServiceUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SchemeServiceCreateWithoutAdminInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactPersonCreateNestedManyWithoutSchemeServiceInput
    documents?: SupportiveDocumentCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceUncheckedCreateWithoutAdminInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactPersonUncheckedCreateNestedManyWithoutSchemeServiceInput
    documents?: SupportiveDocumentUncheckedCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceCreateOrConnectWithoutAdminInput = {
    where: SchemeServiceWhereUniqueInput
    create: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput>
  }

  export type SchemeServiceCreateManyAdminInputEnvelope = {
    data: SchemeServiceCreateManyAdminInput | SchemeServiceCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type CertificateServiceCreateWithoutAdminInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateServiceUncheckedCreateWithoutAdminInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateServiceCreateOrConnectWithoutAdminInput = {
    where: CertificateServiceWhereUniqueInput
    create: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput>
  }

  export type CertificateServiceCreateManyAdminInputEnvelope = {
    data: CertificateServiceCreateManyAdminInput | CertificateServiceCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type ContactServiceCreateWithoutAdminInput = {
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactServiceContactCreateNestedManyWithoutServiceInput
  }

  export type ContactServiceUncheckedCreateWithoutAdminInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactServiceContactUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ContactServiceCreateOrConnectWithoutAdminInput = {
    where: ContactServiceWhereUniqueInput
    create: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput>
  }

  export type ContactServiceCreateManyAdminInputEnvelope = {
    data: ContactServiceCreateManyAdminInput | ContactServiceCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type SchemeServiceUpsertWithWhereUniqueWithoutAdminInput = {
    where: SchemeServiceWhereUniqueInput
    update: XOR<SchemeServiceUpdateWithoutAdminInput, SchemeServiceUncheckedUpdateWithoutAdminInput>
    create: XOR<SchemeServiceCreateWithoutAdminInput, SchemeServiceUncheckedCreateWithoutAdminInput>
  }

  export type SchemeServiceUpdateWithWhereUniqueWithoutAdminInput = {
    where: SchemeServiceWhereUniqueInput
    data: XOR<SchemeServiceUpdateWithoutAdminInput, SchemeServiceUncheckedUpdateWithoutAdminInput>
  }

  export type SchemeServiceUpdateManyWithWhereWithoutAdminInput = {
    where: SchemeServiceScalarWhereInput
    data: XOR<SchemeServiceUpdateManyMutationInput, SchemeServiceUncheckedUpdateManyWithoutAdminInput>
  }

  export type SchemeServiceScalarWhereInput = {
    AND?: SchemeServiceScalarWhereInput | SchemeServiceScalarWhereInput[]
    OR?: SchemeServiceScalarWhereInput[]
    NOT?: SchemeServiceScalarWhereInput | SchemeServiceScalarWhereInput[]
    id?: IntFilter<"SchemeService"> | number
    name?: StringFilter<"SchemeService"> | string
    summary?: StringFilter<"SchemeService"> | string
    type?: StringNullableFilter<"SchemeService"> | string | null
    targetAudience?: StringNullableListFilter<"SchemeService">
    applicationMode?: StringFilter<"SchemeService"> | string
    onlineUrl?: StringNullableFilter<"SchemeService"> | string | null
    offlineAddress?: StringNullableFilter<"SchemeService"> | string | null
    status?: StringFilter<"SchemeService"> | string
    isActive?: BoolFilter<"SchemeService"> | boolean
    eligibilityDetails?: StringNullableListFilter<"SchemeService">
    benefitDetails?: StringNullableListFilter<"SchemeService">
    applicationProcess?: StringNullableListFilter<"SchemeService">
    requiredDocuments?: StringNullableListFilter<"SchemeService">
    createdAt?: DateTimeFilter<"SchemeService"> | Date | string
    updatedAt?: DateTimeFilter<"SchemeService"> | Date | string
    adminId?: IntFilter<"SchemeService"> | number
  }

  export type CertificateServiceUpsertWithWhereUniqueWithoutAdminInput = {
    where: CertificateServiceWhereUniqueInput
    update: XOR<CertificateServiceUpdateWithoutAdminInput, CertificateServiceUncheckedUpdateWithoutAdminInput>
    create: XOR<CertificateServiceCreateWithoutAdminInput, CertificateServiceUncheckedCreateWithoutAdminInput>
  }

  export type CertificateServiceUpdateWithWhereUniqueWithoutAdminInput = {
    where: CertificateServiceWhereUniqueInput
    data: XOR<CertificateServiceUpdateWithoutAdminInput, CertificateServiceUncheckedUpdateWithoutAdminInput>
  }

  export type CertificateServiceUpdateManyWithWhereWithoutAdminInput = {
    where: CertificateServiceScalarWhereInput
    data: XOR<CertificateServiceUpdateManyMutationInput, CertificateServiceUncheckedUpdateManyWithoutAdminInput>
  }

  export type CertificateServiceScalarWhereInput = {
    AND?: CertificateServiceScalarWhereInput | CertificateServiceScalarWhereInput[]
    OR?: CertificateServiceScalarWhereInput[]
    NOT?: CertificateServiceScalarWhereInput | CertificateServiceScalarWhereInput[]
    id?: IntFilter<"CertificateService"> | number
    name?: StringFilter<"CertificateService"> | string
    summary?: StringFilter<"CertificateService"> | string
    type?: StringNullableFilter<"CertificateService"> | string | null
    targetAudience?: StringNullableListFilter<"CertificateService">
    eligibilityDetails?: StringNullableListFilter<"CertificateService">
    certificateDetails?: StringNullableListFilter<"CertificateService">
    applicationProcess?: StringNullableListFilter<"CertificateService">
    requiredDocuments?: StringNullableListFilter<"CertificateService">
    applicationMode?: StringFilter<"CertificateService"> | string
    onlineUrl?: StringNullableFilter<"CertificateService"> | string | null
    offlineAddress?: StringNullableFilter<"CertificateService"> | string | null
    status?: StringFilter<"CertificateService"> | string
    isActive?: BoolFilter<"CertificateService"> | boolean
    createdAt?: DateTimeFilter<"CertificateService"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateService"> | Date | string
    adminId?: IntFilter<"CertificateService"> | number
  }

  export type ContactServiceUpsertWithWhereUniqueWithoutAdminInput = {
    where: ContactServiceWhereUniqueInput
    update: XOR<ContactServiceUpdateWithoutAdminInput, ContactServiceUncheckedUpdateWithoutAdminInput>
    create: XOR<ContactServiceCreateWithoutAdminInput, ContactServiceUncheckedCreateWithoutAdminInput>
  }

  export type ContactServiceUpdateWithWhereUniqueWithoutAdminInput = {
    where: ContactServiceWhereUniqueInput
    data: XOR<ContactServiceUpdateWithoutAdminInput, ContactServiceUncheckedUpdateWithoutAdminInput>
  }

  export type ContactServiceUpdateManyWithWhereWithoutAdminInput = {
    where: ContactServiceScalarWhereInput
    data: XOR<ContactServiceUpdateManyMutationInput, ContactServiceUncheckedUpdateManyWithoutAdminInput>
  }

  export type ContactServiceScalarWhereInput = {
    AND?: ContactServiceScalarWhereInput | ContactServiceScalarWhereInput[]
    OR?: ContactServiceScalarWhereInput[]
    NOT?: ContactServiceScalarWhereInput | ContactServiceScalarWhereInput[]
    id?: IntFilter<"ContactService"> | number
    serviceName?: StringFilter<"ContactService"> | string
    district?: StringFilter<"ContactService"> | string
    subDistrict?: StringNullableFilter<"ContactService"> | string | null
    block?: StringFilter<"ContactService"> | string
    officeAddress?: StringNullableFilter<"ContactService"> | string | null
    status?: StringFilter<"ContactService"> | string
    isActive?: BoolFilter<"ContactService"> | boolean
    createdAt?: DateTimeFilter<"ContactService"> | Date | string
    updatedAt?: DateTimeFilter<"ContactService"> | Date | string
    adminId?: IntFilter<"ContactService"> | number
  }

  export type AdminCreateWithoutSchemeServicesInput = {
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateServices?: CertificateServiceCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutSchemeServicesInput = {
    id?: number
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateServices?: CertificateServiceUncheckedCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutSchemeServicesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutSchemeServicesInput, AdminUncheckedCreateWithoutSchemeServicesInput>
  }

  export type ContactPersonCreateWithoutSchemeServiceInput = {
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
  }

  export type ContactPersonUncheckedCreateWithoutSchemeServiceInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
  }

  export type ContactPersonCreateOrConnectWithoutSchemeServiceInput = {
    where: ContactPersonWhereUniqueInput
    create: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput>
  }

  export type ContactPersonCreateManySchemeServiceInputEnvelope = {
    data: ContactPersonCreateManySchemeServiceInput | ContactPersonCreateManySchemeServiceInput[]
    skipDuplicates?: boolean
  }

  export type SupportiveDocumentCreateWithoutSchemeServiceInput = {
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
  }

  export type SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput = {
    id?: number
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
  }

  export type SupportiveDocumentCreateOrConnectWithoutSchemeServiceInput = {
    where: SupportiveDocumentWhereUniqueInput
    create: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput>
  }

  export type SupportiveDocumentCreateManySchemeServiceInputEnvelope = {
    data: SupportiveDocumentCreateManySchemeServiceInput | SupportiveDocumentCreateManySchemeServiceInput[]
    skipDuplicates?: boolean
  }

  export type AdminUpsertWithoutSchemeServicesInput = {
    update: XOR<AdminUpdateWithoutSchemeServicesInput, AdminUncheckedUpdateWithoutSchemeServicesInput>
    create: XOR<AdminCreateWithoutSchemeServicesInput, AdminUncheckedCreateWithoutSchemeServicesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutSchemeServicesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutSchemeServicesInput, AdminUncheckedUpdateWithoutSchemeServicesInput>
  }

  export type AdminUpdateWithoutSchemeServicesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateServices?: CertificateServiceUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutSchemeServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateServices?: CertificateServiceUncheckedUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ContactPersonUpsertWithWhereUniqueWithoutSchemeServiceInput = {
    where: ContactPersonWhereUniqueInput
    update: XOR<ContactPersonUpdateWithoutSchemeServiceInput, ContactPersonUncheckedUpdateWithoutSchemeServiceInput>
    create: XOR<ContactPersonCreateWithoutSchemeServiceInput, ContactPersonUncheckedCreateWithoutSchemeServiceInput>
  }

  export type ContactPersonUpdateWithWhereUniqueWithoutSchemeServiceInput = {
    where: ContactPersonWhereUniqueInput
    data: XOR<ContactPersonUpdateWithoutSchemeServiceInput, ContactPersonUncheckedUpdateWithoutSchemeServiceInput>
  }

  export type ContactPersonUpdateManyWithWhereWithoutSchemeServiceInput = {
    where: ContactPersonScalarWhereInput
    data: XOR<ContactPersonUpdateManyMutationInput, ContactPersonUncheckedUpdateManyWithoutSchemeServiceInput>
  }

  export type ContactPersonScalarWhereInput = {
    AND?: ContactPersonScalarWhereInput | ContactPersonScalarWhereInput[]
    OR?: ContactPersonScalarWhereInput[]
    NOT?: ContactPersonScalarWhereInput | ContactPersonScalarWhereInput[]
    id?: IntFilter<"ContactPerson"> | number
    serviceName?: StringFilter<"ContactPerson"> | string
    district?: StringFilter<"ContactPerson"> | string
    subDistrict?: StringFilter<"ContactPerson"> | string
    block?: StringFilter<"ContactPerson"> | string
    name?: StringFilter<"ContactPerson"> | string
    designation?: StringFilter<"ContactPerson"> | string
    contact?: StringFilter<"ContactPerson"> | string
    email?: StringFilter<"ContactPerson"> | string
    schemeServiceId?: IntFilter<"ContactPerson"> | number
  }

  export type SupportiveDocumentUpsertWithWhereUniqueWithoutSchemeServiceInput = {
    where: SupportiveDocumentWhereUniqueInput
    update: XOR<SupportiveDocumentUpdateWithoutSchemeServiceInput, SupportiveDocumentUncheckedUpdateWithoutSchemeServiceInput>
    create: XOR<SupportiveDocumentCreateWithoutSchemeServiceInput, SupportiveDocumentUncheckedCreateWithoutSchemeServiceInput>
  }

  export type SupportiveDocumentUpdateWithWhereUniqueWithoutSchemeServiceInput = {
    where: SupportiveDocumentWhereUniqueInput
    data: XOR<SupportiveDocumentUpdateWithoutSchemeServiceInput, SupportiveDocumentUncheckedUpdateWithoutSchemeServiceInput>
  }

  export type SupportiveDocumentUpdateManyWithWhereWithoutSchemeServiceInput = {
    where: SupportiveDocumentScalarWhereInput
    data: XOR<SupportiveDocumentUpdateManyMutationInput, SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceInput>
  }

  export type SupportiveDocumentScalarWhereInput = {
    AND?: SupportiveDocumentScalarWhereInput | SupportiveDocumentScalarWhereInput[]
    OR?: SupportiveDocumentScalarWhereInput[]
    NOT?: SupportiveDocumentScalarWhereInput | SupportiveDocumentScalarWhereInput[]
    id?: IntFilter<"SupportiveDocument"> | number
    slNo?: IntFilter<"SupportiveDocument"> | number
    documentType?: StringFilter<"SupportiveDocument"> | string
    validProof?: StringFilter<"SupportiveDocument"> | string
    isRequired?: BoolFilter<"SupportiveDocument"> | boolean
    schemeServiceId?: IntFilter<"SupportiveDocument"> | number
  }

  export type AdminCreateWithoutCertificateServicesInput = {
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutCertificateServicesInput = {
    id?: number
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceUncheckedCreateNestedManyWithoutAdminInput
    contactServices?: ContactServiceUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutCertificateServicesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutCertificateServicesInput, AdminUncheckedCreateWithoutCertificateServicesInput>
  }

  export type AdminUpsertWithoutCertificateServicesInput = {
    update: XOR<AdminUpdateWithoutCertificateServicesInput, AdminUncheckedUpdateWithoutCertificateServicesInput>
    create: XOR<AdminCreateWithoutCertificateServicesInput, AdminUncheckedCreateWithoutCertificateServicesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutCertificateServicesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutCertificateServicesInput, AdminUncheckedUpdateWithoutCertificateServicesInput>
  }

  export type AdminUpdateWithoutCertificateServicesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutCertificateServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUncheckedUpdateManyWithoutAdminNestedInput
    contactServices?: ContactServiceUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ContactServiceContactCreateWithoutServiceInput = {
    name: string
    designation: string
    contact: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceContactUncheckedCreateWithoutServiceInput = {
    id?: number
    name: string
    designation: string
    contact: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceContactCreateOrConnectWithoutServiceInput = {
    where: ContactServiceContactWhereUniqueInput
    create: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput>
  }

  export type ContactServiceContactCreateManyServiceInputEnvelope = {
    data: ContactServiceContactCreateManyServiceInput | ContactServiceContactCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type AdminCreateWithoutContactServicesInput = {
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceCreateNestedManyWithoutAdminInput
    certificateServices?: CertificateServiceCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutContactServicesInput = {
    id?: number
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schemeServices?: SchemeServiceUncheckedCreateNestedManyWithoutAdminInput
    certificateServices?: CertificateServiceUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutContactServicesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutContactServicesInput, AdminUncheckedCreateWithoutContactServicesInput>
  }

  export type ContactServiceContactUpsertWithWhereUniqueWithoutServiceInput = {
    where: ContactServiceContactWhereUniqueInput
    update: XOR<ContactServiceContactUpdateWithoutServiceInput, ContactServiceContactUncheckedUpdateWithoutServiceInput>
    create: XOR<ContactServiceContactCreateWithoutServiceInput, ContactServiceContactUncheckedCreateWithoutServiceInput>
  }

  export type ContactServiceContactUpdateWithWhereUniqueWithoutServiceInput = {
    where: ContactServiceContactWhereUniqueInput
    data: XOR<ContactServiceContactUpdateWithoutServiceInput, ContactServiceContactUncheckedUpdateWithoutServiceInput>
  }

  export type ContactServiceContactUpdateManyWithWhereWithoutServiceInput = {
    where: ContactServiceContactScalarWhereInput
    data: XOR<ContactServiceContactUpdateManyMutationInput, ContactServiceContactUncheckedUpdateManyWithoutServiceInput>
  }

  export type ContactServiceContactScalarWhereInput = {
    AND?: ContactServiceContactScalarWhereInput | ContactServiceContactScalarWhereInput[]
    OR?: ContactServiceContactScalarWhereInput[]
    NOT?: ContactServiceContactScalarWhereInput | ContactServiceContactScalarWhereInput[]
    id?: IntFilter<"ContactServiceContact"> | number
    name?: StringFilter<"ContactServiceContact"> | string
    designation?: StringFilter<"ContactServiceContact"> | string
    contact?: StringFilter<"ContactServiceContact"> | string
    email?: StringNullableFilter<"ContactServiceContact"> | string | null
    serviceId?: IntFilter<"ContactServiceContact"> | number
    createdAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
    updatedAt?: DateTimeFilter<"ContactServiceContact"> | Date | string
  }

  export type AdminUpsertWithoutContactServicesInput = {
    update: XOR<AdminUpdateWithoutContactServicesInput, AdminUncheckedUpdateWithoutContactServicesInput>
    create: XOR<AdminCreateWithoutContactServicesInput, AdminUncheckedCreateWithoutContactServicesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutContactServicesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutContactServicesInput, AdminUncheckedUpdateWithoutContactServicesInput>
  }

  export type AdminUpdateWithoutContactServicesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUpdateManyWithoutAdminNestedInput
    certificateServices?: CertificateServiceUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutContactServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schemeServices?: SchemeServiceUncheckedUpdateManyWithoutAdminNestedInput
    certificateServices?: CertificateServiceUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ContactServiceCreateWithoutContactsInput = {
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: AdminCreateNestedOneWithoutContactServicesInput
  }

  export type ContactServiceUncheckedCreateWithoutContactsInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
  }

  export type ContactServiceCreateOrConnectWithoutContactsInput = {
    where: ContactServiceWhereUniqueInput
    create: XOR<ContactServiceCreateWithoutContactsInput, ContactServiceUncheckedCreateWithoutContactsInput>
  }

  export type ContactServiceUpsertWithoutContactsInput = {
    update: XOR<ContactServiceUpdateWithoutContactsInput, ContactServiceUncheckedUpdateWithoutContactsInput>
    create: XOR<ContactServiceCreateWithoutContactsInput, ContactServiceUncheckedCreateWithoutContactsInput>
    where?: ContactServiceWhereInput
  }

  export type ContactServiceUpdateToOneWithWhereWithoutContactsInput = {
    where?: ContactServiceWhereInput
    data: XOR<ContactServiceUpdateWithoutContactsInput, ContactServiceUncheckedUpdateWithoutContactsInput>
  }

  export type ContactServiceUpdateWithoutContactsInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutContactServicesNestedInput
  }

  export type ContactServiceUncheckedUpdateWithoutContactsInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
  }

  export type SchemeServiceCreateWithoutContactsInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: AdminCreateNestedOneWithoutSchemeServicesInput
    documents?: SupportiveDocumentCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceUncheckedCreateWithoutContactsInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
    documents?: SupportiveDocumentUncheckedCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceCreateOrConnectWithoutContactsInput = {
    where: SchemeServiceWhereUniqueInput
    create: XOR<SchemeServiceCreateWithoutContactsInput, SchemeServiceUncheckedCreateWithoutContactsInput>
  }

  export type SchemeServiceUpsertWithoutContactsInput = {
    update: XOR<SchemeServiceUpdateWithoutContactsInput, SchemeServiceUncheckedUpdateWithoutContactsInput>
    create: XOR<SchemeServiceCreateWithoutContactsInput, SchemeServiceUncheckedCreateWithoutContactsInput>
    where?: SchemeServiceWhereInput
  }

  export type SchemeServiceUpdateToOneWithWhereWithoutContactsInput = {
    where?: SchemeServiceWhereInput
    data: XOR<SchemeServiceUpdateWithoutContactsInput, SchemeServiceUncheckedUpdateWithoutContactsInput>
  }

  export type SchemeServiceUpdateWithoutContactsInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutSchemeServicesNestedInput
    documents?: SupportiveDocumentUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceUncheckedUpdateWithoutContactsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
    documents?: SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceCreateWithoutDocumentsInput = {
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: AdminCreateNestedOneWithoutSchemeServicesInput
    contacts?: ContactPersonCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceUncheckedCreateWithoutDocumentsInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId?: number
    contacts?: ContactPersonUncheckedCreateNestedManyWithoutSchemeServiceInput
  }

  export type SchemeServiceCreateOrConnectWithoutDocumentsInput = {
    where: SchemeServiceWhereUniqueInput
    create: XOR<SchemeServiceCreateWithoutDocumentsInput, SchemeServiceUncheckedCreateWithoutDocumentsInput>
  }

  export type SchemeServiceUpsertWithoutDocumentsInput = {
    update: XOR<SchemeServiceUpdateWithoutDocumentsInput, SchemeServiceUncheckedUpdateWithoutDocumentsInput>
    create: XOR<SchemeServiceCreateWithoutDocumentsInput, SchemeServiceUncheckedCreateWithoutDocumentsInput>
    where?: SchemeServiceWhereInput
  }

  export type SchemeServiceUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: SchemeServiceWhereInput
    data: XOR<SchemeServiceUpdateWithoutDocumentsInput, SchemeServiceUncheckedUpdateWithoutDocumentsInput>
  }

  export type SchemeServiceUpdateWithoutDocumentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutSchemeServicesNestedInput
    contacts?: ContactPersonUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: IntFieldUpdateOperationsInput | number
    contacts?: ContactPersonUncheckedUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceCreateManyAdminInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: SchemeServiceCreatetargetAudienceInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    eligibilityDetails?: SchemeServiceCreateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceCreatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceCreaterequiredDocumentsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateServiceCreateManyAdminInput = {
    id?: number
    name: string
    summary: string
    type?: string | null
    targetAudience?: CertificateServiceCreatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceCreateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceCreatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceCreateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceCreaterequiredDocumentsInput | string[]
    applicationMode?: string
    onlineUrl?: string | null
    offlineAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceCreateManyAdminInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict?: string | null
    block: string
    officeAddress?: string | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SchemeServiceUpdateWithoutAdminInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactPersonUpdateManyWithoutSchemeServiceNestedInput
    documents?: SupportiveDocumentUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactPersonUncheckedUpdateManyWithoutSchemeServiceNestedInput
    documents?: SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceNestedInput
  }

  export type SchemeServiceUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: SchemeServiceUpdatetargetAudienceInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    eligibilityDetails?: SchemeServiceUpdateeligibilityDetailsInput | string[]
    benefitDetails?: SchemeServiceUpdatebenefitDetailsInput | string[]
    applicationProcess?: SchemeServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: SchemeServiceUpdaterequiredDocumentsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateServiceUpdateWithoutAdminInput = {
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateServiceUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateServiceUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    targetAudience?: CertificateServiceUpdatetargetAudienceInput | string[]
    eligibilityDetails?: CertificateServiceUpdateeligibilityDetailsInput | string[]
    certificateDetails?: CertificateServiceUpdatecertificateDetailsInput | string[]
    applicationProcess?: CertificateServiceUpdateapplicationProcessInput | string[]
    requiredDocuments?: CertificateServiceUpdaterequiredDocumentsInput | string[]
    applicationMode?: StringFieldUpdateOperationsInput | string
    onlineUrl?: NullableStringFieldUpdateOperationsInput | string | null
    offlineAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceUpdateWithoutAdminInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactServiceContactUpdateManyWithoutServiceNestedInput
  }

  export type ContactServiceUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactServiceContactUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ContactServiceUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    block?: StringFieldUpdateOperationsInput | string
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPersonCreateManySchemeServiceInput = {
    id?: number
    serviceName: string
    district: string
    subDistrict: string
    block: string
    name: string
    designation: string
    contact: string
    email: string
  }

  export type SupportiveDocumentCreateManySchemeServiceInput = {
    id?: number
    slNo: number
    documentType: string
    validProof: string
    isRequired?: boolean
  }

  export type ContactPersonUpdateWithoutSchemeServiceInput = {
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type ContactPersonUncheckedUpdateWithoutSchemeServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type ContactPersonUncheckedUpdateManyWithoutSchemeServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    subDistrict?: StringFieldUpdateOperationsInput | string
    block?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type SupportiveDocumentUpdateWithoutSchemeServiceInput = {
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportiveDocumentUncheckedUpdateWithoutSchemeServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportiveDocumentUncheckedUpdateManyWithoutSchemeServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    slNo?: IntFieldUpdateOperationsInput | number
    documentType?: StringFieldUpdateOperationsInput | string
    validProof?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactServiceContactCreateManyServiceInput = {
    id?: number
    name: string
    designation: string
    contact: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactServiceContactUpdateWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceContactUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactServiceContactUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AdminCountOutputTypeDefaultArgs instead
     */
    export type AdminCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchemeServiceCountOutputTypeDefaultArgs instead
     */
    export type SchemeServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchemeServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactServiceCountOutputTypeDefaultArgs instead
     */
    export type ContactServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminDefaultArgs instead
     */
    export type AdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchemeServiceDefaultArgs instead
     */
    export type SchemeServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchemeServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateServiceDefaultArgs instead
     */
    export type CertificateServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactServiceDefaultArgs instead
     */
    export type ContactServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactServiceContactDefaultArgs instead
     */
    export type ContactServiceContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactServiceContactDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GrievanceDefaultArgs instead
     */
    export type GrievanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GrievanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeedbackDefaultArgs instead
     */
    export type FeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeedbackDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactPersonDefaultArgs instead
     */
    export type ContactPersonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactPersonDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupportiveDocumentDefaultArgs instead
     */
    export type SupportiveDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupportiveDocumentDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}