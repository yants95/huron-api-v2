import { GoogleCalendarService } from "#/modules/schedules/infrastructure/http/services/google-calendar.service";

import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("/list-events")
@Controller({ path: "/list-events", version: "1" })
export class CreateGoogleListEventsController {
  constructor(private readonly service: GoogleCalendarService) {}

  @Get()
  async handle(@Res() res: Response): Promise<any> {
    const calendarEvents = await this.service.listEventsFromCalendar();
    return res.send(calendarEvents);
  }
}
