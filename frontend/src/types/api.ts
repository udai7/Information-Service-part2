// API Types and Interfaces

export interface Admin {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface ContactPerson {
  id?: number;
  serviceName: string;
  district: string;
  subDistrict: string;
  block: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
}

export interface CertificateContact {
  id?: number;
  serviceName: string;
  district: string;
  subDistrict: string;
  block: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
  applicationType?: string;
}

export interface ContactServiceContact {
  id?: number;
  serviceName: string;
  district: string;
  subDistrict: string;
  block: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
}

export interface SupportiveDocument {
  id?: number;
  slNo: number;
  documentType: string;
  validProof: string;
  isRequired: boolean;
}

export interface CertificateDocument {
  id?: number;
  slNo: number;
  documentType: string;
  validProof: string;
  isRequired: boolean;
  applicationType?: string;
}

export interface CertificateProcessStep {
  id?: number;
  slNo: number;
  stepDetails: string;
  applicationType?: string;
}

export interface CertificateEligibility {
  id?: number;
  eligibilityDetail: string;
  applicationType?: string;
}

export interface ContactServiceDocument {
  id?: number;
  slNo: number;
  documentType: string;
  validProof: string;
  isRequired: boolean;
}

export interface SchemeService {
  id: number;
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: "online" | "offline" | "both";
  onlineUrl?: string;
  offlineAddress?: string;
  status: "draft" | "pending" | "published";
  isActive?: boolean; // New field for admin dashboard control
  createdAt: string;
  updatedAt: string;

  // Extended details
  eligibilityDetails: string[];
  schemeDetails: string[];
  processDetails: string[];

  // Process flows
  processNew?: string;
  processUpdate?: string;
  processLost?: string;
  processSurrender?: string;

  // Document requirements
  docNew?: string;
  docUpdate?: string;
  docLost?: string;
  docSurrender?: string;

  // Relations
  admin?: Admin;
  adminId: number;
  contacts: ContactPerson[];
  documents: SupportiveDocument[];
}

export interface CertificateService {
  id: number;
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: "online" | "offline" | "both";
  onlineUrl?: string;
  offlineAddress?: string;
  status: "draft" | "pending" | "published";
  isActive?: boolean; // New field for admin dashboard control
  createdAt: string;
  updatedAt: string;

  // Extended details
  eligibilityDetails: string[];
  certificateDetails: string[];
  processDetails: string[];

  // Process flows
  processNew?: string;
  processUpdate?: string;
  processLost?: string;
  processSurrender?: string;

  // Document requirements
  docNew?: string;
  docUpdate?: string;
  docLost?: string;
  docSurrender?: string;

  // Relations
  admin?: Admin;
  adminId: number;
  contacts: CertificateContact[];
  documents: CertificateDocument[];
  processSteps: CertificateProcessStep[];
  eligibilityItems: CertificateEligibility[];
}

export interface ContactService {
  id: number;
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: "emergency" | "regular";
  onlineUrl?: string;
  offlineAddress?: string;
  status: "draft" | "pending" | "published";
  isActive?: boolean; // New field for admin dashboard control
  createdAt: string;
  updatedAt: string;

  // Extended details
  eligibilityDetails: string[];
  contactDetails: string[];
  processDetails: string[];

  // Process flows
  processNew?: string;
  processUpdate?: string;
  processLost?: string;
  processSurrender?: string;

  // Document requirements
  docNew?: string;
  docUpdate?: string;
  docLost?: string;
  docSurrender?: string;

  // Relations
  admin?: Admin;
  adminId: number;
  contacts: ContactServiceContact[];
  documents: ContactServiceDocument[];
}

export interface Feedback {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  rating?: number; // 1-5 star rating
  category?: string; // General, Service, Technical, etc.
  status: "new" | "resolved";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolvedBy?: string; // Admin name who resolved it
  adminNotes?: string; // Internal notes by admin
}

export interface Grievance {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  description: string;
  category?: string; // Service Related, Technical, Policy, etc.
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "pending" | "solved";
  attachments: string[]; // File paths or URLs
  createdAt: string;
  updatedAt: string;

