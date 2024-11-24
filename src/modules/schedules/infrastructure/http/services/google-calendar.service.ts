import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "#/core/infrastructure/configs/settings";
import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import path from "node:path";
import fs from "node:fs";

@Injectable()
export class GoogleCalendarService {
  #oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  #calendar = google.calendar({
    version: 'v3',
    auth: this.#oauth2Client
  });
  readonly #tokensPath = path.join(__dirname, 'tokens.json');

  public constructor() {
    this.#loadCredentials();
  }

  public async listEventsFromCalendar(): Promise<unknown> {
    if (!this.#oauth2Client.credentials) {
      throw new Error('OAuth2 client is not authenticated');
    }

    const { startOfYear, endOfYear } = this.#getDate();
    
    const result = await this.#calendar.events.list({
      calendarId: "primary",
      timeMin: startOfYear,
      timeMax: endOfYear,
    });

    return result.data.items;
  }

  public generateAuthUrl(): string {
    return this.#oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
    });
  }

  public async getAccessToken(code: string): Promise<string | null> {
    try {
      const { tokens } = await this.#oauth2Client.getToken(code);
      this.#oauth2Client.setCredentials(tokens);
      return tokens.access_token ?? null;
    } catch (error) {
      console.error('Error retrieving access token:', error);
      throw error;
    }
  }

  #loadCredentials(): void {
    if (fs.existsSync(this.#tokensPath)) {
      const tokens = JSON.parse(fs.readFileSync(this.#tokensPath, 'utf8'));
      this.#oauth2Client.setCredentials(tokens);
    }
  }

  #getDate(): Record<string, string> {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString(); // January 1st, 00:00:00
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59).toISOString(); // December 31st, 23:59:59

    return { startOfYear, endOfYear };
  }
}