import config from '@/config/env';

const API_BASE_URL = config.apiUrl;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

export interface User {
  id: string;
  nim: string;
  nama: string;
  email: string;
  fakultas?: string;
  jurusan?: string;
  role: string;
  status: string;
  fotoProfile?: string;
}

export interface EventItemApi {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  location: string;
  poster?: string | null;
  enableAttendance: boolean;
  attendeeCount?: number;
}

export interface RegisterData {
  nim: string;
  nama: string;
  email: string;
  password: string;
  fakultas: string;
  jurusan: string;
  ktm: File;
  berkas: File;
  foto: File;
}

export interface LoginData {
  nim: string;
  password: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(formData: FormData): Promise<ApiResponse<{ user: User }>> {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  }

  async login(credentials: LoginData): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getMe(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/me');
  }

  async forgotPassword(nim: string, email: string): Promise<ApiResponse> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ nim, email }),
    });
  }

  async requestLoginToken(nim: string, email: string): Promise<ApiResponse> {
    return this.request('/auth/request-login-token', {
      method: 'POST',
      body: JSON.stringify({ nim, email }),
    });
  }

  async loginWithToken(nim: string, email: string, otp: string): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/login-with-token', {
      method: 'POST',
      body: JSON.stringify({ nim, email, otp }),
    });
  }

  async updateProfile(data: { nama?: string; email?: string }): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async uploadProfilePhoto(file: File): Promise<ApiResponse<{ fotoProfile: string }>> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await fetch(`${this.baseURL}/auth/profile-photo`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  }

  // PSDA Events
  async listEvents(): Promise<ApiResponse<{ events: EventItemApi[] }>> {
    return this.request('/psda/events');
  }

  async getEvent(id: string): Promise<ApiResponse<{ event: EventItemApi }>> {
    return this.request(`/psda/events/${id}`);
  }

  async rsvpEvent(id: string): Promise<ApiResponse> {
    return this.request(`/psda/events/${id}/rsvp`, { method: 'POST' });
  }

  async createEvent(payload: {
    title: string;
    description?: string;
    category?: string;
    date: string;
    time?: string;
    startTime?: string;
    endTime?: string;
    location: string;
    enableAttendance?: boolean;
    poster?: File | null;
  }): Promise<ApiResponse<{ event: any }>> {
    const formData = new FormData();
    formData.append('title', payload.title);
    if (payload.description) formData.append('description', payload.description);
    if (payload.category) formData.append('category', payload.category);
    formData.append('date', payload.date);
    if (payload.time) formData.append('time', payload.time);
    if (payload.startTime) formData.append('startTime', payload.startTime);
    if (payload.endTime) formData.append('endTime', payload.endTime);
    formData.append('location', payload.location);
    if (typeof payload.enableAttendance !== 'undefined') formData.append('enableAttendance', String(payload.enableAttendance));
    if (payload.poster) formData.append('poster', payload.poster);

    const response = await fetch(`${this.baseURL}/psda/events`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gagal membuat event');
    }
    return data;
  }

  async updateEvent(id: string, payload: {
    title?: string;
    description?: string;
    category?: string;
    date?: string;
    time?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    enableAttendance?: boolean;
    poster?: File | null;
  }): Promise<ApiResponse<{ event: any }>> {
    const formData = new FormData();
    if (payload.title) formData.append('title', payload.title);
    if (payload.description) formData.append('description', payload.description);
    if (payload.category) formData.append('category', payload.category);
    if (payload.date) formData.append('date', payload.date);
    if (payload.time) formData.append('time', payload.time);
    if (payload.startTime) formData.append('startTime', payload.startTime);
    if (payload.endTime) formData.append('endTime', payload.endTime);
    if (payload.location) formData.append('location', payload.location);
    if (typeof payload.enableAttendance !== 'undefined') formData.append('enableAttendance', String(payload.enableAttendance));
    if (payload.poster) formData.append('poster', payload.poster);

    const response = await fetch(`${this.baseURL}/psda/events/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gagal memperbarui event');
    }
    return data;
  }

  async deleteEvent(id: string): Promise<ApiResponse> {
    return this.request(`/psda/events/${id}`, { method: 'DELETE' });
  }

  // PSDA Applications
  async listApplications(status?: 'pending' | 'approved' | 'rejected'): Promise<ApiResponse<{ applications: any[] }>> {
    const qs = status ? `?status=${status}` : '';
    return this.request(`/psda/applications${qs}`);
  }

  async getApplication(id: string): Promise<ApiResponse<{ application: any }>> {
    return this.request(`/psda/applications/${id}`);
  }

  async approveApplication(id: string): Promise<ApiResponse> {
    return this.request(`/psda/applications/${id}/approve`, { method: 'PUT' });
  }

  async rejectApplication(id: string, reason?: string): Promise<ApiResponse> {
    return this.request(`/psda/applications/${id}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
