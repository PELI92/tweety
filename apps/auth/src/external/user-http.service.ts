import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';

const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_BASE_URL ?? 'user';
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT ?? 3000;

export interface RemoteUser {
  _id: string;
  username: string;
  displayName: string;
  bio?: string;
}

@Injectable()
export class UserHttpService {
  constructor(private readonly http: HttpService) {}

  async findByUsername(username: string): Promise<RemoteUser | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<RemoteUser>(
          `http://${USER_SERVICE_BASE_URL}:${USER_SERVICE_PORT}/users/${username}`,
        ),
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return null;
      }
      throw err;
    }
  }

  async createUser(username: string): Promise<RemoteUser> {
    const { data } = await firstValueFrom(
      this.http.post<RemoteUser>(`http://${USER_SERVICE_BASE_URL}:${USER_SERVICE_PORT}/users`, {
        username,
      }),
    );
    return data;
  }
}
