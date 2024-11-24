import { GoogleCalendarService } from "#/modules/schedules/infrastructure/http/services/google-calendar.service";

import { Controller, Get, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

@ApiTags("/auth")
@Controller({ path: "/auth", version: "1" })
export class CreateGoogleScheduleController {
  constructor(private readonly service: GoogleCalendarService) {}

  @Get()
  async handle(@Res() res: Response): Promise<void> {
    const url = this.service.generateAuthUrl();
    return res.redirect(url);
  }

  @Get('/redirect')
  async handleRedirect(@Req() req: Request): Promise<void> {
    const accessToken = await this.service.getAccessToken(String(req.query.code));
    console.log("Access Token:", accessToken);
  }
}
