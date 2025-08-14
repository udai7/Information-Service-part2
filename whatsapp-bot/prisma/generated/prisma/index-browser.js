
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  password: 'password',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SchemeServiceScalarFieldEnum = {
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
  schemeDetails: 'schemeDetails',
  processDetails: 'processDetails',
  benefitDetails: 'benefitDetails',
  applicationProcess: 'applicationProcess',
  requiredDocuments: 'requiredDocuments',
  processNew: 'processNew',
  processUpdate: 'processUpdate',
  processLost: 'processLost',
  processSurrender: 'processSurrender',
  docNew: 'docNew',
  docUpdate: 'docUpdate',
  docLost: 'docLost',
  docSurrender: 'docSurrender',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  adminId: 'adminId'
};

exports.Prisma.CertificateServiceScalarFieldEnum = {
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
  processNew: 'processNew',
  processUpdate: 'processUpdate',
  processLost: 'processLost',
  processSurrender: 'processSurrender',
  docNew: 'docNew',
  docUpdate: 'docUpdate',
  docLost: 'docLost',
  docSurrender: 'docSurrender',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  adminId: 'adminId'
};

exports.Prisma.CertificateContactScalarFieldEnum = {
  id: 'id',
  serviceName: 'serviceName',
  district: 'district',
  subDistrict: 'subDistrict',
  block: 'block',
  name: 'name',
  designation: 'designation',
  contact: 'contact',
  email: 'email',
  applicationType: 'applicationType',
  certificateServiceId: 'certificateServiceId'
};

exports.Prisma.CertificateDocumentScalarFieldEnum = {
  id: 'id',
  slNo: 'slNo',
  documentType: 'documentType',
  validProof: 'validProof',
  isRequired: 'isRequired',
  applicationType: 'applicationType',
  certificateServiceId: 'certificateServiceId'
};

exports.Prisma.CertificateProcessStepScalarFieldEnum = {
  id: 'id',
  slNo: 'slNo',
  stepDetails: 'stepDetails',
  applicationType: 'applicationType',
  certificateServiceId: 'certificateServiceId'
};

exports.Prisma.CertificateEligibilityScalarFieldEnum = {
  id: 'id',
  eligibilityDetail: 'eligibilityDetail',
  applicationType: 'applicationType',
  certificateServiceId: 'certificateServiceId'
};

exports.Prisma.ContactServiceScalarFieldEnum = {
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
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  adminId: 'adminId',
  eligibilityDetails: 'eligibilityDetails',
  contactDetails: 'contactDetails',
  processDetails: 'processDetails',
  processNew: 'processNew',
  processUpdate: 'processUpdate',
  processLost: 'processLost',
  processSurrender: 'processSurrender',
  docNew: 'docNew',
  docUpdate: 'docUpdate',
  docLost: 'docLost',
  docSurrender: 'docSurrender'
};

exports.Prisma.ContactServiceContactScalarFieldEnum = {
  id: 'id',
  serviceName: 'serviceName',
  district: 'district',
  subDistrict: 'subDistrict',
  block: 'block',
  name: 'name',
  designation: 'designation',
  contact: 'contact',
  email: 'email',
  contactServiceId: 'contactServiceId'
};

exports.Prisma.ContactServiceDocumentScalarFieldEnum = {
  id: 'id',
  slNo: 'slNo',
  documentType: 'documentType',
  validProof: 'validProof',
  isRequired: 'isRequired',
  contactServiceId: 'contactServiceId'
};

exports.Prisma.GrievanceScalarFieldEnum = {
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

exports.Prisma.FeedbackScalarFieldEnum = {
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

exports.Prisma.ContactPersonScalarFieldEnum = {
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

exports.Prisma.SupportiveDocumentScalarFieldEnum = {
  id: 'id',
  slNo: 'slNo',
  documentType: 'documentType',
  validProof: 'validProof',
  isRequired: 'isRequired',
  schemeServiceId: 'schemeServiceId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Admin: 'Admin',
  SchemeService: 'SchemeService',
  CertificateService: 'CertificateService',
  CertificateContact: 'CertificateContact',
  CertificateDocument: 'CertificateDocument',
  CertificateProcessStep: 'CertificateProcessStep',
  CertificateEligibility: 'CertificateEligibility',
  ContactService: 'ContactService',
  ContactServiceContact: 'ContactServiceContact',
  ContactServiceDocument: 'ContactServiceDocument',
  Grievance: 'Grievance',
  Feedback: 'Feedback',
  ContactPerson: 'ContactPerson',
  SupportiveDocument: 'SupportiveDocument'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