  // Admin tracking
  assignedTo?: string; // Admin name who is handling
  adminNotes?: string; // Internal notes by admin
  resolvedAt?: string;

  // Tracking information
  trackingId: string; // Unique tracking ID for users
}

// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  errors?: Array<{ msg: string; param: string; value: any }>;
  data?: T;
}

export interface AuthResponse extends ApiResponse {
  admin?: Admin;
  token?: string;
}

export interface SchemeServiceResponse extends ApiResponse {
  schemeService?: SchemeService;
}

export interface CertificateServiceResponse extends ApiResponse {
  certificateService?: CertificateService;
}

export interface ContactServiceResponse extends ApiResponse {
  contactService?: ContactService;
}

export interface FeedbackResponse extends ApiResponse {
  feedback?: Feedback;
}

export interface FeedbackListResponse extends ApiResponse {
  feedbacks?: Feedback[];
  total?: number;
}

export interface GrievanceResponse extends ApiResponse {
  grievance?: Grievance;
}

export interface GrievanceListResponse extends ApiResponse {
  grievances?: Grievance[];
  total?: number;
}

export interface SchemeServicesListResponse extends ApiResponse {
  schemeServices?: SchemeService[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats?: {
    draft: number;
    pending: number;
    published: number;
    total: number;
  };
}

export interface CertificateServicesListResponse extends ApiResponse {
  certificateServices?: CertificateService[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats?: {
    draft: number;
    pending: number;
    published: number;
    total: number;
  };
}

export interface ContactServicesListResponse extends ApiResponse {
  contactServices?: ContactService[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats?: {
    draft: number;
    pending: number;
    published: number;
    total: number;
  };
}

// API Request Types
export interface CreateSchemeServiceRequest {
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: "online" | "offline" | "both";
  onlineUrl?: string;
  offlineAddress?: string;
}

export interface UpdateSchemeServiceRequest {
  eligibilityDetails?: string[];
  schemeDetails?: string[];
  processDetails?: string[];
  processNew?: string;
  processUpdate?: string;
  processLost?: string;
  processSurrender?: string;
  docNew?: string;
  docUpdate?: string;
  docLost?: string;
  docSurrender?: string;
  contacts?: ContactPerson[];
  documents?: SupportiveDocument[];
  isActive?: boolean; // Admin dashboard control
}

export interface UpdateCertificateServiceRequest {
  name?: string;
  summary?: string;
  type?: string;
  applicationMode?: string;
  onlineUrl?: string;
  offlineAddress?: string;
  processSteps?: CertificateProcessStep[];
  eligibilityItems?: CertificateEligibility[];
  documents?: CertificateDocument[];
  contacts?: CertificateContact[];
  isActive?: boolean; // Admin dashboard control
}

export interface CreateContactServiceRequest {
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: "emergency" | "regular";
  onlineUrl?: string;
  offlineAddress?: string;
}

export interface UpdateContactServiceRequest {
  name?: string;
  summary?: string;
  type?: string;
  applicationMode?: "emergency" | "regular";
  onlineUrl?: string;
  offlineAddress?: string;
  isActive?: boolean; // Admin dashboard control
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Office Management Interfaces
export interface Post {
  id: number;
  postName: string;
  rank: string;
  description?: string;
  department?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  officeId: number;
  employees: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  employeeId?: string;
  joiningDate?: string;
  salary?: number;
  status: "active" | "inactive" | "on_leave";
  createdAt: string;
  updatedAt: string;
  postId: number;
}

export interface PostsResponse {
  success: boolean;
  posts: Post[];
  message?: string;
}

export interface PostResponse {
  success: boolean;
  post: Post;
  message?: string;
}

export interface EmployeeResponse {
  success: boolean;
  employee: Employee;
  message?: string;
}

export interface CreatePostRequest {
  postName: string;
  rank: string;
  description?: string;
  department?: string;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  phone: string;
  designation: string;
  employeeId?: string;
  joiningDate?: string;
  salary?: number;
}

export interface UpdateEmployeeRequest {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

// Feedback and Grievance Request Types
export interface CreateFeedbackRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  rating?: number; // 1-5 star rating
  category?: string; // General, Service, Technical, etc.
}

export interface UpdateFeedbackRequest {
  status?: "new" | "resolved";
  adminNotes?: string;
  resolvedBy?: string;
}

export interface CreateGrievanceRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  description: string;
  category?: string; // Service Related, Technical, Policy, etc.
  priority?: "low" | "medium" | "high" | "urgent";
  attachments?: string[]; // File paths or URLs
}

export interface UpdateGrievanceRequest {
  status?: "new" | "pending" | "solved";
  assignedTo?: string;
  adminNotes?: string;
  priority?: "low" | "medium" | "high" | "urgent";
}

// API Client Configuration
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-api.com/api"
    : "http://localhost:3001/api";

// API Client Class
export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("admin_token");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("admin_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("admin_token");
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    console.log("API Request:", {
      url,
      method: options.method || "GET",
      hasToken: !!this.token,
      headers,
      body: options.body,
    });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", errorData);

      // Handle validation errors specifically
      if (response.status === 400 && errorData.errors) {
        const validationMessages = errorData.errors
          .map((err: any) => err.msg)
          .join(", ");
        throw new Error(`Validation failed: ${validationMessages}`);
      }

      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/auth/profile");
  }

  // Scheme Service methods
  async createSchemeService(
    data: CreateSchemeServiceRequest,
  ): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>("/scheme-services/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSchemeServices(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<SchemeServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.makeRequest<SchemeServicesListResponse>(
      `/scheme-services${query ? `?${query}` : ""}`,
    );
  }

  async getSchemeService(id: number): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>(`/scheme-services/${id}`);
  }

  async updateSchemeService(
    id: number,
    data: UpdateSchemeServiceRequest,
  ): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>(`/scheme-services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async publishSchemeService(id: number): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>(
      `/scheme-services/${id}/publish`,
      {
        method: "PATCH",
      },
    );
  }

  async deleteSchemeService(id: number): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/scheme-services/${id}`, {
      method: "DELETE",
    });
  }

  // Certificate Services
  async createCertificateService(
    data: CreateSchemeServiceRequest,
  ): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      "/certificate-services",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  async getCertificateServices(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<CertificateServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.makeRequest<CertificateServicesListResponse>(
      `/certificate-services${query ? `?${query}` : ""}`,
    );
  }

  async getCertificateService(id: number): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      `/certificate-services/${id}`,
    );
  }

  async updateCertificateService(
    id: number,
    data: UpdateCertificateServiceRequest,
  ): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      `/certificate-services/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );
  }

  async publishCertificateService(
    id: number,
  ): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      `/certificate-services/${id}/publish`,
      {
        method: "PATCH",
      },
    );
  }

  async deleteCertificateService(id: number): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/certificate-services/${id}`, {
      method: "DELETE",
    });
  }

  // Contact Services
  async createContactService(
    data: CreateContactServiceRequest,
  ): Promise<ContactServiceResponse> {
    return this.makeRequest<ContactServiceResponse>("/contact-services", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getContactServices(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ContactServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.makeRequest<ContactServicesListResponse>(
      `/contact-services${query ? `?${query}` : ""}`,
    );
  }

  async getContactService(id: number): Promise<ContactServiceResponse> {
    return this.makeRequest<ContactServiceResponse>(`/contact-services/${id}`);
  }

  async updateContactService(
    id: number,
    data: UpdateContactServiceRequest,
  ): Promise<ContactServiceResponse> {
    return this.makeRequest<ContactServiceResponse>(`/contact-services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async publishContactService(id: number): Promise<ContactServiceResponse> {
    return this.makeRequest<ContactServiceResponse>(
      `/contact-services/${id}/publish`,
      {
        method: "PATCH",
      },
    );
  }

  async deleteContactService(id: number): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/contact-services/${id}`, {
      method: "DELETE",
    });
  }

  // Office Management API methods

  // Get office by name
  async getOfficeById(
    officeId: number,
  ): Promise<{ success: boolean; office: ContactServiceContact }> {
    return this.makeRequest<{
      success: boolean;
      office: ContactServiceContact;
    }>(`/offices/by-id/${officeId}`);
  }

  // Get all offices for a contact service
  async getContactServiceOffices(
    serviceId: number,
  ): Promise<{ success: boolean; offices: any[] }> {
    return this.makeRequest<{
      success: boolean;
      offices: any[];
    }>(`/contact-services/${serviceId}/offices`);
  }

  // Get all posts for an office
  async getOfficePosts(officeId: number): Promise<PostsResponse> {
    return this.makeRequest<PostsResponse>(`/offices/${officeId}/posts`);
  } // Create a new post in an office
  async createPost(
    officeId: number,
    data: CreatePostRequest,
  ): Promise<PostResponse> {
    return this.makeRequest<PostResponse>(`/offices/${officeId}/posts`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Add an employee to a post
  async addEmployee(
    officeId: number,
    postId: number,
    data: CreateEmployeeRequest,
  ): Promise<EmployeeResponse> {
    return this.makeRequest<EmployeeResponse>(
      `/offices/${officeId}/posts/${postId}/employees`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  // Update an employee
  async updateEmployee(
    officeId: number,
    postId: number,
    employeeId: number,
    data: UpdateEmployeeRequest,
  ): Promise<EmployeeResponse> {
    return this.makeRequest<EmployeeResponse>(
      `/offices/${officeId}/posts/${postId}/employees/${employeeId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
  }

  // Delete an employee
  async deleteEmployee(
    officeId: number,
    postId: number,
    employeeId: number,
  ): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(
      `/offices/${officeId}/posts/${postId}/employees/${employeeId}`,
      {
        method: "DELETE",
      },
    );
  }

  // Feedback Services
  async createFeedback(data: CreateFeedbackRequest): Promise<FeedbackResponse> {
    return this.makeRequest<FeedbackResponse>("/feedbacks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getFeedbacks(params?: {
    status?: "new" | "resolved";
    page?: number;
    limit?: number;
  }): Promise<FeedbackListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.makeRequest<FeedbackListResponse>(
      `/feedbacks${query ? `?${query}` : ""}`,
    );
  }

  async getFeedback(id: number): Promise<FeedbackResponse> {
    return this.makeRequest<FeedbackResponse>(`/feedbacks/${id}`);
  }

  async updateFeedback(
    id: number,
    data: UpdateFeedbackRequest,
  ): Promise<FeedbackResponse> {
    return this.makeRequest<FeedbackResponse>(`/feedbacks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async resolveFeedback(
    id: number,
    adminNotes?: string,
  ): Promise<FeedbackResponse> {
    return this.makeRequest<FeedbackResponse>(`/feedbacks/${id}/resolve`, {
      method: "PATCH",
      body: JSON.stringify({ adminNotes }),
    });
  }

  async deleteFeedback(id: number): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/feedbacks/${id}`, {
      method: "DELETE",
    });
  }

  // Grievance Services
  async createGrievance(
    data: CreateGrievanceRequest,
  ): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>("/grievances", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getGrievances(params?: {
    status?: "new" | "pending" | "solved";
    page?: number;
    limit?: number;
  }): Promise<GrievanceListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.makeRequest<GrievanceListResponse>(
      `/grievances${query ? `?${query}` : ""}`,
    );
  }

  async getGrievance(id: number): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(`/grievances/${id}`);
  }

  async getGrievanceByTracking(trackingId: string): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(
      `/grievances/track/${trackingId}`,
    );
  }

  async updateGrievance(
    id: number,
    data: UpdateGrievanceRequest,
  ): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(`/grievances/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async markGrievanceAsSolved(
    id: number,
    adminNotes?: string,
  ): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(`/grievances/${id}/solve`, {
      method: "PATCH",
      body: JSON.stringify({ adminNotes }),
    });
  }

  async markGrievanceAsPending(
    id: number,
    adminNotes?: string,
  ): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(`/grievances/${id}/pending`, {
      method: "PATCH",
      body: JSON.stringify({ adminNotes }),
    });
  }

  async assignGrievance(
    id: number,
    assignedTo: string,
  ): Promise<GrievanceResponse> {
    return this.makeRequest<GrievanceResponse>(`/grievances/${id}/assign`, {
      method: "PATCH",
      body: JSON.stringify({ assignedTo }),
    });
  }

  async deleteGrievance(id: number): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/grievances/${id}`, {
      method: "DELETE",
    });
  }

  // Service activation/deactivation methods for admin dashboard
  async toggleSchemeServiceActive(
    id: number,
    isActive: boolean,
  ): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>(
      `/scheme-services/${id}/toggle`,
      {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      },
    );
  }

  async toggleCertificateServiceActive(
    id: number,
    isActive: boolean,
  ): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      `/certificate-services/${id}/toggle`,
      {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      },
    );
  }

  async toggleContactServiceActive(
    id: number,
    isActive: boolean,
  ): Promise<ContactServiceResponse> {
    return this.makeRequest<ContactServiceResponse>(
      `/contact-services/${id}/toggle`,
      {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      },
    );
  }

  // PUBLIC API METHODS (for user dashboard - no authentication required)

  // Get published contact services (public)
  async getPublicContactServices(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ContactServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const query = queryParams.toString();
    return this.makeRequest<ContactServicesListResponse>(
      `/contact-services/public/list${query ? `?${query}` : ""}`,
    );
  }

  // Get published scheme services (public)
  async getPublicSchemeServices(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<SchemeServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const query = queryParams.toString();
    return this.makeRequest<SchemeServicesListResponse>(
      `/scheme-services/public/list${query ? `?${query}` : ""}`,
    );
  }

  // Get single published scheme service (public)
  async getPublicSchemeService(id: number): Promise<SchemeServiceResponse> {
    return this.makeRequest<SchemeServiceResponse>(
      `/scheme-services/public/${id}`,
    );
  }

  // Get published certificate services (public)
  async getPublicCertificateServices(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CertificateServicesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const query = queryParams.toString();
    return this.makeRequest<CertificateServicesListResponse>(
      `/certificate-services/public/list${query ? `?${query}` : ""}`,
    );
  }

  // Get single published certificate service (public)
  async getPublicCertificateService(
    id: number,
  ): Promise<CertificateServiceResponse> {
    return this.makeRequest<CertificateServiceResponse>(
      `/certificate-services/public/${id}`,
    );
  }

  // Get office by name (public)
  async getPublicOfficeByName(
    officeName: string,
  ): Promise<{ success: boolean; office: ContactServiceContact }> {
    return this.makeRequest<{
      success: boolean;
      office: ContactServiceContact;
    }>(`/offices/public/by-name/${encodeURIComponent(officeName)}`);
  }

  // Get all posts for an office (public)
  async getPublicOfficePosts(officeId: number): Promise<PostsResponse> {
    return this.makeRequest<PostsResponse>(`/offices/public/${officeId}/posts`);
  }

  // Get all published services for admin dashboard
  async getAllPublishedServices(): Promise<{
    schemeServices: SchemeService[];
    certificateServices: CertificateService[];
    contactServices: ContactService[];
  }> {
    const [schemes, certificates, contacts] = await Promise.all([
      this.getSchemeServices({ status: "published" }),
      this.getCertificateServices({ status: "published" }),
      this.getContactServices({ status: "published" }),
    ]);

    return {
      schemeServices: schemes.schemeServices || [],
      certificateServices: certificates.certificateServices || [],
      contactServices: contacts.contactServices || [],
    };
  }
}

// Default API client instance
export const apiClient = new ApiClient();
